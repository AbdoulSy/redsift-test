// @ts-nocheck
import React, {useState} from "react";
import PropTypes from "prop-types";

import {Messages} from "../Messages/mod";

export const NavigableInbox = ({counts, messages, spam}) => {
    const [navigationState, setNavLocation] = useState("inbox");
  
    return  <div className="main" role="main">
    <aside>
        <nav>
        <ul>
        <li onClick={() => setNavLocation("inbox")}>inbox ({counts.messageTotal})</li>
        <li onClick={() => setNavLocation("spam")}>spam</li>
        </ul>
        </nav>
    </aside>
    <section>
        {navigationState === "inbox" ? <Messages messages={messages} /> : ""}
        {navigationState === "spam" ? spam.map(() => "") : ""}
    </section>
    </div>
};

NavigableInbox.propTypes = {
    counts: PropTypes.shape({
        messageTotal: PropTypes.number.isRequired
    }),
    messages: PropTypes.object.isRequired,
    spam: PropTypes.object.isRequired
};
