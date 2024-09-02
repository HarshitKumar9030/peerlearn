"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReactionPicker } from "./ReactionPicker";
import { Modal } from "./Modal";
import { Session } from "next-auth";

export type MessageItemProps = {
  message: any;
  onReply: (message: any) => void;
  onReact: (messageId: string, emoji: string) => void;
  onUnsend: (messageId: string) => void;
  session: Session;
};

export function MessageItem({ message, onReply, onReact, onUnsend, session }: MessageItemProps) {
  const [showReactions, setShowReactions] = useState(false);
  const [isUnsendModalOpen, setIsUnsendModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Parse reactions as the stringified JSON object
  const reactions = message.reactions ? JSON.parse(message.reactions) : {};
  const isSender = message.userId === session.user.supabaseId;

  // Bubble Styles
  const bubbleStyles = isSender
    ? "bg-purple-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
    : "bg-neutral-300 dark:bg-neutral-600 text-black dark:text-white rounded-tl-lg rounded-tr-lg rounded-br-lg";

  // Animation Variants
  const variants = {
    hidden: { opacity: 0, x: isSender ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  // Format timestamp
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2 group relative`}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-xs lg:max-w-sm relative">
        <div className={`relative p-3 ${bubbleStyles} shadow-md`}>
          <p className="text-sm">{message.content}</p>
          
          {message.imageUrl && (
            <div className="mt-2">
              {/* Button to Show Image */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="px-2 py-1 mt-2 text-sm text-white rounded-xl bg-neutral-700  transition-colors"
              >
                View Image -&gt; 
              </button>
            </div>
          )}

          {/* Reactions Display */}
          {Object.keys(reactions).length > 0 && (
            <motion.div
              className="flex px-2 py-1 bg-neutral-500 rounded-lg space-x-2 mt-2 shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Object.entries(reactions).map(([emoji, users]: any) => (
                <span key={emoji} className="text-xl flex items-center">
                  {emoji} {users.length > 1 && <span className="text-sm text-neutral-300">({users.length})</span>}
                </span>
              ))}
            </motion.div>
          )}

          {/* Timestamp */}
          <p
            className={`text-xs mt-1 ${
              isSender ? "text-purple-200" : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {formattedTime}
          </p>

          {/* Hover Actions */}
          <div className="absolute z-[60] -top-[8px] right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
              aria-label="React to message"
            >
              😍
            </button>
            <button
              onClick={() => onReply(message)}
              className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              aria-label="Reply to message"
            >
              ↩️
            </button>
            <button
              onClick={() => setIsUnsendModalOpen(true)}
              className="hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              aria-label="Unsend message"
            >
              ❌
            </button>
          </div>
        </div>
      </div>

      {showReactions && (
        <motion.div
          className={`absolute ${isSender ? "right-16" : "left-16"} top-0 z-10`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ReactionPicker
            onSelect={(emoji: string) => {
              onReact(message.id, emoji);
              setShowReactions(false);
            }}
          />
        </motion.div>
      )}

      {isImageModalOpen && (
        <Modal title="View Image" onClose={() => setIsImageModalOpen(false)}>
          <img
            src={message.imageUrl}
            alt="Attached"
            className="rounded-lg max-w-full h-auto"
          />
        </Modal>
      )}

      {isUnsendModalOpen && (
        <Modal
          title="Confirm Unsend"
          description="Are you sure you want to unsend this message? This action cannot be undone."
          onClose={() => setIsUnsendModalOpen(false)}
          onConfirm={() => {
            onUnsend(message.id);
            setIsUnsendModalOpen(false);
          }}
        />
      )}
    </motion.div>
  );
}
