"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import {
  User,
  Store,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  Receipt,
  CreditCard,
  Moon,
  Sun,
  Lock,
  CheckCircle,
  Smartphone,
  Banknote,
  CreditCard as CardIcon,
} from "lucide-react";

type Settings = {
  businessName: string;
  phone: string;
  email: string;
  address: string;

  currency: string;

  receiptTitle: string;
  receiptFooter: string;
  taxRate: number;

  mpesa: boolean;
  cash: boolean;
  card: boolean;

  notifications: boolean;

  appearance: "light" | "dark";

  pin: string;
};

const defaultSettings: Settings = {
  businessName: "M-PesaPOS Business",
  phone: "0712 345 678",
  email: "business@example.com",
  address: "Nairobi, Kenya",

  currency: "KES",

  receiptTitle: "M-PesaPOS Receipt",
  receiptFooter: "Thank you for your business!",
  taxRate: 16,

  mpesa: true,
  cash: true,
  card: false,

  notifications: true,

  appearance: "light",

  pin: "1234",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const [showPin, setShowPin] = useState(false);

  /*
   * Load saved settings when the page opens
   */
  useEffect(() => {
    const savedSettings = localStorage.getItem("mpesa-pos-settings");

    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);

        setSettings({
          ...defaultSettings,
          ...parsedSettings,
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, []);

  /*
   * Update one setting
   */
  function updateSetting<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  }

  /*
   * Save settings
   */
  function saveSettings() {
    localStorage.setItem(
      "mpesa-pos-settings",
      JSON.stringify(settings)
    );

    /*
     * Apply appearance
     */
    if (settings.appearance === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  /*
   * Reset settings
   */
  function resetSettings() {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings to their default values?"
    );

    if (!confirmed) return;

    setSettings(defaultSettings);

    localStorage.setItem(
      "mpesa-pos-settings",
      JSON.stringify(defaultSettings)
    );

    document.documentElement.classList.remove("dark");

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  /*
   * Toggle payment method
   */
  function togglePaymentMethod(
    method: "mpesa" | "cash" | "card"
  ) {
    setSettings((current) => ({
      ...current,
      [method]: !current[method],
    }));

    setSaved(false);
  }

  /*
   * Toggle notifications
   */
  function toggleNotifications() {
    setSettings((current) => ({
      ...current,
      notifications: !current.notifications,
    }));

    setSaved(false);
  }

  /*
   * Toggle appearance
   */
  function toggleAppearance() {
    setSettings((current) => ({
      ...current,
      appearance:
        current.appearance === "light"
          ? "dark"
          : "light",
    }));

    setSaved(false);
  }

  return (
    <div
      className={`flex min-h-screen ${
        settings.appearance === "dark"
          ? "bg-slate-950"
          : "bg-[#f7faf8]"
      }`}
    >
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              System
            </p>

            <h1
              className={`mt-2 text-3xl font-bold ${
                settings.appearance === "dark"
                  ? "text-white"
                  : "text-slate-950"
              }`}
            >
              Settings
            </h1>

            <p
              className={`mt-2 text-sm ${
                settings.appearance === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Manage your business and account settings.
            </p>
          </div>

          {/* Success message */}
          {saved && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <CheckCircle size={18} />
              Settings saved successfully!
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* MAIN SETTINGS */}
            <div className="space-y-6">

              {/* BUSINESS INFORMATION */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Store size={19} />
                  </div>

                  <div>
                    <h2
                      className={`font-bold ${
                        settings.appearance === "dark"
                          ? "text-white"
                          : "text-slate-950"
                      }`}
                    >
                      Business Information
                    </h2>

                    <p className="text-xs text-slate-400">
                      Update your business details
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Business Name
                    </label>

                    <input
                      value={settings.businessName}
                      onChange={(e) =>
                        updateSetting(
                          "businessName",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <input
                      value={settings.phone}
                      onChange={(e) =>
                        updateSetting(
                          "phone",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        updateSetting(
                          "email",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Address
                    </label>

                    <input
                      value={settings.address}
                      onChange={(e) =>
                        updateSetting(
                          "address",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                </div>
              </div>

              {/* CURRENCY */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Banknote size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Currency
                    </h2>

                    <p className="text-xs text-slate-400">
                      Choose the currency used by your POS
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-semibold text-slate-700">
                    Currency
                  </label>

                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      updateSetting(
                        "currency",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="KES">
                      KES - Kenyan Shilling
                    </option>

                    <option value="USD">
                      USD - US Dollar
                    </option>

                    <option value="EUR">
                      EUR - Euro
                    </option>

                    <option value="GBP">
                      GBP - British Pound
                    </option>
                  </select>
                </div>
              </div>

              {/* RECEIPTS */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Receipt size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Receipt Settings
                    </h2>

                    <p className="text-xs text-slate-400">
                      Customize your transaction receipts
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Receipt Title
                    </label>

                    <input
                      value={settings.receiptTitle}
                      onChange={(e) =>
                        updateSetting(
                          "receiptTitle",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Receipt Footer
                    </label>

                    <input
                      value={settings.receiptFooter}
                      onChange={(e) =>
                        updateSetting(
                          "receiptFooter",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Tax Rate (%)
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.taxRate}
                      onChange={(e) =>
                        updateSetting(
                          "taxRate",
                          Number(e.target.value)
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>

                </div>
              </div>

              {/* PAYMENT METHODS */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Payment Methods
                    </h2>

                    <p className="text-xs text-slate-400">
                      Choose payment methods available at checkout
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">

                  {/* MPESA */}
                  <PaymentToggle
                    icon={<Smartphone size={19} />}
                    title="M-Pesa"
                    description="Accept M-Pesa payments"
                    enabled={settings.mpesa}
                    onClick={() =>
                      togglePaymentMethod("mpesa")
                    }
                  />

                  {/* CASH */}
                  <PaymentToggle
                    icon={<Banknote size={19} />}
                    title="Cash"
                    description="Accept cash payments"
                    enabled={settings.cash}
                    onClick={() =>
                      togglePaymentMethod("cash")
                    }
                  />

                  {/* CARD */}
                  <PaymentToggle
                    icon={<CardIcon size={19} />}
                    title="Card"
                    description="Accept card payments"
                    enabled={settings.card}
                    onClick={() =>
                      togglePaymentMethod("card")
                    }
                  />

                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
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

                  <Toggle
                    enabled={settings.notifications}
                    onClick={toggleNotifications}
                  />

                </div>
              </div>

              {/* APPEARANCE */}
              <div
                className={`rounded-2xl border p-6 shadow-sm ${
                  settings.appearance === "dark"
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {settings.appearance === "light" ? (
                      <Sun size={19} />
                    ) : (
                      <Moon size={19} />
                    )}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      Appearance
                    </h2>

                    <p className="text-xs text-slate-400">
                      Choose how the POS looks
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Dark Mode
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Switch between light and dark appearance.
                    </p>
                  </div>

                  <Toggle
                    enabled={settings.appearance === "dark"}
                    onClick={toggleAppearance}
                  />

                </div>
              </div>

              {/* SAVE + RESET */}
              <div className="flex flex-wrap gap-3">

                <button
                  onClick={saveSettings}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Save size={18} />
                  Save Settings
                </button>

                <button
                  onClick={resetSettings}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <RotateCcw size={18} />
                  Reset to Defaults
                </button>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">

              {/* ACCOUNT */}
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

              {/* SECURITY */}
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

                <div className="mt-5">

                  <label className="text-sm font-semibold text-slate-700">
                    POS PIN
                  </label>

                  <div className="relative mt-2">

                    <input
                      type={showPin ? "text" : "password"}
                      maxLength={6}
                      value={settings.pin}
                      onChange={(e) =>
                        updateSetting(
                          "pin",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 text-sm outline-none focus:border-emerald-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600"
                    >
                      {showPin ? "Hide" : "Show"}
                    </button>

                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <Lock size={14} />
                    Use this PIN to protect POS access.
                  </div>

                </div>

              </div>

              {/* CURRENT SETTINGS */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

                <h3 className="font-bold text-emerald-900">
                  Current Configuration
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-emerald-700">
                      Currency
                    </span>

                    <strong className="text-emerald-900">
                      {settings.currency}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-emerald-700">
                      Tax
                    </span>

                    <strong className="text-emerald-900">
                      {settings.taxRate}%
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-emerald-700">
                      M-Pesa
                    </span>

                    <strong className="text-emerald-900">
                      {settings.mpesa ? "Enabled" : "Disabled"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-emerald-700">
                      Cash
                    </span>

                    <strong className="text-emerald-900">
                      {settings.cash ? "Enabled" : "Disabled"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-emerald-700">
                      Card
                    </span>

                    <strong className="text-emerald-900">
                      {settings.card ? "Enabled" : "Disabled"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

/*
 * Reusable Toggle
 */
function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled
          ? "bg-emerald-600"
          : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

/*
 * Payment Method Toggle
 */
function PaymentToggle({
  icon,
  title,
  description,
  enabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {title}
          </p>

          <p className="text-xs text-slate-400">
            {description}
          </p>
        </div>

      </div>

      <Toggle
        enabled={enabled}
        onClick={onClick}
      />

    </div>
  );
}