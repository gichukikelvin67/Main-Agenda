import Link from "next/link";
import{
    ArrowRight,
   BarChart3,
     CheckCircle2,
     CreditCard,
    Smartphone,
    Wallet,
}from "lucide-react";

 export default function Hero(){
   return(
       <section className="relative overflow-hidden bg-[#f7faf8]">

          <div className="absolute -right-40 -top-h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl"/>
         <div className="absolute -botttom-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"/>
       <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

                 <div>

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ">
                   Smart payments for modern businesses
                     </div>

                     <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                         Your businesses.
                         <span className="block text-emerald-600">
                             Your money.
                         </span>
                         Your control.      
            </h1>

                     <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                         Manage sales, invetory, customers and M-pesa payments from one
                          powerful business platform built for growing businesses.
                     </p>

                     <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                         <Link
                         href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                         >
                             Start managing

                             <ArrowRight size={18}/>

                         </Link>

                         <Link 
                         href="#features"
                         className="inline-flex items-center justify-center rounded-x border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600">
                             Explore platform
                         </Link>
                     </div>

                     <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                         <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-emerald-600"/>
                             Real-time
                         </div>

                         <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-emerald-600"/>
                             Mobile ready          
                                            </div>
                     </div>
                 </div>


                 <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-2xl"/>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
             
             <div className="mb-5 flex items-center justify-between">

                 <div className="flex gsp-1.5">
                     <span className="h-2.5 w-2.5 rounded-full bg-slate-200"/>
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200"/> 
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200"/>
                 </div>

                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                       Live Business Overview
                 </span>
             </div>


           <div className="flex items-center justify-between border-b border-slate-100 pb-5">       
                     <div>
                <p className="text-xs font-medium text-slate-400">
                     TOTAL BALANCE
                 </p>

                 <p className="mt-1 text-2xl font-extrabold text-slate-950">
                     Ksh 248,650
                 </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                 <Wallet size={21}/>

                  

                  <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
                           <div className="flex items-center justify-between">
                             <div>
                                 <p className="text-sm text-slate-400">
                                     Sales this month
                                 </p>
                                 <p className="mt-1 text-3xl font-extrabold">
                                     Ksh 356,000
                                 </p>
                             </div>

                            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                             +18.4%
                             </div>
                           </div>

                           

                           <div className="mt-6 flex h-20 items-end gap-1.5">
                             {[30,45,35,56,42,65,50,70,58,80,67,92].map(
                                 (height,index)=>(
                                     <div 
                                    key={index}
                                    className="flex-1 rounded-t-sm bg-emerald-500/70"
                                    style={{height:`${height}%`}}
                                     />
                                 )
                             )}
                          </div>

                           <div className="mt-3 flex justify-between text-[10px] text-slate-500">
                             <span>Jan</span>
                              <span>Feb</span>
                               <span>Mar</span>
                                <span>Apr</span>
                                 <span>May</span>
                                  <span>Jun</span>
                                   <span>Jul</span>
                                    
                                     
                                      
                                       
                                    
                           </div>
                  </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
     <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
         <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
             <CreditCard size={18}/>
         </div>
         <p className="mt-3 text-xs text-slate-500">
             Transactions
         </p>

         <p className=" mt-3 text-sl font-extrabold text-slate-900">
            1,284
        </p>

         <p className="mt-1 text-xs font-semibold text-emerald-600">
             +12.5%
         </p>
     </div>

     <div className="rounded-2xl border border-slate-100 bg-slate-100 bg-slate-50 p-4">
       < div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <Smartphone size={18}/>

        </div>

        <p className="mt-3 text-xs text-slate-500">
         M-Pesa payments
        </p>
        <p className="mt-1 text-xs font-semibold text-emerald-600">
         986
        </p>

        <p className="mt-1 text-xs font-semibold text-emerald-600">

         96.4% success
        </p>
     </div>
 </div>

  

   <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 ">
  <div className="flex items-center gap-3">
     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">

         <CheckCircle2 size={19} className="text-e,erald-600"/>

     </div>

     <div>
         <p className="text-sm font-bold text-slate-900">
             Payment recevied
         </p>
         <p className="text-xs text-slate-500">
             M-Pesa. Just now
        </p>
     </div>
   </div>

   <p className="font-extrabold text-emerald-600">
     +Ksh 5000
   </p>
   </div>

                </div>
           </div>
            </div>
                 </div>
             </div>
         </section>
     )
}
