"use client"

import React, {Suspense} from 'react';
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import ChatSidebar from './chat-sidebar';
import ChatSidebarTrigger from './chat-sidebar-trigger';
import Sender from './sender';

const SidebarDemo = ({children}: { children: React.ReactNode }) => {
    //const [open, setOpen] = useState<boolean>(true)

    //const cookieStore = await cookies()
    //const defaultOpen: boolean = cookieStore.get("sidebar_state")?.value === "true"

    // @ts-ignore
    return (
        <SidebarProvider
            style={{
                // "--sidebar-width": "10rem", // 侧边栏宽度
            }}
            //defaultOpen={open} // 默认打开状态
            //open={open}
            //onOpenChange={setOpen}

        >
            <ChatSidebar/>

            <SidebarInset>
                {/* 上浮 */}
                <header className={'fixed z-10'}>
                    <div className='flex justify-start items-center h-12 w-30 p-3 space-x-2'>
                        {/* 自定义侧边栏开关 */}
                        <ChatSidebarTrigger/>
                        <Separator orientation={'vertical'}/>
                    </div>
                </header>

                <div className='h-lvh w-full flex flex-col justify-center items-center '>
                    <ScrollArea className={'h-10/12 w-full'}>
                        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min w-1/2 mx-auto">
                            {Array.from({length: 50}).map((_, e) => (<p key={e}>{`message: ${e}`}</p>))}
                        </div>
                    </ScrollArea>

                    {/* 发送框 */}
                    <Sender/>

                    <footer>
                        <span className='text-xs text-foreground/50'>
                            内容由 AI 生成，请仔细甄别
                        </span>
                    </footer>

                </div>
            </SidebarInset>

        </SidebarProvider>
    );
};

export default SidebarDemo;