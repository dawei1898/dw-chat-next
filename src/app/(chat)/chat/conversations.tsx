import React from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {  MoreHorizontal } from "lucide-react";

import MenuEditItem from "@/app/(chat)/chat/menu-edit-item";
import MenuDeleteItem from "@/app/(chat)/chat/menu-delete-item";


/**
 * 会话列表
 *
 */
const ConversationsPage = () => {
    const {open} = useSidebar();

    return (open &&
        <SidebarGroup>
            <SidebarGroupLabel>今天</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem key={1}>
                        <SidebarMenuButton className='cursor-pointer' asChild>
                            <span>conversation 1</span>
                        </SidebarMenuButton>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction className='cursor-pointer'>
                                    <MoreHorizontal/>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side='right' align='end'>
                                <MenuEditItem/>
                                <MenuDeleteItem/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>

                    <SidebarMenuItem key={2}>
                        <SidebarMenuButton asChild>
                            <span>conversation 2</span>
                        </SidebarMenuButton>
                        <SidebarMenuAction>
                            ...
                        </SidebarMenuAction>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>

            <SidebarGroupLabel>最近一周</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {Array.from({length: 5}).map((_, index) => (
                        <SidebarMenuItem key={`${index + 3}`}>
                            <SidebarMenuButton asChild>
                                <span>{`conversation ${index + 3}`}</span>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                ...
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>

            <SidebarGroupLabel>最近30天</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {Array.from({length: 10}).map((_, index) => (
                        <SidebarMenuItem key={`${index + 8}`}>
                            <SidebarMenuButton asChild>
                                <span>{`conversation ${index + 8}`}</span>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                ...
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default ConversationsPage;