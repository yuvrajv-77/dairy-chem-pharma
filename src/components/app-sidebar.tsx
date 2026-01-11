import { Book, Calendar, ExternalLink, Form, Home, Inbox, Search, Settings, ShoppingBag } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, Navigate, redirect } from "@tanstack/react-router"
import { toast } from "sonner";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Inbox,
  },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: Book,
    },
    {
      title: "Contact Forms",
      url: "/admin/blogs",
      icon: Form,
    },
]
const handleLogoutClick = async () => {
  try {
    await signOut(auth);
   redirect({ to: '/admin/login' })
    toast.success('Logged out successfully');
  } catch (error) {
    toast.error('Failed to logout. Please try again.');
  }
};

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-22 border flex justify-center p-1">
            <img className="w-20"
              src="/logo.jpeg"
              alt=""
            />
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu >
              
                <SidebarMenuItem >
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link to={"/"}>
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem >
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link to={"/admin/products"}>
                      <ShoppingBag />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem >
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link to={"/admin/blogs"}>
                      <Book />
                      <span>Blogs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem >
                  <SidebarMenuButton asChild size={"lg"}>
                    <a href="https://formspree.io/forms/xkoowznp/submissions" target="_blank" rel="noopener noreferrer">
                      <Form />
                      <span className="flex gap-2 items-center">Contact Forms <ExternalLink size={16}/></span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
           
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button color="destructive" onClick={handleLogoutClick}>
          LogOut
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}