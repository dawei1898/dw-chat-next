import {db} from "@/lib/db/db";
import {Vote, vote} from "@/lib/db/schema";
import {eq, inArray, sql} from "drizzle-orm";


export async function selectVotes(): Promise<Array<Vote>> {
    try {
        return await db.select().from(vote);
    } catch (error) {
        console.error('Failed to selectVotes.', error);
        throw error;
    }
}

export async function selectVoteByMsgIds(msgIds: string[]): Promise<Vote[]> {
    if (!msgIds?.length) {
        console.warn('Empty msgIds array provided');
        return [];
    }
    try {
        return await db.select()
            .from(vote)
            .where(inArray(vote.msgId, msgIds));
    } catch (error) {
        console.error('Failed to select votes for msgIds:', msgIds, error);
        throw new Error(`Failed to fetch votes: ${error instanceof Error ? error.message : String(error)}`);
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

export async function deleteVoteByMsgId(msgId: string): Promise<number | null> {
    try {
        const {rowCount} = await db.delete(vote).where(eq(vote.msgId, msgId));
        return rowCount;
    } catch (error) {
        console.error('Failed to deleteVoteByMsgId.', error);
        throw error;
    }
}