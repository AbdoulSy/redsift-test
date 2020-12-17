// @ts-nocheck
/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from "moment";


const Message = ({message, key}) => {
  console.log("MSG", {message});
  return <li className="message">
    <div className="sender">
      {message.from.name}
    </div>
    <div className="subject">
      {message.subject}
    </div>
    <div>
      {moment(message.date).fromNow()}
    </div>
  </li>
}

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
