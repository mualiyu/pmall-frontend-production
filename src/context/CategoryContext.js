import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [storeCategories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://api.pmall.mukeey.com.ng/api/v1/public/products/get-all-categories");
            if (!response.ok) throw new Error("Failed to fetch categories");
            const result = await response.json();
            setCategories(result.data || []);
        } catch (err) {
            setError("Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ storeCategories, error }}>
            {children}
        </CategoryContext.Provider>
    );
};
