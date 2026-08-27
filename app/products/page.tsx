
"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import {
  Search,
  Plus,
  Package,
  Trash2,
  X,
  Pencil,
} from "lucide-react";

// ==========================================
// PRODUCT TYPE
// ==========================================

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  icon?: string;
};

// ==========================================
// PRODUCTS PAGE
// ==========================================

export default function ProductsPage() {

  // Products from MongoDB
  const [products, setProducts] = useState<Product[]>([]);

  // Search
  const [search, setSearch] = useState("");

  // Add product modal
  const [showForm, setShowForm] = useState(false);

  // Product currently being edited
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // Add product form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // ==========================================
  // GET PRODUCTS FROM MONGODB
  // ==========================================

  useEffect(() => {

    async function fetchProducts() {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

      }

    }

    fetchProducts();

  }, []);

  // ==========================================
  // SEARCH PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  async function addProduct() {

    if (
      !name.trim() ||
      !category.trim() ||
      !price ||
      !stock
    ) {

      alert(
        "Please enter product name, category, price and stock."
      );

      return;
    }

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            category: category.trim(),
            price: Number(price),
            stock: Number(stock),
            icon: "📦",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to create product"
        );

      }

      // Add the new product to the screen
      setProducts((currentProducts) => [
        ...currentProducts,
        data.product,
      ]);

      // Clear form
      setName("");
      setCategory("");
      setPrice("");
      setStock("");

      // Close modal
      setShowForm(false);

    } catch (error) {

      console.error(
        "Error adding product:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to add product."
      );

    }

  }

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  async function updateProduct() {

    if (!editingProduct) {
      return;
    }

    if (
      !editingProduct.name.trim() ||
      !editingProduct.category.trim() ||
      editingProduct.price < 0 ||
      editingProduct.stock < 0
    ) {

      alert(
        "Please enter a valid name, category, price and stock."
      );

      return;
    }

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editingProduct._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: editingProduct.name.trim(),
            category: editingProduct.category.trim(),
            price: Number(editingProduct.price),
            stock: Number(editingProduct.stock),
            icon: editingProduct.icon || "📦",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to update product"
        );

      }

      // Update product in the screen
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === editingProduct._id
            ? data.product
            : product
        )
      );

      // Close edit modal
      setEditingProduct(null);

    } catch (error) {

      console.error(
        "Error updating product:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update product."
      );

    }

  }

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  async function deleteProduct(id: string) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to delete product"
        );

      }

      // Remove product from screen
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete product."
      );

    }

  }

  // ==========================================
  // RETURN UI
  // ==========================================

  return (

    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* ==================================
              HEADER
          ================================== */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Business
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                Products
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your products and stock.
              </p>

            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >

              <Plus size={18} />

              Add Product

            </button>

          </div>

          {/* ==================================
              SEARCH
          ================================== */}

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

          {/* ==================================
              PRODUCTS
          ================================== */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                    <Package size={22} />

                  </div>

                  {/* EDIT + DELETE */}

                  <div className="flex gap-1">

                    <button
                      onClick={() =>
                        setEditingProduct(product)
                      }
                      className="rounded-lg p-2 text-slate-300 transition hover:bg-emerald-50 hover:text-emerald-600"
                    >

                      <Pencil size={17} />

                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="rounded-lg p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

                {/* Category */}

                <p className="mt-4 text-xs font-medium text-emerald-600">
                  {product.category}
                </p>

                {/* Product name */}

                <h2 className="mt-1 font-bold text-slate-900">
                  {product.name}
                </h2>

                {/* Price + Stock */}

                <div className="mt-4 flex items-end justify-between">

                  <div>

                    <p className="text-xl font-bold text-slate-950">

                      KSh{" "}
                      {product.price.toLocaleString()}

                    </p>

                    <p className="mt-1 text-xs text-slate-400">

                      {product.stock} in stock

                    </p>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.stock > 10
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >

                    {product.stock > 10
                      ? "In Stock"
                      : "Low Stock"}

                  </span>

                </div>

              </div>

            ))}

          </div>

          {/* ==================================
              EMPTY STATE
          ================================== */}

          {filteredProducts.length === 0 && (

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">

              <Package
                className="mx-auto text-slate-300"
                size={40}
              />

              <p className="mt-3 font-semibold text-slate-700">
                No products found
              </p>

            </div>

          )}

        </div>

      </main>

      {/* ======================================
          ADD PRODUCT MODAL
      ====================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Modal header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-950">
                  Add Product
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add a new product to your business.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>

            {/* Form */}

            <div className="mt-6 space-y-4">

              {/* Product name */}

              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* ANY CATEGORY */}

              <input
                type="text"
                placeholder="Category e.g. Beverages, Electronics, Cosmetics"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Price */}

              <input
                type="number"
                placeholder="Price (KSh)"
                value={price}
                min="0"
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Stock */}

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                min="0"
                onChange={(e) =>
                  setStock(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Add button */}

              <button
                onClick={addProduct}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >

                Add Product

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================
          EDIT PRODUCT MODAL
      ====================================== */}

      {editingProduct && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Modal header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-950">
                  Edit Product
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update your product information.
                </p>

              </div>

              <button
                onClick={() =>
                  setEditingProduct(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>

            {/* Edit form */}

            <div className="mt-6 space-y-4">

              {/* Product name */}

              <input
                type="text"
                placeholder="Product name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* ANY CATEGORY */}

              <input
                type="text"
                placeholder="Category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Price */}

              <input
                type="number"
                placeholder="Price (KSh)"
                value={editingProduct.price}
                min="0"
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Stock */}

              <input
                type="number"
                placeholder="Stock"
                value={editingProduct.stock}
                min="0"
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              {/* Save */}

              <button
                onClick={updateProduct}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

