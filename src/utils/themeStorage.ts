import { Theme } from '../types';

const THEME_STORAGE_KEY = 'chatsapp-theme';

export const saveTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const getTheme = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || 'cyberpunk';
};