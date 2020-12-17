/**
 * React Dmarc Sift. DAG's 'Parse' node implementation
*/
'use strict';

/**
 * 
 * @param {string} headerString 
 * @param {string} regexp
 */
function isHeaderPassing (headerString, regexp) {
  console.log("validateHeader", regexp);
  if(!headerString) return false;
  const passRegexp = regexp;
  const matches = headerString.match(passRegexp);

  console.log("matches", matches);

  return !!matches;
}

/**
 * 
 * @param {string} headerString 
 */
function validateSPFHeader(headerString) {
  const regexp = 'spf=pass';

  return isHeaderPassing(headerString, regexp);
}

/**
 * 
 * @param {string} headerString 
 */
function validateDKIMHeader(headerString) {
  const regexp = 'dkim=pass';

  return isHeaderPassing(headerString, regexp);
}

/**
 * 
 * @param {string} headerString 
 */
function validateDMARCHeader(headerString) {
  const regexp = 'dmarc=pass';

  return isHeaderPassing(headerString, regexp);
}

/**
 * 
 * @param {{
 *  "Authentication-Results": string
 * }} headers 
 */
function validateHeaders (headers) {
  console.log("==================DATA VALIDATION===========");
  console.log({headers: headers['Authentication-Results']});
  /** @type string */
  const authResultHeaders = headers['Authentication-Results'];
  return {
    validSPF: validateSPFHeader(authResultHeaders),
    validDKIM: validateDKIMHeader(authResultHeaders),
    validDMARC: validateDMARCHeader(authResultHeaders)
  }
}

// Javascript nodes are run in a Node.js sandbox so you can require dependencies following the node paradigm
// e.g. var moment = require('moment');

// Entry point for DAG node
module.exports = function (got) {
  // inData contains the key/value pairs that match the given query
  const inData = got.in;

  console.log('email-sift-web: parse.js: running...');

  const results = inData.data.map(({ value: valueBuffer }) => {
    // Parse the JMAP information for each message more info here: https://docs.redsift.com/docs/server-code-jmap
    const emailJmap = JSON.parse(valueBuffer);
    const { id, threadId, subject, textBody, strippedHtmlBody, headers, from, date } = emailJmap;

    console.log("==================DATA ARRIVED===========");

    // Not all emails contain a textBody so we do a cascade selection
    const body = textBody || strippedHtmlBody || '';
    const wordCount = countWords(body);
    const validationResult = validateHeaders(headers);
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
