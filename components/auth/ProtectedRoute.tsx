"use client";

import {useEffect} from  "react";
import { useRouter } from "next/navigation";


type ProtectedRouteProps={
    children:React.ReactNode;

}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps){

    const router =useRouter();

    useEffect(()=>{
        const token =localStorage.getItem("token");

        if(!token){
            router.replace("/login");

        }


    },[router]);

    return <>{children}</>;
}