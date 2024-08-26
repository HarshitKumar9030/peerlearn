'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleOnboarding, checkUsernameAvailability } from '@/actions/onboarding/actions';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/components/ui/use-toast';

// List of slurs or banned words for basic filtering
const bannedWords = ["badword1", "badword2", "slur1", "slur2"]; 

export default function Onboarding({ supabaseId }: { supabaseId: string }) {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>();
  const [checkingUsername, setCheckingUsername] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const isValidUsername = (username: string) => {
    const trimmedUsername = username.trim();
    const containsSpaces = /\s/.test(trimmedUsername);
    const hasInvalidChars = /[^a-zA-Z0-9_]/.test(trimmedUsername); // Restrict to alphanumeric and underscores
    const isTooShort = trimmedUsername.length < 3;
    const isTooLong = trimmedUsername.length > 20;
    const containsBannedWords = bannedWords.some((word) => trimmedUsername.toLowerCase().includes(word));

    if (containsSpaces || hasInvalidChars || isTooShort || isTooLong || containsBannedWords) {
      return false;
    }
    return true;
  };

  function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const checkUsername = debounce(async (username: string, supabaseId: string) => {
    if (!username) return;
    setCheckingUsername(true);
    const isAvailable = await checkUsernameAvailability(username, supabaseId);
    setUsernameAvailable(isAvailable);
    setCheckingUsername(false);
  }, 500); // 500ms debounce delay

  useEffect(() => {
    if (isValidUsername(username)) {
      checkUsername(username, supabaseId);
    } else {
      setUsernameAvailable(false);
    }
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !isValidUsername(username)) {
      toast({
        title: 'Invalid Username',
        description: 'Please choose a valid username between 3 to 20 characters with no spaces or special characters.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (!usernameAvailable) {
      toast({
        title: 'Username unavailable',
        description: 'The username you selected is already taken. Please choose another.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      await handleOnboarding(supabaseId, username, avatarUrl);
      router.push('/chat'); // Redirect to chat page after successful onboarding
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong during onboarding. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-grid-white/5 bg-grid-black/5 bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-2xl md:text-4xl font-extrabold font-poppins mb-2 text-neutral-900 dark:text-neutral-100">
        Complete Your Profile
      </h1>
      <h4 className="md:text-lg text-sm text-neutral-700 dark:text-neutral-400 mb-4 text-center max-w-md">
        Choose your username and an avatar to use Peerlearn Chat.
      </h4>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-md">
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`mt-1 p-2 w-full outline-none rounded-lg border ${
              username ? (usernameAvailable ? 'border-green-500' : 'border-red-500') : 'border-neutral-300 dark:border-neutral-700'
            }  dark:bg-neutral-900 dark:text-neutral-100`}
            required
          />
          {!usernameAvailable && !checkingUsername && (
            <p className="text-red-500 text-xs mt-1">Username is already taken or invalid.</p>
          )}
          {usernameAvailable && username && !checkingUsername && (
            <p className="text-green-500 text-xs mt-1">Username is available!</p>
          )}
          {checkingUsername && <p className="text-blue-500 text-xs mt-1">Checking availability...</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="avatarUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-1 p-2 w-full outline-none rounded-lg border-neutral-300 placeholder:text-sm placeholder:flex placeholder:items-center border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            placeholder="https://example.com/avatar.png"
          />
        </div>
        <div className="flex justify-center mb-4">
          {avatarUrl && (
            <Avatar className="flex items-center justify-center">
              <AvatarImage src={avatarUrl as string} className="w-20 h-20 rounded-full" />
            </Avatar>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600  text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-200 ease-in-out disabled:opacity-50"
          disabled={loading || !usernameAvailable}
        >
          {loading ? 'Loading...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  );
}
