import { createFileRoute, Navigate, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/config/firebaseConfig'
import { toast } from 'sonner'
export const Route = createFileRoute('/admin/_admin')({
  beforeLoad: async () => {
    const user = auth.currentUser;
    if (!user) {
      throw redirect({
        to: '/admin/login'
      })
    }
  },
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
            <h1 className='flex items-center justify-center'>Logged in as : <p className='font-bold text-primary'>{auth.currentUser?.email}</p></h1>
          </div>
        </div>
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  )
}
