"use client";

import { Menu, Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "Add Product",
  "/admin/orders": "Orders",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data?.full_name) setUserName(data.full_name);
            else if (user.email) setUserName(user.email);
            if (data?.avatar_url) setUserAvatar(data.avatar_url);
          });
      }
    });
  }, []);

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  const title =
    Object.entries(routeTitles).find(([key]) => pathname.startsWith(key))?.[1] ?? "Admin";

  return (
    <header className="flex h-16 items-center gap-4 border-b border-pink-200 bg-black px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="text-white/60 hover:text-white lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-bold text-white min-w-0 truncate">{title}</h1>

      <div className="relative mx-auto hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="search"
          placeholder="Search orders, products..."
          className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button type="button" className="relative text-white/60 hover:text-white" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} />
            <AvatarFallback className="bg-pink-500 text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">{userName || "Loading..."}</p>
            <p className="text-xs text-white/50">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
