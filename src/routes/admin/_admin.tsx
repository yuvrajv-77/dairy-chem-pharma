import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
export const Route = createFileRoute('/admin/_admin')({
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className='relative w-full'>
        <div className='absolute inset-0 bg-[url("/logo.jpeg")] bg-center bg-no-repeat bg-fixed opacity-10 -z-10' />
        <div className='border flex items-center justify-between'>
          <SidebarTrigger className='' />
          <div className=' w-full'>
            <h1 className='flex items-center justify-center'>Logged in as : <p className='font-bold text-primary'> admin@dairy.com</p></h1>
          </div>
        </div>
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  )
}
