import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Link from "next/link";

async function Category() {
    const categories = await getAllCategories();

    return (
        <nav className="bg-gray-50 mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
            <ul className="flex justify-between space-x-6 py-2 whitespace-nowrap">
                {categories.map((category) => (
                    <Link key={category._id} href={`/categories/${category.slug?.current}`} className="text-gray-700 hover:text-green-600 text-sm font-medium px-1 py-2 block">
                        {category.title}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Category