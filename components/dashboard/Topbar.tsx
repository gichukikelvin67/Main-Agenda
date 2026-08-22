"use client";
import{useState} from "react"
import{
    Search,
    Bell,
    Menu,
    ChevronDown,
}from "lucide-react";

export default function Topbar(){
    const[mobileMenuOpen , setMobileMenuOpen]=useState(false);

    return(

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="flex h-20 items-center justify-between px-6 lg:px-8">

                {/*Mobile menu */}


                <button
                onClick={()=> setMobileMenuOpen(true)}
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
                    <Menu size={22}/>

                </button>

                {/*Search */}

                <div className="hidden max-w-md flex-1 lg:flex">
                    <div className="flex w-full items-center gap-3 rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5">
                        <Search size={18} className="text-slate-400"/>

                        <input
                        type="text"
                        placeholder="Search transactions,customers..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"

                        />
                        </div>               
                         </div>

                         {/*Right */}
                         <div className="ml-auto flex items-center gap-3">

                            <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
                                <Bell size={19}/>

                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500"/>

                            </button>

                            <div className="hidden h-8 w-px bg-slate-200 sm:block"/>
                            <button className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                                    K
                                    </div>  

                                    <div className="hidden text-left sm:block" >
                                        <p className="text-sm font-semibold text-slate-900">
                                            Business Owner
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Admin
                                        </p>
                                        </div> 

                                        <ChevronDown
                                        size={16}    
                                        className="hidden text-slate-400 sm:block" 
                                        />                 
                                      </button>
                         </div>
            </div>

            {/*Mobile search */}

            <div className="border-t border-slate-100 px-6 py-3 lg:hidden">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <Search size={18} className="text-slate-400"/>

                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm outline-none"/>
                </div>
            </div>
        </header>
    )
}