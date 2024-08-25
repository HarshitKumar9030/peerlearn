'use server';

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

export async function getChats(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("id, sender_id, receiver_id")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  if (error) {
    throw new Error("Failed to fetch chats: " + error.message);
  }

  return data;
}

export async function sendMessage(
  chatId: string,
  userId: string,
  message: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ chat_id: chatId, user_id: userId, message })
    .select();

  if (error) {
    throw new Error("Failed to send message: " + error.message);
  }

  return data;
}
