import { useEffect } from "react";

interface SEOProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    keywords?: string;
    type?: "website" | "article";
}

const SEO = ({ title, description, canonical, ogImage, keywords, type = "website" }: SEOProps) => {
    useEffect(() => {
        // Update title
        document.title = title;

        // ... (existing code for description/keywords/canonical)

        // Update OG tags
        const updateOGTag = (property: string, content: string) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateOGTag('og:type', type);
        updateOGTag('og:title', title);
        updateOGTag('og:description', description);
        updateOGTag('og:url', canonical);
        updateOGTag('og:site_name', 'SignFlow');
        updateOGTag('og:locale', 'en_US');
        if (ogImage) {
            updateOGTag('og:image', ogImage);
        }

        // Update Twitter tags
        const updateTwitterTag = (name: string, content: string) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', name);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateTwitterTag('twitter:card', 'summary_large_image');
        updateTwitterTag('twitter:title', title);
        updateTwitterTag('twitter:description', description);
        updateTwitterTag('twitter:url', canonical);
        updateTwitterTag('twitter:site', '@SignFlow');
        updateTwitterTag('twitter:creator', '@SignFlow');
        if (ogImage) {
            updateTwitterTag('twitter:image', ogImage);
        }
    }, [title, description, canonical, ogImage, keywords]);

    return null;
};

export default SEO;
