"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  CheckCircle,
  AlertTriangle,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getNotifications,
  saveNotifications,
  type Notification as StoredNotification,
} from "@/components/dashboard/notifications";

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
  const [showNotifications, setShowNotifications] = useState(false);

  // ================= SEARCH =================

  const [search, setSearch] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState<
    StoredNotification[]
  >([]);

  // ================= LOAD USER =================

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

  // ================= LOAD NOTIFICATIONS =================

  useEffect(() => {
    function loadNotifications() {
      setNotifications(getNotifications());
    }

    // Load notifications when Topbar opens
    loadNotifications();

    // Listen for new notifications
    window.addEventListener(
      "notificationsUpdated",
      loadNotifications
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        loadNotifications
      );
    };
  }, []);

  // ================= LOGOUT =================

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  // ================= SEARCH =================

  function handleSearch(value: string) {
    setSearch(value);

    if (value.trim() !== "") {
      setShowSearchResult(true);

      setShowNotifications(false);
      setShowProfile(false);
    } else {
      setShowSearchResult(false);
    }
  }

  function clearSearch() {
    setSearch("");
    setShowSearchResult(false);
  }

  // ================= NOTIFICATIONS =================

  function toggleNotifications() {
    setShowNotifications(!showNotifications);

    setShowProfile(false);
    setShowSearchResult(false);
  }

  function markAsRead(id: number) {
    const updatedNotifications = notifications.map(
      (notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

    setNotifications(updatedNotifications);

    saveNotifications(updatedNotifications);
  }

  function markAllAsRead() {
    const updatedNotifications = notifications.map(
      (notification) => ({
        ...notification,
        read: true,
      })
    );

    setNotifications(updatedNotifications);

    saveNotifications(updatedNotifications);
  }

  // ================= PROFILE =================

  function toggleProfile() {
    setShowProfile(!showProfile);

    setShowNotifications(false);
    setShowSearchResult(false);
  }

  // ================= NOTIFICATION ICON =================

  function getNotificationIcon(
    type: StoredNotification["type"]
  ) {
    if (type === "payment") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle size={18} />
        </div>
      );
    }

    if (type === "sale") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <ShoppingCart size={18} />
        </div>
      );
    }

    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <AlertTriangle size={18} />
      </div>
    );
  }

  // ================= USER DATA =================

  const userName = user?.name || "Business Owner";
  const userEmail = user?.email || "Admin";
  const userRole = user?.role || "Admin";

  // ================= UNREAD COUNT =================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // ================= RETURN =================

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">

      {/* ================= TOPBAR ================= */}

      <div className="flex h-20 items-center justify-between px-6 lg:px-8">

        {/* ================= MOBILE MENU ================= */}

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* ================= DESKTOP SEARCH ================= */}

        <div className="relative hidden max-w-md flex-1 lg:flex">

          <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">

            <Search
              size={18}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Search transactions, customers..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* ================= SEARCH RESULTS ================= */}

          {showSearchResult && (
            <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

              <div className="border-b border-slate-100 px-4 py-3">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Search
                </p>

              </div>

              <div className="px-4 py-5">

                <p className="text-sm font-semibold text-slate-900">
                  Searching for:
                </p>

                <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm text-emerald-600">
                  "{search}"
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  Search results will appear here when
                  connected to your transactions and
                  customers.
                </p>

              </div>

            </div>
          )}

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="ml-auto flex items-center gap-3">

          {/* ================= NOTIFICATION ================= */}

          <div className="relative">

            <button
              onClick={toggleNotifications}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
            >

              <Bell size={19} />

              {/* Unread badge */}

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}

            </button>

            {/* ================= NOTIFICATION DROPDOWN ================= */}

            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {unreadCount} unread
                    </p>

                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Mark all read
                    </button>
                  )}

                </div>

                {/* Notification list */}

                <div className="max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (

                    /* Empty state */

                    <div className="px-4 py-10 text-center">

                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

                        <Bell
                          size={20}
                          className="text-slate-400"
                        />

                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No notifications
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        You're all caught up.
                      </p>

                    </div>

                  ) : (

                    notifications.map(
                      (notification) => (

                        <button
                          key={notification.id}
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          className={`flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 ${
                            !notification.read
                              ? "bg-emerald-50/40"
                              : "bg-white"
                          }`}
                        >

                          {/* Icon */}

                          {getNotificationIcon(
                            notification.type
                          )}

                          {/* Content */}

                          <div className="min-w-0 flex-1">

                            <div className="flex items-start justify-between gap-2">

                              <p className="text-sm font-semibold text-slate-900">
                                {notification.title}
                              </p>

                              {!notification.read && (
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                              )}

                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                          </div>

                        </button>

                      )
                    )

                  )}

                </div>

                {/* Footer */}

                <div className="border-t border-slate-100 p-3">

                  <button
                    onClick={() =>
                      setShowNotifications(false)
                    }
                    className="w-full rounded-xl py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Close
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* Divider */}

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* ================= USER PROFILE ================= */}

          <div className="relative">

            <button
              onClick={toggleProfile}
              className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50"
            >

              {/* Avatar */}

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">

                {userName
                  .charAt(0)
                  .toUpperCase()}

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

            {/* ================= PROFILE DROPDOWN ================= */}

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

      {/* ================= MOBILE SEARCH ================= */}

      <div className="border-t border-slate-100 px-6 py-3 lg:hidden">

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200"
            >
              <X size={15} />
            </button>
          )}

        </div>

      </div>

    </header>
  );
}