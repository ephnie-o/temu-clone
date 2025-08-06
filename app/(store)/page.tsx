import BlackFridayBanner from "@/components/BlackFridayBanner";
import HomeLayout from "@/components/HomeLayout";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductThumb from '@/components/ProductThumb';
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  const featuredProducts = products.slice(0,4)

  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //     `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  // )

  return (
      <HomeLayout>
        <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-wide text-gray-700">Trending Products</h2>
            <Link href="/products" className="text-green-600 text-sm font-bold hover:underline">
              View All &rarr;
            </Link>
          </div>
          <hr className="mb-7" />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductThumb key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </HomeLayout>
  )
}
