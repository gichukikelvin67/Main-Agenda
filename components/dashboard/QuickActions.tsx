import{
    Send,
    Plus,
    UserPlus,
    PackagePlus,
    ArrowRight,

}from "lucide-react";
import { ActionDidNotRevalidate } from "next/dist/shared/lib/action-revalidation-kind";

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

            <div className="mt-6 space-y-3">

                <Action
           icon={<Send size={19}/>}
           title="Request M-pesa Payment"
           description="Send payment prompt"
           />

           <Action
           icon={<Plus  size={19}/>}
           title="Create Sale"
           description="Record a new sale"
           />

           <Action
           icon={<UserPlus size={19}/>}
           title="Add Customer"
           description="Register customer"
           />

           <Action
          icon={<PackagePlus size={19}/>
        }
        title="Add Product"
        description="Update inventory"
        />

          
          </div>


          <div className="mt-6 rounded-xl bg-slate-950 p-4 text-white">

            <p className="text-xs font-medium text-slate-400">
                TODAY'S BALANCE
            </p>

            <p className="mt-2 text-2xl font-bold">
                Ksh 42,500
            </p>

            <span className="mt-4 flex items-center justify-between">
                Available balance
            </span>

            <ArrowRight size={16} className="text-slate-400"/>
          </div>
        </div>
    )
}

function Action({
    icon,
    title,
    description,

}:{
    icon:React.ReactNode;
    title:string;
    description:string;
}) {
    return(
        <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover: border-emerald-200 hover:bg-emerald-50">
            <div className="flex h-10 w-10 shrink-0 itemms-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                    {title}
                </p>

                <p className="text-xs text-slate-400">
                    {description}
                </p>
                
            </div>

            <ArrowRight
            size={16}
            className="text-slate-300"
            />
        </button>
    )
}