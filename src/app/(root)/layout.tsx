import { BottomNav } from '@/components/layout/bottom-nav'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNav } from '@/components/layout/top-nav'
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw redirect("/login")
  }

  return (
    <>
      <div className="flex min-h-dvh bg-white text-gray-700 dark:bg-dark-800 dark:text-white">
        <Sidebar />
        <div className="content-area flex-1 md:ml-64 mr-0">
          <TopNav user={session.user} />
          {children}
        </div>
        <BottomNav />
      </div>
    </>
  )
}

export default RootLayout