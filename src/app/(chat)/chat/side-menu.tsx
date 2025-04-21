import React from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
} from "lucide-react"


// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: <Home/>,
    },
    {
        title: "Inbox",
        url: "#",
        icon: <Inbox/>,
    },
    {
        title: "Calendar",
        url: "#",
        icon: <Calendar/>,
    },
    {
        title: "Search",
        url: "#",
        icon: <Search/>,
    },
    {
        title: "Settings",
        url: "#",
        icon: <Settings/>,
    },
]

const SideMenu = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>App</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                            >
                                <a href={item.url}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default SideMenu;