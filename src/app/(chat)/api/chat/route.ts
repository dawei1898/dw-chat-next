import {NextRequest, NextResponse} from "next/server";
import {deleteChatById, insertChat, selectChatsByUserId, updateChatById} from "@/lib/db/chat.sql";
import {getUserCookieAction} from "@/app/(auth)/actions";
import {Chat} from "@/lib/db/schema";
import {redirect} from "next/navigation";
import {ApiResponse} from "@/types";


/**
 * 查询会话列表
 */
export async function GET() {
    const user = await getUserCookieAction();

    if (!user || !user.userId) {
        console.log('没有登录，跳转到登录页')
        //return NextResponse.json('Unauthorized!', { status: 401 })
        redirect('/login')
    }
    const chats: Chat[] = await selectChatsByUserId(user.userId);

    return NextResponse.json(chats);
}

/**
 * 新增会话
 */
export async function POST(request: NextRequest) {
    const user = await getUserCookieAction();

    if (!user || !user.userId) {
        console.log('没有登录，跳转到登录页')
        //return NextResponse.json('Unauthorized!', { status: 401 })
        redirect('/login')
    }

    const {chatName} = await request.json();

    const count = await insertChat({chatName: chatName, userId: user.userId});

    return NextResponse.json({count: count});
}

/**
 * 修改会话名称
 */
export async function PUT(request: NextRequest):Promise<NextResponse<ApiResponse<number | null>>> {
    try {
        const user = await getUserCookieAction();

        if (!user || !user.userId) {
            console.log('没有登录，跳转到登录页')
            //return NextResponse.json('Unauthorized!', { status: 401 })
            redirect('/login')
        }

        const {chatId, chatName} = await request.json();

        const count = await updateChatById({
            chatId: chatId,
            chatName: chatName,
            userId: user.userId
        });


        return NextResponse.json({
            code: 200,
            message: 'success',
            data: count
        });
    } catch (e: any) {
        console.log('failed to update chat, ', e)
        return NextResponse.json({
            code: 500,
            message: e.message.toString(),
            data: 0
        });
    }
}

/**
 * 删除会话
 */
export async function DELETE(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const chatId = searchParams.get('chatId') || '';

        if (!chatId) {
            //return NextResponse.json('Unauthorized!', { status: 401 })
            redirect('/login')
        }

        const user = await getUserCookieAction();

        if (!user || !user.userId) {
            console.log('没有登录，跳转到登录页')
            return NextResponse.json('Unauthorized!', {status: 401})
        }

        const count = await deleteChatById(chatId);

        return NextResponse.json({
            code: 200,
            message: 'success',
            data: count
        });
    } catch (e: any) {
        console.log('failed to delete chat, ', e)
        return NextResponse.json({
            code: 500,
            message: e.message.toString(),
            data: 0
        });
    }
}
