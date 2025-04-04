import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_CATEGORIES_ENDPOINT || "https://api.pmall.com.ng/api/v1/product-brand/get-all";

const useProductBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setBrands(result.data.brands);
      } catch (err) {
        console.error("Error fetching Brands:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

export default useProductBrands;
