"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IChat, IGroup, IMessage, IGroupMessage } from "@/types/types";

export type ChatContextType = {
  activeChat: string | null;
  messages: IMessage[] | IGroupMessage[];
  loading: boolean;
  switchChat?: (chatId: string, isGroup?: boolean) => Promise<void>;
};

const defaultChatContext: ChatContextType = {
  activeChat: null,
  messages: [],
  loading: false,
  switchChat: async () => {},
};

export function useChat() {
  return useContext(ChatContext);
}

export const ChatContext = createContext<ChatContextType | null>(
  defaultChatContext
);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[] | IGroupMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const switchChat = async (chatId: string, isGroup: boolean = false) => {
    setLoading(true);
    const fetchedMessages = await fetchMessages(chatId, isGroup);
    setMessages(fetchedMessages);
    setActiveChat(chatId);
    setLoading(false);
  };

  return (
    <ChatContext.Provider value={{ activeChat, messages, loading, switchChat }}>
      {children}
    </ChatContext.Provider>
  );
}

async function fetchMessages(
  chatId: string,
  isGroup: boolean
): Promise<IMessage[] | IGroupMessage[]> {
  if (isGroup) {
    // Fetch group messages from your backend (replace with real data fetching logic)
    return [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "4d1d3138-b8e7-402b-84da-5b3c4a17d7e3",
        content: "Hey, how are you?",
        createdAt: new Date("2024-08-25T14:30:00Z"),
        groupId: "123e4567-e89b-12d3-a456-426614174002",
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174003",
        userId: "5342a088-c956-49d1-b010-00f8782c350a",
        content: "Im good, thanks! How about you?",
        createdAt: new Date("2024-08-25T14:31:00Z"),
        groupId: "123e4567-e89b-12d3-a456-426614174002",
      },
    ];
  } else {
    // Fetch individual chat messages from your backend (replace with real data fetching logic)
    return [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "4d1d3138-b8e7-402b-84da-5b3c4a17d7e3",
        content: "Hey, how are you? lorem23  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repudiandae fugit a inventore? Ab magni vel sequi aperiam earum expedita laudantium animi voluptatibus.",
        createdAt: new Date("2024-08-25T14:30:00Z"),
        chatId: "123e4567-e89b-12d3-a456-426614174002",
        reactions: JSON.stringify({
          "😊": ["user-1-id", "user-2-id"],
          "👍": ["user-3-id"],
        }),
        imageUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174003",
        userId: "5342a088-c956-49d1-b010-00f8782c350a",
        content: "I’m good, thanks! How about you?",
        createdAt: new Date("2024-08-25T14:31:00Z"),
        chatId: "123e4567-e89b-12d3-a456-426614174002",
        reactions: JSON.stringify({
          "❤️": ["user-4-id"],
          "😂": ["user-2-id"],
        }),
        imageUrl:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      },
    ];
  }
}
