import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchProductsByCategory from "../../utils/fetchProductsByCategory";
import ProductCarousel from "../../utils/productCarousel";
import ProductGrid from "../products/ProductGrid";
import useProductCategories from "../../hooks/useProductCategories";
const CategoryProducts = () => {
    const { products, error } = useProductCategories();
    const location = useLocation();
    const category = location?.state?.category;
    return (
        <>
        <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md mt-20p">
            <div className="flex gap-4 overflow-x-auto">
            <div className='flex justsb g-10' style={{width: '100%'}}>
                    <ProductGrid 
                                categoryId={category.id} />
                    </div>
            </div>
            
        </div>
        <div className="flex flex-col gap-5 p-5 rounded-lg shadow-md " style={{margin: '5% auto'}}>
        {/* <h3> Related Products </h3> */}
            <div className="flex gap-4 overflow-x-auto">
            <div className='flex justsb g-10' style={{width: '100%'}}>
            <ProductCarousel products={products} quantity={7} />
                    </div>
            </div>
            
        </div>
        
        </>
    );
};

export default CategoryProducts;
