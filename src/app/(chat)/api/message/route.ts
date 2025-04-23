import {NextRequest, NextResponse} from "next/server";
import {deleteChatById, insertChat, selectChatsByUserId, updateChatById} from "@/lib/db/chat.sql";
import {getUserCookieAction} from "@/app/(auth)/actions";
import {Chat} from "@/lib/db/schema";
import {redirect} from "next/navigation";
import {ApiResponse} from "@/types";


/**
 * 查询消息列表
 */
export async function GET(request: NextRequest) {

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

