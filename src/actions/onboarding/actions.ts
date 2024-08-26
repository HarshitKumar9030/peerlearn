"use server";
import User from "@/models/User";
import { createClient } from "@/lib/supabase/server";
import { connectDB } from "@/lib/mongodb"
import { cookies } from 'next/headers';


export async function handleOnboarding(
  supabaseId: string, // Supabase ID is passed as the userId
  username: string,
  avatarUrl: string
) {
  connectDB();
  const updatedUser = await User.findOneAndUpdate(
    { supabaseId }, // Search by Supabase ID
    { username },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new Error("Failed to update MongoDB user profile.");
  }

  const supabase = createClient(supabaseId);
  const { data, error } = await supabase.from("users").upsert({
    id: updatedUser.supabaseId, // Pass the correct Supabase ID
    username,
    avatar_url: avatarUrl,
  });

  if (error) {
    throw new Error("Failed to update Supabase user profile: " + error.message);
  }

  return { success: true };
}

export async function checkOnboardingStatus(supabaseId: string) {
  try {
    const cookieStore = cookies();
    const onboardingCookie = cookieStore.get('onboarding_complete');

    // If the cookie exists, return that onboarding is done
    if (onboardingCookie?.value === 'true') {
      return { isOnboarded: true };
    }
    // else check with supabase
    const supabase = createClient(supabaseId);
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("id", supabaseId)
      .single();

    if (error) throw new Error(error.message);

    // If the user has a username, they are onboarded
    const isOnboarded = !!data?.username;

    // Set the cookie if the user is onboarded
    if (isOnboarded) {
      cookieStore.set('onboarding_complete', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, 
      });
    }

    return { isOnboarded };
  } catch (error) {
    console.error("Failed to fetch onboarding status:", error);
    return { isOnboarded: false };
  }
}

export async function checkUsernameAvailability(username: string, supabaseId: string) {
  const supabase = createClient(supabaseId);
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") {
    // Handle any error except the "not found" error (code "PGRST116")
    console.error("Error checking username availability:", error.message);
    return false;
  }

  return !data;
}
