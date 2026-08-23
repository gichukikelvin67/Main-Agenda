"use client";
import{
    User,
    ChevronDown,
}from "lucide-react";

export default function CustomerSelector(){
    return(
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={18}/>


                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900">
                            Customer
                        </h3>

                        <p className="text-xs text-slate-400">
                            Optional
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    Select
                    <ChevronDown size={14}/>

                </button>
            </div>
        </div>
    )
}