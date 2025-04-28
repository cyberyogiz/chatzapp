import React from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import ModelSelector from './ModelSelector';

interface ChatHeaderProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onNewChat: () => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedModel,
  onSelectModel,
  onNewChat,
  onClearChat
}) => {
  return (
    <header className="bg-gray-900 p-4 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white mr-4">ChatsApp</h1>
        <ModelSelector 
          selectedModel={selectedModel} 
          onSelectModel={onSelectModel} 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Chat</span>
        </button>
        
        <button
          onClick={onClearChat}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;