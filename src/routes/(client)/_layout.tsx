// src/routes/(client)/_layout.tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { ProductsProvider } from '@/contexts/ProductsContext'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import Footer from '@/components/Footer';
import { BlogsProvider } from '@/contexts/BlogsContext';
import { Toaster } from '@/components/ui/sonner';



export const Route = createFileRoute('/(client)/_layout')({
  component: Layout,
})

function Layout() {
  console.log("gotreats.in");
  
  return (
    <ProductsProvider>
      <BlogsProvider>
        <Navbar />
        <Outlet />
        <Footer />
        <TawkMessengerReact
          propertyId={import.meta.env.VITE_TAWK_PROPERTY_ID}
          widgetId={import.meta.env.VITE_TAWK_WIDGET_ID}
        />
        <Toaster />
      </BlogsProvider>
    </ProductsProvider>
  )
}
