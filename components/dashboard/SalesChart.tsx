"use client";
import { useState } from "react";
import { TrendingUp } from "lucide-react";

const data=[45,65,78,62,85,72,95,80,108,92,120]

export default function SalesChart(){
    const[period,setPeriod]=useState("12months");

    return(
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-950">
                            Sales Overview
                        </h2>

                        <span className="flaex items-center gap-1 rounded-full bg-emerald-50 py-1 text-xs font-semibold text-emerald-600">
                            <TrendingUp size={12}/>
                            12.8%
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                        Revenue performance over time
                    </p>
                </div>

                <select
                value={period}
                onChange={(e)=> setPeriod(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none">

                    <option>12 months</option>
                    <option>6 months</option>
                    <option>30 days</option>
                    <option>7 days</option>
                </select>
            </div>

            <div className="mt-8">

                <div className="flex h-64 items-end gap-2 sm:gap-3">
                    {data.map((height,index)=>(
                        <div
                        key={index}
                        className="group flex h-full flex-1 items-end"
                        >
                            <div 
                            className="w-full rounded-t-lg bg-emerald-500/80 transition hover:bg-emerald-600"
                                style={{
                                    height:`${(height /120)* 100}%`,
                                }}
                                />
                                </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                   
                    <span>Jan</span>
                     <span>Feb</span>
                      <span>Mar</span>
                       <span>Apr</span>
                        <span>May</span>
                         <span>Jun</span>
                          <span>Jul</span>
                           <span>Aug</span>
                            <span>Sep</span>
                             <span>Oct</span>
                              <span>Nov</span>
                               <span>Dec</span>
                </div>
            </div>
        </div>
    )
}