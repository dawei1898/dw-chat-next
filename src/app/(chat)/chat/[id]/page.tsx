import React from 'react';
import ChatPage from "@/app/(chat)/chat/chat";

const Page = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const { id } = params;

    return (
        <>
            <ChatPage
                chatId={id}
            />
        </>
    );
};

export default Page;