"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

export async function getChats(userId: string) {
  const supabase = createClient(userId);

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
  const supabase = createClient(userId);

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ chat_id: chatId, user_id: userId, message })
    .select();

  if (error) {
    throw new Error("Failed to send message: " + error.message);
  }

  return data;
}

export async function fetchUsers(query: string, supabaseId: string) {
  try {
    const supabase = createClient(supabaseId);

    const { data, error } = await supabase
      .from("users")
      .select("id, username, avatar_url")
      .ilike("username", `%${query}%`);

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function createChat(User: any, supabaseId: string) {
  if (User.id === supabaseId) {
    return "Don't you have any friends?!";
  }

  const supabase = createClient(supabaseId);

  try {
    // Check if a chat already exists where either:
    // - sender is supabaseId and receiver is User.id
    // - receiver is supabaseId and sender is User.id
    const { data: existingChat, error: fetchError } = await supabase
      .from("chats")
      .select("*")
      .or(
        `and(sender_id.eq.${supabaseId},receiver_id.eq.${User.id}),and(sender_id.eq.${User.id},receiver_id.eq.${supabaseId})`
      )
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    // If the chat already exists, return its ID
    if (existingChat) {
      return existingChat.id;
    }

    // If no existing chat was found, create a new one
    const { data: newChat, error: insertError } = await supabase
      .from("chats")
      .insert([
        {
          sender_id: supabaseId,
          receiver_id: User.id,
        },
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return newChat.id;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

export async function getUserChats(supabaseId: string) {
  if (!supabaseId) {
    throw new Error("Supabase ID is required to fetch chats.");
  }

  const supabase = createClient(supabaseId);

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .or(`sender_id.eq.${supabaseId},receiver_id.eq.${supabaseId}`);

  if (error) {
    console.error("Error fetching chats:", error);
    throw new Error("Failed to fetch chats.");
  }

  return data && console.log(data);
}

export async function getUserChatsWithNames(supabaseId: string) {
  const supabase = createClient(supabaseId);

  const { data: chats, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .or(`sender_id.eq.${supabaseId},receiver_id.eq.${supabaseId}`);

  if (chatError) {
    console.error("Error fetching chats:", chatError);
    throw new Error("Failed to fetch chats.");
  }

  if (chats.length === 0) {
    return [];
  }

  const userIds = Array.from(
    new Set(chats.flatMap((chat) => [chat.sender_id, chat.receiver_id]))
  );

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, username, avatar_url")
    .in("id", userIds);

  if (userError) {
    console.error("Error fetching users:", userError);
    throw new Error("Failed to fetch user data.");
  }

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = { username: user.username, avatar_url: user.avatar_url };
    return acc;
  }, {} as Record<string, { username: string; avatar_url: string | null }>);

  const chatsWithNames = chats.map((chat) => ({
    ...chat,
    sender_username: userMap[chat.sender_id as string]?.username,
    sender_avatar_url: userMap[chat.sender_id as string]?.avatar_url,
    receiver_username: userMap[chat.receiver_id as string]?.username,
    receiver_avatar_url: userMap[chat.receiver_id as string]?.avatar_url,
  }));

  return chatsWithNames;
}

export async function getUserInfo(supabaseId: string) {
  const supabase = createClient(supabaseId);

  const { data, error } = await supabase
    .from("users")
    .select("avatar_url, username")
    .eq("id", supabaseId)
    .single();

  if (error) {
    console.error("Error fetching user info:", error);
    return null;
  }

  return data;
}

export async function getChat(supabaseId: string, chatId: string) {
  const supabase = createClient(supabaseId);
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (error) {
    console.error("Error fetching chat:", error);
    return null;
  }

  return data;
}
