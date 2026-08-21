import { useEffect } from "react";

interface UseSeoOptions {
    title?: string;
    description?: string;
}

export function useSeo({ title = "PROchure", description }: UseSeoOptions) {
    useEffect(() => {
        document.title = title;

        if (description) {
            const selectors = [
                'meta[name="description"]',
                'meta[property="og:description"]',
                'meta[name="twitter:description"]',
            ];
            for (const selector of selectors) {
                const meta = document.querySelector(selector);
                if (meta) meta.setAttribute("content", description);
            }
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && title) ogTitle.setAttribute("content", title);

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle && title) twitterTitle.setAttribute("content", title);
    }, [title, description]);
}
