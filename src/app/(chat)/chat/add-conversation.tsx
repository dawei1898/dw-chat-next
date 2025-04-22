'use client';

import React from 'react';
import {Plus} from "lucide-react";
import {SidebarMenuButton} from "@/components/ui/sidebar";
import {useRouter} from "next/navigation";


const AddConversation = () => {
    const router = useRouter();

    return (
        <SidebarMenuButton
            className='w-4/5 mx-auto my-3 cursor-pointer  bg-sidebar-primary
                                hover:bg-sidebar-primary/80  active:bg-sidebar-primary
                                text-sidebar-primary-foreground hover:text-sidebar-primary-foreground
                                active:text-sidebar-primary-foreground'
            tooltip='新建会话'
            onClick={() => {
                router.push('/')
            }}
        >
            <Plus className='ml-auto'/>
            <span className='mr-auto'> 新建会话 </span>
        </SidebarMenuButton>
    );
};

export default AddConversation;