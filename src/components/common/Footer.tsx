"use client";

import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="dark:bg-grid-white/5 bg-grid-black/5  w-full h-full bg-neutral-100 dark:bg-neutral-900">
      <footer className="bg-gray-200  rounded-t-[70px] dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Branding */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                PeerLearn
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                Empower your learning journey with collaborative study sessions
                and stress-free learning.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex justify-between col-span-2 gap-8 sm:gap-16 lg:gap-24">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Follow Us
                </h4>
                <div className="flex space-x-6">
                  <Link
                    href="https://github.com"
                    className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                  >
                    <IconBrandGithub size={28} />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                  >
                    <IconBrandTwitter size={28} />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    className="hover:text-purple-600 dark:hover:text-purple-500 transition-colors"
                  >
                    <IconBrandLinkedin size={28} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Divider and Copyright Notice */}
          <div className="mt-12 border-t border-neutral-300 dark:border-neutral-800 pt-6 text-center text-sm text-neutral-600 dark:text-neutral-500">
            <p>© {new Date().getFullYear()} PeerLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
