import Link from "next/link";
import{Wallet} from "lucide-react"

function Footer(){
    return(
        <footer className="bg-slate-950 px-6 pb-8">
            <div className="mx-auto max-w-7xl border-t border-slate-800 pt-10">
                <div className="grid gap-10 md:grid-cols-4">

                    //BRAND

                    <div className="md:col-span-2">

                        <Link href="/" className="flex items-center gap-3">
                        
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                            <Wallet size={20}/>


                        </div>

                        <div>
                            <div className="font-bold text-white">
                                M-Pesa<span className="text-emerald-500">POS</span>
                            </div>

                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                Business Finance
                            </div>
                        </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
                            A modern business managment platform for slaes, inventory,
                            customers and digital payments.
                        </p>
                    </div>

                    <div>
<h3 className="text-sm font-bold text-white">
    Platform
</h3>

<div className="mt-4 space-y-3">
    <Link

    href="#features"
    className="block text-sm text-slate-500 transition hover:text-emerald-400">
       Features  
    </Link>

    <Link

    href="#how-it-works"
    className="block text-sm text-slate-500 transition hover:text-emerald-400">
        How it works
    </Link>

    <Link

    href="/dashboard"
    className="block text-sm text-slate-500 transition hover:text-emerald-400">
        Dashboard
    </Link>
</div>
                    </div>


                    //company


                    <div>

                        <h3 className="text-sm font-bold text-white">
                            Product
                        </h3>
                        <div className="mt-4 space-y-3">

                            <p className="text-sm text-slate-500">
                                M-Pesa payments
                            </p>

                            <p className="text-sm text-slate-500">
                                Inventory
                            </p>

                            <p className="text-sm text-slate-500">

                                Analytics
                            </p>

                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row">
                    <p>
                        @ 2026 M-PesaPOS.All rights reserved.
                    </p>

                    <p>
                        Built for modern businesses.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer