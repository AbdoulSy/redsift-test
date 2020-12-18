// @ts-nocheck
import React, {useState} from "react";
import PropTypes from "prop-types";
import { translate } from 'react-i18next';

import {Messages} from "../Messages/mod";

export const NavigableInboxComponent = ({counts, messages, spam, t}) => {
    const _inbox = "inbox";
    const _spam = "spam";
    const [navigationState, setNavLocation] = useState(_inbox);
  
    return  <div className="main" role="main">
    <aside>
        <nav>
            <ul>
                <li onClick={() => setNavLocation(_inbox)}>{t('app:inbox')} ({counts.messageTotal})</li>
                <li onClick={() => setNavLocation(_spam)}>{t('app:spam')} ({counts.spamTotal})</li>
            </ul>
        </nav>
    </aside>
    <section>
        {navigationState === _inbox ? <Messages messages={messages} /> : ""}
        {navigationState === _spam ? spam.map(() => "") : ""}
    </section>
    </div>
};

export const NavigableInbox = translate(['app'], { wait: true })(NavigableInboxComponent);

NavigableInboxComponent.propTypes = {
    t: PropTypes.func.isRequired,
    counts: PropTypes.shape({
        messageTotal: PropTypes.number.isRequired,
        spamTotal: PropTypes.string.isRequired
    }),
    messages: PropTypes.object.isRequired,
    spam: PropTypes.object.isRequired
};
