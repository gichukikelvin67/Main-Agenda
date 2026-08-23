"use client";
import { Plus } from "lucide-react";

export type Product={
id:number;
name: string;
category:string;
price:number;
stock:number;
icon:string;
};

type ProductCardProps={
    product:Product;
    onAdd:(product:Product)=>void;
};
 export default function ProductCard({
    product,
    onAdd,

 }:ProductCardProps){
    return(
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
            <div className="flex h-28 items-center justify-center rounded-xl bg-slate-50 text-5xl">
                {product.icon}
            </div>
            <div className="mt-4">
                <p className="text-xs font-medium text-slate-400">
                    {product.category}
                </p>

                <h3 className="mt-1 font-bold text-slate-900">
                    {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-slate-950">
                            KSh {product.price.toLocaleString()}
                        </p>

                        <p className="text-xs text-slate-400">
                            {product.stock} in stock
                        </p>
                    </div>

                    <button
                    onClick={()=>onAdd(product)}
                    disabled={product.stock===0}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                        <Plus size={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
 }