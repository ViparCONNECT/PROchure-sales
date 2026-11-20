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

        const sharedImage = "https://www.prochure.app/newprocherimages.png";
        const imageSelectors = [
            'meta[property="og:image"]',
            'meta[property="og:image:secure_url"]',
            'meta[name="twitter:image"]',
        ];
        for (const selector of imageSelectors) {
            const meta = document.querySelector(selector);
            if (meta) meta.setAttribute("content", sharedImage);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", window.location.href);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", window.location.href);
    }, [title, description]);
}
