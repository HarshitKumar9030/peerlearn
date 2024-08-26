"use client";

import { motion } from "framer-motion";

export function ReactionPicker({ onSelect }: any) {
  const emojis = ["😊", "😂", "❤️", "👍", "😢"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-neutral-800 dark:bg-neutral-700 p-2 rounded-lg shadow-lg flex space-x-2"
    >
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-xl m-1 hover:scale-110 transform transition"
        >
          {emoji}
        </button>
      ))}
    </motion.div>
  );
}