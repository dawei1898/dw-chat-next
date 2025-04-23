import {db} from "@/lib/db/db";
import {Vote, vote} from "@/lib/db/schema";
import {eq, sql} from "drizzle-orm";


export async function selectVotes(): Promise<Array<Vote>> {
    try {
        return await db.select().from(vote);
    } catch (error) {
        console.error('Failed to selectVotes.', error);
        throw error;
    }
}

export async function selectVoteByMsgIds(msgIds: bigint[]): Promise<Array<Vote>> {
    try {
        return await db.select().from(vote)
            .where(
                sql`msg_id in ( ${msgIds} )`
            );
    } catch (error) {
        console.error('Failed to selectVotes.', error);
        throw error;
    }
}

export async function insertVote(data: {
    msgId: string, voteType: string, userId: string
}): Promise<number | null> {
    try {
        const {rowCount} = await db.insert(vote)
            .values({
                msgId: data.msgId,
                voteType: data.voteType,
                userId: data.userId
            });
        return rowCount;
    } catch (error) {
        console.error('Failed to insertVote.', error);
        throw error;
    }
}

export async function updateVoteById(data: {
    id: string,
    msgId: string,
    voteType: string,
    userId?: string
}): Promise<number | null> {
    try {
        const {rowCount} = await db.update(vote)
            .set({
                msgId: data.msgId,
                voteType: data.voteType,
                userId: data.userId ? data.userId : undefined
            })
            .where(eq(vote.id, data.id));
        return rowCount;
    } catch (error) {
        console.error('Failed to updateVoteById.', error);
        throw error;
    }
}

export async function deleteVoteById(id: string): Promise<number | null> {
    try {
        const {rowCount} = await db.delete(vote).where(eq(vote.id, id));
        return rowCount;
    } catch (error) {
        console.error('Failed to deleteVoteById.', error);
        throw error;
    }
}