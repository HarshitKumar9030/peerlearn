"use client";

import { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import { MessageItem } from "./MessageItem";
import { BadgeInfo, User, ShieldAlert, Ban, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/context/chatContext";
import { IMessage } from "@/types/types";
import { Session } from "next-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getChat, getUserInfo } from "@/actions/chat/actions";

export type ChatWindowProps = {
  session: Session;
};

export function ChatWindow({ session }: ChatWindowProps) {
  const { messages, activeChat, loading }: any = useChat();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [receiverInfo, setReceiverInfo] = useState<any>(null); // Store the receiver's info
  const supabaseId = session.user.supabaseId; // Get the current user's supabaseId

  useEffect(() => {
    const fetchReceiverInfo = async () => {
      try {
        // Fetch the chat details
        const chat = await getChat(supabaseId, activeChat);

        if (chat) {
          // Extract the receiver's userId
          const receiverId =
            chat.sender_id === supabaseId ? chat.receiver_id : chat.sender_id;

          // Fetch the receiver's user information
          const userInfo = await getUserInfo(receiverId as string);
          setReceiverInfo(userInfo);
        }
      } catch (error) {
        console.error("Error fetching receiver information:", error);
      }
    };

    if (activeChat) {
      fetchReceiverInfo();
    }
  }, [activeChat, supabaseId]);

  return (
    <div className="flex h-screen items-center p-2 justify-center w-full bg-transparent">
      <div className="flex flex-col flex-grow h-full w-full bg-gray-100 dark:bg-neutral-800 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
          {/* Display receiver's avatar and username */}
          <div className="flex items-center space-x-3">
            {receiverInfo && (
              <Avatar>
                <AvatarImage
                  src={receiverInfo.avatar_url}
                  alt="Receiver Avatar"
                />
                <AvatarFallback className="bg-neutral-300 dark:bg-neutral-700 rounded-full">
                  {receiverInfo.username?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            )}
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
              {receiverInfo?.username || "Chat"}
            </h2>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition"
          >
            <BadgeInfo size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4 p-4 border-t dark:border-neutral-700">
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            messages.map((msg: IMessage) => (
              <MessageItem
                session={session}
                key={msg.id}
                message={msg}
                onReply={(message: string) => setReplyingTo(message)}
                onReact={() => {}}
                onUnsend={() => {}}
              />
            ))
          )}
        </div>

        <div className="p-4 border-t dark:border-neutral-700">
          <MessageInput
            onSendMessage={(message) => {}}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black bg-opacity-50 p-4 z-50 flex items-center justify-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-neutral-800 dark:text-white">
                  User Controls
                </h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-lg transition">
                  <User size={20} />
                  <span className="text-neutral-800 dark:text-white">
                    View Profile
                  </span>
                </li>
                <li className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-lg transition">
                  <ShieldAlert size={20} />
                  <span className="text-neutral-800 dark:text-white">
                    Report User
                  </span>
                </li>
                <li className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-lg transition">
                  <Ban size={20} />
                  <span className="text-neutral-800 dark:text-white">
                    Block User
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
