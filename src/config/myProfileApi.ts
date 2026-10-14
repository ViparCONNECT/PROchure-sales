import { AxiosError } from "axios";
import { userApi, getErrorMessage } from "./authApi";
import api from "./api";
import type { CategoryOption, ProfilePayload, ProfileType, SubCategoryOption } from "../profile-kit/types";

export type ProfileStatus = "PENDING_PAYMENT" | "ACTIVE";

export interface MyProfile extends Omit<ProfilePayload, "profileType" | "subCategoryId"> {
    id: string;
    status: ProfileStatus;
    isDisabled: boolean;
    subCategoryId?: string | null;
    category?: { id: string; name: string; type: ProfileType; isSubCategoryNeeded: boolean };
    subCategory?: { id: string; name: string } | null;
    publishedAt?: string | null;
}

export interface MyProfileResponse {
    profile: MyProfile | null;
    /** Listing fee in paise */
    fee: { amount: number; currency: string };
}

export interface PaymentOrder {
    keyId: string;
    orderId: string;
    amount: number;
    currency: string;
    prefill: { name: string; email: string; contact: string };
}

const data = <T,>(p: Promise<{ data: { data: T } }>) => p.then((r) => r.data.data);

export const getMyProfile = () => data<MyProfileResponse>(userApi.get("/me/profile"));
export const createMyProfile = (body: ProfilePayload) => data<MyProfile>(userApi.post("/me/profile", body));
export const updateMyProfile = (body: ProfilePayload) => data<MyProfile>(userApi.put("/me/profile", body));
export const createPaymentOrder = () => data<PaymentOrder>(userApi.post("/me/profile/payment/order"));
export const verifyPayment = (body: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
    data<MyProfileResponse>(userApi.post("/me/profile/payment/verify", body));

// Loaders for the shared ProfileForm (public endpoints)
export async function loadCategoryOptions(type: ProfileType): Promise<CategoryOption[]> {
    const res = await api.get("/categories", { params: { type } });
    return (res.data?.data ?? []).map((c: CategoryOption) => ({ id: c.id, name: c.name, isSubCategoryNeeded: !!c.isSubCategoryNeeded }));
}

export async function loadSubCategoryOptions(categoryId: string): Promise<SubCategoryOption[]> {
    const res = await api.get("/subcategories", { params: { categoryId } });
    return (res.data?.data ?? []).map((s: SubCategoryOption) => ({ id: s.id, name: s.name }));
}

export function getErrorMessages(err: unknown): string[] {
    const message = err instanceof AxiosError ? err.response?.data?.message : undefined;
    if (Array.isArray(message) && message.length) return message;
    return [err instanceof Error && !(err instanceof AxiosError) ? err.message : getErrorMessage(err)];
}
