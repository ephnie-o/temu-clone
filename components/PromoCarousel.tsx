'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        imageSrc: '/banner1.jpeg',
        alt: 'Skin Serum Promotion',
        title: 'Premium Skin Care',
        subtitle: 'Get discount off all serums this week',
        cta: 'Shop Now'
    },
    {
        id: 2,
        imageSrc: '/banner2.jpeg',
        alt: 'New Arrivals Promotion',
        title: 'New Arrivals',
        subtitle: 'Discover our latest products',
        cta: 'Explore'
    },
    {
        id: 3,
        imageSrc: '/banner3.jpg',
        alt: 'Vitamins & Supplements',
        title: 'Wellness Essentials',
        subtitle: 'Boost your immunity today',
        cta: 'Shop Wellness'
    },
];

export default function PromoCarousel() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-rotate every 5 seconds (pauses on hover)
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovered]);

    const goToSlide = (index: number) => {
        setCurrent(index);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section
            className="relative w-full overflow-hidden rounded-xl shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[16/5] md:aspect-[16/4] w-full">
                {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src={slide.imageSrc}
                            alt={slide.alt}
                            fill
                            className="object-cover blur-xs scale-105"
                            priority={index === current}
                        />
                    </div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 bg-black/10 flex items-center">
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    {slide.title}
                                </h2>
                                <p className="text-gray-700 mb-4">
                                    {slide.subtitle}
                                </p>
                                <Link href='/products' className="text-sm bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md cursor-pointer">
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
                </button>
            </div>

            {/* Dots Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === current
                                ? 'bg-white w-6 scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}