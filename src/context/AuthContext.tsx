import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as authApi from "../config/authApi";
import type { AuthUser } from "../config/authApi";

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    sendRegisterOtp: typeof authApi.sendRegisterOtp;
    verifyRegisterOtp: (body: { phone: string; otp: string }) => Promise<void>;
    sendLoginOtp: typeof authApi.sendLoginOtp;
    verifyLoginOtp: (body: { identifier: string; otp: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authApi.restoreSession().then((u) => {
            setUser(u);
            setIsLoading(false);
        });
    }, []);

    const verifyRegisterOtp = useCallback(async (body: { phone: string; otp: string }) => {
        setUser(await authApi.verifyRegisterOtp(body));
    }, []);

    const verifyLoginOtp = useCallback(async (body: { identifier: string; otp: string }) => {
        setUser(await authApi.verifyLoginOtp(body));
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } finally {
            setUser(null);
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            sendRegisterOtp: authApi.sendRegisterOtp,
            verifyRegisterOtp,
            sendLoginOtp: authApi.sendLoginOtp,
            verifyLoginOtp,
            logout,
        }),
        [user, isLoading, verifyRegisterOtp, verifyLoginOtp, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
