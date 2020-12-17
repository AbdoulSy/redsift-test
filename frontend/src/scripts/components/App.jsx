// @ts-nocheck
/* eslint no-console: 0 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from "moment";


const Message = ({message}) => {
  console.log("MSG", {message});
  const { from, subject, date } = message;
  const [shouldExpandMessage, toggleExpandMessage] = useState(false);
  const [shouldDisplayValidation, toggleDisplayValidation] = useState(false);
  const maybeExpandMessage = `message ${shouldExpandMessage ? ' expanded': ''}`;
  const messageClassNames = `${maybeExpandMessage}${shouldDisplayValidation ? ' display-validation': ''}`;

  return <li className={messageClassNames}>
    <div className="message-summary">
      <div>
        <input type="checkbox"></input>
      </div>
      <div className="sender" onClick={(e) => toggleExpandMessage(!shouldExpandMessage)}>
        <a href="#" title={from.email}>{from.name}</a>
      </div>
      <div className="validation-cta" onClick={(e) => toggleDisplayValidation(!shouldDisplayValidation)}>✅</div>
      <div className="subject" onClick={(e) => toggleExpandMessage(!shouldExpandMessage)}>
        {subject}
      </div>
      <div>
        {moment(date).fromNow()}
      </div>
    </div>
    <div className="message-validation-display">
      YEAH
    </div>
    <div className="message-peek">
      {message.body}
    </div>
  </li>
};

//TODO: Move into its own file once proto is done
const Messages = ({messages}) => {
  return <ul className="message-list">
    { messages.map((m, key) => <Message message={m} key={key} />) }
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
