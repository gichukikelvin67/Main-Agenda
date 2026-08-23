"use client"

import {useState} from "react";
import Link from "next/link";
import {Wallet,User,Mail, Lock, ArrowRight} from "lucide-react";

export default function RegisterPage(){

    const[name, setName]=useState("");
    const[email,setEmail]=useState("");
    const[password, setPassword]=useState("");


    function handleRegister(e:React.FormEvent){
        e.preventDefault();

        if(!name || !email|| !password){
            alert("Please fill in all fields");
            return;
        }

        alert("Account created successfully!");
        window.location.href="/login";
    }
    return(
        <main className="min-h-screen bg-[#f7faf8] flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">

                    <Link

                    href="/"
                    className="inline-flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
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
                    <h2 className="text-2xl font-bold text-slate-950">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">

                        Start managing your business with M-PesaPOS.
                    </p>

                    <form
                    onSubmit={handleRegister}
                    className="mt-7 space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Business Owner Name
                            </label>

                            <div className="flex items-center gap3 rounded-xl border border-slate-200 px-4 py-3">
                                <User size={18} className="text-slate-400"/>

                                <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none"/>
                            </div>
                        </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
                            </div>
                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Password
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                                <Lock size={18} className="text-slate-400"/>
                                 <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
                            </div>
                        </div>

                        <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700">
                            Create Account
                            <ArrowRight size={18}/>
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{""}
                        <Link
                         href="/login"
              className="font-semibold text-emerald-600"
            >
                Login
            </Link>
                    </p>
                </div>
            </div>
        </main>
    )

}