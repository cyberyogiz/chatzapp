import { ModelOption } from '../types';

export const modelOptions: ModelOption[] = [
  // ──────────────── Premium Models (250K tokens/day) ────────────────
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Vision)',
    description: 'Most capable multimodal model',
    contextWindow: '250K tokens',
    supportsVision: true,
    group: 'premium'
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: 'High-performance 250K-token model',
    contextWindow: '250K tokens',
    supportsVision: false,
    group: 'premium'
  },
  {
    id: 'gpt-4.5-preview',
    name: 'GPT-4.5 Preview',
    description: 'Preview build of the next GPT-4 generation',
    contextWindow: '250K tokens',
    supportsVision: false,
    group: 'premium'
  },
  {
    id: 'o1',
    name: 'O1',
    description: 'OpenAI 1.0 – premium quality',
    contextWindow: '250K tokens',
    supportsVision: false,
    group: 'premium'
  },
  {
    id: 'o3',
    name: 'O3',
    description: 'OpenAI 3.0 – robust and reliable',
    contextWindow: '250K tokens',
    supportsVision: false,
    group: 'premium'
  },

  // ───────────────── Standard Models (2.5M tokens/day) ─────────────────
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    description: 'Lightweight GPT-4.1, 2.5M-token context',
    contextWindow: '2.5M tokens',
    supportsVision: false,
    group: 'standard'
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    description: 'Ultra-light GPT-4.1, 2.5M-token context',
    contextWindow: '2.5M tokens',
    supportsVision: false,
    group: 'standard'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini (Vision)',
    description: 'Multimodal GPT-4o in mini form',
    contextWindow: '2.5M tokens',
    supportsVision: true,
    group: 'standard'
  },
  {
    id: 'o1-mini',
    name: 'O1 Mini',
    description: 'Mini version of OpenAI 1.0',
    contextWindow: '2.5M tokens',
    supportsVision: false,
    group: 'standard'
  },
  {
    id: 'o3-mini',
    name: 'O3 Mini',
    description: 'Mini version of OpenAI 3.0',
    contextWindow: '2.5M tokens',
    supportsVision: false,
    group: 'standard'
  },
  {
    id: 'o4-mini',
    name: 'O4 Mini',
    description: 'Mini version of OpenAI 4.0',
    contextWindow: '2.5M tokens',
    supportsVision: false,
    group: 'standard'
  }
];

export const getModelById = (id: string): ModelOption | undefined => {
  return modelOptions.find(m => m.id === id);
};