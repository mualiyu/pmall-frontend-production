import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchProductsByCategory from "../../utils/fetchProductsByCategory";
import ProductGrid from "../products/ProductGrid";
const CategoryProducts = () => {

    const location = useLocation();
    const category = location?.state?.category;
    return (
        <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md fluid__contain">
            <div className="w-full flex justify-between items-center">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold category__titlehead">{category.name}</h1>
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto">
            <div className='flex justsb g-10' style={{padding: '25px'}}>
                    <ProductGrid 
                                categoryId={category.id} />
                    </div>
            </div>
        </div>
    );
};

export default CategoryProducts;
