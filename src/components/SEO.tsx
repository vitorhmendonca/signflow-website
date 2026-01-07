import { useEffect } from "react";

interface SEOProps {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
}

const SEO = ({ title, description, canonical, ogImage }: SEOProps) => {
    useEffect(() => {
        // Update title
        document.title = title;

        // Update or create meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        // Update or create canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonical);

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

        updateOGTag('og:title', title);
        updateOGTag('og:description', description);
        updateOGTag('og:url', canonical);
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

        updateTwitterTag('twitter:title', title);
        updateTwitterTag('twitter:description', description);
        if (ogImage) {
            updateTwitterTag('twitter:image', ogImage);
        }
    }, [title, description, canonical, ogImage]);

    return null;
};

export default SEO;
