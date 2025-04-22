'use client';

import React, {
    createContext, ReactNode,
    useCallback, useContext,
    useEffect, useMemo, useState
} from 'react';
import {useRouter} from "next/navigation";
import {LoginUser} from "@/types/user";
import {
    getUserCookieAction,
    loginAction,
    logoutAction
} from "@/app/(auth)/actions";


interface AuthContextType {
    user: LoginUser | null;
    login: (username: string, password: string) => Promise<LoginUser | undefined>;
    logout: () => Promise<void>;
    isLogin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth 必须在 AuthProvider 内使用！');
    }
    return context;
}


/**
 * 用户信息 鉴权 Provider
 * @constructor
 */
const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<LoginUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // 仅在客户端加载时检查 cookie
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserCookieAction();
                console.log('AuthProvider useEffect Cookie:', JSON.stringify(user))
                if (user) {
                    setUser(user)
                }
            } catch (e) {
                console.error('Failed to get user cookie', e);
                setUser(null);
            }
        };
        fetchUser().then();

        setLoading(false)
    }, []);

    // 使用 useCallback 避免函数引用变化
    const login = useCallback(async (username: string, password: string) => {
        const loginUser: LoginUser = await loginAction(username, password);
        setUser(loginUser);
        return loginUser;
    }, [])

    const logout = useCallback(async () => {
        await logoutAction()
        setUser(null)
        router.push('/login')
    }, [router]);

    // 使用 useMemo 避免 value 对象引用变化
    const value = useMemo(() => ({
        user,
        login,
        logout,
        isLogin: !!user,
        loading
    }), [user, login, logout, loading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;