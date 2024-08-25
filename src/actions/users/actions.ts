'use server';
import { createClient } from "@/lib/supabase/server"

interface User {
    username: string;
    avatarUrl?: string;
}

export async function createUser({ username, avatarUrl }: User) {
    const supabase = createClient();
    const { data: supabaseData, error: supabaseError } = await supabase
    .from("users")
    .insert({
      username,
      avatar_url: null,
    })
    .select("id")
    .single();

  if (supabaseError) {
    console.error("Error creating user in Supabase:", supabaseError.message);
    let result = {
        message: "Error creating user in Supabase: " + supabaseError.message,
        status: 500,
    }
    return JSON.stringify(result)
  }
  else {
    return supabaseData;
  }
}