import React, { useState, useEffect, useRef } from "react";

export default function LazyImage({ src, alt, className, placeholder }) {
    const [isVisible, setIsVisible] = useState(false);
    const [loadedSrc, setLoadedSrc] = useState(placeholder || "");
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "100px" } // start loading a bit before visible
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            setLoadedSrc(src);
        }
    }, [isVisible, src]);

    return (
        <img
            ref={imgRef}
            src={loadedSrc}
            alt={alt}
            className={className}
            loading="lazy"
        />
    );
}
