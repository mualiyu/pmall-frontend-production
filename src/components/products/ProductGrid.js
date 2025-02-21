import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LimitWord from '../../utils/limitWord';
import currency from '../../utils/formatCurrency';

const PRODUCTS_ENDPOINT = "https://api.pmall.mukeey.com.ng/api/v1/public/products/list-all-by-category";

const ProductGrid = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products based on the categoryId
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products for the provided categoryId
        const productsResponse = await axios.get(
          `${PRODUCTS_ENDPOINT}?category_id=${categoryId}`
        );
        const url = `${PRODUCTS_ENDPOINT}?category_id=${categoryId}`;
console.log(url); 
 console.log(productsResponse);
        
        // If products are found, set them; otherwise, show an error
        if (productsResponse.data.data) {
          setProducts(productsResponse.data.data);
        } else {
          setError("No products found for this category.");
        }
      } catch (err) {
        setError("No products found for this category.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }else{console.log('hi')}
  }, [categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (products.length === 0) return <p>No products found for this category.</p>;

  return (
    <div className="row">
      {products.map((product) => (
        <div
          className="col-sssm-2 col-md-6 col-lg-3 col-xl-3"
          style={{ margin: "0 5px"}}
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
