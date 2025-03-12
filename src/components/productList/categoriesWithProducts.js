import { useState, useEffect } from "react";
import fetchProductsByCategory from "../../utils/fetchProductsByCategory";

const CategoriesWithProducts = ({ categories }) => {
    const [categoryProducts, setCategoryProducts] = useState({}); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!categories?.length) return;

        const loadProductsForCategories = async () => {
            setLoading(true);
            try {
                const fetchedProducts = {};
                await Promise.all(
                    categories.map(async (category) => {
                        try {
                            const products = await fetchProductsByCategory(category.id);
                            fetchedProducts[category.id] = products;
                        } catch (error) {
                            console.error(`Error fetching products for ${category.name}:`, error);
                        }
                    })
                );
                setCategoryProducts(fetchedProducts);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProductsForCategories();
    }, [categories]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {categories?.map((category) => (
                <div key={category.id} className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
                    <div className="w-full flex justify-between items-center">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold">{category.name}</h1>
                            <ul className="flex gap-3 text-sm text-gray-600">
                                {category?.sub_categories?.slice(0, 7).map((sub) => (
                                    <li key={sub.id} className="hover:text-black">{sub.name}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto">
                        {categoryProducts[category.id]?.slice(0, 4).map((product) => (
                            <div key={product.id} className="bg-white product-card border rounded-lg shadow-sm">
                                <div className="img-div">
                                    <img src={product.image} alt={product.name} className="w-full rounded-t-lg" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-red-500">
                                        <p className="font-semibold">{product.rating} ★</p>
                                    </div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <h3 className="text-red-500 font-bold">${product.price}</h3>
                                    <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoriesWithProducts;
