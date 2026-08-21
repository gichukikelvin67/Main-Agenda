import Link from "next/link";
import {
    ArrowRight,
    LockKeyhole,
    ShieldCheck,
    Zap,
} from "lucide-react";

function CTA(){
    return(
        <section id="security" className="relative overflow-hidden bg-slate-950 py-24">
//bg glow
            <div className="relative left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"/>
            <div className="relative mx-auto max-w-5xl px-6 text-center">
//icons

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 ">
     <ShieldCheck size={30}/>
</div>

<p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400"
>
    Built for mordern businesses
</p>

<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
     Take control of your business Finances
</h2>
   <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
    Manage sales, inventory , customers and payments from one powerful platform designed
    to help ypur business grow.
   </p>

   //CTA

   <Link
   href="/dashboard"
   className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 ">
     Open your Dashboard
  <ArrowRight size={18}/>
   </Link>


   //trust

   <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
       <div className="flex items-center gap-2">
        <LockKeyhole size={16} className="text-emerald-400"/>
        Secure
       </div>



       <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-emerald-400"/>
        Business focused
       </div>


       <div className="flex items-center gap-2">
        <Zap size={16} className="text-emerald-400"/>
        Fast workflow

       </div>
   </div>
            </div>
        </section>
    )
}
export default CTA