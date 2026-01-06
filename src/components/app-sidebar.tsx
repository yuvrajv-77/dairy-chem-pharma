import { Book, Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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

  //   {
  //     title: "Blogs",
  //     url: "/admin/blogs",
  //     icon: Book,
  //   },
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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