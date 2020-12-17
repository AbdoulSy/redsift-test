// @ts-nocheck
import React, {useState} from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const Message = ({message}) => {
    const { from, subject, date, validationResult } = message;
    const [shouldExpandMessage, toggleExpandMessage] = useState(false);
    const [shouldDisplayValidation, toggleDisplayValidation] = useState(false);
    const maybeExpandMessage = `message ${shouldExpandMessage ? ' expanded': ''}`;
    const messageClassNames = `${maybeExpandMessage}${shouldDisplayValidation ? ' display-validation': ''}`;
    const {validDKIM, validDMARC, validSPF} = validationResult;
    const allValid = validDKIM && validDMARC && validSPF;
  
    console
  
    return <li className={messageClassNames}>
      <div className="message-summary">
        <div className="sender" onClick={() => toggleExpandMessage(!shouldExpandMessage)}>
          <a href="#" title={from.email}>{from.name}</a>
        </div>
        { allValid ? <div className="validation-cta" onClick={() => toggleDisplayValidation(!shouldDisplayValidation)}>✅&nbsp;</div> : ""}
        {!allValid ? "❌" : ""}
        <div className="subject" onClick={() => toggleExpandMessage(!shouldExpandMessage)}>
          {subject}
        </div>
        <div>
          {moment(date).fromNow()}
        </div>
      </div>
      <div className="message-validation-display">
      <p>
        {validDKIM ? "✅ valid dkim"  : ""}
      </p>
      <p>
        {validSPF ? "✅ valid spf"  : ""}
      </p>
      <p>
        {validDMARC ? "✅ valid dmarc"  : ""}
      </p>
      </div>
    </li>
};

Message.propTypes = {
    message: PropTypes.shape({
        from: PropTypes.shape({
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        subject: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        validationResult: PropTypes.shape({
            validDKIM: PropTypes.bool.isRequired,
            validDMARC: PropTypes.bool.isRequired,
            validSPF: PropTypes.bool.isRequired
        }).isRequired
    })
}
  