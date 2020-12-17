/**
 * React Dmarc Sift. DAG's 'Parse' node implementation
*/
'use strict';

/**
 * 
 * @param {string} headerString 
 * @param {string} regexp
 */
function findStringInHeader (headerString, regexp) {
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

  return findStringInHeader(headerString, regexp);
}

/**
 * 
 * @param {string} headerString 
 */
function validateDKIMHeader(headerString) {
  const regexp = 'dkim=pass';
  const fail = 'dkim=fail';

  const isDKIMPassing = findStringInHeader(headerString, regexp);
  //RFC 8601  Multi-tiered Authentication - if dkim=fail appears once in the email headers
  //Fail the DKIM validation 
  const isDKIMNotFailing = !findStringInHeader(headerString, fail);

  return isDKIMPassing && isDKIMNotFailing;
}

/**
 * 
 * @param {string} headerString 
 * @param {boolean} validatesSPF
 * @param {boolean} validatesDKIM
 */
function validateDMARCHeader(headerString, validatesSPF, validatesDKIM) {
  const pass = 'dmarc=pass';
  const bestGuessPass = 'dmarc=bestguesspass'
  const isEasilyPassing = findStringInHeader(headerString, pass);
  const validatesBothSPFAndDKIM = validatesSPF && validatesDKIM;

  return isEasilyPassing || findStringInHeader(headerString, bestGuessPass) || validatesBothSPFAndDKIM
}

/**
 * 
 * @param {string} headerString 
 */
function findPolicyInHeader(headerString) {
  if(!headerString) return;
  const policyExpressionRegexp =/\(p\=([a-z]+).sp\=([a-z]+).dis\=([a-z]+)\)/i;
  const foundPolicy = headerString.match(policyExpressionRegexp);

  console.log("==== POLICY:", {foundPolicy});
  return foundPolicy;
}

/**
 * 
 * @param {string} authResultHeaders 
 * @param {boolean} isDMARCValid 
 */
function handleErrors(authResultHeaders, isDMARCValid, policy) {
  if(!isDMARCValid) {
    const spfFail = 'spf=fail';
    //DKIM check is already done above
    const isSPFFailing = findStringInHeader(authResultHeaders, spfFail);
    let action;
    if(policy) {
      const [,p,sp,dis] = policy;
      action = p; //domain policy
    }
    return {
      isSPFFailing,
      action
    }
  }

  return {}
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
  const validatesSPF = validateSPFHeader(authResultHeaders);
  const validatesDKIM = validateDKIMHeader(authResultHeaders);
  const validatesDMARC = validateDMARCHeader(authResultHeaders, validatesSPF, validatesDKIM);
  const policy = findPolicyInHeader(authResultHeaders);
  const errors = handleErrors(authResultHeaders, validatesDMARC, policy);
  return {
    validSPF: validatesSPF,
    validDKIM: validatesDKIM,
    validDMARC: validatesDMARC,
    policy,
    errors
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
    const {errors} = validationResult;
    const key = `${threadId}/${id}`;

    if(errors && errors.action === "REJECT") {
      const rejectedMessage = {
        id,
        threadId,
        subject,
        validationResult
      }

      return [{
        key,
        value: rejectedMessage,
        name: "spam"
      }];
    }

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
