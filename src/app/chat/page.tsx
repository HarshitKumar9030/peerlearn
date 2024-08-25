'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkOnboardingStatus } from "@/actions/onboarding/actions";
import Onboarding from "@/components/chat/Onboarding";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import Loader  from "@/app/loading";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (status === "loading") return; 

      if (session?.user) { 
        const { isOnboarded } = await checkOnboardingStatus(session.user.supabaseId as string);
        setIsOnboarding(!isOnboarded);
      }

      setLoading(false); 
    };

    checkStatus();
  }, [session, status]);

  if (loading) {
    return <Loader />; 
  }

  if (isOnboarding) {
    return <Onboarding supabaseId={session?.user?.supabaseId as string} />;
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar chats={[]} groups={[]} />
      <ChatWindow activeChat={undefined} messages={[]} />
    </div>
  );
}
