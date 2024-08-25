"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export function GroupCreationModal() {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("public");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    // Submit the new group data to the backend
    // After successful submission, redirect to the chat
    router.push("/chat");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700"
        ></textarea>
        <select
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="anonymous">Anonymous</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg"
        >
          Create Group
        </button>
      </div>
    </div>
  );
}
