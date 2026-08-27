"use client";

import { useEffect, useState } from "react";
import Receipt from "./Receipt";
import { CartProduct } from "./CartItem";
import { addNotification } from "@/components/dashboard/notifications";

import {
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

type PaymentSummaryProps = {
  subtotal: number;
  tax: number;
  total: number;
  items: CartProduct[];
};

type POSSettings = {
  businessName: string;
  phone: string;
  email: string;
  address: string;

  currency: string;

  receiptTitle: string;
  receiptFooter: string;
  taxRate: number;

  mpesa: boolean;
  cash: boolean;
  card: boolean;

  notifications: boolean;

  appearance: "light" | "dark";

  pin: string;
};

const defaultSettings: POSSettings = {
  businessName: "M-PesaPOS Business",
  phone: "0712 345 678",
  email: "business@example.com",
  address: "Nairobi, Kenya",

  currency: "KES",

  receiptTitle: "M-PesaPOS Receipt",
  receiptFooter: "Thank you for your business!",
  taxRate: 16,

  mpesa: true,
  cash: true,
  card: false,

  notifications: true,

  appearance: "light",

  pin: "1234",
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

  const [settings, setSettings] =
    useState<POSSettings>(defaultSettings);

  /*
   * Load settings saved from Settings page
   */
  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "mpesa-pos-settings"
    );

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);

        setSettings({
          ...defaultSettings,
          ...parsed,
        });
      } catch (error) {
        console.error(
          "Failed to load POS settings:",
          error
        );
      }
    }
  }, []);

  /*
   * Calculate tax using the tax rate
   * saved in Settings.
   */
  const calculatedTax = Math.round(
    subtotal * (settings.taxRate / 100)
  );

  /*
   * Calculate the final total using
   * the saved tax setting.
   */
  const calculatedTotal =
    subtotal + calculatedTax;

  /*
   * Currency formatter
   */
  function formatCurrency(amount: number) {
    return `${settings.currency} ${amount.toLocaleString()}`;
  }

  function normalizePhoneNumber(phoneNumber: string) {
  let phone = phoneNumber.trim().replace(/\s+/g, "");

  // Remove leading +
  if (phone.startsWith("+")) {
    phone = phone.substring(1);
  }

  // 07XXXXXXXX → 2547XXXXXXXX
  if (phone.startsWith("07") && phone.length === 10) {
    return "254" + phone.substring(1);
  }

  // 01XXXXXXXX → 2541XXXXXXXX
  if (phone.startsWith("01") && phone.length === 10) {
    return "254" + phone.substring(1);
  }

  // Already 2547XXXXXXXX or 2541XXXXXXXX
  if (
    phone.startsWith("2547") ||
    phone.startsWith("2541")
  ) {
    return phone;
  }

  return null;
}

  async function createOrder() {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!settings.mpesa) {
      alert(
        "M-Pesa payments are currently disabled in Settings."
      );
      return;
    }

    if (!phone) {
      alert(
        "Please enter the customer's M-Pesa phone number."
      );
      return;
    }

const normalizedPhone = normalizePhoneNumber(phone);

if (!normalizedPhone) {
  alert(
    "Please enter a valid Kenyan M-Pesa number, for example 0712345678 or 0112345678."
  );
  return;
}

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      /*
       * CREATE ORDER
       */

      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
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

            /*
             * Use tax calculated from Settings
             */
            tax: calculatedTax,

            /*
             * Use total calculated from Settings
             */
            total: calculatedTotal,

            paymentMethod: "mpesa",
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message ||
            "Failed to create order"
        );
      }

      const orderId = orderData.order._id;

      console.log(
        "Order created:",
        orderData.order
      );

      /*
       * REQUEST M-PESA STK PUSH
       */

      const mpesaResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mpesa/stkpush`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            phone:normalizedPhone,

            /*
             * Send the calculated total
             */
            amount: calculatedTotal,

            orderId,
          }),
        }
      );

      const mpesaData =
        await mpesaResponse.json();

      if (!mpesaResponse.ok) {
        throw new Error(
          mpesaData.message ||
            "Failed to send M-Pesa payment request"
        );
      }

      console.log(
        "M-Pesa response:",
        mpesaData
      );

      /*
       * ONLY SEND NOTIFICATION IF
       * NOTIFICATIONS ARE ENABLED
       */
      if (settings.notifications) {
        addNotification({
          title: "M-Pesa Payment",
          message: `Payment request sent for ${formatCurrency(
            calculatedTotal
          )}`,
          type: "payment",
        });
      }

      alert(
        "M-Pesa payment request sent. Ask the customer to check their phone."
      );

      /*
       * SHOW RECEIPT
       */

      setShowReceipt(true);

      setPhone("");

    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

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

        {/* SUBTOTAL */}

        <div className="flex justify-between">

          <span className="text-slate-500">
            Subtotal
          </span>

          <span className="font-medium text-slate-900">
            {formatCurrency(subtotal)}
          </span>

        </div>

        {/* TAX */}

        <div className="flex justify-between">

          <span className="text-slate-500">
            Tax ({settings.taxRate}%)
          </span>

          <span className="font-medium text-slate-900">
            {formatCurrency(calculatedTax)}
          </span>

        </div>

        {/* TOTAL */}

        <div className="border-t border-slate-100 pt-4">

          <div className="flex items-center justify-between">

            <span className="font-semibold text-slate-700">
              Total
            </span>

            <span className="text-2xl font-bold text-slate-950">
              {formatCurrency(calculatedTotal)}
            </span>

          </div>

        </div>

      </div>

      {/* MPESA */}

      {settings.mpesa ? (
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

            <CheckCircle
              size={18}
              className="ml-auto text-emerald-600"
            />

          </div>

        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">

          <p className="text-sm font-bold text-red-700">
            M-Pesa Disabled
          </p>

          <p className="mt-1 text-xs text-red-500">
            Enable M-Pesa in Settings to accept
            mobile payments.
          </p>

        </div>
      )}

      {/* PHONE NUMBER */}

      {settings.mpesa && (
        <div className="mt-4">

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Customer Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="0712345678 or 0112345678"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <p className="mt-1 text-xs text-slate-400">
            Example: 0712345678 ,0112345678 or +254112345678
          </p>

        </div>
      )}

      {/* PAYMENT BUTTON */}

      <button
        onClick={createOrder}
        disabled={
          calculatedTotal === 0 ||
          loading ||
          !settings.mpesa
        }
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
          tax={calculatedTax}
          total={calculatedTotal}
          onClose={() =>
            setShowReceipt(false)
          }
        />
      )}

    </div>
  );
}