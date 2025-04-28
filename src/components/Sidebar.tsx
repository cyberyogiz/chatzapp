import React from 'react';
import { Star, Settings, MessageSquare, Star as StarFilled } from 'lucide-react';
import clsx from 'clsx';
import { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  currentChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onToggleFavorite: (chatId: string) => void;
  favoriteChats: Set<string>;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChat,
  onSelectChat,
  onToggleFavorite,
  favoriteChats,
  onOpenSettings
}) => {
  return (
    <aside className="w-80 h-screen glass-panel">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">ChatsApp</h2>
        
        <nav className="space-y-1">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 px-4 mb-2">All Chats</h3>
            {chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={clsx(
                  'sidebar-item w-full text-left',
                  chat.id === currentChat?.id && 'active'
                )}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="flex-1 truncate">{chat.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(chat.id);
                  }}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {favoriteChats.has(chat.id) ? (
                    <StarFilled className="w-4 h-4 text-accent-secondary" />
                  ) : (
                    <Star className="w-4 h-4" />
                  )}
                </button>
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 px-4 mb-2">Favorites</h3>
            {chats
              .filter(chat => favoriteChats.has(chat.id))
              .map(chat => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className={clsx(
                    'sidebar-item w-full text-left',
                    chat.id === currentChat?.id && 'active'
                  )}
                >
                  <StarFilled className="w-4 h-4 text-accent-secondary" />
                  <span className="flex-1 truncate">{chat.title}</span>
                </button>
              ))}
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={onOpenSettings}
              className="sidebar-item w-full text-left"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;