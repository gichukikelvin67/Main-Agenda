import Link from "next/link";

import { ArrowRight,Menu,Wallet } from "lucide-react";

export default function Navbar(){
    return(
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                
                <Link href="/" className="flex items-center gap-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                   
                   <Wallet size={21}/>
                   </div>

                   <div>
                     <div className="text-lg font-bold tracking-tight text-slate-950">
                        M-Pesa<span className="text-emerald-600">POS</span>
                     </div>

                     <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Business Finance
                     </div>
                   </div>
                </Link>

                
              <div className="hidden items-center gap-8 md:flex">
                <Link
                href="#features"
                className="text-sm font-medium text-slatg-600 transition hover:text-emerald-600">
                    Features
                </Link>

                <Link
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                    How it works
                </Link>

                <Link
                href="#security"
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                    Security
                </Link>
              </div>

              

              <div className="flex items-center gap-3">
                <Link
                href="/dashboard"
                className="hidden text-sm font-semibold text-slate-700 transition hover-emerald-600 sm:block">
                    Login
                </Link>

                <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:flex">
                    Get Started
                    <ArrowRight size={16}/>

                </Link>

                <button 
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
                arial-label="Open menu"
                >
<Menu size={20}/>
                </button>
              </div>
            </div>
        </nav>
    );
}

