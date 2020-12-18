const {
    validateSPFHeader,
    validateDKIMHeader,
    validateDMARCHeader,
    findPolicyInHeader,
    handleErrors
} = require("./utils");  

/**
   * 
   * @param {{
   *  "Authentication-Results": string
   * }} headers 
   */
module.exports = function validateHeaders (headers) {
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