import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { saveApiKey } from '../utils/chatStorage';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 rounded-lg bg-gray-800 shadow-md">
      <div className="flex items-center justify-center mb-6">
        <Key className="w-8 h-8 text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">ChatsApp API Key</h2>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">
        Enter your OpenAI API key to start chatting with AI models
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          disabled={!apiKey.trim()}
        >
          Connect
        </button>
      </form>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Your API key is stored locally and never sent to our servers.</p>
      </div>
    </div>
  );
};

export default ApiKeyInput;