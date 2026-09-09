"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email?token=${encodeURIComponent(
            token
          )}&email=${encodeURIComponent(email)}`
        );

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully.");
        } else {
          setStatus("error");
          setMessage(
            data.message || "Verification link is invalid or has expired."
          );
        }
      } catch (error) {
        console.error("Verification error:", error);

        setStatus("error");
        setMessage(
          "Unable to verify your email. Please try again later."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <h1 className="text-2xl font-bold">
              Verifying your email
            </h1>

            <p className="mt-3 text-gray-600">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✓
            </div>

            <h1 className="text-2xl font-bold">
              Email verified!
            </h1>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

            <button
              onClick={() => router.push("/login")}
              className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              !
            </div>

            <h1 className="text-2xl font-bold">
              Verification failed
            </h1>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

            <button
              onClick={() => router.push("/login")}
              className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Back to Login
            </button>
          </>
        )}

      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <h1 className="text-2xl font-bold">
              Loading verification
            </h1>

            <p className="mt-3 text-gray-600">
              Please wait...
            </p>
          </div>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}