
"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import {
  Search,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";

type OrderItem = {
  _id?: string;
  product?: string;
  name: string;
  price: number;
  quantity: number;
};

type Transaction = {
  _id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "mpesa" | "cash" | "card";
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  
  // GET TOKEN
  

  function getToken() {
    return localStorage.getItem("token");
  }

  
  // FETCH TRANSACTIONS
  

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load transactions"
        );
      }

      setTransactions(data);
    } catch (error) {
      console.error("Transactions error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load transactions"
      );
    } finally {
      setLoading(false);
    }
  }

  
  // LOAD TRANSACTIONS
  

  useEffect(() => {
    fetchTransactions();
  }, []);

  
  // SEARCH
  

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const searchValue = search.toLowerCase();

      const transactionId =
        transaction._id.toLowerCase();

      const paymentMethod =
        transaction.paymentMethod.toLowerCase();

      const productNames = transaction.items
        .map((item) => item.name.toLowerCase())
        .join(" ");

      return (
        transactionId.includes(searchValue) ||
        paymentMethod.includes(searchValue) ||
        productNames.includes(searchValue)
      );
    }
  );

  
  // SUMMARY
  

  const completedTransactions =
    transactions.filter(
      (transaction) =>
        transaction.status === "paid"
    ).length;

  const totalAmount = transactions.reduce(
    (total, transaction) =>
      total + transaction.total,
    0
  );


  // FORMAT DATE
  

  function formatDate(date: string) {
    return new Date(date).toLocaleString(
      "en-KE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  
  // STATUS
  

  function getStatus(transaction: Transaction) {
    if (transaction.status === "paid") {
      return (
        <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          Completed
        </span>
      );
    }

    if (transaction.status === "pending") {
      return (
        <span className="flex w-fit items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
          <Clock size={14} />
          Pending
        </span>
      );
    }

    return (
      <span className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
        <XCircle size={14} />
        Cancelled
      </span>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Business
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                Transactions
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                View and monitor your real payment transactions.
              </p>

            </div>

            <button
              onClick={fetchTransactions}
              disabled={loading}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={
                  loading ? "animate-spin" : ""
                }
              />

              Refresh
            </button>

          </div>

          {/* ==========================================
              SEARCH
          ========================================== */}

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search transaction or product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

          {/* ==========================================
              SUMMARY
          ========================================== */}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Transactions
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                {transactions.length}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {completedTransactions}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Amount
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                KSh {totalAmount.toLocaleString()}
              </p>

            </div>

          </div>

          {/* 
              TRANSACTIONS
           */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">

              <h2 className="font-bold text-slate-950">
                Recent Transactions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Transactions loaded from MongoDB.
              </p>

            </div>

            {/* 
                LOADING
                        */}

            {loading && (

              <div className="p-12 text-center">

                <RefreshCw
                  size={28}
                  className="mx-auto animate-spin text-emerald-600"
                />

                <p className="mt-4 text-sm text-slate-500">
                  Loading transactions...
                </p>

              </div>

            )}

            {/* 
                ERROR
                         */}

            {!loading && error && (

              <div className="p-10 text-center">

                <XCircle
                  size={40}
                  className="mx-auto text-red-400"
                />

                <p className="mt-3 font-semibold text-red-600">
                  Failed to load transactions
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {error}
                </p>

                <button
                  onClick={fetchTransactions}
                  className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Try Again
                </button>

              </div>

            )}

            {/* ==========================================
                EMPTY
            ========================================== */}

            {!loading &&
              !error &&
              filteredTransactions.length === 0 && (

                <div className="p-12 text-center">

                  <ArrowDownLeft
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-semibold text-slate-700">
                    No transactions found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Transactions will appear here after orders are created.
                  </p>

                </div>
              )}

            {/* ==========================================
                TRANSACTION LIST
            ========================================== */}

            {!loading &&
              !error &&
              filteredTransactions.length > 0 && (

                <div className="divide-y divide-slate-100">

                  {filteredTransactions.map(
                    (transaction) => (

                      <div
                        key={transaction._id}
                        className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
                      >

                        {/* Transaction info */}

                        <div className="flex items-center gap-4">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <ArrowDownLeft size={20} />
                          </div>

                          <div className="min-w-0">

                            <p className="font-semibold text-slate-900">
                              {transaction.items
                                .map(
                                  (item) =>
                                    `${item.name} × ${item.quantity}`
                                )
                                .join(", ")}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              ID: {transaction._id}
                            </p>

                          </div>

                        </div>

                        {/* Amount */}

                        <div>

                          <p className="font-bold text-slate-950">
                            KSh{" "}
                            {transaction.total.toLocaleString()}
                          </p>

                          <p className="text-xs capitalize text-slate-400">
                            {transaction.paymentMethod}
                          </p>

                        </div>

                        {/* Date */}

                        <div className="text-sm text-slate-500">
                          {formatDate(
                            transaction.createdAt
                          )}
                        </div>

                        {/* Status */}

                        <div>
                          {getStatus(transaction)}
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

          </div>

        </div>

      </main>

    </div>
  );
}

