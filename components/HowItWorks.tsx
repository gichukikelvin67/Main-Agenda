import type{ReactNode} from "react";

import{
    ArrowRight,
    CheckCircle,
    CreditCard,
    ShoppingCart,
    

}from "lucide-react";

interface StepProps{
    number:string;
    icon:ReactNode;
    title:string;
    description:string;
}
function Step({ number,icon,title,description}:StepProps){
    return(
        <div className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    {icon}
                </div>

                <span className="text-4xl font-black text-slate-100">
                    {number}
                </span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-950">
                {title}
            </h3>
            <p className="mt-3 text-sm leading text-slate-500">
                {description}
            </p>
        </div>
    )
}

function HowItWorks(){
    return(
        <section id="how-it-works" className="bg-[3f7faf8] py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                 

                 <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                        Simple Workflow
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                        From sale to payment in seconds
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                        Keep your entire payment workflow simple and easy to understand.
                    </p>
                 </div>

                 <div className="mt-14 grid gap-6 md:grid-cols-3">
                    <Step
                    number="01"
                    icon={<ShoppingCart size={22}/>}
                    title="Create a sale"
                    description="Choose products, add quantities and review the customer's order."
                    />

                    <Step
                    number="02"
                    icon={<CreditCard size={22}/>}
                    title="Request payment"
                    description="Send an M-Pesa payment request directly to the customer's phone."
                    />
                    <Step

                    number="03"
                    icon={<CheckCircle size={22}/>}
                    title="Track the payment"
                    description="See the transaction status and keep your business records updated."
                 />
                    </div>

                    <div className="mt-5 hidden items-center justify-center gap-4 text-sm font-semibold text-slate-400 md:flex">
                        <span>Sale</span>
                        <ArrowRight size={18}/>
                        <span>M-Pesa</span>

                        <ArrowRight size={18}/>
                        <span>Payment</span>

                        <ArrowRight size={18}/>

                        <span>Dashboard</span>

                    </div>
            </div>
        </section>
    )
}
export default HowItWorks;