'use client'

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/chat')
    }, []);


    return (<></>
        /*<div className='h-lvh flex justify-center items-center gap-4 bg-blue-50'>
            <div className='text-2xl font-bold'>
                hello
            </div>
            <Button className='cursor-pointer'>
                发送
            </Button>
        </div>*/

    );
}
