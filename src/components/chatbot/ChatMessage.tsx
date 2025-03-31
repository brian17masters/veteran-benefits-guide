
import React from "react";

export type MessageType = {
  text: string;
  isUser: boolean;
  id: string;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[80%] py-2 px-4 rounded-lg ${
          message.isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
