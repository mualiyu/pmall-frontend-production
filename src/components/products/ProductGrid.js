import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addToCart, getCart } from "../../utils/cartUtils";
import LimitWord from '../../utils/limitWord';
import currency from '../../utils/formatCurrency';

const PRODUCTS_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

const ProductGrid = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const backgroundColors = ['#191970',   '#6A5ACD',  '#4169E1',  '#008080'];

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch categories
        const categoryResponse = await axios.get(CATEGORIES_ENDPOINT);
        if (!categoryResponse.data || !Array.isArray(categoryResponse.data.data)) {
          throw new Error("Invalid category data format");
        }
        const categoryList = categoryResponse.data.data;
        setCategories(categoryList);

        // Fetch all products
        const productResponse = await axios.get(PRODUCTS_ENDPOINT);
        if (!productResponse.data || !Array.isArray(productResponse.data.data)) {
          throw new Error("Invalid product data format");
        }
        const allProducts = productResponse.data.data;

        // Group products by category_id
        const groupedProducts = allProducts.reduce((acc, product) => {
          if (!product.category_id) return acc; // Skip products without category
          if (!acc[product.category_id]) acc[product.category_id] = [];
          acc[product.category_id].push(product);
          return acc;
        }, {});

        setProductsByCategory(groupedProducts);
      } catch (err) {
        console.error("API Fetch Error:", err.message);
        setError("Failed to load categories or products. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const getRandomColor = (colorArray) => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };

  const handleViewAll = (category) => {
    navigate(`/store/product/categories/${category.id}`, { state: { category } });
};

  const handleAddToCart = (product) => {
    const numOfItems = 1;
    const cart = getCart();

    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, amtItems: Math.max(1, (item.amtItems || 1) + numOfItems) }
          : item
      );

      localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
      setCartMessage(`${product.name} quantity updated in cart!`);
    } else {
      const newCart = [...cart, { ...product, amtItems: numOfItems }];
      localStorage.setItem("pmallCart", JSON.stringify(newCart));
      setCartMessage(`${product.name} added to cart!`);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
  {categories
    ?.filter(category => productsByCategory[category.id]?.length > 0) // ✅ Only show categories with products
    .map(category => (
      <div className='flex flex-col alc g-20 bg-white-contain' key={category.id}>
        <div className='w-full flex justsb style-header' style={{ backgroundColor: getRandomColor(backgroundColors) }}>
          <div className='g-40 w-full section-tabs'>
            <div className="w-full flex justsb">
              <h1 className="">{category.name}</h1>
              <p className="view__all__btn" onClick={() => handleViewAll(category)}>View all Products</p>
            </div>
            <ul className='flex g-15'>
              {category.sub_categories?.slice(0, 7).map(sub => (
                <li key={sub.id}>{sub.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex justsb g-10' style={{ padding: '25px' }}>
          <div className="row">
            {(productsByCategory[category.id] || []).map(product => (
              <div
                className="col-sssm-2 col-md-6 col-lg-3 col-xl-3 product-cart-wrap"
                style={{ margin: "20px 9px" }}
                key={product.id}
              >
                <div className="product-badges product-badges-position product-badges-mrg">
                  <span className="hot">NEW</span>
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
                  <div className="add-cart">
                    <button className="add" onClick={() => handleAddToCart(product)}>
                      <i className="fi-rs-shopping-cart mr-5"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  {cartMessage && <p className="cart-message">{cartMessage}</p>}
</div>

  );
};

export default ProductGrid;
