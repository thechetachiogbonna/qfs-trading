import Link from "next/link";
import SidebarMenuSection from "../sidebar-menu-section";
import NotificationSidebarContent from "../notification-sidebar-content";

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-200 dark:bg-dark-700 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-bold text-gray-700 dark:text-gray-200">
          Qfs Trading
        </Link>
      </div>

      <div className="px-6 py-4">
        {/* Menu Section */}
        <SidebarMenuSection />

        {/* Crypto Section */}
        <NotificationSidebarContent />
      </div>
    </aside>
  );
}
