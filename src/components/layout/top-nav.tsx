"use client";

import { Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from '@/lib/auth'

export function TopNav({ user }: { user: User }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const send = pathname.startsWith("/send");
  const receive = pathname.startsWith("/receive");
  const buy = pathname.startsWith("/buy");
  const title = (send || receive || buy) ? "Home" : pathname.split('/').pop() || "Dashboard";

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Settings className="text-gray-600 dark:text-gray-400 text-xl mr-4" />
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center space-x-4">
        {user.role === "admin"
          ? (
            <Link 
              href="/admin"
              className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center"
            >
              {user.name.split("")[0]}
            </Link>
          ): (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center">
              {user.name.split("")[0]}
            </div>
          )
        }

        <div className="flex items-center space-x-2">
          <Sun className="text-sm w-4 h-4" />
          <button
            onClick={toggleTheme}
            className="w-10 h-6 flex items-center bg-gray-300 dark:bg-blue-600 rounded-full p-1 duration-300 ease-in-out cursor-pointer"
          >
            <div
              className={cn(
                "bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out",
                theme === "dark" && "translate-x-4"
              )}
            />
          </button>
          <Moon className="text-sm w-4 h-4" />
        </div>
      </div>
    </nav>
  );
}
