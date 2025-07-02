"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavbarSidebar from "./NavbarSidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

const navbarItems = [
  {href: "/", children: "Home"},
  {href: "/about", children: "About"},
  {href: "/features", children: "Features"},
  {href: "/pricing", children: "Pricing"},
  {href: "/contact", children: "Contact"},
];

const NavbarItem = (props: NavbarItemProps) => {
  return (
    <Button 
      asChild
      variant={"outline"} 
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        props.isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}>
      <Link href={props.href}>
        {props.children}
      </Link>
    </Button>
  )
}

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 border-b justify-between font-medium bg-white text-black flex items-center">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>FunRoad</span>
      </Link>

      <NavbarSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} items={navbarItems} />

      <div className="items-center gap-4 hidden md:flex">
        {navbarItems.map((item) => (
          <NavbarItem 
            key={item.href} 
            href={item.href} 
            isActive={pathname === item.href}>
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex self-stretch">
           <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link href="/admin">
            Dashboard
          </Link>
        </Button>
        </div>
      ) : (
        <div className="hidden lg:flex self-stretch">
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
        >
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link href="/sign-up">
            Start selling
          </Link>
        </Button>
      </div>
      )}
     
      
      <div className="flex md:hidden">
        <Button
          size={"lg"}
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon />
        </Button>
      </div>

    </nav>
  )
}

export default Navbar