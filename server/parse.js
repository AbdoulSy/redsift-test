/**
 * React Dmarc Sift. DAG's 'Parse' node implementation
*/
'use strict';

const validateHeaders = require("./validation/mod");

// Javascript nodes are run in a Node.js sandbox so you can require dependencies following the node paradigm
// e.g. var moment = require('moment');

/**
 * 
 * @param {object} got
 * @param {object} got.in
 * @param {Array<{value:string}>} got.in.data
 */
module.exports = function (got) {
  // inData contains the key/value pairs that match the given query
  const inData = got.in;

  console.log('email-sift-web: parse.js: running...');

  const results = inData.data.map(({ value: valueBuffer }, i) => {
    // Parse the JMAP information for each message more info here: https://docs.redsift.com/docs/server-code-jmap
    const emailJmap = JSON.parse(valueBuffer);
    const { id, threadId, subject, textBody, strippedHtmlBody,
      headers, from, date } = emailJmap;
    // Not all emails contain a textBody so we do a cascade selection
    const body = textBody || strippedHtmlBody || '';
    const wordCount = countWords(body);
    const validationResult = validateHeaders(headers);
    const {errors} = validationResult;
    const key = `${threadId}/${id}`;
    const value = {
      id,
      body,
      subject,
      threadId,
      wordCount,
      from,
      date,
      validationResult
    };
    const rejectedMessage = {
      id,
      threadId,
      subject,
      validationResult
    }

    if(errors && errors.action === "REJECT") {
      return {
        key,
        value: rejectedMessage,
        name: "messages-st"
      }; //rejected messages will not arrive to the client but counted
    }

    if(errors && errors.action === "QUARANTINE") {
      return [{
        key,
        value: rejectedMessage,
        name: "spam"
      },
      {
        key,
        value: rejectedMessage,
        name: "messages-st"
      }]; //quarantined messages are sent to spam
    }
    // Emit into "messages-st" store so count can be calculated by the "Count" node
    // Emit information on the "messages" output so we can display them in the email list and detail
    return [{
      key,
      value,
      name: 'messages-st'
    }, {
      key,
      value,
      name: 'messages'
    }];
  });

  // Possible return values are: undefined, null, promises, single or an array of objects
  // return objects should have the following structure
  // {
  //   name: '<name of node output>',
  //   key: 'key1',
  //   value: '1'
  // };
  return [].concat(...results);
};

/**
 * Simple function to count number of words in a string
 */
function countWords(body) {
  let s = body.replace(/\n/gi, ' ');
  s = s.replace(/(^\s*)|(\s*$)/gi, '');
  s = s.replace(/[ ]{2,}/gi, '');
  return s.split(' ').length;
}
