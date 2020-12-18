// @ts-nocheck
import React, {useState} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { translate } from 'react-i18next';

const MessageComponent = ({message, t}) => {
    const { from, subject, date, validationResult, body } = message;
    const [shouldExpandMessage, toggleExpandMessage] = useState(false);
    const [shouldDisplayValidation, toggleDisplayValidation] = useState(false);
    const maybeExpandMessage = `message ${shouldExpandMessage ? ' expanded': ''}`;
    const messageClassNames = `${maybeExpandMessage}${shouldDisplayValidation ? ' display-validation': ''}`;
    const {validDKIM, validDMARC, validSPF} = validationResult;
    const allValid = validDKIM && validDMARC && validSPF;
    
    return <li className={messageClassNames}>
      <div className="message-summary">
        <div className="sender" onClick={() => toggleExpandMessage(!shouldExpandMessage)}>
          <a href="#" title={from.email}>{from.name}</a>
        </div>
        <div onClick={() => toggleDisplayValidation(!shouldDisplayValidation)}>
            { allValid ?
                <div className="validation-cta">
                        ✅&nbsp;
                </div> 
                : <div className="validation-cta">
                        ❌&nbsp;
                </div> 
            }
        </div>
        <div className="subject" onClick={() => toggleExpandMessage(!shouldExpandMessage)}>
          {subject}
        </div>
        <div>
          {moment(date).fromNow()}
        </div>
      </div>
      <div className="message-validation-display">
        <p>
            {validDKIM ? t('common:valid-dkim')  : t('error:invalid-dkim')}
        </p>
        <p>
            {validSPF ? t('common:valid-spf')  : t('error:invalid-spf')}
        </p>
        <p>
            {validDMARC ? t('common:valid-dmarc')  : t('error:invalid-dmarc')}
        </p>
      </div>
      <div className="message-peek">
          <p>{body.substring(0, 200)}</p>
      </div>
    </li>
};

export const Message = translate(['common', 'error'], { wait: true })(MessageComponent);

MessageComponent.propTypes = {
    t: PropTypes.func.isRequired,
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
        }).isRequired,
        body: PropTypes.string.isRequired
    })
}
  