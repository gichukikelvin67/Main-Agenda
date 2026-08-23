"use client";
import {ShoppingCart} from "lucide-react";
import CartItem, {CartProduct} from "./CartItem";

type CartProps={
    items: CartProduct[];
    onIncrease: (id:number)=> void;
    onDecrease:(id:number)=> void;
    onRemove:(id:number)=> void;
};

export default function Cart({
    items,
    onIncrease,
    onDecrease,
    onRemove,
}:CartProps){
    return(
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShoppingCart size={19}/>

                </div>

                <div>
                    <h2 className="font-bold text-slate-950">
                        Current Sale
                    </h2>

                    <p className="text-xs text-slate-400">
                        {items.length} product{items.length !==1 ? "s" : ""}
                    </p>
                </div>
            </div>
        </div>
        <div className="max-h-[420px] overflow-y-auto px-5">
            {items.length===0 ?(
                <div className="flex flex-col items-center justify-center py-16 text-center">
                     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                    <ShoppingCart size={28}/>
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-700">
                        Your cart is empty
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Add products to part a sale
                    </p>
                    </div>
            ):(
                items.map((item)=>(
                    <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                    />
                ))
            )}
        </div>
        </div>
        
    );
}
