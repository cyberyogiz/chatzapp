import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import { Message, Chat, Theme } from './types';
import { getSelectedModel, createNewChat, saveChat, getChats, clearAllChats } from './utils/chatStorage';
import { getTheme, saveTheme } from './utils/themeStorage';
import { sendChatRequest } from './services/openai';
import { getModelById } from './utils/modelOptions';
import clsx from 'clsx';

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteChats, setFavoriteChats] = useState<Set<string>>(new Set());
  const [chats, setChats] = useState<Chat[]>([]);
  const [theme, setTheme] = useState<Theme>('cyberpunk');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const storedModel = getSelectedModel();
    setSelectedModel(storedModel);
    
    const loadedChats = getChats();
    setChats(loadedChats);
    
    if (loadedChats.length > 0) {
      setCurrentChat(loadedChats[0]);
    } else {
      const newChat = createNewChat();
      setCurrentChat(newChat);
      setChats([newChat]);
    }
    
    const storedFavorites = localStorage.getItem('chatsapp-favorites');
    if (storedFavorites) {
      setFavoriteChats(new Set(JSON.parse(storedFavorites)));
    }

    const storedTheme = getTheme();
    setTheme(storedTheme);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const handleClearAllChats = () => {
    clearAllChats();
    setChats([]);
    const newChat = createNewChat();
    setCurrentChat(newChat);
    setChats([newChat]);
    setFavoriteChats(new Set());
    localStorage.removeItem('chatsapp-favorites');
  };
  
  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };
  
  const handleSendMessage = async (content: string, image?: string) => {
    if (!currentChat) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      ...(image && { image }),
      timestamp: Date.now()
    };
    
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      updatedAt: Date.now()
    };
    
    setCurrentChat(updatedChat);
    saveChat(updatedChat);
    setChats(prev => prev.map(chat => 
      chat.id === updatedChat.id ? updatedChat : chat
    ));
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendChatRequest(selectedModel, updatedChat.messages);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
        updatedAt: Date.now()
      };
      
      setCurrentChat(finalChat);
      saveChat(finalChat);
      setChats(prev => prev.map(chat => 
        chat.id === finalChat.id ? finalChat : chat
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error getting AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewChat = () => {
    const newChat = createNewChat();
    setCurrentChat(newChat);
    setChats(prev => [newChat, ...prev]);
    setError(null);
  };
  
  const handleClearChat = () => {
    if (!currentChat) return;
    
    const clearedChat = {
      ...currentChat,
      messages: [],
      updatedAt: Date.now()
    };
    
    setCurrentChat(clearedChat);
    saveChat(clearedChat);
    setChats(prev => prev.map(chat => 
      chat.id === clearedChat.id ? clearedChat : chat
    ));
    setError(null);
  };
  
  const handleToggleFavorite = (chatId: string) => {
    setFavoriteChats(prev => {
      const next = new Set(prev);
      if (next.has(chatId)) {
        next.delete(chatId);
      } else {
        next.add(chatId);
      }
      localStorage.setItem('chatsapp-favorites', JSON.stringify([...next]));
      return next;
    });
  };
  
  return (
    <div className={clsx(
      "min-h-screen text-text-body flex",
      theme === 'cyberpunk' ? 'bg-primary' : 'bg-super-dark'
    )}>
      {theme === 'cyberpunk' && (
        <>
          <div className="noise-overlay" />
          <div className="scanline" />
        </>
      )}
      
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        onSelectChat={setCurrentChat}
        onToggleFavorite={handleToggleFavorite}
        favoriteChats={favoriteChats}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      {isSettingsOpen ? (
        <div className="flex-1">
          <Settings
            theme={theme}
            onThemeChange={handleThemeChange}
            onClearAllChats={handleClearAllChats}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-screen">
          <ChatHeader
            selectedModel={selectedModel}
            onSelectModel={handleModelSelect}
            onNewChat={handleNewChat}
            onClearChat={handleClearChat}
          />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            {error && (
              <div className="bg-[#3A1F1F] text-accent-primary px-4 py-2 text-sm">
                Error: {error}
              </div>
            )}
            
            <ChatContainer
              messages={currentChat?.messages || []}
              isLoading={isLoading}
            />
            
            <div className="p-4 glass-panel">
              <ChatInput
                onSendMessage={handleSendMessage}
                selectedModel={selectedModel}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;