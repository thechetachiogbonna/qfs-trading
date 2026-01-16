import { BottomNav } from '@/components/layout/bottom-nav'
import { LayoutClient } from '@/components/layout/layout-client'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNav } from '@/components/layout/top-nav'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutClient>
        <Sidebar />
        <div className="content-area flex-1 md:ml-64 mr-0">
          <TopNav />
          {children}
        </div>
      </LayoutClient>
      <BottomNav />
    </>
  )
}

export default RootLayout