"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-6 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}

        <div className="mb-8 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Wallet size={24} />
            </div>

            <div className="text-left">

              <h1 className="text-xl font-bold text-slate-950">
                M-Pesa
                <span className="text-emerald-600">
                  POS
                </span>
              </h1>

              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Business Payments
              </p>

            </div>

          </Link>

        </div>

        {/* CARD */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          <div>

            <h2 className="text-2xl font-bold text-slate-950">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your account and start managing
              your business with M-PesaPOS.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">

              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{success}</span>

            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="mt-7 space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Business Owner Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                <User
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  disabled={loading}
                  className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="business@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={loading}
                  className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  disabled={loading}
                  className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Password must contain at least 6 characters.
              </p>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

          {/* LOGIN */}

          <p className="mt-6 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Login
            </Link>

          </p>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Secure business management powered by M-PesaPOS
        </p>

      </div>

    </main>
  );
}