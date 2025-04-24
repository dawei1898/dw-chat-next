import React from 'react';

const ChatFooter = () => {
    return (<>
            <footer className='fixed bottom-0 w-full'>
                <div className='flex  items-center h-6'>
                    <span className='text-[13px] text-foreground/50 ml-[36%]'>
                        内容由 AI 生成，请仔细甄别
                    </span>
                </div>
            </footer>
        </>
    );
};

export default ChatFooter;