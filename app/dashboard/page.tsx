 "use client";
 import { useEffect, useState } from "react";

 import ProtectedRoute from "@/components/auth/ProtectedRoute";


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



export default function Dashboard(){

const[stats, setStats]=useState({
    earnings:0,
    sales:0,
    mpesaAmount:0,
    mpesaTransactions:0,
});
const[loading ,setLoading]= useState(true);

useEffect(()=>{
    async function fetchStats(){
        try{
            const response=await fetch(
                "http://localhost:5000/api/dashboard/today"
            )
            if(!response.ok){
                throw new Error("Failed to fetch dashboard stats");
            }
            const data=await response.json();
            setStats(data);

        }catch(error){
            console.error("Failed to fetch dashboard stats:",error);
        }finally{
            setLoading(false);

        }
    }
    fetchStats();
},[]);



    return(
   <ProtectedRoute>
        
        <div className="flex min-h-screen bg-[#f7faf8]">
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
    title="Today's Earnings"
    value={
        loading
        ? "Loading..."
        :`KSh ${stats.earnings.toLocaleString()}`
    }
    change="Today"
    icon={<Wallet size={21}/>}
    />

    <StatCard

    title="M-pesa Payments"
    value={
        loading
        ? "Loading..."
        : `KSh ${stats.mpesaAmount.toLocaleString()}`
    }
    change="Today"
    icon={<Smartphone size={21}/>}
    />

    <StatCard

    title="Today's Sales"
    value={
        loading
        ?  "Loading..."
        : stats.sales.toLocaleString()
    }
    change="Orders"
    icon={<CreditCard size={21}/>}
    />

    <StatCard
    title="M-Pesa Transactions"
    value={
        loading
        ? "Loading..."

        : stats.mpesaTransactions.toLocaleString()
    }
    change="Today"
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
        </ProtectedRoute>
    );
}