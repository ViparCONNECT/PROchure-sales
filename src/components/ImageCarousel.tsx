import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

interface ImageCarouselProps {
    images: string[];
    aspectRatio?: string;
    className?: string;
    autoPlayInterval?: number;
    carouselTitle?: string;
}

export default function ImageCarousel({
    images,
    aspectRatio = "16 / 9",
    className = "",
    autoPlayInterval = 4000,
    carouselTitle,
}: ImageCarouselProps) {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = ((page % images.length) + images.length) % images.length;

    const paginate = useCallback((newDirection: number) => {
        setPage(([p]) => [p + newDirection, newDirection]);
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => paginate(1), autoPlayInterval);
        return () => clearInterval(timer);
    }, [images.length, autoPlayInterval, paginate]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 50) paginate(-1);
        else if (info.offset.x < -50) paginate(1);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    if (!images.length) return null;

    return (
        <div className="w-full">
            {carouselTitle && (
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 text-slate-800">
                    {carouselTitle}
                </h3>
            )}
            <div
                className={`relative overflow-hidden rounded-2xl bg-gray-100 ${className}`}
                style={{ aspectRatio }}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={page}
                        src={images[imageIndex]}
                        alt={`Slide ${imageIndex + 1}`}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
