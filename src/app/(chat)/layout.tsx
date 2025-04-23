import React from "react";
import ChatSidebar from "@/components/sidebar/chat-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {getUserCookieAction} from "@/app/(auth)/actions";
import {LoginUser} from "@/types/user";
import {redirect} from "next/navigation";


const ChatLayout = async (
    {children}: { children: React.ReactNode }
) => {

    const user: LoginUser | undefined = await getUserCookieAction();
    if (!user) {
        console.log('没有登录，跳转到登录页')
        redirect('/login');
    }

    return (
        <SidebarProvider>
            <ChatSidebar user={user}/>

            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ChatLayout;