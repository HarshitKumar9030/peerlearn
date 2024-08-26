"use client";

import { useState, useEffect } from "react";
import { debounce } from "@/lib/utils";
import { fetchUsers } from "@/actions/chat/actions";
import { Loader2, Search, X } from "lucide-react";
import { User } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface SearchBarProps {
  onSelectUser: (user: User) => void;
  revalidateChat: () => void;
}

interface User2 extends Omit<User, "createdAt" | "updatedAt"> {
  avatar_url?: string | null;
}

export function SearchBar({ onSelectUser, revalidateChat }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User2[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {

    const supabaseId = session?.user?.supabaseId;

    if (query.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const handleSearch = debounce(async () => {
      setLoading(true);
      try {
        const users = await fetchUsers(query, supabaseId as string);
        setResults(users);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    handleSearch();

    return () => handleSearch.cancel(); // Cleanup debounce on unmount
  }, [query, session]);

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setQuery(""); // Clear the input after selection
    setShowResults(false); // Hide results after selection
    setIsSearchOpen(false); // Close the search bar

    revalidateChat(); // revalidating the chats
  };

  return (
    <>
      {!isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center border dark:border-neutral-700 border-neutral-300 space-x-2 p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 backdrop-blur-md backdrop-saturate-150"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <Search size={20} className="text-neutral-500 dark:text-neutral-400" />
          <span className="text-sm font-medium">Search for users...</span>
        </button>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between p-4 border-b dark:border-neutral-800">
            <input
              type="text"
              placeholder="Search for users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Search for users"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300 transition"
            >
              <X size={24} />
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader2 className="animate-spin text-purple-500" size={32} />
            </div>
          )}

          {showResults && (
            <ul className="mt-4 p-4 space-y-4 overflow-y-auto">
              {results.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer"
                  onClick={() => handleSelectUser(user as User)}
                >
                  {user.avatar_url ? (
                    <Link href={`/profile/${user.username}`}>
                      <Image
                        src={user.avatar_url}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Link>
                  ) : (
                    <div className="w-10 h-10 bg-neutral-300 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-neutral-900 dark:text-neutral-300 font-medium">
                    {user.username}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!loading && showResults && results.length === 0 && (
            <div className="flex justify-center items-center mt-4 text-neutral-500 dark:text-neutral-400">
              No users found
            </div>
          )}
        </div>
      )}
    </>
  );
}
