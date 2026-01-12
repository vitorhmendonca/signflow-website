import { ImgHTMLAttributes, useState } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    className = "",
    ...props
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
                    style={{ width, height }}
                />
            )}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;
