// src/routes/(client)/_layout.tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { ProductsProvider } from '@/contexts/ProductsContext'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


export const Route = createFileRoute('/(client)/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <ProductsProvider>
      <Navbar />
      <Outlet />
       <TawkMessengerReact
        propertyId= {import.meta.env.VITE_TAWK_PROPERTY_ID}
        widgetId= {import.meta.env.VITE_TAWK_WIDGET_ID}
      />
    </ProductsProvider>
  )
}
