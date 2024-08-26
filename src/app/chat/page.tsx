"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkOnboardingStatus } from "@/actions/onboarding/actions";
import { getUserChatsWithNames } from "@/actions/chat/actions";
import Onboarding from "@/components/chat/Onboarding";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import Loader from "@/app/loading";
import { ChatProvider } from "@/context/chatContext"; // Don't use useChat here yet.
import { Session } from "next-auth";


export default function ChatPage() {
  const { data: session, status } = useSession();
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [chats, setChats] = useState<any[]>([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const revalidateChat = async () => {
    if (session?.user?.supabaseId) {
      try {
        setLoadingChats(true);
        const chatData = await getUserChatsWithNames(session.user.supabaseId);

        const normalizedChats = Array.isArray(chatData)
          ? chatData
          : Object.values(chatData);

        setChats(normalizedChats || []);
      } catch (err) {
        setError("Failed to load chats.");
      } finally {
        setLoadingChats(false);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const checkStatus = async () => {
        const { isOnboarded } = await checkOnboardingStatus(session?.user?.supabaseId as string);
        setIsOnboarding(!isOnboarded);
        if (isOnboarded) {
          revalidateChat();
        } else {
          setLoadingChats(false);
        }
      };

      checkStatus();
    }
  }, [session?.user?.supabaseId, status]);

  if (loadingChats) {
    return <Loader />;
  }

  if (isOnboarding) {
    return <Onboarding supabaseId={session?.user?.supabaseId as string} />;
  }

  return (
    <ChatProvider>
      <div className="flex h-screen mb-8">
        <ChatSidebar
          chats={chats}
          isLoadingChats={loadingChats}
          groups={[]}
          revalidateChat={revalidateChat}
        />
        <ChatWindow session={session as Session} />
      </div>
    </ChatProvider>
  );
}
