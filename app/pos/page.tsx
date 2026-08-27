"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import POSHeader from "@/components/pos/POSHeader";
import ProductGrid from "@/components/pos/ProductGrid";
import Cart from "@/components/pos/Cart";
import CustomerSelector from "@/components/pos/CustomerSelector";
import PaymentSummary from "@/components/pos/PaymentSummary";

import { Product } from "@/components/pos/ProductCard";
import { CartProduct } from "@/components/pos/CartItem";

export default function POSPage() {
  // Products loaded from MongoDB
  const [products, setProducts] = useState<Product[]>([]);

  // Search
  const [search, setSearch] = useState("");

  // Category filter
  const [category, setCategory] = useState("All");

  // Shopping cart
  const [cart, setCart] = useState<CartProduct[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // ==========================================
  // GET PRODUCTS FROM BACKEND
  // ==========================================

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load products"
          );
        }

        setProducts(data);
      } catch (error) {
        console.error("Products error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // ADD PRODUCT TO CART
  // ==========================================

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

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

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

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

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

  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  function removeFromCart(id: string) {
    setCart(
      cart.filter((item) => item._id !== id)
    );
  }

  // ==========================================
  // CALCULATE TOTALS
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.16);

  const total = subtotal + tax;

  // ==========================================
  // GET UNIQUE CATEGORIES
  // ==========================================

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          <POSHeader
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          {/* ================= CATEGORIES ================= */}

          <div className="mt-6 flex flex-wrap gap-2">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* ================= PRODUCTS + CART ================= */}

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">

            {/* PRODUCTS */}

            <div>

              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Products
              </h2>

              {/* Loading */}

              {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                  <p className="text-sm text-slate-500">
                    Loading products...
                  </p>
                </div>
              )}

              {/* Error */}

              {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                  <p className="font-semibold text-red-700">
                    Failed to load products
                  </p>

                  <p className="mt-1 text-sm text-red-500">
                    {error}
                  </p>

                </div>
              )}

              {/* No products */}

              {!loading &&
                !error &&
                filteredProducts.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                    <p className="text-lg font-semibold text-slate-900">
                      No products found
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Add products from your products management page.
                    </p>

                  </div>
                )}

              {/* Product grid */}

              {!loading &&
                !error &&
                filteredProducts.length > 0 && (
                  <ProductGrid
                    products={filteredProducts}
                    onAdd={addToCart}
                  />
                )}

            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="space-y-5">

              <Cart
                items={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />

              <CustomerSelector />

              <PaymentSummary
                subtotal={subtotal}
                tax={tax}
                total={total}
                items={cart}
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}