import {
    bigint,
    integer,
    pgSchema,
    text,
    timestamp,
    uuid,
    varchar
} from "drizzle-orm/pg-core";
import {snowflake} from "@/utils/snowflake";
import {InferSelectModel} from "drizzle-orm";



/**
 * 用户表
 */
export const user = pgSchema('dwc').table('user', {
    id: bigint('id', {mode: 'bigint'}).primaryKey().$defaultFn(() => {
        return BigInt(snowflake.generate());
    }),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}),
    password: varchar('password', {length: 255}),
    createdAt: timestamp('created_at', {withTimezone: false}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: false}).defaultNow(),
});

export type User = InferSelectModel<typeof user>;


/**
 * 对话管理表
 */
export const chat = pgSchema('dwc').table('chat', {
    chatId: uuid('chat_id').primaryKey().notNull().defaultRandom(),
    chatName: varchar('chat_name', {length: 255}).notNull(),
    userId: bigint('user_id', {mode: 'bigint'}),
    createdAt: timestamp('created_at', {withTimezone: false}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: false}).defaultNow(),
});

export type Chat = InferSelectModel<typeof chat>;


/**
 * 对话消息表
 */
export const message = pgSchema('dwc').table('message', {
    msgId: bigint('msg_id', {mode: 'bigint'}).primaryKey().$defaultFn(() => {
        return BigInt(snowflake.generate());
    }),
    rawMsgId: varchar('raw_msg_id', {length: 64}),
    chatId: varchar('chat_id', {length: 64}).notNull(),
    role: varchar('role', {length: 16}).notNull(),
    content: text('content').notNull(),
    reasoningContent: text('reasoning_content'),
    tokens: integer('tokens'),
    modelId: varchar('model_id', {length: 128}),
    userId: bigint('user_id', {mode: 'bigint'}),
    createdAt: timestamp('created_at', {withTimezone: false}).defaultNow(),
});

export type Message = InferSelectModel<typeof message>;


/**
 * 消息评论表
 */
export const vote = pgSchema('dwc').table('vote', {
    id: bigint('id', {mode: 'bigint'}).primaryKey().$defaultFn(() => {
        return BigInt(snowflake.generate());
    }),
    msgId: bigint('msg_id', {mode: 'bigint'}).notNull(),
    voteType: varchar('vote_type', {length: 8}),
    userId: bigint('user_id', {mode: 'bigint'}),
    createdAt: timestamp('created_at', {withTimezone: false}).defaultNow(),
});

export type Vote = InferSelectModel<typeof vote>;