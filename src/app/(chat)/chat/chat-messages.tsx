'use client';

import React, {useEffect, useRef, useState} from 'react';
import ChatBubble, {ChatExample} from "@/app/(chat)/chat/chat-bubble";
import {ScrollArea} from "@/components/ui/scroll-area";

import {MessageVo} from "@/types/message";
import {toast} from "sonner";
import {ApiResponse} from "@/types";


interface ChatMessagesProps {
    chatId?: string,
    initMessages?: MessageVo[],
}

/**
 * 消息列表
 *
 * @param props
 * @constructor
 */
const ChatMessages = (props: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<MessageVo[] | undefined>(props.initMessages)
    const [chatId, setChatId] = useState<string>(props.chatId || '')


    useEffect(() => {
            scrollToBottom()
        },
        []
        //[messages, aiTyping]
    )

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }


    // 喜欢
    const handleSaveVote = async (msgId: string, voteType: string) => {
        const resp: ApiResponse = await fetch(`/api/vote`, {
            method: 'POST',
            body: JSON.stringify({msgId, voteType})
        }).then(r => r.json());

        if (resp.code === 200) {
            console.log('点喜欢成功')

        } else {
            console.error('点喜欢失败')
        }
    }

    // 不喜欢

    return (<>
        <ScrollArea className={'h-12/15 w-full my-2'}>
            <div className="h-full max-w-2xl  mx-auto space-y-4">
                {messages && messages.map((item) => (
                    <ChatBubble
                        key={item.msgId}
                        msgId={item.msgId}
                        role={item.role === 'user' ? 'user' : 'ai'}
                        reasoningContent={item.reasoningContent || ''}
                        content={item.content}
                        avatarSrc={'deepseek.svg'}
                        voteType={item.voteType}
                        onLike={handleSaveVote}
                        onDislike={handleSaveVote}
                        onCopy={() => console.log('Copied')}
                    />
                ))}

                {/*{<ChatExample/>}

              {Array.from({length: 50}).map((_, e) => (
                    <p key={e}>{`message: ${e}`}</p>

                ))}*/}

            </div>

            <div ref={messagesEndRef}/>
        </ScrollArea>
    </>);
};

export default ChatMessages;