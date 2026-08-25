"use client";

import{
    Minus,
    Plus,
    Trash2,
}from "lucide-react";


import {Product} from "./ProductCard";
export type CartProduct=Product & {
    quantity:number;

};

type CartItemProps={
    item:CartProduct;
    onIncrease:(id: string)=>void;
    onDecrease:(id:string)=> void;
    onRemove:(id:string)=>void;
};

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}:CartItemProps) {
    return(
        <div className="flex gap-3 border-b border-slate-100 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                {item.icon}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h4 className="truncate text-sm font-semibold text-slate-900">
                            {item.name}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                            KSh {item.price.toLocaleString()} each
                        </p>
                    </div>

                    <button
                    onClick={()=>onRemove(item._id)}
                    className="text-slate-300 transition hover:text-red-500">

                        <Trash2 size={16}/>
                    </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-slate-200">
                        <button
                        onClick={()=>onDecrease(item._id)}
                        className="p-1.5 text-slate-500 hover:bg-slate-50">
                            <Minus size={14}/>

                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold">
                            {item.quantity}
                        </span>

                        <button

                        onClick={()=>onIncrease(item._id)}
                        className="p-1.5 text-slate-500 hover:bg-slate-50">
                            <Plus size={14}/>

                        </button>
                    </div>

                    <p className="text-sm font-bold text-slate-900">
                        KSh{(item.price * item.quantity) .toLocaleString()}
                    </p>
                    
                </div>
            </div>
        </div>
    )
}