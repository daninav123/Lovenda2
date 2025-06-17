export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const API_URL = '/api/ai';
const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || '';

export async function sendMessage(messages: AIMessage[]): Promise<AIMessage> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('AI request failed');
  }

  const data = await response.json();
  return data as AIMessage;
}
