import React, { useState, useRef, ChangeEvent } from 'react';
import { Send, Image } from 'lucide-react';
import { ModelOption } from '../types';
import { getModelById } from '../utils/modelOptions';

interface ChatInputProps {
  onSendMessage: (content: string, image?: string) => void;
  selectedModel: string;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, selectedModel, isLoading }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const selectedModelDetails = getModelById(selectedModel);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && !image) return;
    
    onSendMessage(message, image || undefined);
    setMessage('');
    setImage(null);
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if model supports vision
    if (selectedModelDetails && !selectedModelDetails.supportsVision) {
      alert(`The selected model (${selectedModelDetails.name}) doesn't support image inputs. Please switch to a vision-capable model like GPT-4o.`);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size exceeds 5MB limit');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-gray-800 rounded-lg p-4">
      {image && (
        <div className="relative mb-2 max-w-[150px]">
          <img src={image} alt="Upload preview" className="rounded-md w-full object-contain" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-gray-300 hover:bg-gray-600"
          >
            ×
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleImageClick}
          className="p-2 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
          title="Upload image"
        >
          <Image className="w-5 h-5" />
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={(!message.trim() && !image) || isLoading}
          className={`p-2 rounded-full ${
            (!message.trim() && !image) || isLoading 
              ? 'bg-gray-700 text-gray-500' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;