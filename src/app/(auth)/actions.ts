'use server';

import {cookies} from 'next/headers';
import {selectUserByName} from "@/lib/db/user.sql";
import {mockToken} from "@/utils/token-util";
import {COOKIE_USER} from "@/utils/constant";
import {LoginUser} from "@/types/user";



/**
 * 用户登录
 */
export async function loginAction(username: string, password: string) {
    /*if (process.env.NEXT_PHASE === 'phase-production-build') {
        console.log('构建阶段，不执行')
        return null
    }*/
    console.log('执行登录操作: username: ' + username + ', password: ' + password);

    // 校验用户是否存在
    const user = await selectUserByName(username);
    if (user === undefined) {
        throw new Error('用户不存在')
    }
    if (user.password !== password) {
        throw new Error('密码错误')
    }

    // 生成 token
    const token = mockToken();

    const loginUser: LoginUser = {
        userId: user.id,
        username: user.name,
        token: token
    }
    console.log('loginUser:', JSON.stringify(loginUser))

    // 使用 cookies 存储登录信息
    await setUserCookieAction(loginUser)

    return loginUser;
}

/**
 * 退出登录
 */
export async function logoutAction() {
    await cleanUserCookieAction()
}


/**
 * 储存登录用户信息到 cookie
 *
 * @param loginUser
 */
export async function setUserCookieAction(loginUser: LoginUser) {
    const cookie = await cookies();
    cookie.set(COOKIE_USER,
        JSON.stringify(loginUser),
        {
            path: '/',
            httpOnly: false, // ❗必须为 false，客户端才能读取
            //secure: process.env.NODE_ENV === 'production', // 设置了 secure: true，只能在 https 环境下  Cookies.get 到 Cookie。
            //sameSite: 'strict', // 设置了 sameSite: 'strict'，请求是从同一站点发起的，才能 Cookies.get 到 Cookie。
            maxAge: 60 * 60 * 24 * 1 // 1 days
        }
    );
    console.log('储存登录用户信息')
}


/**
 * 清除 cookie 中的登录用户信息
 */
export async function cleanUserCookieAction() {
    const cookie = await cookies();
    cookie.delete(COOKIE_USER)
    console.log('清除登录用户信息')
}

/**
 * 从 cookie 获取登录用户信息
 */
export async function getUserCookieAction() {
    try {
        const cookie = await cookies();
        const userCookie = cookie.get(COOKIE_USER);
        if (userCookie) {
            const user: LoginUser = JSON.parse(userCookie.value);
            console.log('获取登录用户信息: ', user.userId)
            return user
        }
    } catch (e) {
        console.log('Failed to getUserCookie.', e)
    }
    return undefined
}