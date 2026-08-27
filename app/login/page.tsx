"use client";

// React hook used to store form values and UI state
import { useState } from "react";

// Next.js router used to redirect the user after login
import { useRouter } from "next/navigation";

// Link allows navigation between pages without reloading
import Link from "next/link";

// Icons used in the login interface
import {
  Wallet,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {

  // Next.js router
  // We use this to redirect the user to the dashboard
  const router = useRouter();

  // Store the email entered by the user
  const [email, setEmail] = useState("");

  // Store the password entered by the user
  const [password, setPassword] = useState("");

  // Used to show a loading state while logging in
  const [loading, setLoading] = useState(false);

  // Stores login error messages
  const [error, setError] = useState("");

  // Stores successful login message
  const [success, setSuccess] = useState("");

  // Controls whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);


  
  // HANDLE LOGIN
  

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {

    // Prevent the browser from refreshing the page
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Make sure the user has entered both fields
    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    // Start loading state
    setLoading(true);

    try {

      
      // SEND LOGIN REQUEST TO BACKEND
      

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          // We are sending data to the backend
          method: "POST",

          // Tell Express that we are sending JSON
          headers: {
            "Content-Type": "application/json",
          },

          // Send the email and password
          body: JSON.stringify({
            // Remove spaces and convert email to lowercase
            email: email.trim().toLowerCase(),

            password,
          }),
        }
      );


      // Convert backend response into JavaScript object
      const data = await response.json();


    
      // CHECK IF LOGIN FAILED
      

      if (!response.ok) {

        // Backend may return:
        // "Invalid email or password"
        throw new Error(
          data.message ||
          "Invalid email or password."
        );
      }


      
      // SAVE JWT TOKEN
      

      // The backend creates a JWT token after successful login.
      //
      // We save it in localStorage so other parts of the
      // application can use it when making protected requests.
      //
      // Your POS PaymentSummary already uses:
      //
      // localStorage.getItem("token")

      localStorage.setItem(
        "token",
        data.token
      );


      
      // SAVE USER INFORMATION
      

      // Save the logged-in user's information.
      //
      // Example:
      // {
      //   id: "...",
      //   name: "John",
      //   email: "john@gmail.com",
      //   role: "owner"
      // }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      
      // SHOW SUCCESS MESSAGE
      

      setSuccess(
        `Welcome back, ${
          data.user?.name || "User"
        }!`
      );


      
      // REDIRECT TO DASHBOARD
      

      // Wait a short moment so the user can see
      // the successful login message.

      setTimeout(() => {

        router.push("/dashboard");

      }, 800);


    } catch (error) {

      // Log the actual error for developers
      console.error(
        "Login error:",
        error
      );

      // Show a friendly error to the user
      setError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the server."
      );

    } finally {

      // Stop the loading animation
      setLoading(false);

    }
  }


  
  // LOGIN PAGE UI
  

  return (

    <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-6 py-10">

      <div className="w-full max-w-md">


        {/* 
            LOGO / BRAND
         */}

        <div className="mb-8 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >

            {/* M-PesaPOS logo icon */}

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">

              <Wallet size={24} />

            </div>


            {/* Brand name */}

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


        {/* 
            LOGIN CARD
         */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">


          {/* Login heading */}

          <div>

            <h2 className="text-2xl font-bold text-slate-950">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Login to manage your business with
              M-PesaPOS.
            </p>

          </div>


          {/* 
              ERROR MESSAGE
          */}

          {error && (

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* 
              SUCCESS MESSAGE
           */}

          {success && (

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">

              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>
                {success}
              </span>

            </div>

          )}


          {/* 
              LOGIN FORM
           */}

          <form
            onSubmit={handleLogin}
            className="mt-7 space-y-5"
          >


            {/* 
                EMAIL FIELD
             */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Email

              </label>


              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                {/* Email icon */}

                <Mail
                  size={18}
                  className="text-slate-400"
                />


                {/* Email input */}

                <input
                  type="email"

                  value={email}

                  onChange={(e) =>
                    setEmail(e.target.value)
                  }

                  placeholder="business@example.com"

                  disabled={loading}

                  autoComplete="email"

                  className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                />

              </div>

            </div>


            {/* 
                PASSWORD FIELD
            */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Password

              </label>


              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">

                {/* Password icon */}

                <Lock
                  size={18}
                  className="text-slate-400"
                />


                {/* Password input */}

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  value={password}

                  onChange={(e) =>
                    setPassword(e.target.value)
                  }

                  placeholder="Enter your password"

                  disabled={loading}

                  autoComplete="current-password"

                  className="w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed"
                />


                {/* 
                    SHOW / HIDE PASSWORD BUTTON
                */}

                <button
                  type="button"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                  className="text-slate-400 transition hover:text-slate-700"

                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

            </div>


            {/* 
                LOGIN BUTTON
             */}

            <button
              type="submit"

              disabled={loading}

              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >

              {loading ? (

                // Loading state while backend is processing
                <>

                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  Logging in...

                </>

              ) : (

                // Normal button
                <>

                  Login

                  <ArrowRight size={18} />

                </>

              )}

            </button>

          </form>


          {/* 
              REGISTER LINK
           */}

          <p className="mt-6 text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >

              Create an account

            </Link>

          </p>

        </div>


        {/* 
            FOOTER
        */}

        <p className="mt-6 text-center text-xs text-slate-400">

          Secure business management powered by M-PesaPOS

        </p>

      </div>

    </main>
  );
}