import React from 'react';

const Message = (props) => (
    <div className="message">
    <span className="message-username">{props.message.username}</span>
    <span className="message-content">{props.message.content}</span>
    </div>
)

const Notification = (props) => (
    <div className="message system">
        {props.message.oldUser.name} changed their name to {props.message.currentUser.name}.
    </div>
)

const MessageList = (props) => (
    <div>
    {props.messages.map(message =>{
    switch(message.type){
        case('postNotification'):
        return(<Notification key={message.id}  message={message}/>)
        case('postMessage'):
        return (<Message key={message.id} message={message}/>)
        }
    } 
    )}
    </div>
)

export default MessageList;
