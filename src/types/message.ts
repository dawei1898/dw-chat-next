import {Message} from "@/lib/db/schema";


export type VoteType = 'up' | 'down' | ''

export interface MessageVo extends Message {
    voteType?: VoteType
}