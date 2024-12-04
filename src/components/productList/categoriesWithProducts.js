import { useState, useEffect } from "react";
import fetchProductsByCategory from "../../utils/fetchProductsByCategory";

const CategoriesWithProducts = ({ categories }) => {
    const [categoryProducts, setCategoryProducts] = useState({}); // Object to store products by category ID
    const [loading, setLoading] = useState(false);

    const loadProductsForCategories = async () => {
        setLoading(true);
        const fetchedProducts = {};
        await Promise.all(
            categories.map(async (category) => {
                const products = await fetchProductsByCategory(category.id);
                fetchedProducts[category.id] = products; // Map products to their category
            })
        );
        setCategoryProducts(fetchedProducts);
        setLoading(false);
    };

    useEffect(() => {
        if (categories?.length > 0) {
            loadProductsForCategories();
        }
    }, [categories]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {categories?.map((category) => (
                <div key={category.id} className="flex flex-col alc g-20 bg-white-container">
                    <div className="w-full flex justsb">
                        <div className="g-40 section-tabs">
                            <h1>{category.name}</h1>
                            <ul className="mt-lg flex g-15">
                                {category?.sub_categories?.slice(0, 7).map((sub) => (
                                    <li key={sub.id}>{sub.name}</li>
                                ))}
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className="flex justsb g-10">
                        {categoryProducts[category.id]?.slice(0, 4).map((product) => (
                            <div key={product.id} className="bg-white product-card">
                                <div className="img-div">
                                    <img src={product.image} alt={product.name} className="w-full" />
                                </div>
                                <div className="desc">
                                    <div className="red-rating-container">
                                        <p className="red-rating">{product.rating}</p>
                                    </div>
                                    <div className="main-desc flex flex-col g-10">
                                        <h3>{product.name}</h3>
                                        <h3 className="red bold">{product.price}</h3>
                                        <div className="mt-5 bt">
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
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