import {db} from "@/lib/db/db";
import {Message, message} from "@/lib/db/schema";
import {asc, desc, eq, sql} from "drizzle-orm";

/**
 * 根据 chatId 查询信息列表
 * @param chatId
 */
export async function selectMessagesByChatId(chatId: string): Promise<Array<Message>> {
    return db.select().from(message)
        .where(eq(message.chatId, chatId))
        .orderBy(asc(message.createdAt));
}

/**
 * 根据 chatId 查询最近的信息列表
 * @param chatId
 * @param limit
 */
export async function selectLastMessagesByChatId(chatId: string, limit: number): Promise<Array<Message>> {
    return db.select().from(message)
        .where(eq(message.chatId, chatId))
        .limit(limit)
        .orderBy(desc(message.createdAt));
}


export async function insertMessage(data: {
    rawMsgId?: string,
    chatId: string,
    role: string,
    content: string,
    reasoningContent?: string,
    tokens?: number,
    modelId?: string,
    userId?: bigint
}): Promise<number | null> {
    const {rowCount} = await db.insert(message).values(data)
    return rowCount;
}


export async function deleteMessageById(msgId: bigint): Promise<number | null> {
    const {rowCount} = await db.delete(message).where(eq(message.msgId, msgId));
    return rowCount;
}