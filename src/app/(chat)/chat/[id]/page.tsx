import React from 'react';
import ChatPage from "@/components/chat/chat";
import {fetchMessages} from "@/app/(chat)/actions";

/**
 * 选中会话项的消息列表页，服务端组件
 *
 * @param props
 * @constructor
 */
const Page = async (props: { params: Promise<{ id: string }> }) => {
    console.log('chat [id] page')
    const params = await props.params;
    const { id } = params;

    const initMessages = await fetchMessages(id);
    console.log('initMessages:', JSON.stringify(initMessages))

    return (
        <>
            <ChatPage
                chatId={id}
                initMessages={initMessages}
            />
        </>
    );
};

export default Page;