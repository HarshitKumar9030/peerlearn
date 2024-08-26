"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, Shield, X, Menu, Loader2 } from "lucide-react";
import { useChat } from "@/context/chatContext";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/chat/SearchBar";
import { createChat } from "@/actions/chat/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  chats: any;
  groups: any;
  isLoadingChats: boolean;
  revalidateChat: () => void;
}

export function ChatSidebar({ chats, groups, isLoadingChats, revalidateChat }: SidebarProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { switchChat, activeChat } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<"chats" | "groups" | "anonymous">("chats");

  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  

  const getChatName = (chat: any) => {
    if (session?.user?.supabaseId === chat.sender_id) {
      return chat.receiver_username || "Unknown User";
    } else {
      return chat.sender_username || "Unknown User";
    }
  };

  const getChatAvatar = (chat: any) => {
    if (session?.user?.supabaseId === chat.sender_id) {
      return chat.receiver_avatar_url || "/default-avatar.png"; 
    } else {
      return chat.sender_avatar_url || "/default-avatar.png";
    }
  };

  const handleSectionChange = (section: "chats" | "groups" | "anonymous") => {
    setActiveSection(section);
  };

  const handleChatCreation = async (user: User) => {
    if (status !== "authenticated" || !session?.user?.supabaseId) {
      console.error("User is not authenticated or Supabase ID is missing.");
      return;
    }

    try {
      setIsLoading(true);
      const chatId = await createChat(user, session.user.supabaseId);

      if (chatId === "Don't you have any friends?!") {
        toast({
          title: "Don't you have any friends?",
          variant: "default",
          description: "🫂 You can message me @leoncyriac or @harshit.",
          className: "border-none text-neutral-700 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700",
        });
      } else {
        // Switch to the newly created chat
        switchChat(chatId);
      }

    } catch (error) {
      console.error("Error creating chat:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to create chat. Please try again.",
        className: "border-none text-neutral-700 dark:text-neutral-300 bg-red-600 dark:bg-red-700",
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 w-[16rem] lg:w-[20rem] bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300 shadow-lg z-[70] overflow-hidden"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800">
              <h2 className="text-lg font-semibold">Chat & Groups</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="my-2 p-3">
              <SearchBar revalidateChat={revalidateChat} onSelectUser={handleChatCreation} />
            </div>

            {/* Section Tabs */}
            <div className="flex justify-around mt-4">
              <button
                className={cn(
                  "flex flex-col items-center space-y-1 text-xs transition-all",
                  activeSection === "chats"
                    ? "text-purple-600 dark:text-purple-500"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
                onClick={() => handleSectionChange("chats")}
              >
                <MessageCircle size={20} />
                <span>Chats</span>
              </button>
              <button
                className={cn(
                  "flex flex-col items-center space-y-1 text-xs transition-all",
                  activeSection === "groups"
                    ? "text-purple-600 dark:text-purple-500"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
                onClick={() => handleSectionChange("groups")}
              >
                <Users size={20} />
                <span>Groups</span>
              </button>
              <button
                className={cn(
                  "flex flex-col items-center space-y-1 text-xs transition-all",
                  activeSection === "anonymous"
                    ? "text-purple-600 dark:text-purple-500"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
                onClick={() => handleSectionChange("anonymous")}
              >
                <Shield size={20} />
                <span>Anonymous</span>
              </button>
            </div>

            {/* Loading State */}
            {isLoadingChats ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-purple-600" size={32} />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeSection === "chats" && (
                  <motion.div
                    key="chats"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-4 space-y-2"
                  >
                    <ul className="space-y-2">
                      {chats.map((chat: any) => (
                        <li
                          key={chat.id}
                          className={cn(
                            "p-2 rounded-lg cursor-pointer text-sm transition-all",
                            activeChat === chat.id
                              ? "bg-purple-100 dark:bg-neutral-800 text-purple-600 dark:text-purple-400"
                              : "hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-400"
                          )}
                          onClick={() => switchChat(chat.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={getChatAvatar(chat)} alt={getChatName(chat)} />
                              <AvatarFallback>{getChatName(chat).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{getChatName(chat)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeSection === "groups" && (
                  <motion.div
                    key="groups"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-4 space-y-2"
                  >
                    <ul className="space-y-2">
                      {groups.map((group) => (
                        <li
                          key={group.id}
                          className={cn(
                            "p-2 rounded-lg cursor-pointer text-sm transition-all",
                            activeGroup === group.id
                              ? "bg-purple-100 dark:bg-neutral-800 text-purple-600 dark:text-purple-400"
                              : "hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-400"
                          )}
                          onClick={() => switchGroup(group.id)}
                        >
                          {group.name} ({group.type})
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeSection === "anonymous" && (
                  <motion.div
                    key="anonymous"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-4 space-y-2"
                  >
                    <ul className="space-y-2">
                      <li className="hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg cursor-pointer text-neutral-700 dark:text-neutral-400">
                        Anonymous Chat 1
                      </li>
                      <li className="hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg cursor-pointer text-neutral-700 dark:text-neutral-400">
                        Anonymous Chat 2
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Create Group Button */}
            <div className="p-4">
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg text-sm transition-all"
                onClick={() => router.push("/chat/create-group")}
              >
                Create Group
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Sidebar Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 left-4 lg:left-6 p-3 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg transition-all text-white z-50"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}
