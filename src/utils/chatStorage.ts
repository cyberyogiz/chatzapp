import { Chat, Message } from '../types';

const STORAGE_KEY = 'chatsapp-chats';
const API_KEY_STORAGE = 'chatsapp-api-key';
const SELECTED_MODEL_STORAGE = 'chatsapp-selected-model';
const MAX_CHATS = 10;

export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE, apiKey);
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE);
};

export const saveSelectedModel = (modelId: string): void => {
  localStorage.setItem(SELECTED_MODEL_STORAGE, modelId);
};

export const getSelectedModel = (): string => {
  return localStorage.getItem(SELECTED_MODEL_STORAGE) || 'gpt-4o';
};

export const saveChat = (chat: Chat): void => {
  const chats = getChats();
  const existingIndex = chats.findIndex(c => c.id === chat.id);
  
  if (existingIndex !== -1) {
    chats[existingIndex] = chat;
  } else {
    chats.unshift(chat);
    while (chats.length > MAX_CHATS) {
      chats.pop();
    }
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

export const getChats = (): Chat[] => {
  const chatsJson = localStorage.getItem(STORAGE_KEY);
  if (!chatsJson) return [];
  try {
    return JSON.parse(chatsJson);
  } catch (error) {
    console.error('Failed to parse chats from localStorage', error);
    return [];
  }
};

export const getChat = (id: string): Chat | undefined => {
  const chats = getChats();
  return chats.find(chat => chat.id === id);
};

export const deleteChat = (id: string): void => {
  const chats = getChats();
  const filteredChats = chats.filter(chat => chat.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredChats));
};

export const createNewChat = (): Chat => {
  const newChat: Chat = {
    id: crypto.randomUUID(),
    title: 'New Chat',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  saveChat(newChat);
  return newChat;
};

export const clearAllChats = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
};