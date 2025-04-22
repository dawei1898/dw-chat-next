import AuthProvider from "@/components/provider/auth-provider";

const ChatLayout = (
    {children}: {children: React.ReactNode}
) => {

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default ChatLayout;