"use client";
import Link from "next/link";

import{
    LayoutDashboard,
    ShoppingCart,
    ArrowLeftRight,
    Package,
    Users,
    Settings,
    Wallet,
    LogOut,
    X,
}from "lucide-react";

type SidebarProps={
    mobileOpen?: boolean;
    onClose?:()=> void;
};

export default function Sidebar({
    mobileOpen = false,
    onClose,
}: SidebarProps){
    return(
        <>
        
        {/* Mobile overlay*/}

        {mobileOpen &&(
            <div  

            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            onClick={onClose}
            />
        )}

        <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        >

            {/* Logo */}


            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
                <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm ">
                    <Wallet size={20}/>
                </div>

                <div>
                    <h1 className="font-bold text-slate-950">

                        M-Pesa<span className="text-emerald-600">POS</span>
                    </h1>

                    <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 ">
                        Business
                    </p>
                </div>

                </Link>

                <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
                    <X size={20}/>
                </button>
            </div>

            {/*Navigation */}

            <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
                <div>
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Overview
                    </p>

                    <div className="space-y-1">
                        <NavItem
                   href="/dashboard"
                   icon={<LayoutDashboard size={19}/>}
                   label="Dashboard"
                   active
                   onClick={onClose}
                   />
                   </div>
                </div>

                <div>

                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                       Business
                        </p>  

                        <div className="space-y-1"   >
                            <NavItem

                          href="/sales"
                          icon={<ShoppingCart size={19}/>}
                          label="Sales"
                          onClick={onClose}
                          />


                          <NavItem
                         href="/transactions"
                         icon={<ArrowLeftRight size={19}/>}
                         label="Transactions"
                         onClick={onClose}
                         />
                          
                           <NavItem
                         href="/products"
                         icon={<Package size={19}/>}
                         label="Products"
                         onClick={onClose}
                         />

                          <NavItem
                         href="/customers"
                         icon={<Users size={19}/>}
                         label="Customers"
                         onClick={onClose}
                         />

                         </div>          
                         </div>

                         <div>

                            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                System
                            </p>
                             <NavItem
                         href="/settings"
                         icon={<Settings size={19}/>}
                         label="Settings"
                         onClick={onClose}
                         />
                         </div>
            </nav>

            {/*User */}

            <div className="border-t border-slate-100 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                        K
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            Business Owner
                        </p>

                        <p className="truncate text-xs text-slate-400">
                            Administrator
                        </p>
                    </div>

                    <LogOut size={17} className="text-slate-400"/>

                </div>
            </div>
        </aside>
        
        </>
    )
}


function NavItem({
    href,
    icon,
    label,
    active= false,
    onClick,
}:{
    href: string;
    icon: React.ReactNode;
    label: string;
    active ?: boolean;
    onClick?:()=> void;
}) {
     return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}