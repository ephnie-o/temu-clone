import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            {/* categories */}
            <div className="w-full md:w-64 shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                    <h3 className="md:hidden font-medium text-gray-700 mb-4">Categories</h3>
                    <CategorySelectorComponent categories={categories} />
                </div>
            </div>

            {/* products */}
            <div className="flex-1">
                <ProductGrid products={products} />
            </div>
        </div>
        </div>
    )
}

export default ProductsView