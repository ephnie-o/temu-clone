import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function CategoryPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    return (
        <>
            <div className="flex-1">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">
                        {slug
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        }{" "}
                        Category
                    </h1>
                    <ProductsView products={products} categories={categories} />
                </div>
            </div>
        </>
    )
}

export default CategoryPage