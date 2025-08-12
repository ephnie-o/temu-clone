import { ReactNode } from 'react';
import Hero from './HeroSection';
import Features from './Features';
import PromoCarousel from './PromoCarousel';
import Testimonials from './Testimonial';


export default async function HomeLayout({ children }: { children: ReactNode }) {

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

        </div>
    );
}