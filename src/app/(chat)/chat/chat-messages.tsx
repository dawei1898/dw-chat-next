import React, {useEffect, useRef} from 'react';
import {ChatExample} from "@/app/(chat)/chat/chat-bubble";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {appConfig} from "@/utils/app-config";


interface ChatMessagesProps {
    initMessages?: []
}

const ChatMessages = (props: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)



    useEffect(() => {
            scrollToBottom()
        },
        []
        //[messages, aiTyping]
    )

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }


    return (<>
        <ScrollArea className={'h-12/15 w-full my-2'}>
            {<div className="h-full max-w-2xl  mx-auto space-y-4">

                {<ChatExample/>}

              {Array.from({length: 50}).map((_, e) => (
                    <p key={e}>{`message: ${e}`}</p>

                ))}

            </div>}

            <div ref={messagesEndRef}/>
        </ScrollArea>
            </>);
};

export default ChatMessages;