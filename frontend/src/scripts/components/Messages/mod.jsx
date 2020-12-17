// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";

import {Message} from "../Message/mod";

/**
 * 
 * @param {{date: Date}} a 
 * @param {{date: Date}} b
 * @returns {number}
 */
const sortMessages = (a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    
    return bDate - aDate;
}

/**
 * 
 * @param {{messages: Array<object>}} props 
 */
export const Messages = ({messages}) => {
    const sortedMessages = messages.sort(sortMessages);

    return <ul className="message-list">
      { sortedMessages.map((m, key) => <Message message={m} key={key} />) }
    </ul>
};

Messages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired
}