"use client";
import { CartProduct } from "./CartItem";
import{
    Smartphone,
    ArrowRight,

}from "lucide-react";

type PaymentSummaryProps={
    subtotal:number;
    tax:number;
    total:number;
    items:CartProduct[];

};

export default function PaymentSummary({
    subtotal,
    tax,
    total,
    items,
}:PaymentSummaryProps){

    async function createOrder(){
        if(items.length ===0){
            alert("Your cart is empty.");
            return;
        }

        const token=localStorage.getItem("token");

        if (!token){
            alert("Please login first.");
            return;
        }

       try {
const response=await fetch(
    "http://localhost:5000/api/orders",
    {
        method:"POST",

        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body:JSON.stringify({
            items: items.map((item)=>({
                product:item._id,
                name: item.name,
                price:item.price,
                quantity: item.quantity,
            })),

            subtotal,
            tax,
            total,
            paymentMethod:"mpesa",
        })
    }
);
const data= await response.json();
if(!response.ok){
    throw new Error(
        data.message || "Failed to create order"
    )
}
console.log("Order created:", data);
alert("Order created successfully!");

        }catch(error){
            console.error("Created order error:",error);

            alert("Failed to create order.")
        }
    }


    return(
        <div className="rounded-2xl  border border-slate-200 bg-white p-5 shadow-sm">

            <h3 className="font-bold text-slate-950">
                Payment Summary
            </h3>
            <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">
                        Subtotal
                    </span>
                    <span className="font-medium text-slate-900">
                        KSh{subtotal.toLocaleString()}
                    </span>
                </div>

                <div className="flex  justify-between">
                    <span className="text-slate-500">
                        Tax
                    </span>

                    <span className="font-medium text-slate-900">
                        KSh{tax.toLocaleString()}
                    </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">
                            Total
                        </span>

                        <span className="text-2xl font-bold text-slate-950">

                            KSh {total.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <Smartphone size={19}/>

                    </div>

                    <div>
                        <p className="text-sm font-bold text-emerald-900">
                            M-Pesa
                        </p>

                        <p className="text-xs text-emerald-700">
                            Customer pays via mobile
                        </p>
                    </div>
                </div>
            </div>

            <button 
            onClick={createOrder}
            disabled={total ===0}
            
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
                Request M-Pesa Payment
                <ArrowRight size={18}/>

            </button>
        </div>
    )
}