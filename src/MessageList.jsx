import React from 'react';

const Message = (props) => (
    <div className="message">
    <span className="message-username">{props.message.username}</span>
    <span className="message-content">{props.message.content}</span>
    </div>
)

const MessageList = (props) => (
    <div>
    {props.messages.map(message => <Message key={message.id} message={message}/>)}
    </div>
)

export default MessageList;
