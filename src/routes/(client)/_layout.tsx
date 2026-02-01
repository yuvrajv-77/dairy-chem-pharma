// src/routes/(client)/_layout.tsx
import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import { ProductsProvider } from '@/contexts/ProductsContext'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import Footer from '@/components/Footer';
import { BlogsProvider } from '@/contexts/BlogsContext';
import { Toaster } from '@/components/ui/sonner';
import FloatingButtons from '@/components/FloatingButtons';
import { Analytics } from "@vercel/analytics/react";

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
          propertyId={"69709603f57417197c197e95"}
          widgetId={"1jffsk01f"}
        />
        <FloatingButtons/>
        <Toaster />
        <Analytics />
      </BlogsProvider>
    </ProductsProvider>
  )
}
