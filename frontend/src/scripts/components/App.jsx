// @ts-nocheck

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import {NavigableInbox} from "./NavigableInbox/mod";
import {SummaryChart} from "./SummaryChart/mod";

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data} = this.props;
    const {messageTotal, spamTotal, rejectedTotal} = data.counts;
    const Comp = SummaryChart({
      initData: [{
        label: `messages (${messageTotal})`,
        value: messageTotal
      }, {
        label: `spam (${spamTotal})`,
        value: spamTotal
      }, {
        label: `rejected (${rejectedTotal})`,
        value: rejectedTotal
      }]
    });

    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <Comp />
        <NavigableInbox {...data} t={t} />
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
