import React from 'react';
import ChatSidebarTrigger from "@/components/sidebar/chat-sidebar-trigger";

/**
 * 聊天页面头部
 */
const ChatHeader = () => {
    return (
        /* 上浮 */
        <header className={'fixed z-10'}>
            <div className='flex justify-start items-center h-12 w-30 p-3 space-x-2'>
                {/* 自定义侧边栏开关 */}
                <ChatSidebarTrigger/>
            </div>
        </header>
    );
};

export default ChatHeader;