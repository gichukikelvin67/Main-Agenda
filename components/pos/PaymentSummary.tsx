"use client";

import { useState } from "react";
import Receipt from "./Receipt";
import { CartProduct } from "./CartItem";

import {
  Smartphone,
  ArrowRight,
} from "lucide-react";

type PaymentSummaryProps = {
  subtotal: number;
  tax: number;
  total: number;
  items: CartProduct[];
};

export default function PaymentSummary({
  subtotal,
  tax,
  total,
  items,
}: PaymentSummaryProps) {

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  async function createOrder() {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!phone) {
      alert("Please enter the customer's M-Pesa phone number.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {

      // =========================
      // CREATE ORDER
      // =========================

      const orderResponse = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: items.map((item) => ({
              product: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),

            subtotal,
            tax,
            total,
            paymentMethod: "mpesa",
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message || "Failed to create order"
        );
      }

      const orderId = orderData.order._id;

      console.log("Order created:", orderData.order);


      // =========================
      // REQUEST M-PESA STK PUSH
      // =========================

      const mpesaResponse = await fetch(
        "http://localhost:5000/api/mpesa/stkpush",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            phone,
            amount: total,
            orderId,
          }),
        }
      );

      const mpesaData = await mpesaResponse.json();

      if (!mpesaResponse.ok) {
        throw new Error(
          mpesaData.message ||
          "Failed to send M-Pesa payment request"
        );
      }

      console.log("M-Pesa response:", mpesaData);

      alert(
        "M-Pesa payment request sent. Ask the customer to check their phone."
      );

      // =========================
      // SHOW RECEIPT
      // =========================

      setShowReceipt(true);

      setPhone("");

    } catch (error) {

      console.error("Payment error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to process payment."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <h3 className="font-bold text-slate-950">
        Payment Summary
      </h3>

      {/* SUMMARY */}

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Subtotal
          </span>

          <span className="font-medium text-slate-900">
            KSh {subtotal.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Tax
          </span>

          <span className="font-medium text-slate-900">
            KSh {tax.toLocaleString()}
          </span>

        </div>

        <div className="border-t border-slate-100 pt-4">

          <div className="flex items-center justify-between">

            <span className="font-semibold text-slate-700">
              Total
            </span>

            <span className="text-2xl font-bold text-slate-950">
              KSh {total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>


      {/* MPESA */}

      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">

            <Smartphone size={19} />

          </div>

          <div>

            <p className="text-sm font-bold text-emerald-900">
              M-Pesa
            </p>

            <p className="text-xs text-emerald-700">
              Customer pays via mobile
            </p>

          </div>

        </div>

      </div>


      {/* PHONE NUMBER */}

      <div className="mt-4">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Customer Phone Number
        </label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0712345678"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <p className="mt-1 text-xs text-slate-400">
          Example: 0712345678 or +254712345678
        </p>

      </div>


      {/* PAYMENT BUTTON */}

      <button
        onClick={createOrder}
        disabled={total === 0 || loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >

        {loading ? (
          "Processing..."
        ) : (
          <>
            Request M-Pesa Payment
            <ArrowRight size={18} />
          </>
        )}

      </button>


      {/* RECEIPT */}

      {showReceipt && (
        <Receipt
          items={items}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onClose={() => setShowReceipt(false)}
        />
      )}

    </div>
  );
}