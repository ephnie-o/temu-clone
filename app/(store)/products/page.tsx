import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";

export const dynamic = "force-static";
export const revalidate = 60;

async function Products() {
    const products = await getAllProducts();
    const categories = await getAllCategories();

    console.log(
        crypto.randomUUID().slice(0, 5) +
        `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories`
    )

    return (
        <div className="flex-1">
            <ProductsView products={products} categories={categories} />
        </div>
    )
}

export default Products