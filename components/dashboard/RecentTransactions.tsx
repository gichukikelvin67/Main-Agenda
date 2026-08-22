import {
    CheckCircle2,
    Clock3,
    XCircle,
}from "lucide-react";

const transactions=[
    {
     customer: "James Mwangi",
    phone: "0712 *** 456",
    amount: "KSh 2,500",
    time: "2 minutes ago",
    status: "Completed",
    },

    {
         customer: "Kelvin Kariuki",
    phone: "0711 *** 406",
    amount: "KSh 3,100",
    time: "14 minutes ago",
    status: "Completed",
    },

    {
         customer: "Benson Kiragu",
    phone: "0708 *** 214",
    amount: "KSh 5,500",
    time: "32 minutes ago",
    status: "Pending",
    },
{
     customer: "Lucy Njoki",
    phone: "0705 *** 765",
    amount: "KSh 5,500",
    time: "2 hours ago",
    status: "Failed",
},
];

export default function RecentTransactions(){
    return(
        <div className="rounded-2xl border border-slate-200 bg-white shaadoe-sm">
            <div className="flex items-center justify-betwwen border-slate-100 p-6">


                <div>

                    <h2 className="text-lg font-bold text-slate-950">
                        Recent Transactions
                    </h2>

                    <button className="mt-1 text-sm text-slate-400">
                        Latest payment activity
                    </button>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead>
                            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-4 font-semibold">
                                    Customer
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Amount
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Time
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction)=>(
                                  <tr
                                  key={transaction.customer}
                                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70">

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-vold text-emerald-600">
                                                {transaction.customer.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {transaction.customer}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {transaction.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900">
                                            {transaction.amount}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            M-Pesa
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {transaction.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Status status={transaction.status}/>
                                    </td>

                                  </tr>
                           ) )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Status({status}:{status:string}){
if (status === "Completed"){
    return(
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            <CheckCircle2 size={13}/>
            Completed
        </span>
    )
}

if (status== "Pending") {
    return(
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3  py-1.5  text-xs font-semibold text-emerald-600">
            <Clock3 size={13}/>
            Pending
        </span>
    )
}

return(
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold  text-emerald-600">
        <XCircle size={13}/>
        Failed
    </span>
)
}