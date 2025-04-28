import { Message } from '../types';

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | OpenAIContent[];
}

interface OpenAIContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

const formatMessagesForAPI = (messages: Message[]): OpenAIMessage[] => {
  return messages.map(msg => {
    if (!msg.image) {
      return {
        role: msg.role,
        content: msg.content
      };
    } else {
      // Format for vision models
      const content: OpenAIContent[] = [];
      
      if (msg.content) {
        content.push({
          type: 'text',
          text: msg.content
        });
      }
      
      content.push({
        type: 'image_url',
        image_url: {
          url: msg.image
        }
      });
      
      return {
        role: msg.role,
        content
      };
    }
  });
};

export const sendChatRequest = async (
  modelId: string,
  messages: Message[]
): Promise<string> => {
  try {
    const formattedMessages = formatMessagesForAPI(messages);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages: formattedMessages,
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }
    
    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content || 'No response received';
  } catch (error) {
    console.error('Error sending request to OpenAI:', error);
    throw error;
  }
};