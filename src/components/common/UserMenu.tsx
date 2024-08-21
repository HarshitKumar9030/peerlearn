import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import Link from "next/link";
  import { Session } from "next-auth";
  import { User, Clipboard, LogOut, UserCircle } from "lucide-react";
  import dynamic from "next/dynamic";
  
  const SignOutButton = dynamic(() => import("../accounts/signoutbutton"), {
    ssr: false,
  });
  
  export function UserMenu({ session }: { session: Session | undefined }) {
    if (!session) {
      return (
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <UserCircle className="w-5 h-5" />
          Login
        </Link>
      );
    }
  
    return (
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              {session.user?.name?.split(" ")[0] || "User"}
              <UserCircle className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-52 mr-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
            <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-500 dark:text-neutral-400">
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-neutral-200 dark:border-neutral-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href="/study-sessions"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <Clipboard className="w-4 h-4" />
                  Study Sessions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/groups"
                  className="flex items-center rounded-lg gap-2 px-4 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <User className="w-4 h-4" />
                  My Groups
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1 border-neutral-200 dark:border-neutral-800" />
            <DropdownMenuItem asChild>
              <SignOutButton />

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  