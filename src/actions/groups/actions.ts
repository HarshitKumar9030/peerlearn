'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";


export async function getGroups() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.from("groups").select("*");

  if (error) {
    throw new Error("Failed to fetch groups: " + error.message);
  }

  return data;
}

export async function createGroup(name: string, description: string, userId: string, groupType: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("groups")
    .insert({ name, description, created_by: userId, type: groupType})
    .select();

  if (error) {
    throw new Error("Failed to create group: " + error.message);
  }

  return data;
}
