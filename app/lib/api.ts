export interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface CreateChatRequest {
  name: string;
  isPrivate?: boolean;
}

export interface CreateMessageRequest {
  content: string;
  model?: string;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const API_BASE = process.env.API_BASE || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || `API request failed with status ${response.status}`
    );
  }
  return response.json();
}

export const api = {
  chats: {
    list: async (): Promise<Chat[]> => {
      const response = await fetch(`${API_BASE}/chats`);
      return handleResponse(response);
    },

    create: async (data: CreateChatRequest): Promise<Chat> => {
      const response = await fetch(`${API_BASE}/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    get: async (chatId: string): Promise<Chat> => {
      const response = await fetch(`${API_BASE}/chats/${chatId}`);
      return handleResponse(response);
    },

    messages: {
      list: async (chatId: string): Promise<Message[]> => {
        const response = await fetch(`${API_BASE}/chats/${chatId}/messages`);
        return handleResponse(response);
      },

      create: async (chatId: string, data: CreateMessageRequest): Promise<ReadableStream> => {
        const response = await fetch(`${API_BASE}/chats/${chatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new ApiError(
            response.status,
            error.message || `Failed to send message: ${response.status}`
          );
        }

        return response.body!;
      },
    },
  },
};

// Example usage:
/*
// List all chats
const chats = await api.chats.list();

// Create a new chat
const newChat = await api.chats.create({ 
  name: "New Chat",
  isPrivate: false 
});

// Get a specific chat
const chat = await api.chats.get("chat-id");

// List messages in a chat
const messages = await api.chats.messages.list("chat-id");

// Send a message and handle the stream
const messageStream = await api.chats.messages.create("chat-id", {
  content: "Hello!",
  model: "llama3.3"
});

const reader = messageStream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  // Process the streamed response
  const text = new TextDecoder().decode(value);
  const message = JSON.parse(text);
  console.log("Received message:", message);
}
*/
