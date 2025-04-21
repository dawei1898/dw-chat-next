import {Button} from "@/components/ui/button";


export default function Home() {
    return (<div className='h-lvh flex justify-center items-center gap-4 bg-blue-50'>
            <div className='text-2xl font-bold'>
                hello
            </div>
            <Button className='cursor-pointer'>
                发送
            </Button>
        </div>

    );
}
