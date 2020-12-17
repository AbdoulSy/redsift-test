// @ts-nocheck

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import {NavigableInbox} from "./NavigableInbox/mod";

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data } = this.props;

    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <NavigableInbox {...data} />
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
