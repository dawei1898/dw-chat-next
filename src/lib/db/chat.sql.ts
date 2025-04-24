import {db} from "@/lib/db/db";
import {Chat, chat} from "@/lib/db/schema";
import {desc, eq, sql} from "drizzle-orm";
import {generateUUID} from "@/lib/utils";


export async function selectChats(): Promise<Array<Chat>> {
    try {
        return await db.select().from(chat).orderBy(desc(chat.updatedAt));
    } catch (error) {
        console.error('Failed to selectChats.', error);
        throw error;
    }
}

export async function selectChatsByUserId(userId: string): Promise<Array<Chat>> {
    try {
        return await db.select().from(chat)
            .where(eq(chat.userId, userId))
            .orderBy(desc(chat.createdAt));
    } catch (error) {
        console.error('Failed to selectChatsByUserId.', error);
        throw error;
    }
}

export async function insertChat(data: {
    chatName: string, userId?: string
}): Promise<string> {
    try {
        const chatId = generateUUID();
        const {rowCount} = await db.insert(chat)
            .values({
                chatId: chatId,
                chatName: data.chatName,
                userId: data.userId,
            });
        if (rowCount === 1) {
            return chatId
        } else {
            return ''
        }
    } catch (error) {
        console.error('Failed to insertChat.', error);
        throw error;
    }
}

export async function updateChatById(data: {
    chatId: string,
    chatName: string,
    userId?: string
}): Promise<number | null> {
    try {
        const {rowCount} = await db.update(chat)
            .set({
                chatName: data.chatName,
                userId: data.userId ? data.userId : undefined,
                updatedAt: sql`NOW()`
            })
            .where(eq(chat.chatId, data.chatId));
        return rowCount;
    } catch (error) {
        console.error('Failed to updateChatById.', error);
        throw error;
    }
}

export async function deleteChatById(chatId: string): Promise<number | null> {
    try {
        const {rowCount} = await db.delete(chat).where(eq(chat.chatId, chatId));
        return rowCount;
    } catch (error) {
        console.error('Failed to deleteChatById.', error);
        throw error;
    }
}