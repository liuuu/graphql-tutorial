import React from 'react';
import AddMessageWithMutation from './AddMessage'

const MessageList = ({messages}) => {
    return (
        <div className='messageList'>
        {messages.map(message => (
            <div key={message.id} className={'message '+ (message.id<0?'optimistic':'')}>
                {message.text}
            </div>
        ))}
        <AddMessageWithMutation />

        </div>
    )
}

export default MessageList;