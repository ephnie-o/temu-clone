'use client'

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion"
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => {
                return (
                    <AnimatePresence key={product._id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductThumb key={product._id} product={product} />
                        </motion.div>
                    </AnimatePresence>
                )
            })}
        </div>
    )
}

export default ProductGrid