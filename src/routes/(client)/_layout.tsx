// src/routes/(client)/_layout.tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { ProductsProvider } from '@/contexts/ProductsContext'



export const Route = createFileRoute('/(client)/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <ProductsProvider>
      <Navbar />
      <Outlet />
    </ProductsProvider>
  )
}
