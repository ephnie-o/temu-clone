// components/Features.tsx
import { TruckIcon, CreditCardIcon, ShieldCheckIcon, HeadsetIcon } from 'lucide-react';

const features = [
  { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: CreditCardIcon, title: 'Secure Payment', desc: 'All major cards accepted' },
  { icon: ShieldCheckIcon, title: 'Money Back Guarantee', desc: '30-day money back' },
  { icon: HeadsetIcon, title: '24/7 Support', desc: 'Friendly 24/7 support' },
];

export default function Features() {
  return (
    <section className="py-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-green-100 rounded-full">
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-xs text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
