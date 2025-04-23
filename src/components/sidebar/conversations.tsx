'use client';

import React, {useEffect, useState} from 'react';
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
import {MoreHorizontal} from "lucide-react";

import MenuEditItem from "@/components/sidebar/menu-edit-item";
import MenuDeleteItem from "@/components/sidebar/menu-delete-item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useParams, usePathname, useRouter} from "next/navigation";
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import {Chat} from "@/lib/db/schema";
import {LoginUser} from "@/types/user";
import {toast} from "sonner";
import {ApiResponse} from "@/types";


/**
 * 会话列表
 *
 */
const ConversationsPage = ({user}: { user: LoginUser | undefined }) => {
    //console.log('ConversationsPage')

    const {id: chatId} = useParams();
    const pathname = usePathname();
    const {open} = useSidebar();
    const router = useRouter();
    const [selectedChatId, setSelectedChatId] = useState<string | undefined>(chatId?.toString())

    const {
        data: chats,
        isLoading,
        error,
        mutate,
    } = useSWR<Array<Chat>>(user ? '/api/chat' : null, fetcher, {
        fallbackData: [],
    });

    useEffect(() => {
        mutate();
    }, [pathname, mutate]);

    // 新增会话
    const handleAdd = async (
        {chatName}: { chatName: string }
    ) => {
        const resp = await fetch(`/api/chat`, {
            method: 'POST',
            body: JSON.stringify({chatName})
        });
        const {count} = await resp.json();
        if (count === 1) {
            console.log('新增会话成功')
        } else {
            console.error('新增会话失败')
        }
    }

    // 重命名会话
    const handleRename = async (
        chatId: string, chatName: string
    ) => {
        const resp: ApiResponse = await fetch(`/api/chat`, {
            method: 'PUT',
            body: JSON.stringify({chatId, chatName})
        }).then(r => r.json());

        if (resp.code === 200) {
            toast.success('修改会话成功')
            mutate();
        } else {
            toast.error('修改会话失败')
        }
    }

    // 删除会话
    const handleDelete = async (deleteChatId: string) => {
        const resp: ApiResponse = await fetch(`/api/chat?chatId=${deleteChatId}`, {
            method: 'DELETE',
        }).then(r => r.json());

        if (resp.code === 200) {
            toast.success('删除会话成功')
            if (deleteChatId === chatId?.toString()) {
                router.push('/');
            } else {
                mutate();
            }
        } else {
            toast.error('删除会话失败')
        }
    }


    return (open &&
        <ScrollArea className={'h-full'}>
            <SidebarGroup>
                <SidebarGroupLabel>今天</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {chats && chats.map((item) => (
                            <SidebarMenuItem key={item.chatId}>
                                <SidebarMenuButton
                                    asChild
                                    className='cursor-pointer'
                                    isActive={item.chatId === selectedChatId}
                                    onClick={() => {
                                        setSelectedChatId(item.chatId)
                                        router.push(`/chat/${item.chatId}`)
                                    }}
                                >
                                    <span>{item.chatName}</span>
                                </SidebarMenuButton>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction className='cursor-pointer'>
                                            <MoreHorizontal/>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side='right' align='end'>
                                        <MenuEditItem
                                            chatId={item.chatId}
                                            chatName={item.chatName}
                                            onEdit={(chatId, chatName) => handleRename(chatId, chatName)}
                                        />
                                        <MenuDeleteItem
                                            chatId={item.chatId}
                                            onDelete={() => handleDelete(item.chatId)}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>)
                        )
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </ScrollArea>

    );
};

export default ConversationsPage;