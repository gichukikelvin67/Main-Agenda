"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import {
  Search,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const transactions = [
  {
    id: "TXN001",
    customer: "John Kamau",
    phone: "0712 345 678",
    amount: 2500,
    method: "M-Pesa",
    status: "Completed",
    date: "22 Aug 2026, 10:32 AM",
  },
  {
    id: "TXN002",
    customer: "Mary Wanjiku",
    phone: "0722 456 789",
    amount: 4500,
    method: "M-Pesa",
    status: "Completed",
    date: "22 Aug 2026, 09:45 AM",
  },
  {
    id: "TXN003",
    customer: "Peter Mwangi",
    phone: "0733 567 890",
    amount: 1200,
    method: "M-Pesa",
    status: "Pending",
    date: "22 Aug 2026, 09:12 AM",
  },
  {
    id: "TXN004",
    customer: "Ann Njeri",
    phone: "0744 678 901",
    amount: 3500,
    method: "M-Pesa",
    status: "Failed",
    date: "21 Aug 2026, 05:20 PM",
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      transaction.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      transaction.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Business
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Transactions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View and monitor all M-Pesa payment transactions.
            </p>
          </div>

          {/* Search */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search transaction, customer or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

          {/* Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Total Transactions
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                {transactions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                2
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Total Amount
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                KSh 11,700
              </p>
            </div>

          </div>

          {/* Transactions */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">
              <h2 className="font-bold text-slate-950">
                Recent Transactions
              </h2>
            </div>

            <div className="divide-y divide-slate-100">

              {filteredTransactions.map((transaction) => (

                <div
                  key={transaction.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
                >

                  {/* Transaction info */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ArrowDownLeft size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {transaction.customer}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {transaction.id} • {transaction.phone}
                      </p>
                    </div>

                  </div>

                  {/* Amount */}
                  <div>
                    <p className="font-bold text-slate-950">
                      KSh {transaction.amount.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-400">
                      {transaction.method}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-slate-500">
                    {transaction.date}
                  </div>

                  {/* Status */}
                  <div>
                    {transaction.status === "Completed" && (
                      <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    )}

                    {transaction.status === "Pending" && (
                      <span className="flex w-fit items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                        <Clock size={14} />
                        Pending
                      </span>
                    )}

                    {transaction.status === "Failed" && (
                      <span className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                        <XCircle size={14} />
                        Failed
                      </span>
                    )}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}