import type { ReactNode } from "react";

interface FeatureCardProps{

    icon:ReactNode;
    title:string;
    description:string;
}

function FeatureCard({
icon,
title,
description,

}:FeatureCardProps){
    return(
        <div className="group rounded-2xl border border-slate-200 bg-white  p-6 transition duration-300 hover:translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                {icon}

            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>
            <div className="mt-5 h-1 w-8 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-14"/>
        </div>
    )
}
export default FeatureCard


