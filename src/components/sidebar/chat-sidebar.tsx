'use client';

import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/sidebar/logo";
import Conversations from "@/components/sidebar/conversations";
import NavFooter from "@/components/sidebar/nav-footer";
import AddConversation from "@/components/sidebar/add-conversation";
import {LoginUser} from "@/types/user";







type ChatSidebarProps = {
    user?: LoginUser;
}

/**
 * 自定义侧边栏
 */
const ChatSidebar = (props: ChatSidebarProps) => {

    return (
        <Sidebar
            side='left' // 侧边栏位置
            collapsible='icon' // 侧边栏收起时展示 Icon
            variant='sidebar' // 侧边栏形状
        >
            <SidebarHeader  className='not-dark:bg-slate-50'>
                <SidebarMenu>
                    {/* Logo & Title */}
                    <SidebarMenuItem>
                        <Logo/>
                    </SidebarMenuItem>

                    {/* 新建会话 */}
                    <SidebarMenuItem>
                        <AddConversation/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='not-dark:bg-slate-50'>
                {/* 会话列表 */}
                <Conversations user={props.user}/>
            </SidebarContent>

            {/* 边栏底部 */}
            <SidebarFooter  className='not-dark:bg-slate-50'>
                <NavFooter user={props.user}/>
            </SidebarFooter>

            {/* 控制侧边栏右侧分割线实现收起、展开 */}
            <SidebarRail/>
        </Sidebar>
    );
};

export default ChatSidebar;