import axios from "axios";

const api = axios.create({
    baseURL: "https://api.prochure.app/api/v1/public",
    timeout: 10000,
});

export async function getCategories(type: string) {
    const res = await api.get("/categories", { params: { type } });
    return res.data?.data || [];
}

export async function getSubcategories(categoryId: string) {
    const res = await api.get("/subcategories", { params: { categoryId } });
    return res.data?.data || [];
}

export async function getProfiles(params: { categoryId?: string; subCategoryId?: string; city?: string; isWomenEntrepreneur?: boolean }) {
    // axios will ignore undefined params
    const res = await api.get("/profiles", { params });
    return res.data?.data || [];
}

export async function getProfile(profileId: string) {
    const res = await api.get(`/profiles/${profileId}`);
    return res.data?.data || null;
}

export default api;
