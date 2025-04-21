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
import ThemeToggle from "@/app/(chat)/chat/theme-toggle";

const NavFooter = () => {
    const {open, isMobile} = useSidebar();

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
                            <span>dawei</span>
                            <ChevronsUpDown className="ml-auto size-4" />
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
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            <Link href='/login'>
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Github */}
                <SidebarMenuButton className='w-8 ml-auto cursor-pointer'>
                    <GithubIcon/>
                </SidebarMenuButton>

                {/* 切换亮暗 */}
                <ThemeToggle/>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default NavFooter;