"use client";

import{useState} from "react";

import Link from "next/link";

import { Wallet,Mail,Lock,ArrowRight } from "lucide-react";

export default function LoginPage(){

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");


    function handleLogin(e:React.FormEvent){
        e.preventDefault();

        if(!email || !password){

            alert("Please enter your email and password");
            return;

        }

        alert("Login successful!");
        window.location.href="/dashboard";
    }

    return(
        <main className="min-h-screen bg-[#f7faf8] flex items-center justify-center px-6">

            <div className="w-full max-w-md">

<div className="mb-8 text-center">
                <Link

                href="/"

                className="inline-flex items-center gap-3">

                    <div className="flex h-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <Wallet size={24}/>

                    </div>

                    <div className="text-left">
                        <h1 className="text-xl font-bold text-slate-950">

                            M-Pesa<span className="text-emerald-600">POS</span>
                        </h1>

                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            Business Payments
                        </p>
                    </div>
                </Link>


            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="mb-7">
                    <h2 className="text-2xl font-bold text-slate-950">
                        Welcome back
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">

                        Login to manage your business
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">

                            <Mail size={18} className="text-slate-400"/>

                            <input

                            type="email"
                            placeholder="business@example.com"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none"
                            />

                        </div>
                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200  bg-white px-4 py-3">
                            <Lock size={18} className=" shrink-0 text-slate-400"/>

                             <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" h-full w-full bg-transparent text-sm  text-slate-900 outline-none"
                />
                        </div>
                    </div>

                    <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700">
                        Login
                        <ArrowRight size={18}/>

                    </button>
                </form>

                 <p className="mt-6 text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Create account
            </Link>

          </p>

        </div>

            </div>
        </main>
    );
}