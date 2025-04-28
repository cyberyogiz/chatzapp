import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] items-end`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
          {isUser ? (
            <div className="bg-accent-primary rounded-full p-1.5">
              <User className="w-4 h-4 text-black" />
            </div>
          ) : (
            <div className="bg-accent-secondary rounded-full p-1.5">
              <Bot className="w-4 h-4 text-black" />
            </div>
          )}
        </div>
        
        <div className={`
          rounded-2xl py-2 px-4 font-inter
          ${isUser 
            ? 'bg-bubble-user border-l-2 border-accent-primary rounded-br-none' 
            : 'bg-bubble-ai border-r-2 border-accent-secondary rounded-bl-none'}
        `}>
          {message.image && (
            <div className="mb-2 max-w-[150px] group">
              <img 
                src={message.image} 
                alt="Uploaded content" 
                className="rounded-md w-full object-contain transition-shadow duration-200
                         group-hover:shadow-[0_0_6px_var(--accent-secondary)]" 
              />
            </div>
          )}
          
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
          
          <div className={`text-xs mt-1 ${isUser ? 'text-accent-primary/70' : 'text-accent-secondary/70'} text-right`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;