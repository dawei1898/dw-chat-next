import React from 'react';
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {GithubIcon, UserIcon} from "@/components/icons";
import {BadgeCheck, ChevronsUpDown, LogOut, Settings} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/sidebar/theme-toggle";
import {LoginUser} from "@/types/user";
import {useAuth} from "@/components/provider/auth-provider";
import {useRouter} from "next/navigation";

const NavFooter = ({user}: { user?: LoginUser }) => {
    const {open, isMobile} = useSidebar();
    const {logout} = useAuth();
    const router = useRouter();

    return (
        <SidebarMenu>
            <SidebarMenuItem
                className={`flex justify-start ${open ? '' : 'flex-col-reverse gap-2'}`}
            >
                {/* 用户信息 */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className={'w-30'}
                        >
                            <UserIcon/>
                            <span>{user?.username}</span>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-40 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={-20}
                        alignOffset={50}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings/>
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={async () => {
                                await logout()
                                router.push('login')
                            }}
                        >
                            <LogOut/>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Github */}
                <SidebarMenuButton className='w-8 ml-auto cursor-pointer'>
                    <Link
                        key='github_link'
                        href='https://github.com/dawei1898/dw-chat-next'
                        target="_blank"
                    >
                        <GithubIcon/>
                    </Link>
                </SidebarMenuButton>

                {/* 切换亮暗 */}
                <ThemeToggle/>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default NavFooter;