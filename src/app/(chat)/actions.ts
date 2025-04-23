import {selectMessagesByChatId} from "@/lib/db/message.sql";
import {MessageVo, VoteType} from "@/types/message";
import {Vote} from "@/lib/db/schema";
import {selectVoteByMsgIds} from "@/lib/db/vote.sql";


/**
 * 根据 chatId 查询消息列表
 */
export async function fetchMessages(chatId: string): Promise<MessageVo[]> {
    if (!chatId) {
        return []
    }
    const messages = await selectMessagesByChatId(chatId);
    if (!messages) {
        return [];
    }
    // 从 messages 中过滤出所有的 msgId
    const msgIds = messages.map((item) => item.msgId);
    // 查询 vote 表
    const votes: Vote[] = await selectVoteByMsgIds(msgIds);
    // 将 votes 与 messages 进行匹配，并更新 voteType
    return messages.map((item) => {
        const vote = votes.find((vote) => vote.msgId === item.msgId);
        return {
            ...item,
            voteType: vote ? vote.voteType as VoteType : ''
        };
    });
}