import React from 'react';
import {appConfig} from "@/utils/app-config";
import Image from "next/image";

const InitWelcome = () => {
    return (
        <div className='flex flex-col gap-3 mt-[20%] mb-10'>
            <div className='flex justify-center items-center gap-4'>
                <Image
                    className="dark:invert"
                    src="/whale4.svg"
                    alt="dw chat logo"
                    width={38}
                    height={38}
                    priority
                />

                <span className='text-2xl font-bold'>
                        {`我是 ${appConfig.appName}，很高兴见到你！`}
                    </span>
            </div>
            <div>
                    <span className='text-sm text-muted-foreground'>
                        我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~
                    </span>
            </div>
        </div>
    );
};

export default InitWelcome;