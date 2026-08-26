"use client";

import { Printer, X } from "lucide-react";
import { CartProduct } from "./CartItem";

type ReceiptProps = {
  items: CartProduct[];
  subtotal: number;
  tax: number;
  total: number;
  onClose: () => void;
};

export default function Receipt({
  items,
  subtotal,
  tax,
  total,
  onClose,
}: ReceiptProps) {
  function printReceipt() {
    window.print();
  }

  const orderNumber = `POS-${Date.now()
    .toString()
    .slice(-6)}`;

  const date = new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 p-5">

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Receipt
            </h2>

            <p className="text-xs text-slate-400">
              M-Pesa POS
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* Receipt */}

        <div
          id="receipt"
          className="p-6"
        >

          <div className="text-center">

            <h1 className="text-2xl font-bold text-slate-950">
              M-Pesa POS
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Sales Receipt
            </p>

            <div className="mt-4 text-xs text-slate-400">
              <p>Order: {orderNumber}</p>

              <p>
                {date.toLocaleDateString()}{" "}
                {date.toLocaleTimeString()}
              </p>
            </div>

          </div>

          {/* Products */}

          <div className="mt-6 border-y border-dashed border-slate-200 py-4">

            {items.map((item) => (

              <div
                key={item._id}
                className="mb-3 flex justify-between gap-4 last:mb-0"
              >

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.quantity} × KSh{" "}
                    {item.price.toLocaleString()}
                  </p>

                </div>

                <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                  KSh{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

          {/* Totals */}

          <div className="mt-5 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-500">
                Subtotal
              </span>

              <span className="font-medium">
                KSh {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Tax
              </span>

              <span className="font-medium">
                KSh {tax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between border-t border-slate-100 pt-4">

              <span className="font-bold text-slate-900">
                Total
              </span>

              <span className="text-xl font-bold text-emerald-600">
                KSh {total.toLocaleString()}
              </span>

            </div>

          </div>

          {/* Payment */}

          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">

            <p className="text-sm font-bold text-emerald-800">
              Payment Method
            </p>

            <p className="mt-1 text-sm text-emerald-600">
              M-Pesa
            </p>

          </div>

          <div className="mt-6 text-center">

            <p className="text-xs text-slate-400">
              Thank you for your business!
            </p>

            <p className="mt-1 text-xs text-slate-300">
              Powered by M-Pesa POS
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 border-t border-slate-100 p-5">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            onClick={printReceipt}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Printer size={17} />
            Print Receipt
          </button>

        </div>

      </div>

    </div>
  );
}