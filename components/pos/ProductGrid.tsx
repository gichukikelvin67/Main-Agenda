"use client";

import{Product} from "./ProductCard";
import ProductCard from "./ProductCard";

type ProductGridProps={
    products:Product[];
    onAdd:(product:Product)=> void;
};

export default function ProductGrid({
    products,
    onAdd,

}:ProductGridProps){
    return(
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product)=>(
                <ProductCard
                key={product._id}
                product={product}
                onAdd={onAdd}
                />
            ))}
        </div>
    );
}