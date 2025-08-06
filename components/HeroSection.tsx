import Image from 'next/image';
import Link from 'next/link';
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

const slides = [
  {
    id: 1,
    title: 'Your Trusted Online Pharmacy',
    subtitle: 'Get genuine medicines delivered fast to your doorstep',
    highlight: 'More discounts for Loyal Customers',
    imageSrc: '/banner.png',
    ctaPrimary: 'Shop Medicines',
    ctaSecondary: 'Consult Pharmacist',
  },
];

export default async function Hero() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);


    const slide = slides[0];

    return (
        <section className="relative bg-gradient-to-r from-green-700 to-green-400 overflow-hidden">
            <>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] bg-repeat" />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-4 py-12 lg:py-16 gap-8">
                    {/* Text content */}
                    <div className="lg:w-1/2 text-center lg:text-left z-10">
                    {/* Highlight badge */}
                    <div className="inline-block bg-white text-green-700 text-sm font-bold px-4 py-2 rounded-full mb-4 shadow-sm">
                        {sale?.isActive ? (
                            <span>{sale.description}!!!...{sale.title} sales: Use <span className="text-red-600">{sale.couponCode}</span> for <span className="text-red-600">{sale.discountAmount}%</span> off</span>
                        ):(
                            <span>{slide.highlight}</span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {slide.title}
                    </h1>

                    <p className="mt-4 text-green-100 max-w-lg mx-auto lg:mx-0">
                        {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <Link href="/products" className="inline-flex text-sm items-center justify-center bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1">
                            <span>{slide.ctaPrimary}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>

                        <Link href="/doctor-consultation" className="inline-flex text-sm items-center justify-center border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                            <span>{slide.ctaSecondary}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                        </Link>
                    </div>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:flex mt-8 lg:mt-0 lg:w-1/2 justify-center lg:justify-end z-10">
                    <div className="relative w-full max-w-md">
                        <Image
                            src={slide.imageSrc}
                            alt="Medicine and healthcare products"
                            width={500}
                            height={500}
                            className="object-contain"
                            priority
                        />
                        {/* Floating assurance badges */}
                        <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Genuine Products</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Slide indicators - if you add more slides later */}
                {slides.length > 1 && (
                    <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2 z-10">
                    {slides.map((s, idx) => (
                        <button
                        key={s.id}
                        className={`w-3 h-3 rounded-full transition-all ${idx === 0 ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                    </div>
                )}
            </>
        </section>
    );
}