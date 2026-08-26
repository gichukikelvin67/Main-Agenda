"use client";
import Link from "next/link";
import{
    Smartphone,
    ShoppingCart,
    Users,
    PackagePlus,
    ArrowRight,

}from "lucide-react";

const actions=[
    {
    title:"Request M-Pesa Payment",
    description: "Send payment prompt",
    href:"/sales",
    icon: Smartphone,
},

{
    title:"Create Sale",
    description: "Record a new sale",
    href:"/sales",
    icon:ShoppingCart,
},

{
    title:"Add Customer",
    description: "Register customers",
    href:"/customers",
    icon:Users,
},

{
    title:"Add Product",
    description: "Update inventory",
    href:"/products",
    icon: PackagePlus,
},
];

export default function QuickActions(){
    return(
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-bold text-slate-950">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Manage your business faster
                </p>
            </div>

             <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">
                  {action.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {action.description}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}