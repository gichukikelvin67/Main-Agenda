"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import POSHeader from "@/components/pos/POSHeader";
import ProductGrid from "@/components/pos/ProductGrid";
import Cart from "@/components/pos/Cart";
import CustomerSelector from "@/components/pos/CustomerSelector";
import PaymentSummary from "@/components/pos/PaymentSummary";


import { Product } from "@/components/pos/ProductCard";
import { CartProduct } from "@/components/pos/CartItem";




const products: Product[]=[
{
    id:1,
    name:"Premium Coffee",
    category: "Bevarages",
    price:350,
    stock:24,
    icon: "☕",
},

{
    id:2,
    name:"Mineral Water",
    category:"Beverages",
    price:80,
    stock:50,
    icon: "💧",

},

 {
    id: 3,
    name: "Fresh Juice",
    category: "Beverages",
    price: 250,
    stock: 18,
    icon: "🧃",
  },

  {
    id: 4,
    name: "Chicken Sandwich",
    category: "Food",
    price: 450,
    stock: 12,
    icon: "🥪",
  },
{
    id: 5,
    name: "Beef Burger",
    category: "Food",
    price: 650,
    stock: 10,
    icon: "🍔",
  },

   {
    id: 6,
    name: "French Fries",
    category: "Food",
    price: 250,
    stock: 30,
    icon: "🍟",
  },

]



export default function POSPage(){
   const[search,setSearch]=useState("");

   const[category,setCategory]=useState("All");

   const[cart,setCart]=useState<CartProduct[]>([]);

   const filteredProducts=products.filter((product)=>{

    const matchesSearch=product.name
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesCategory=
    category ==="All" ||
    product.category ===category;

    return matchesSearch && matchesCategory;
   });


   function addToCart(product:Product){
    const existingProduct=cart.find(

        (item) => item.id===product.id

    );

    if (existingProduct){

        setCart(
            cart.map((item)=>
                item.id===product.id
            ?{
                ...item,
                 quantity:item.quantity +1,
            }
            :item
            )
        );
    }else{
        setCart([
            ...cart,
            {
                ...product,
                quantity: 1,
            }
        ])
    }
   }

   function increaseQuantity(id:number){
    setCart(
        cart.map((item)=>
            item.id ===id
        ?{
            ...item,
            quantity:item.quantity +1,
        }
        :item
        )
    );
   }

   function decreaseQuantity(id:number){

    setCart(
        cart
        .map((item)=>
            item.id ===id
        ?{
            ...item,
            quantity: item.quantity -1,
        }
        :item
        )
        .filter((item)=> item.quantity>0)

    )
   }

   function removeFromCart(id:number){
    setCart(
        cart.filter((item)=> item.id !==id)
    )
   }
   const subtotal=cart.reduce(
    (total, item)=>
        total + item.price *item.quantity,

    0
);

const tax=Math.round(subtotal * 0.16);

const total= subtotal + tax;
   












    return(
        <div className="flex min-h-screen bg-[#f7faf8]">

            <Sidebar/>

            <main className="flex-1">

             <Topbar/>

             <div className="p-6 lg:p-8">
             
             <POSHeader

             search={search}
             setSearch={setSearch}
             category={category}
             setCategory={setCategory}
             />

             <div className="mt-6 flex gap-2">

                {[
                    "All",
                    "Beverages",
                    "Food",

                ].map((item)=>(

                    <button

                    key={item}
                    onClick={()=>setCategory(item)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    category ===item
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-500 border"
                    }`}
                    >
                        {item}
                    </button>
                ))}
             </div>

             <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">

                <div>

                    <h2 className="mb-4 text-lg font-bold">
                        Products
                    </h2>

                    <ProductGrid
                    products={filteredProducts}
                    onAdd={addToCart}
                    />
                </div>

                <div className="space-y-5">
                    <Cart

                    items={cart}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                    />

                    <CustomerSelector/>

                    <PaymentSummary

                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                    />
                </div>
             </div>

             </div>
            </main>
        
        </div>
    )
}