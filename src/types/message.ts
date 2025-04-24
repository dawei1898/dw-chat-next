import {Message} from "@/lib/db/schema";


export type VoteType = 'up' | 'down' | ''

export type Role = 'user' | 'assistant'

export interface MessageVo extends Message {
    voteType?: VoteType,
    loading?: boolean,
}