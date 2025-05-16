'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {ThumbsUp, ThumbsDown, Copy, User, ChevronDown, ChevronUp, Atom} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import MarkdownRender from "@/components/chat/markdown-render";
import {DeepSeekIcon} from "@/components/icons";
import {toast} from "sonner";
import {VoteType} from "@/types/message";
import {Loading} from "@/components/chat/loading";


interface ChatBubbleProps {
    msgId: string;
    role: 'user' | 'ai';
    content: string;   // 回答内容
    reasoningContent?: string; // 思考内容
    avatarSrc?: string;
    voteType?: VoteType;
    loading?: boolean;
    onLike?: (msgId: string, voteType: string) => void;
    onDislike?: (msgId: string, voteType: string) => void;
    onCopy?: () => void;
}

/**
 * 消息气泡组件
 *
 * @param role
 * @param content
 * @param reasoningContent
 * @param avatarSrc
 * @param voteType
 * @param loading
 * @param onLike
 * @param onDislike
 * @param onCopy
 * @constructor
 */
const ChatBubble = ({
                        msgId,
                        role,
                        content,
                        reasoningContent = '',
                        avatarSrc = '',
                        voteType = '',
                        loading,
                        onLike,
                        onDislike,
                        onCopy,
                    }: ChatBubbleProps) => {

    const isUser = role === 'user';
    const [openReasoning, setOpenReasoning] = useState<boolean>(true);
    const [vote, setVote] = useState(voteType)

    const toggleThinking = () => {
        setOpenReasoning(!openReasoning);
    };

    if (isUser) {
        // 用户提问气泡
        return (
            <div className="flex justify-end mb-4">
                <div className="max-w-[75%] bg-secondary text-secondary-foreground rounded-lg p-2">
                    <span className='text-sm'>{content}</span>
                </div>
                {/*{avatarSrc &&
                    <Avatar className="ml-3">
                        <AvatarImage src={avatarSrc} alt="Uer Avatar"/>
                        <AvatarFallback><User size={20}/></AvatarFallback>
                    </Avatar>
                }*/}
            </div>
        );
    } else {
        // AI 气泡
        return (
            <div className="flex items-start mb-4">
                {/* AI 头像 */}
                <div
                    className="size-8 flex items-center justify-center rounded-full mr-3 ring-1 shrink-0 ring-border bg-background">
                    <DeepSeekIcon size={25}/>
                </div>
                <div className="flex flex-col w-full max-w-[95%]">
                    {/* Loading */}
                    {(!reasoningContent && !content) && <Loading className='mr-auto'/> }

                    {/* 思考内容 */}
                    {reasoningContent && (
                        <div className="mb-3">
                            <Button
                                variant='secondary'
                                className="flex items-center text-sm text-muted-foreground p-1 h-auto mb-3"
                                onClick={toggleThinking}
                            >
                                <Atom size={16} className="mr-2"/>
                                深度思考
                                {openReasoning ?
                                    <ChevronUp size={16} className="ml-2"/> :
                                    <ChevronDown size={16} className="ml-2"/>
                                }
                            </Button>

                            {openReasoning && (
                                <div className="text-sm border-l-2 my-2 mr-2 pl-4 text-muted-foreground">
                                    <span className='text-sm'>{reasoningContent}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 回答内容 */}
                    {content && (
                        <div className="border-1 rounded-lg p-3 text-sm">
                            <MarkdownRender text={content}/>
                        </div>
                    )}

                    {/* 操作按钮 - 只在有消息时显示 */}
                    {(content && !loading) && (
                        <div className="flex items-center space-x-2 mt-2 ml-2 text-muted-foreground">
                            {onLike && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 cursor-pointer"
                                            onClick={() => {
                                                const newVote = vote === 'up' ? '' : 'up'
                                                setVote(newVote)
                                                onLike(msgId, newVote);
                                                toast.success("感谢您的支持")
                                            }}
                                        >
                                            {vote === 'up'
                                                ? <ThumbsUp size={14} fill='gray'/>
                                                : <ThumbsUp size={14}/>
                                            }
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className='text-primary-foreground'>喜欢</span>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            {onDislike && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 cursor-pointer"
                                            onClick={() => {
                                                const newVote = vote === 'down' ? '' : 'down'
                                                setVote(newVote)
                                                onDislike(msgId, newVote);
                                                toast.success("感谢您的反馈")
                                            }}
                                        >
                                            {vote === 'down'
                                                ? <ThumbsDown size={14} fill='gray'/>
                                                : <ThumbsDown size={14}/>
                                            }
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className='text-primary-foreground'>不喜欢</span>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            {onCopy && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6  cursor-pointer"
                                            onClick={() => {
                                                // 复制回答内容
                                                navigator.clipboard.writeText(content);
                                                if (onCopy) onCopy();

                                                toast.success("已复制")
                                            }}>
                                            <Copy size={14}/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className='text-primary-foreground'>复制</span>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default ChatBubble;

// 示例用法
export function ChatExample() {
    return (
        <div className=" space-y-4">
            <ChatBubble msgId={'1'} role="user" content="你是谁"/>
            <ChatBubble
                msgId={'2'}
                role="ai"
                reasoningContent="分析用户问题：用户想知道我的身份信息。我应该提供我的名称、开发公司以及基本功能介绍。"
                content="您好! 我是由中国的深度求索 (DeepSeek) 公司开发的智能助手DeepSeek-R1。如您有任何问题, 我会尽我所能为您提供帮助。"
                avatarSrc={'deepseek.svg'}
                onLike={() => console.log('Liked')}
                onDislike={() => console.log('Disliked')}
                onCopy={() => console.log('Copied')}
            />
            <ChatBubble
                msgId={'3'}
                role={'ai'}
                avatarSrc={'deepseek.svg'}
                content={'以下是用 Java 输出 "你好" 的简单代码示例：\n' +
                    '\n' +
                    '```java\n' +
                    'public class HelloWorld {\n' +
                    '    public static void main(String[] args) {\n' +
                    '        System.out.println("你好");\n' +
                    '    }\n' +
                    '}\n' +
                    '```\n'
                }
            />
        </div>
    );
}