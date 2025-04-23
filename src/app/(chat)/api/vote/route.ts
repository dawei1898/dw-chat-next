import {NextRequest, NextResponse} from "next/server";
import {deleteChatById, insertChat, selectChatsByUserId, updateChatById} from "@/lib/db/chat.sql";
import {getUserCookieAction} from "@/app/(auth)/actions";
import {Chat} from "@/lib/db/schema";
import {redirect} from "next/navigation";
import {ApiResponse} from "@/types";
import {deleteVoteByMsgId, insertVote} from "@/lib/db/vote.sql";




/**
 *  点赞、点踩
 */
export async function POST(request: NextRequest) {
    try {
        const user = await getUserCookieAction();

        if (!user || !user.userId) {
            console.log('没有登录，跳转到登录页')
            //return NextResponse.json('Unauthorized!', { status: 401 })
            redirect('/login')
        }

        const {msgId, voteType} = await request.json();

        const i = await deleteVoteByMsgId(msgId);
        const count = await insertVote({
            msgId,
            voteType,
            userId: user.userId
        });

        return NextResponse.json({
            code: 200,
            message: 'success',
            data: count
        });
    } catch (e: any) {
        console.log('failed to save vote, ', e)
        return NextResponse.json({
            code: 500,
            message: e.message.toString(),
            data: 0
        });
    }
}

