import { ArrowUpRight } from "lucide-react";

type StatCardProps={
    title:string;
    value: string;
    change: string;
    icon:React.ReactNode;
};

export default function StatCard({
  title, 
  value,
  change,
  icon,
}:StatCardProps){
    return(
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                    {icon}
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight size={13}/>
                    {change}
                </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
                {title}
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                {value}
            </h3>

            <p className="mt-2 text-xs text-slate-400">
                Compared with last month
            </p>
        </div>
    );
}