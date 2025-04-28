import React, { useState } from 'react';
import { Moon, Sun, Trash2 } from 'lucide-react';
import Modal from './Modal';
import { Theme } from '../types';

interface SettingsProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClearAllChats: () => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  theme,
  onThemeChange,
  onClearAllChats,
  onClose
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        <div className="space-y-8">
          {/* Theme Selection */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Theme</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onThemeChange('cyberpunk')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  theme === 'cyberpunk'
                    ? 'border-accent-secondary bg-glass shadow-[0_0_10px_rgba(73,250,217,0.3)]'
                    : 'border-gray-800 hover:border-accent-secondary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sun className="w-5 h-5 text-accent-secondary" />
                  <span className="font-medium">Cyberpunk</span>
                </div>
                <p className="text-sm text-gray-400">
                  Neon-accented UI with animated effects and vibrant colors
                </p>
              </button>

              <button
                onClick={() => onThemeChange('super-dark')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  theme === 'super-dark'
                    ? 'border-gray-600 bg-super-dark shadow-lg'
                    : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Super Dark</span>
                </div>
                <p className="text-sm text-gray-400">
                  Clean, minimalistic UI with deep blacks and muted accents
                </p>
              </button>
            </div>
          </section>

          {/* Data Management */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Data Management</h3>
            <div className="bg-[#1A1A1F] rounded-lg p-4 border border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium mb-1">Clear All Chat History</h4>
                  <p className="text-sm text-gray-400">
                    Delete all chat conversations. This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-950 hover:bg-red-900 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            onClearAllChats();
            setIsModalOpen(false);
          }}
          title="Clear All Chats"
        >
          <p className="text-gray-300">
            Are you sure you want to delete all chats? This action cannot be undone.
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;