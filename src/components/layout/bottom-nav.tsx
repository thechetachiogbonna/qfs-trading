"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, CreditCard, ArrowLeftRight, Bot, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/card", icon: CreditCard, label: "Cards" },
  { href: "/swap", icon: ArrowLeftRight, label: "Swap" },
  { href: "/bots", icon: Bot, label: "Bots" },
  { href: "/settings", icon: User, label: "Me" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                isActive && "text-gray-900 dark:text-white"
              )}
            >
              <Icon className="text-xl" />
              <span className="text-xs mt-1">{item.label}</span>
              {item.label === "Me" && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center hidden">
                  0
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
