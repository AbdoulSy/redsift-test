/**
 * React Dmarc Sift. DAG's 'Count' node implementation
 */
'use strict';

// Entry point for DAG node
/**
 * 
 * @param {object} got
 * @param {object} got.in
 * @param {Array<{value:string, key:string}>} got.in.data
 */
module.exports = function (got) {
  const inData = got.in;
  const {data} = inData;
  const messages = data.map(({ key, value }) => {
    try {
      return { key, value: JSON.parse(value) };
    }
    catch (err) {
      console.error('email-sift-web: count.js: something went wrong with input:', e);
      return null;
    }
  }).filter(({value}) => {
    const {validationResult} = value;
    const {errors} = validationResult;
    if(!errors.action ||
       errors.action === "NONE") {
      return true;
    }
    return false;
  });
  const spam = messages.filter(({value}) => {
    const {validationResult} = value;
    const {errors} = validationResult;
    if(errors.action && errors.action === "QUARANTINE") {
      return true;
    }
    return false;
  });
  const rejected = messages.filter(({value}) => {
    const {validationResult} = value;
    const {errors} = validationResult;
    if(errors.action && errors.action === "REJECT") {
      return true;
    }
    return false;
  });

  const spamCount = spam.length;
  const rejectedCount = rejected.length;

  console.log('email-sift-web: count.js: running...');
  const totalWordCount = messages
    .map(({ value: { wordCount } }) => wordCount)
    .reduce((p, c) => p + c, 0);

  return [
    { name: 'counts', key: 'SPAM', value: spamCount},
    { name: 'counts', key: 'MESSAGES', value: messages.length },
    { name: 'counts', key: 'WORDS', value: totalWordCount },
    { name: 'counts', key: 'REJECTED', value: rejectedCount }
  ];
};
