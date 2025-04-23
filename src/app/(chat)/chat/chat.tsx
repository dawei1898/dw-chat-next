"use client"

import React from 'react';
import ChatSender from './chat-sender';
import ChatHeader from "@/app/(chat)/chat/chat-header";
import ChatFooter from "@/app/(chat)/chat/chat-footer";
import ChatMessages from "@/app/(chat)/chat/chat-messages";
import InitWelcome from "@/app/(chat)/chat/init-welcome";
import {MessageVo} from "@/types/message";

interface ChatProps {
    chatId?: string,
    initMessages?: MessageVo[],
}

const ChatPage = (props: ChatProps) => {

    return (<>
        {/* 头部 */}
        <ChatHeader/>
        <div className='h-lvh w-full flex flex-col justify-center items-center '>
            {props.chatId ? (
                // 消息列表
                <ChatMessages chatId={props.chatId} initMessages={props.initMessages}/>
            ) : (
                <InitWelcome/>
            )}

            {/* 发送框 */}
            <ChatSender/>
        </div>
        {/* 页脚 */}
        <ChatFooter/>
    </>);
};

export default ChatPage;