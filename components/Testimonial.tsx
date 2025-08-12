import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  avatarSrc: string;
  date: string;
  message: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials = [
  {
    id: 1,
    name: 'Emily Carter',
    title: 'Happy Customer',
    avatarSrc: '/avatars/emily.png',
    date: 'July 10, 2025',
    message: 'Fast delivery and excellent customer service! Highly recommend Stereda Pharmacy.'
  },
  {
    id: 2,
    name: 'Michael Lee',
    title: 'Verified Buyer',
    avatarSrc: '/avatars/michael.webp',
    date: 'June 22, 2025',
    message: 'Great selection of products at unbeatable prices. Will buy again.'
  },
  {
    id: 3,
    name: 'Sophia Nguyen',
    title: 'Regular Client',
    avatarSrc: '/avatars/sophia.png',
    date: 'May 18, 2025',
    message: 'Very easy to navigate website and prompt delivery. Five stars!'
  },
  {
    id: 4,
    name: 'David Smith',
    title: 'Long-time User',
    avatarSrc: '/avatars/david.webp',
    date: 'April 30, 2025',
    message: 'Quality products and helpful support team. Stereda Pharmacy is my go-to pharmacy online.'
  }
] }: TestimonialsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-xl font-semibold tracking-wide text-gray-900 mb-3">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatarSrc}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">&ldquo;{testimonial.message}&rdquo;</p>

              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}