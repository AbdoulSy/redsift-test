// @ts-nocheck
/* eslint no-console: 0 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from "moment";


const Message = ({message}) => {
  console.log("MSG", {message});
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
      { allValid ? <div className="validation-cta" onClick={(e) => toggleDisplayValidation(!shouldDisplayValidation)}>✅&nbsp;</div> : ""
}
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

//TODO: Move into its own file once proto is done
const Messages = ({messages}) => {
  const sortMessages = (a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    
    return bDate - aDate;
  }
  const sortedMessages = messages.sort(sortMessages);

  return <ul className="message-list">
    { sortedMessages.map((m, key) => <Message message={m} key={key} />) }
  </ul>
};



class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;

    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        <Messages messages={messages} />
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.arrayOf({
    key: PropTypes.string.isRequired,
    m: PropTypes.shape({
      subject: PropTypes.string.isRequired
    })
  })
};

export default translate(['app'], { wait: true })(App);
