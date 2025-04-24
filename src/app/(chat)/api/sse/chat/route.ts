import { OpenAI } from 'openai'
import {getUserCookieAction} from "@/app/(auth)/actions";
import {redirect} from "next/navigation";
import {insertMessage} from "@/lib/db/message.sql";
import {snowflake} from "@/utils/snowflake";

const MODEL_CHAT = 'deepseek-chat'
const MODEL_REASONER = 'deepseek-reasoner'

const openai = new OpenAI({
    baseURL: process.env.NEXT_PUBLIC_DEEPSEEK_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,
});


/**
 * 流式对话
 *
 * @param req
 * @constructor
 */
export async function POST(req: Request) {

    const user = await getUserCookieAction();
    if (!user || !user.userId) {
        console.log('没有登录，跳转到登录页')
        redirect('/login')
    }

    const { chatId, content, openReasoning } = await req.json()
    if (!chatId || !content) {
        console.log('chatId or content is null')
        throw new Error('chatId or content is null')
    }

    const model = openReasoning ? MODEL_REASONER : MODEL_CHAT;

    // 保存用户提问
    const userMessage = {
        chatId: chatId,
        role: 'user',
        content: content,
        modelId: model,
        userId: user.userId,
    }
    await insertMessage(userMessage);
    console.log('Save user message: ', JSON.stringify(userMessage))

    const aiMessage = {
        msgId: snowflake.generate().toString(),
        rawMsgId: '',
        chatId: chatId,
        role: 'assistant',
        content: '',
        reasoningContent: '',
        tokens: undefined,
        modelId: model,
        userId: '',
    }
    let respContent: string = '';
    let reasoningContent: string = '';
    let rawMsgId: string = '';

    // 调起AI对话
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        async start(controller) {
            const response = await openai.chat.completions.create({
                model: model,
                stream: true,
                messages: [
                    {
                        role: 'user',
                        content: content,
                    },
                ],
            })

            for await (const chunk of response) {
                //console.log('chunk:', JSON.stringify(chunk))

                // 思考内容
                const reasoning_content: string = (chunk.choices[0]?.delta as any)?.reasoning_content
                if (reasoning_content) {
                    reasoningContent += reasoning_content
                    aiMessage.reasoningContent = reasoning_content
                }
                // 回答内容
                const content: any = chunk.choices[0]?.delta?.content
                if (content) {
                    respContent += content
                    aiMessage.content = content
                }
                const data: string = JSON.stringify(aiMessage)
                controller.enqueue(encoder.encode(`data: ${data}\n\n`)) // 结尾必须 加上 '\n\n' SEE 才生效

            }
            //controller.enqueue(encoder.encode('data: [DONE]\n\n'))

            // 保存 AI 回答
            aiMessage.rawMsgId = rawMsgId
            aiMessage.content = respContent
            aiMessage.reasoningContent = reasoningContent
            aiMessage.userId = user.userId
            await insertMessage(aiMessage)
            console.log('Save ai message: ', JSON.stringify(aiMessage))

            // 结束
            controller.close()
        },
    })

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    })
}
