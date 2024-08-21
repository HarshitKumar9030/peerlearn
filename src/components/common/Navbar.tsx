'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '../ui/theme-switcher';
import { User, LogIn, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Groups', href: '/groups' },
    { name: 'Chat', href: '/chat' },
    { name: 'Study', href: '/study' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!mounted) return null;

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="text-lg font-semibold tracking-tight">
        <Link href="/">
          <span className="hover:opacity-80 text-purple-700 dark:text-purple-400">PeerLearn</span>
        </Link>
      </div>

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

      <div className="md:hidden">
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
        {isAuthenticated ? (
          <Link href="/profile" aria-label="Profile">
            <User className="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 transition-colors" />
          </Link>
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

      <div
        className={clsx(
          'fixed inset-0 z-40 flex flex-col items-center justify-start p-6 space-y-8 bg-neutral-100 dark:bg-neutral-900 transition-transform',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
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
        {isAuthenticated ? (
          <Link href="/profile" aria-label="Profile" onClick={toggleMenu}>
            <User className="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 transition-colors" />
          </Link>
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
