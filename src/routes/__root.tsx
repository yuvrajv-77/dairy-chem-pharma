import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '../components/Navbar'

export const Route = createRootRoute({
  component:   RootComponent
})

function RootComponent() {
  // const location = useLocation()
  // const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {/* {!isAdmin && <Navbar />} */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}