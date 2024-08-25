"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export function ChatSidebar({ chats, groups }: { chats: any[]; groups: any[] }) {
  const [activeChat, setActiveChat] = useState(null);
  const router = useRouter();

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Chats & Groups</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-400">Chats</h3>
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`hover:bg-gray-800 p-2 rounded-lg cursor-pointer ${
                  activeChat === chat.id ? "bg-gray-800" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-400">Groups</h3>
          <ul className="space-y-2">
            {groups.map((group) => (
              <li
                key={group.id}
                className={`hover:bg-gray-800 p-2 rounded-lg cursor-pointer ${
                  activeChat === group.id ? "bg-gray-800" : ""
                }`}
                onClick={() => setActiveChat(group.id)}
              >
                {group.name} ({group.type})
              </li>
            ))}
          </ul>
        </div>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg mt-4"
          onClick={() => router.push("/chat/create-group")}
        >
          Create Group
        </button>
      </div>
    </div>
  );
}
