"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import {
  User,
  Store,
  Bell,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("M-PesaPOS Business");
  const [phone, setPhone] = useState("0712 345 678");
  const [email, setEmail] = useState("business@example.com");

  const [notifications, setNotifications] = useState(true);

  function saveSettings() {
    alert("Settings saved successfully!");
  }

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              System
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your business and account settings.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* Main settings */}
            <div className="space-y-6">

              {/* Business */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Store size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Business Information
                    </h2>

                    <p className="text-xs text-slate-400">
                      Update your business details
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-5">

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Business Name
                    </label>

                    <input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                </div>

              </div>

              {/* Notifications */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Bell size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Notifications
                    </h2>

                    <p className="text-xs text-slate-400">
                      Manage payment notifications
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Payment notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Receive alerts when a payment is completed.
                    </p>
                  </div>

                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      notifications
                        ? "bg-emerald-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        notifications
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

              </div>

              {/* Save */}
              <button
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                <Save size={18} />
                Save Settings
              </button>

            </div>

            {/* Account card */}
            <div className="space-y-6">

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
                  K
                </div>

                <h2 className="mt-4 font-bold text-slate-950">
                  Business Owner
                </h2>

                <p className="text-sm text-slate-400">
                  Administrator
                </p>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                  <User size={17} />
                  Active Account
                </div>

              </div>

              {/* Security */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Security
                    </h2>

                    <p className="text-xs text-slate-400">
                      Account protection
                    </p>
                  </div>

                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Your account and payment information are protected.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}