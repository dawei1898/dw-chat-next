import React from 'react';
import Image from "next/image";
import {useSidebar} from "@/components/ui/sidebar";
import {appConfig} from "@/utils/app-config";

const Logo = () => {
    const {open} = useSidebar();

    return (
        <div className={`flex gap-3 justify-start mx-auto cursor-pointer  ${open ? 'w-7/8' : ''}`}>
            <Image
                className="dark:invert"
                src="/whale4.svg"
                alt="dw chat logo"
                width={38}
                height={38}
                priority
            />
            {open &&
                <span
                    className='dark:invert text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500'>
                {appConfig.appName}
                </span>
            }

        </div>
    );
};

export default Logo;