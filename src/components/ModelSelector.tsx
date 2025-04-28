import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ModelOption } from '../types';
import { modelOptions } from '../utils/modelOptions';
import { saveSelectedModel } from '../utils/chatStorage';

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelectModel }) => {
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    saveSelectedModel(modelId);
    onSelectModel(modelId);
  };

  const getSelectedModelDetails = (): ModelOption | undefined => {
    return modelOptions.find(model => model.id === selectedModel);
  };

  const model = getSelectedModelDetails();

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2 text-sm text-gray-200 cursor-pointer">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${model?.supportsVision ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="bg-transparent appearance-none outline-none cursor-pointer w-full"
          >
            <optgroup label="Premium Models (250K context)">
              {modelOptions
                .filter(m => m.group === 'premium')
                .map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name} {model.supportsVision ? '(Vision)' : ''}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Standard Models">
              {modelOptions
                .filter(m => m.group === 'standard')
                .map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
      
      {model && (
        <div className="mt-1 text-xs text-gray-400 px-2">
          {model.description} • {model.contextWindow}
          {model.supportsVision && ' • Supports images'}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;