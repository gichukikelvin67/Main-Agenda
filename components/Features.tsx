import { Smartphone } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            powerful tools
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Everything your business needs
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            From accepting payments, understanding your revenue, M-PesaPOS gives you the tools to run your business with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="💳"
            title="M-Pesa payments"
            description="Accept and monitor M-Pesa payments from one central business dashboard."
          />

          <FeatureCard
            icon="📦"
            title="Inventory Management"
            description="Track products, stock levels and inventory movement in real time."
          />

          <FeatureCard
            icon="👥"
            title="Customer Management"
            description="Keep customer information and purchase activity organized in one place."
          />

          <FeatureCard
            icon="📈"
            title="Business Analytics"
            description="Understand sales, revenue and business performance through clear analytics."
          />

          <FeatureCard
            icon="🛡️"
            title="Secure Transactions"
            description="Built with security in mind to help protect important business information."
          />

          <FeatureCard
            icon="📱"
            title="Mobile Friendly"
            description="Manage your business from your phone, tablet or desktop anywhere."
          />
        </div>
      </div>
    </section>
  );
}
