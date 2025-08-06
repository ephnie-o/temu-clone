// components/HomeLayout.tsx

import { ReactNode } from 'react';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import BlackFridayBanner from '@/components/BlackFridayBanner';
import Hero from './HeroSection';
import Features from './Features';
import PromoCarousel from './PromoCarousel';
import Testimonials from './Testimonial';
import Category from './Categories';


export default async function HomeLayout({ children }: { children: ReactNode }) {
    const categories = await getAllCategories();

    return (
        <div className="bg-white">
            <Hero />
            <Features />
            <PromoCarousel />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content area */}
                    {children}
                </div>

            </div>
            <Testimonials />

            {/* <TrustBadges /> */}
        </div>
    );
}