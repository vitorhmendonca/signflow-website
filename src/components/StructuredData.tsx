import { useEffect } from "react";

interface StructuredDataProps {
    data: object;
}

const StructuredData = ({ data }: StructuredDataProps) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(data);
        script.id = "structured-data";

        // Remove existing script if present
        const existing = document.getElementById("structured-data");
        if (existing) {
            existing.remove();
        }

        document.head.appendChild(script);

        return () => {
            script.remove();
        };
    }, [data]);

    return null;
};

export default StructuredData;
