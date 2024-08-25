"use client";

import React from "react";
import { useState } from "react";

export function ChatWindow({
  activeChat,
  messages,
}: {
  activeChat: any;
  messages: any[];
}) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    setNewMessage("");
  };

  return (
    <div className="flex-1 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">{activeChat?.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-scroll">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="text-sm text-gray-400">{message.username}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700"
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
