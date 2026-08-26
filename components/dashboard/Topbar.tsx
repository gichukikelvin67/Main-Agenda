
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

export default function Topbar() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to read user:", error);
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  const userName = user?.name || "Business Owner";
  const userEmail = user?.email || "Admin";
  const userRole = user?.role || "Admin";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">

        {/* Mobile menu */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden max-w-md flex-1 lg:flex">
          <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search transactions, customers..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Notifications */}
          <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User */}
          <div className="relative">

            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50"
            >

              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>

              {/* User information */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {userName}
                </p>

                <p className="text-xs text-slate-400">
                  {userRole}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-slate-400 sm:block"
              />

            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">

                <div className="border-b border-slate-100 px-3 py-3">

                  <p className="font-semibold text-slate-900">
                    {userName}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {userEmail}
                  </p>

                  <p className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {userRole}
                  </p>

                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-slate-100 px-6 py-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none"
          />

        </div>
      </div>
    </header>
  );
}

