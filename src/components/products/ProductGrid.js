import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart, getCart } from "../../utils/cartUtils";
import AdvertCarousel from "../../utils/adverts";
import MiniCart from "../../utils/miniCart";
import BackToTop from "../../utils/backToTop";
import LimitWord from "../../utils/limitWord";
import currency from "../../utils/formatCurrency";
const PRODUCTS_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

const ProductGrid = ({ categoryId = null }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categoryName, setCategoryName] = useState("Loading...");
  const [todayCart, setTodayCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const backgroundColors = ["#191970", "#6A5ACD", "#4169E1", "#008080"];

  const adverts = [
    { id: 1, image_path: "/advert/sefdghfgjjh.png", size: "large", url: "https://product1.com" },
    { id: 2, image_path: "/advert/asfgdsfxvdsfbdh.gif", size: "large", url: "https://product1.com" },
    { id: 3, image_path: "https://pmallstores.netlify.app/Screenshot%202024-03-19%20163145.png", size: "large", url: "https://product2.com" },
    // { id: 4, image_path: "/advert/rsefrgfhfj.gif", size: "large", url: "https://product3.com" },
  ];

  const fetchCategoriesAndProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch categories
      const { data: categoryData } = await axios.get(CATEGORIES_ENDPOINT);
      if (!categoryData?.data || !Array.isArray(categoryData.data)) {
        throw new Error("Invalid category data format");
      }
      setCategories(categoryData.data);

      // Fetch products
      const { data: productData } = await axios.get(PRODUCTS_ENDPOINT);
      if (!productData?.data || !Array.isArray(productData.data)) {
        throw new Error("Invalid product data format");
      }
      
      // Group products by category_id
      const groupedProducts = productData.data.reduce((acc, product) => {
        if (!product.category_id) return acc;
        // fetchCategory(product.category_id);
        acc[product.category_id] = acc[product.category_id] || [];
        acc[product.category_id].push(product);
        return acc;
      }, {});

      // If categoryId is provided, filter products by that category
      setProductsByCategory(categoryId ? { [categoryId]: groupedProducts[categoryId] || [] } : groupedProducts);
    } catch (err) {
      console.error("API Fetch Error:", err.message);
      setError("Failed to load categories or products.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]); // Only recreate function when `categoryId` changes


//   const fetchCategory = async (cat__id) => {
//     console.log(cat__id);
//     const categoryData = await FindCategoryByID(CATEGORIES_ENDPOINT, cat__id);
//     console.log(categoryData);
//     setCategoryName(categoryData ? categoryData : "Unknown Category");
// };

// const cartTray = () => {
//   setLoading(true);
//   let cart = getCart();
//   setTodayCart(cart);
//   setLoading(false);
// }


  useEffect(() => {
    fetchCategoriesAndProducts();
  }, [fetchCategoriesAndProducts]);

  const categoryBackgrounds = useMemo(
    () =>
      categories.reduce((acc, category, index) => {
        acc[category.id] = backgroundColors[index % backgroundColors.length];
        return acc;
      }, {}),
    [categories]
  );

  const handleViewAll = useCallback(
    (category) => {
      navigate(`/store/product/categories/${category.name}`, { state: { category } });
    },
    [navigate]
  );

  const handleAddToCart = useCallback((product) => {
    const numOfItems = 1;
    let cart = getCart();
    
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, amtItems: Math.max(1, (item.amtItems || 1) + numOfItems) } : item
      );
      setCartMessage(
        <div className="title-case">
          {product.name} updated in cart! <br />
          <Link to="/cart" style={{ color: "orange", textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    } else {
      cart.push({ ...product, amtItems: numOfItems });
      setCartMessage(
        <div className="title-case">
          {product.name} added to cart! <br />
          <Link to="/cart" style={{ color: "orange", fontWeight: 700, textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
      setTodayCart(cart);
    }

    localStorage.setItem("pmallCart", JSON.stringify(cart));

    setTimeout(() => setCartMessage(""), 7000);
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div style={{ width: "100%" }}>
      <BackToTop/>
      {categories
        ?.filter((category) => productsByCategory[category.id]?.length > 0)
        .map((category) => (
          <div className="flex flex-col alc g-20 bg-white-contain" key={category.id}>
            <div className="w-full flex justsb style-header" style={{ backgroundColor: categoryBackgrounds[category.id] }}>
              <div className="g-40 w-full section-tabs">
                <div className="w-full flex justsb">
                  <h1>{category.name}</h1>
                  {!categoryId && <p className="view__all__btn" onClick={() => handleViewAll(category)}>View all Products</p>}
                </div>
                <ul className="flex g-15">
                  {category.sub_categories?.slice(0, 7).map((sub) => (
                    <li key={sub.id} className="sub__cat__hover" > {sub.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justsb g-10" style={{ padding: "25px" }}>
              <div className="row">
              {(productsByCategory[category.id] || []).slice(0, 8).map((product) => (
                  <div className="col-sssm-2 col-md-6 col-lg-3 col-xl-3 product-cart-wrap" style={{ margin: "20px 9px" }} key={product.id}>
                    <div className="product-badges product-badges-position product-badges-mrg">
                      <span className="hot">NEW</span>
                    </div>
                    <div className="product-info default-cover card">
                    <Link to={`/product/${product.id}`} className="img-bg">
                        <img
                          src={product.image || "/default-image.jpg"}
                          alt={product.name || "Product Image"}
                          className="product__image"
                          style={{ width: 150, objectFit: "cover" }}
                          onError={(e) => (e.target.src = "/default-image.jpg")}
                        />
                      </Link>
                      <Link to={`/product/${product.id}`} className="no__underline">
                        <div className="product_desc">
                          <div className="flex-col g-5">
                            <p className="product__name bold uppercase">{LimitWord(product.name || "Unnamed Product", 3)}</p>
                            <p className="product__name text-muted">{LimitWord(product.description, 7)}</p>
                            <h3 className="red bold product__cost">
                              {currency(product.selling_price || 0)}
                              &nbsp;
                              {product.cost_price && <span className="cost__price">{currency(product.cost_price)}</span>}
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
       

         <a className="whatsapp__icon" aria-label="Chat on WhatsApp" href="https://wa.me/2347084802028" target="_blank" rel="noopener noreferrer">
    <img alt="Chat on WhatsApp" src="/icons8-whatsapp.gif" style={{width: '100%'}} />
</a>
<MiniCart cartInfo={todayCart} />
 {/* <AdvertCarousel adverts={adverts} interval={5000} /> */}
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default ProductGrid;