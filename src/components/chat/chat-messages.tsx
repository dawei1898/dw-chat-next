'use client';

import React, {useEffect, useRef} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import ChatBubble from "@/components/chat/chat-bubble";
import {MessageVo} from "@/types/message";


interface ChatMessagesProps {
    chatId?: string,
    messages?: MessageVo[],
    onLike?: (msgId: string, voteType: string) => void;
    onDislike?: (msgId: string, voteType: string) => void;
}

/**
 * 消息列表
 *
 * @param props
 * @constructor
 */
const ChatMessages = (props: ChatMessagesProps) => {
    console.debug('ChatMessages，messages:', JSON.stringify(props.messages))
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
            scrollToBottom()
        },
        [props.messages]
    )

    // 滑动到底部
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }


    return (<>
        <ScrollArea className={'h-12/15 w-full my-2'}>
            <div className="h-full max-w-2xl  mx-auto space-y-4">
                {props.messages && props.messages.map((item) => (
                    <ChatBubble
                        key={item.msgId}
                        msgId={item.msgId}
                        role={item.role === 'user' ? 'user' : 'ai'}
                        reasoningContent={item.reasoningContent || ''}
                        content={item.content}
                        voteType={item.voteType}
                        loading={item.loading}
                        onLike={props.onLike}
                        onDislike={props.onDislike}
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