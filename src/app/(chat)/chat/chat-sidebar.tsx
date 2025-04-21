import React from 'react';
import {
    Plus,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {ScrollArea} from "@/components/ui/scroll-area";
import Logo from "@/app/(chat)/chat/logo";
import SideMenu from "@/app/(chat)/chat/side-menu";
import Conversations from "@/app/(chat)/chat/conversations";
import NavFooter from "@/app/(chat)/chat/nav-footer";






/**
 * 自定义侧边栏
 */
const ChatSidebar = () => {

    return (
        <Sidebar
            side='left' // 侧边栏位置
            collapsible='icon' // 侧边栏收起时展示 Icon
            variant='sidebar' // 侧边栏形状
        >
            <SidebarHeader  className='not-dark:bg-slate-50'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Logo/>
                    </SidebarMenuItem>

                    {/* 新建会话 */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className='w-4/5 mx-auto my-3 cursor-pointer  bg-sidebar-primary  hover:bg-sidebar-primary/80  active:bg-sidebar-primary text-sidebar-primary-foreground hover:text-sidebar-primary-foreground active:text-sidebar-primary-foreground'
                            tooltip='新建会话'
                        >
                            <Plus className='ml-auto'/>
                            <span className='mr-auto'> 新建会话 </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='not-dark:bg-slate-50'>
                <ScrollArea className={'h-full'}>
                {/* 边栏内容组 */}
               {/* <SideMenu/>*/}
                {/* 会话列表 */}
                <Conversations/>
                </ScrollArea>
            </SidebarContent>

            {/* 边栏底部 */}
            <SidebarFooter  className='not-dark:bg-slate-50'>
                <NavFooter/>
            </SidebarFooter>

            {/* 控制侧边栏右侧分割线实现收起、展开 */}
            <SidebarRail/>
        </Sidebar>
    );
};

export default ChatSidebar;