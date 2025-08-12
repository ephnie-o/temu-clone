import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white text-[#2d3738]">

      {/* Main Links */}
      <div className="bg-green-900 text-xs text-gray-300 py-12 border-b border-b-gray-600">
        <div className="container mx-auto px-4 grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Information</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">My Account</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Addresses
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Extras</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Specials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Contact Info</h4>
            <ul className="space-y-3 text-xs">
              <li>No. ANT 7/2 Aplaku Newtown Weija Accra, Opp. Petrosol Filling Station, Block factory-Kasoa Rd</li>
              <li>+233 249 009 988</li>
              <li><Link href="mailto:steredapharmaceuticals@gmail.com" className="hover:text-white">steredapharmaceuticals@gmail.com</Link></li>
            </ul>
            <div className="flex space-x-4 mt-4 justify-center">
              <Link href="https://web.facebook.com/steredapharmaceuticals" target="_blank" className="hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.instagram.com/steredapharmaceuticals/" target='_blank' className="hover:text-white">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
        <div className="bg-green-900 text-gray-200 flex justify-between items-center px-12 py-4">
            <h4 className="font-semibold text-lg mb-4">We Accept</h4>
            <div className="flex space-x-4">
                <Image src="/payments/visa.png" alt="Visa" width={40} height={24} />
                <Image src="/payments/mastercard.webp" alt="MasterCard" width={40} height={24} />
            </div>
        </div>
    <div className="bg-green-900 tracking-wide text-gray-300 text-center py-4 text-xs">
        <span className="text-center">&copy; {new Date().getFullYear()} Stereda Pharmacy. All rights reserved.</span>
    </div>
    </footer>
  );
}