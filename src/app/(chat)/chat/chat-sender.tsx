"use client"

import React, {useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ArrowUp, Atom, Paperclip} from "lucide-react";
import {GlobeIcon, StopIcon} from "@/components/icons";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";



interface ChatSenderProps {
    value?: string;
    onChangeValue?: (value: string) => void;
    loading?: boolean;
    onSubmit?: (message: string, openReasoning: boolean) => void;
    onCancel?: () => void;
}

/**
 * 发送框组件
 */
const ChatSender = (props: ChatSenderProps) => {
    const [input, setInput] = useState(props.value);
    const [openReasoning, setOpenReasoning] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    //const [loading, setLoading] = useState<boolean>(false);

    // 发送
    /*const onSubmit = async (msg?: string) => {
        setInput('');
        return new Promise(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);
        });
    }*/

    return (
        <div
            className="max-w-2xl w-full mt-auto mb-7 bg-background rounded-2xl
                        outline-1 focus-within:outline-2 -outline-offset-1 focus-within:-outline-offset-2
                         outline-muted-foreground/50 focus-within:outline-primary"
        >
            {/* 输入框 */}
            <Textarea
                className="max-h-[150px] border-none shadow-none resize-none focus-visible:ring-transparent mt-1"
                placeholder="请输入你的问题..."
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                    if (props.onChangeValue) {
                        props.onChangeValue(e.target.value)
                    }
                }}
            >
            </Textarea>

            <div className='flex items-center space-x-2 py-2 px-4 '>
                {/* 深度思考 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className={`h-7 cursor-pointer ${openReasoning ? 'bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary' : ''}`}
                            variant='outline'
                            onClick={() => setOpenReasoning(!openReasoning)}
                        >
                            <Atom/>
                            <span className='text-sm'>深度思考</span>
                        </Button>
                    </TooltipTrigger>
                    {!openReasoning ?
                        <TooltipContent side='left'>
                            <span className='text-primary-foreground'>
                                先思考后回答，解决推理问题
                            </span>
                        </TooltipContent>
                        : undefined
                    }
                </Tooltip>

                {/* 联网搜索 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className={`h-7 cursor-pointer ${openSearch ? 'bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary' : ''}`}
                            variant='outline'
                            onClick={() => setOpenSearch(!openSearch)}
                        >
                            <GlobeIcon/>
                            <span>联网搜索</span>
                        </Button>
                    </TooltipTrigger>
                    {!openSearch ?
                        <TooltipContent side='right'>
                            <span className='text-primary-foreground'>
                                按需搜索网页
                            </span>
                        </TooltipContent>
                        : undefined
                    }
                </Tooltip>

                {/* 附件 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className='h-7 w-7 ml-auto cursor-pointer'
                            variant="ghost"
                            size="icon"
                        >
                            <Paperclip/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className='text-primary-foreground'>添加文件</span>
                    </TooltipContent>
                </Tooltip>

                {!props.loading ?
                    /* 发送 */
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className='h-7 w-7 rounded-full cursor-pointer active:bg-primary'
                                size='icon'
                                type='submit'
                                disabled={props.value === '' && !props.loading}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        if (props.onSubmit && input) {
                                            props.onSubmit(input, openReasoning)
                                            setInput('')
                                        }
                                    }
                                }}
                                onClick={() => {
                                    if (props.onSubmit && input) {
                                        props.onSubmit(input, openReasoning)
                                        setInput('')
                                    }
                                }}
                            >
                                <ArrowUp/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className='text-primary-foreground'>发送</span>
                        </TooltipContent>
                    </Tooltip>

                    /* 停止 */
                    :
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className='h-7 w-7 rounded-full cursor-pointer active:bg-primary'
                                size='icon'
                                onClick={() => {
                                    if (props.onCancel) {
                                        props.onCancel
                                    }
                                    //setLoading(false)
                                }}

                            >
                                <StopIcon/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent >
                            <span className='text-primary-foreground'>停止</span>
                        </TooltipContent>
                    </Tooltip>
                }
            </div>
        </div>
    );
};

export default ChatSender;