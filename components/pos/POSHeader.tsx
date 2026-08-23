"use client";
 import{

    Search,
    ChevronDown,
 } from "lucide-react";

 type POSHeaderProps={
    search: string;
    setSearch:(value: string)=>void;
    category:string;
    setCategory:(value:string)=>void;
 };

 export default function POSHeader({
    search,
    setSearch,
    category,
    setCategory,
 }:POSHeaderProps){
    return(
        <div>
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                 
                 <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                         Point of Sale
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                        Create a Sale
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">

                        Select products and collect payments from your customer.
                    </p>
                 </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">


                    <Search size={18} className="text-slate-400"/>

                    <input

                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"

                    />
                </div>

                <button
                onClick={()=>setCategory("All")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
                    {category}
                    <ChevronDown size={16}/>
                </button>
            </div>
        </div>
    )
 }