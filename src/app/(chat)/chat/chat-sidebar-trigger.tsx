
import React from 'react';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {PanelLeftClose, PanelLeftIcon, PanelLeftOpen} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

/**
 * 自定义侧边栏开关
 *
 * @param className
 * @param onClick
 * @param props
 * @constructor
 */
const ChatSidebarTrigger = (
    {
        className,
        onClick,
        ...props
    }: React.ComponentProps<typeof Button>
) => {

    const {open, toggleSidebar} = useSidebar();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        data-sidebar="trigger"
                        data-slot="sidebar-trigger"
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7 cursor-pointer", className)}
                        onClick={(event) => {
                            onClick?.(event);
                            toggleSidebar();
                        }}
                        {...props}
                    >
                        {open ? <PanelLeftClose/> : <PanelLeftOpen/>}
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='right'>
                    <span>{open ? '收起边栏' : '打开边栏'}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};

export default ChatSidebarTrigger;