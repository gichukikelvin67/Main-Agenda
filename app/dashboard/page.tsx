 import QuickActions from "@/components/dashboard/QuickActions";
import Sidebar from "@/components/dashboard/Sidebar"
import StatCard from "@/components/dashboard/StatCard";
 import Topbar from "@/components/dashboard/Topbar";
 import SalesChart from "@/components/dashboard/SalesChart";
 import RecentTransactions from "@/components/dashboard/RecentTransactions";



import{
    Wallet,
    Smartphone,
    CreditCard,
    Users,
    
}from "lucide-react"
import { StaticPrefetchDisabled } from "next/dist/shared/lib/app-router-types";

export default function Dashboard(){
    return(
        <div className="flex min-screen bg-[#f7faf8]">
            <Sidebar/>

            <main className="min-w-0 flex-1">

                <Topbar/>

                <div className="p-6 lg:p-8">

<div className="mb-8">

    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
        Business Overview
    </p>

    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        Dashboard
    </h1>
    <p className="mt-2 text-sm text-slate-500">
        Monitor your business performance and M-Pesa payments.
    </p>
</div>


<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

    
    
    <StatCard
    title="Total Revenue"
    value="Ksh 84,250"
    change="+12.8%"
    icon={<Wallet size={21}/>}
    />

    <StatCard

    title="M-pesa Payments"
    value="Ksh 62,400"
    change="+8.4%"
    icon={<Smartphone size={21}/>}
    />

    <StatCard

    title="Transactions"
    value="128"
    change="+14.2%"
    icon={<CreditCard size={21}/>}
    />

    <StatCard
    title="Customers"
    value="86"
    change="+6.7%"
    icon={<Users size={21}/>}
    />
</div>


<div className="mt-6 grid gap-6 xl:grid-cols-3">
<div className="xl:col-span-2">
    <SalesChart/>

                </div>
                <QuickActions/>

                </div>

<div className="mt-6">
    <RecentTransactions/>

    </div>
</div>


            </main>
    


        </div>
    );
}