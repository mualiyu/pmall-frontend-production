import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LimitWord from '../../utils/limitWord';
import currency from '../../utils/formatCurrency';


const CATEGORIES_ENDPOINT = "https://api.pmall.mukeey.com.ng/api/v1/public/products/get-all-categories";
const PRODUCTS_ENDPOINT = "https://api.pmall.mukeey.com.ng/api/v1/public/products/list-all";

const ProductGrid = ({ categoryName }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch products based on the category name
    useEffect(() => {
      const fetchProductsByCategory = async () => {
        setLoading(true);
        setError(null);
  
        try {
          // Fetch all categories
          
          const categoriesResponse = await axios.get(CATEGORIES_ENDPOINT);
          console.log(categoriesResponse.data);
          const categories = categoriesResponse.data.data;
  
          // Find the category by name
                
          const category = categories.find(
            (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
          );
  
          if (!category) {
            throw new Error(`Category "${categoryName}" not found.`);
          }
  
          // Fetch products for the resolved category ID
          const productsResponse = await axios.get(
            `${PRODUCTS_ENDPOINT}?categoryId=${category.id}`
          );
          console.log(productsResponse);
          setProducts(productsResponse.data.data || []);
        } catch (err) {
          setError(err.message || "Failed to load products.");
        } finally {
          setLoading(false);
        }
      };
  
      if (categoryName) {
        fetchProductsByCategory();
      }
    }, [categoryName]);
  
    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="error">{error}</p>;
    if (products.length === 0) return <p>No products found for this category.</p>;
  
    return (
      <div className="row">
        {products.map((product) => (
          <div
            className="col-sssm-2 col-md-6 col-lg-3 col-xl-3"
            style={{ margin: "0 5px" }}
            key={product.id}
          >
            <div className="product-info default-cover card">
              <Link to={`/product/${product.id}`} className="img-bg">
                <img
                  src={product.image || "/default-image.jpg"}
                  alt={product.name || "Product Image"}
                  className="product__image"
                  style={{ width: 150 }}
                />
              </Link>
              <Link to={`/product/${product.id}`} className="no__underline">
                <div className="product_desc">
                  <div className="flex-col g-5">
                    <p className="product__name bold uppercase">
                      {LimitWord(product.name || "Unnamed Product", 3)}
                    </p>
                    <h3 className="red bold product__cost">
                      {currency(product.selling_price || 0)}
                    </h3>
                    {product.cost_price && (
                      <h3 className="cost__price">
                        {currency(product.cost_price)}
                      </h3>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductGrid;