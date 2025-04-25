
-- 初始化建表SQL
-- Target Server Type    : PostgresSQL
-- Source Schema         : dwc

-- 用户表

DROP TABLE IF EXISTS "dwc"."user";
CREATE TABLE "dwc"."user" (
  "id"  varchar(64) NOT NULL,
  "name" varchar(255)  NOT NULL,
  "email" varchar(255) ,
  "password" varchar(255)  ,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY( "id" )
);
 
COMMENT ON COLUMN "dwc"."user"."id" IS 'ID';
COMMENT ON COLUMN "dwc"."user"."name" IS '用户名';
COMMENT ON COLUMN "dwc"."user"."email" IS '邮箱';
COMMENT ON COLUMN "dwc"."user"."password" IS '密码';
COMMENT ON COLUMN "dwc"."user"."created_at" IS '创建时间';
COMMENT ON COLUMN "dwc"."user"."updated_at" IS '修改时间';
COMMENT ON TABLE   "dwc"."user" IS '用户表';

-- 插入数据
INSERT INTO "dwc"."user" ("id","name","email", "password") VALUES ('40417676279025664','dawei', 'dawei@gmail.com','123456');




 -- 会话记录表

DROP TABLE IF EXISTS "dwc"."chat";
CREATE TABLE "dwc"."chat" (
  "chat_id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "chat_name" varchar(255) NOT NULL,
  "user_id" varchar(64) ,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY( "chat_id" )
);
 
COMMENT ON COLUMN "dwc"."chat"."chat_id" IS '会话ID';
COMMENT ON COLUMN "dwc"."chat"."chat_name" IS '会话名称';
COMMENT ON COLUMN "dwc"."chat"."user_id" IS '用户ID ';
COMMENT ON COLUMN "dwc"."chat"."created_at" IS '创建时间';
COMMENT ON COLUMN "dwc"."chat"."updated_at" IS '修改时间';
COMMENT ON TABLE  "dwc"."chat" IS '会话记录表';



-- 对话消息表

DROP TABLE IF EXISTS "dwc"."message";
CREATE TABLE "dwc"."message" (
  "msg_id" varchar(64)  NOT NULL,
  "raw_msg_id" varchar(64) ,
  "chat_id" varchar(64)  NOT NULL,
  "role" varchar(16) NOT NULL,
  "content" text NOT NULL,
  "reasoning_content" text  ,
  "tokens" INT4,
  "model_id" varchar(128) ,
  "user_id"  varchar(64),
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY( "msg_id" )
);
 
COMMENT ON COLUMN "dwc"."message"."msg_id" IS '消息ID';
COMMENT ON COLUMN "dwc"."message"."raw_msg_id" IS '原始消息ID';
COMMENT ON COLUMN "dwc"."message"."chat_id" IS '会话ID';
COMMENT ON COLUMN "dwc"."message"."role" IS '角色（user-用户，assistant-AI助手）';
COMMENT ON COLUMN "dwc"."message"."content" IS '消息内容';
COMMENT ON COLUMN "dwc"."message"."reasoning_content" IS '思考内容';
COMMENT ON COLUMN "dwc"."message"."tokens" IS '消耗token数';
COMMENT ON COLUMN "dwc"."message"."model_id" IS '模型ID';
COMMENT ON COLUMN "dwc"."message"."user_id" IS '用户ID ';
COMMENT ON COLUMN "dwc"."message"."created_at" IS '创建时间';
COMMENT ON TABLE  "dwc"."message" IS '聊天消息表';



-- 消息评论表
 
DROP TABLE IF EXISTS "dwc"."vote";
CREATE TABLE "dwc"."vote" (
  "id"  varchar(64),
  "msg_id" varchar(64) NOT NULL,
  "vote_type" varchar(8),
  "user_id"  varchar(64),
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY( "id" )
);
 
COMMENT ON COLUMN "dwc"."vote"."id" IS '主键ID';
COMMENT ON COLUMN "dwc"."vote"."msg_id" IS '消息ID ';
COMMENT ON COLUMN "dwc"."vote"."vote_type" IS 'up-喜欢，down-不喜欢';
COMMENT ON COLUMN "dwc"."vote"."user_id" IS '用户ID ';
COMMENT ON COLUMN "dwc"."vote"."created_at" IS '创建时间';
COMMENT ON TABLE  "dwc"."vote" IS '消息评论表';


