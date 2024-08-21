'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '../ui/theme-switcher';
import { LogIn, Menu, X, Loader } from 'lucide-react';
import clsx from 'clsx';
import { UserMenu } from '@/components/common/UserMenu'; 
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Using status to track session loading state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Groups', href: '/groups' },
    { name: 'Chat', href: '/chat' },
    { name: 'Study', href: '/study' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="text-lg font-semibold tracking-tight">
        <Link href="/">
          <span className="hover:opacity-80 text-purple-700 dark:text-purple-400">PeerLearn</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium ${
              pathname === link.href
                ? 'text-purple-700 dark:text-purple-400'
                : 'text-gray-800 dark:text-gray-200'
            } hover:text-purple-700 dark:hover:text-purple-400 transition-colors`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="md:hidden flex items-center space-x-4">
        {status === 'loading' ? (
          <Loader className="w-5 h-5 text-purple-600 animate-spin" />
        ) : session ? (
          <UserMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-1" />
            Login
          </Link>
        )}
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <ModeToggle />
        {status === 'loading' ? (
          <Loader className="w-5 h-5 text-purple-600 animate-spin" />
        ) : session ? (
          <UserMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </Link>
        )}
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={clsx(
          'fixed inset-0 z-40 flex flex-col items-center justify-start p-6 space-y-8 bg-neutral-100 dark:bg-neutral-900 transition-transform',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="self-end mb-4 text-gray-800 dark:text-gray-200"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>

        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-lg font-medium ${
              pathname === link.href
                ? 'text-purple-700 dark:text-purple-400'
                : 'text-gray-800 dark:text-gray-200'
            } hover:text-purple-700 dark:hover:text-purple-400 transition-colors`}
            onClick={toggleMenu}
          >
            {link.name}
          </Link>
        ))}

        <ModeToggle />
        {status === 'loading' ? (
          <Loader className="w-5 h-5 text-purple-600 animate-spin mt-4" />
        ) : session ? (
          <UserMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="flex items-center px-4 py-2 mt-4 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            onClick={toggleMenu}
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
