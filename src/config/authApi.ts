import axios, { AxiosError } from "axios";

export const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? "https://api.prochure.app/api/v1";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface OtpSentResponse {
    maskedPhone: string;
    expiresInSeconds: number;
    resendInSeconds: number;
}

interface SessionResponse {
    accessToken: string;
    user: AuthUser;
}

// Refresh token lives in an httpOnly cookie; the short-lived access token is kept in memory only.
let accessToken: string | null = null;

const authApi = axios.create({
    baseURL: `${API_BASE_URL}/users/auth`,
    timeout: 15000,
    withCredentials: true,
});

/** Authenticated client for user endpoints (e.g. /me/profile). Retries once after a silent refresh on 401. */
export const userApi = axios.create({ baseURL: API_BASE_URL, timeout: 20000, withCredentials: true });

for (const client of [authApi, userApi]) {
    client.interceptors.request.use((config) => {
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    });
}

userApi.interceptors.response.use(undefined, async (error: AxiosError) => {
    const config = error.config as (typeof error.config & { _retried?: boolean }) | undefined;
    if (error.response?.status !== 401 || !config || config._retried) throw error;
    config._retried = true;
    if (!(await restoreSession())) throw error;
    return userApi(config);
});

async function post<T>(url: string, body?: unknown): Promise<T> {
    const res = await authApi.post(url, body);
    return res.data?.data as T;
}

function startSession(session: SessionResponse): AuthUser {
    accessToken = session.accessToken;
    return session.user;
}

export const sendRegisterOtp = (body: { name: string; email: string; phone: string }) =>
    post<OtpSentResponse>("/register/send-otp", body);

export const verifyRegisterOtp = async (body: { phone: string; otp: string }) =>
    startSession(await post<SessionResponse>("/register/verify", body));

export const sendLoginOtp = (identifier: string) => post<OtpSentResponse>("/login/send-otp", { identifier });

export const verifyLoginOtp = async (body: { identifier: string; otp: string }) =>
    startSession(await post<SessionResponse>("/login/verify", body));

// Refresh tokens rotate on use, so concurrent calls (e.g. React StrictMode double effects) must share one request.
let refreshInFlight: Promise<AuthUser | null> | null = null;

export function restoreSession(): Promise<AuthUser | null> {
    refreshInFlight ??= post<SessionResponse>("/refresh")
        .then(startSession)
        .catch(() => {
            accessToken = null;
            return null;
        })
        .finally(() => {
            refreshInFlight = null;
        });
    return refreshInFlight;
}

export async function logout(): Promise<void> {
    try {
        await authApi.post("/logout");
    } finally {
        accessToken = null;
    }
}

export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
    if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        if (Array.isArray(message)) return message[0] ?? fallback;
        if (typeof message === "string") return message;
        if (err.code === "ECONNABORTED" || !err.response) return "Network error. Please check your connection.";
    }
    return fallback;
}
