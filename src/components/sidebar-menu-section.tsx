"use client";

import { MENU_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarMenuSection() {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <h2 className="text-yellow-500 text-xl font-semibold mb-4">Menu</h2>
      <nav className="space-y-2">
        {MENU_ITEMS.map((item: (typeof MENU_ITEMS)[number]) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-lg",
                isActive && "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  )
}

export default SidebarMenuSection