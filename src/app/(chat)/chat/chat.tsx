"use client"

import React, {useEffect, useRef, useState} from 'react';
import ChatSender from './chat-sender';
import ChatHeader from "@/app/(chat)/chat/chat-header";
import ChatFooter from "@/app/(chat)/chat/chat-footer";
import ChatMessages from "@/app/(chat)/chat/chat-messages";
import InitWelcome from "@/app/(chat)/chat/init-welcome";
import {MessageVo} from "@/types/message";
import {ApiResponse} from "@/types";
import {EventSourceMessage, fetchEventSource} from "@microsoft/fetch-event-source";
import {snowflake} from "@/utils/snowflake";


interface ChatProps {
    chatId?: string,
    initMessages?: MessageVo[],
}

const ChatPage = (props: ChatProps) => {
    console.log('ChatPage')
    const [chatId, setChatId] = useState<string>(props.chatId || '');
    const [messages, setMessages] = useState<MessageVo[]>(props.initMessages || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState('');
    const abortControllerRef = useRef<AbortController | null>(null);

    // 通过 useEffect 清理函数自动取消未完成的请求：
    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;
        return () => {
            controller.abort('组件卸载，取消请求');
        };
    }, []);

    // 发送
    const handleSubmit  = async (message: string, openReasoning: boolean) => {
        if (!input.trim()) return

        const userMessage = {
            msgId: snowflake.generate().toString(),
            chatId: chatId,
            role: 'user',
            content: message,
            rawMsgId: '',
            reasoningContent: '',
            tokens: 0,
            modelId: '',
            userId: '',
            createdAt: null
        }
        setMessages(prev => [...prev, userMessage]);


        setInput('')
        setLoading(true)
        const aiMessage = {
            msgId: snowflake.generate().toString(),
            chatId: chatId,
            role: 'assistant',
            content: '',
            rawMsgId: '',
            reasoningContent: '',
            tokens: 0,
            modelId: '',
            userId: '',
            createdAt: null,
            loading: true
        }
        setMessages(prev => [...prev, aiMessage])


        await fetchEventSource('/api/sse/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId,
                content: message,
                openReasoning,
            }),
            signal: abortControllerRef.current?.signal, // 控制停止
            openWhenHidden: true,      // 在调用失败时禁止重复调用

            onopen(response: Response) {
                console.log('onopen: ' + JSON.stringify(response))
                return Promise.resolve();
            },
            onmessage(event: EventSourceMessage) {
                console.log('onmessage: ' + JSON.stringify(event))
                const data: { content: string; reasoningContent?: string } = JSON.parse(event.data);

                if (data.reasoningContent) {
                    setMessages(prev => {
                        const updated = [...prev]
                        const lastMsg = updated[updated.length - 1]
                        if (lastMsg.role === 'assistant') {
                            updated[updated.length - 1] = {
                                ...lastMsg,
                                role: 'assistant',
                                content: lastMsg.content || '',
                                reasoningContent: (lastMsg.reasoningContent || '') + (data.reasoningContent  || '') ,
                            }
                        }
                        return updated
                    })
                }
                if (data.content) {
                    setMessages(prev => {
                        const updated = [...prev]
                        const lastMsg = updated[updated.length - 1]
                        if (lastMsg.role === 'assistant') {
                            updated[updated.length - 1] = {
                                ...lastMsg,
                                role: 'assistant',
                                content: lastMsg.content + data.content,
                                reasoningContent: lastMsg.reasoningContent ,
                            }
                        }
                        return updated
                    })
                }
                //await new Promise(res => setTimeout(res, 10)) // 控制打字速度（可调）
            },
            onclose() {
                console.log('onclose ')
                setLoading(false)
                setMessages(prev => {
                    const updated = [...prev]
                    const lastMsg = updated[updated.length - 1]
                    if (lastMsg.role === 'assistant') {
                        updated[updated.length - 1] = {
                            ...lastMsg,
                            loading: false
                        }
                    }
                    return updated
                })
            },
            onerror(error) {
                console.log('error: ' + JSON.stringify(error))
                setLoading(false)
            }
        });
    }

    // 停止
    const handleCancel = () => {
        console.log('停止回答')
        setLoading(false)
        abortControllerRef.current?.abort('手动停止');
    }

    // 喜欢/不喜欢
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

    return (<>
        {/* 头部 */}
        <ChatHeader/>
        <div className='h-lvh w-full flex flex-col justify-center items-center '>
            {chatId ? (
                // 消息列表
                <ChatMessages
                    chatId={chatId}
                    messages={messages}
                    onLike={handleSaveVote}
                    onDislike={handleSaveVote}
                />
            ) : (
                <InitWelcome/>
            )}

            {/* 发送框 */}
            <ChatSender
                value={input}
                onChangeValue={setInput}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
        {/* 页脚 */}
        <ChatFooter/>
    </>);
};

export default ChatPage;