"use client";

import { useEffect ,useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import POSHeader from "@/components/pos/POSHeader";
import ProductGrid from "@/components/pos/ProductGrid";
import Cart from "@/components/pos/Cart";
import CustomerSelector from "@/components/pos/CustomerSelector";
import PaymentSummary from "@/components/pos/PaymentSummary";

import { Product } from "@/components/pos/ProductCard";
import { CartProduct } from "@/components/pos/CartItem";



export default function SalesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartProduct[]>([]);
  const[products,setProducts]=useState<Product[]>([]);
  const[loading, setLoading]=useState(true);


  //backend connection

  useEffect(()=>{
    async function fetchProducts(){
      try{
        const response=await fetch(
          "http://localhost:5000/api/products"
        )
        if(!response.ok){
          throw new Error("Failed to fetch products");
        }
        const data=await response.json();
        setProducts(data);

      }catch(error){
        console.error("Error fetching products:",error);

      }finally{
        setLoading(false);

      }
    }
    fetchProducts();
  }, []);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function addToCart(product: Product) {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function increaseQuantity(id: string) {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id: string) {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart(
      cart.filter((item) => item._id !== id)
    );
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.16);

  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          <POSHeader
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          {/* Categories */}

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">

            {["All", "Beverages", "Food"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    category === item
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

          {/* Main POS */}

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">

            {/* Products */}

            <div>

              <div className="mb-4">

                <h2 className="text-lg font-bold text-slate-950">
                  Products
                </h2>

                <p className="text-sm text-slate-400">
                  {filteredProducts.length} products available
                </p>

              </div>

              <ProductGrid
                products={filteredProducts}
                onAdd={addToCart}
              />

            </div>

            {/* Right side */}

            <div className="space-y-5">

              <Cart
                items={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />

              <CustomerSelector />

              <PaymentSummary
              items={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}