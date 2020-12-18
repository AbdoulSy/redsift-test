/**
 * 
 * @param {string} headerString 
 * @param {string} regexp
 */
function findStringInHeader (headerString, regexp) {
    if(!headerString) return false;
    const passRegexp = regexp;
    const matches = headerString.match(passRegexp);

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

    return isEasilyPassing || 
        findStringInHeader(headerString, bestGuessPass) || 
        validatesBothSPFAndDKIM;
}
  
/**
 * 
 * @param {string} headerString 
 */
function findPolicyInHeader(headerString) {
    if(!headerString) return;
    const policyExpressionRegexp =/\(p\=([a-z]+).sp\=([a-z]+).dis\=([a-z]+)\)/i;
    const foundPolicy = headerString.match(policyExpressionRegexp);

    return foundPolicy;
}
  
/**
 * 
 * @param {string} authResultHeaders 
 * @param {boolean} isDMARCValid 
 * @param {Array<string>} policy
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

module.exports = {
    validateSPFHeader,
    validateDKIMHeader,
    validateDMARCHeader,
    findPolicyInHeader,
    handleErrors
};