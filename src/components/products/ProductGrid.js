import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToCart, getCart } from "../../utils/cartUtils";
import LimitWord from '../../utils/limitWord';
import currency from '../../utils/formatCurrency';

const PRODUCTS_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/list-all-by-category";

const ProductGrid = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

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

  const handleAddToCart = (product) => {
    const numOfItems = 1;
    const cart = getCart();
    // Check if the product already exists in the cart
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      setCartMessage(`${product.name} is already in your cart!`);
    } else {
      addToCart(product, numOfItems, () => {
        setCartMessage(`${product.name} added to cart!`);
      });
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (products.length === 0) return <p>No products found for this category.</p>;

  return (
    <div className="row">
      {products.map((product) => (
        <div
          className="col-sssm-2 col-md-6 col-lg-3 col-xl-3 product-cart-wrap"
          style={{ margin: "20px 9px"}}
          key={product.id}
        >
          <div class="product-badges product-badges-position product-badges-mrg">
                                    <span class="hot">NEW</span>
                                </div>
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
                    &nbsp; {product.cost_price && (
                    <span className="cost__price">
                      {currency(product.cost_price)}
                    </span>
                  )}
                  </h3>
                  
                </div>
              </div>
            </Link>
            <div class="add-cart">
                  <button
                      className="add"
                      onClick={() => handleAddToCart(product)}>
                      <i className="fi-rs-shopping-cart mr-5"></i> Add to Cart
                    </button>
                                            </div>
          </div>
        </div>
      ))}
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default ProductGrid;
