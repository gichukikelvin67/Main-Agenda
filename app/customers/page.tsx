"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import {
  Search,
  Plus,
  Users,
  Phone,
  Mail,
  Trash2,
  X,
} from "lucide-react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  purchases: number;
  total: number;
};

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "John Kamau",
    phone: "0712 345 678",
    email: "john@example.com",
    purchases: 12,
    total: 18500,
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    phone: "0722 456 789",
    email: "mary@example.com",
    purchases: 8,
    total: 12400,
  },
  {
    id: 3,
    name: "Peter Mwangi",
    phone: "0733 567 890",
    email: "peter@example.com",
    purchases: 15,
    total: 25300,
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  function addCustomer() {
    if (!name || !phone) {
      alert("Please enter the customer name and phone number.");
      return;
    }

    const newCustomer: Customer = {
      id: Date.now(),
      name,
      phone,
      email,
      purchases: 0,
      total: 0,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");
    setEmail("");

    setShowForm(false);
  }

  function deleteCustomer(id: number) {
    setCustomers(
      customers.filter((customer) => customer.id !== id)
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7faf8]">

      <Sidebar />

      <main className="min-w-0 flex-1">

        <Topbar />

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Business
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                Customers
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your customers and their purchase history.
              </p>

            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              <Plus size={18} />
              Add Customer
            </button>

          </div>

          {/* Search */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

          {/* Customers */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {filteredCustomers.map((customer) => (

              <div
                key={customer.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                      {customer.name.charAt(0)}
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {customer.name}
                      </h2>

                      <p className="text-xs text-slate-400">
                        Customer #{customer.id}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

                {/* Contact */}
                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Phone size={16} />
                    {customer.phone}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Mail size={16} />
                    {customer.email || "No email"}
                  </div>

                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Purchases
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {customer.purchases}
                    </p>

                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3">

                    <p className="text-xs text-emerald-600">
                      Total Spent
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      KSh {customer.total.toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Empty */}
          {filteredCustomers.length === 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center">

              <Users
                className="mx-auto text-slate-300"
                size={40}
              />

              <h2 className="mt-4 font-bold text-slate-700">
                No customers found
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Try searching for another customer.
              </p>

            </div>
          )}

        </div>

      </main>

      {/* Add Customer Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-950">
                  Add Customer
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add a new customer.
                </p>

              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Customer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />

              <input
                type="email"
                placeholder="Email address (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />

              <button
                onClick={addCustomer}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Add Customer
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}