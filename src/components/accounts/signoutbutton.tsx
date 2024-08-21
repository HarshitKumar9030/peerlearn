'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 w-full px-4 py-2 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <LogOut className="w-4 h-4 mr-2 text-gray-800 dark:text-gray-200" />
      Sign Out
    </button>
  );
}
