'use server';
import { createClient } from "@/lib/supabase/server"

interface User {
    username: string;
    avatarUrl?: string;
    supabaseId: string;
}

export async function createUser({ username, avatarUrl, supabaseId }: User) {
    const supabase = createClient(supabaseId);
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