import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import SearchIcon from '@mui/icons-material/Search';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useCart } from "../../context/CartContext"
import { useCategories } from "../../context/CategoryContext"

const ProductDetails = () => {
  const { id, productName } = useParams();
  const { user } = useUser();
  const decodedProductName = decodeURIComponent(productName);
  const [loading, setLoading] = useState(null);
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState(null);
  const [numOfItems, setNumOfItems] = useState(1)
  const { storeCategories, error } = useCategories();
  const [categories, setProductCategories] = useState(null)
    const { cartCount } = useCart();

    const extraLinks = ['Male', 'Female', 'Fitness', 'General', 'Combo Products', 'Sell On PMall', 'Become an Affiliate'];
  
  const incAmt = () => {
    setNumOfItems(numOfItems+1)
  }

  const decAmt = () => {
    if(numOfItems > 1){
      setNumOfItems(numOfItems-1)
    }
  }


  const getProductDetails = () => {
    getProductsCategories();
    fetch(
      `https://api.pmall.mukeey.com.ng/api/v1/public/products/single-product?product_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + user?.token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setDetails(result?.data);
        setMoreImages(result?.data?.more_images?.split(","));
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(detail);
  };

 const getProductsCategories = () => {
        setLoading(true);
        fetch("https://api.pmall.mukeey.com.ng/api/v1/public/products/get-all-categories", {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result);
            setProductCategories(result.data);
            setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            });
    };

  useEffect(() => {
    console.log(id);
    getProductDetails();
  }, []);

  function addToCart(){
    let cart = []
    if(typeof localStorage !== "undefined") {
        cart = (JSON.parse(localStorage.getItem('pmallCart'))) || []
    } 

     cart.push({...detail, amtItems:numOfItems})
    localStorage.setItem('pmallCart', JSON.stringify(cart))
    alert("Item added to cart")
  }

  const addCommasToNumberString = (numberString) =>{
    return  numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  return (
    <>
    <div>
                <div className="flex justsb alc mb-lg">
                    <img src="/top_banner_2.gif" style={{ width: '100%' }} alt="Promotional banner" loading="lazy" />
                </div>
                <div className="px flex flex-col g-40 search-container w-90">
                    <div className="flex justsb alc g-40">
                        <img src="/pmall-logo 1.png" alt="PMall Logo" />
                        <form className="flex alc search" aria-label="Search form">
                            <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" />
                            <button type="submit" className='flex alc g-20 shfhegwer' aria-label="Search button">
                                <SearchIcon />
                            </button>
                        </form>
                        <div className='flex alc'>
                            {/* {showAccount && ( */}
                            <Link to="/auth/sign-in" className="bold flex alc sb">
                                <Person4Icon />
                                <p>Login</p>
                            </Link>
                            {/* {showCart && ( */}
                            <Link to="/app/cart" className="bold flex alc">
                                <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                                <p>Cart</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex alc mb-lg">
                        {/* {showCategories && ( */}
                        <div className="flex g-20 alc mr-lg">
                            {loading ? (
                                <p>Loading categories...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <select style={{ border: '2px solid #c27465', padding: 12, borderRadius: 15, fontWeight: 600 }}>
                                    <option value="1">All Categories</option>
                                    {categories?.map(category => (
                                        <option value={category.name} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="w-100 justsb alc pointer">
                            {extraLinks?.map((text, idx) => (
                                <div key={idx} className="f-bold f-13">{text}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    <div className="prod-details mt-50">
      
      <div className="left">
        <div>
          <div>
            <div>
              <img src={detail?.image ? detail?.image : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="main-image" />
            </div>
            {moreImages && (
              <div className="other-images">
                <img src={moreImages[0]} alt="" className="image" />
                <img src={moreImages[1]} alt="" className="image" />
                <img src={moreImages[2]} alt="" className="image" />
              </div>
            )}
          </div>
          {/* <div className="other-images">
            <img src={moreImages !== null ? moreImages[0] : ""} alt="" className="main-image" />
            <img src={moreImages !== null ? moreImages[1] : ""} alt="" className="main-image" />
            <img src={moreImages !== null ? moreImages[2] : ""} alt="" className="main-image" />
          </div> */}
        </div>
      </div>
      <div className="right">
        <h3 className="prod-name">{detail?.name ? detail?.name : "Fire design T-shirt"}</h3>
        <Rating
          name="read-only"
          value={value}
          className="rating"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          readOnly
        />
        {detail?.selling_price ? <h4 className="prod-price">
        &#x20A6;{addCommasToNumberString(detail?.selling_price)} <span className="former-price"> &#x20A6;{addCommasToNumberString(detail?.cost_price)}</span>
        </h4> : <h4 className="prod-price">N15,000</h4> }
        <p className="prod-desc">
          {detail?.description ? detail?.description : "A dummy t shirt template for a brand called on-fire, available in not so different colors"}
        </p>
        <h3 className="f18">Available Options</h3>
        <div className="variations">
          {/* <div>
            <p className="f-13  mb-10">Size</p>
            <div className="flex g-10">
              <p className="size">S</p>
              <p className="size">M</p>
              <p className="size">L</p>
              <p className="size">XL</p>
              <p className="size">XXL</p>
            </div>
          </div> */}
          <div>
            <p className="f-13  mb-10">Quantity</p>
            <div className="flex g-20 size">
              <p className="pointer" onClick={decAmt}>-</p>
              <p>{numOfItems}</p>
              <p className="pointer" onClick={incAmt}>+</p>
            </div>
          </div>
        </div>
        <div className="flex g-10">
          <button className="f-13" onClick={addToCart}>Add to Cart</button>
          <button className="f-13" onClick={addToCart}>Buy Now!</button>
          {/* <div className="favourite flex all-center">
            <FavoriteIcon />
          </div> */}
        </div>
        <div className="flex gap-10">
          <p className="f-13">
            <span className="f-bold f-13">Category : </span> {detail?.category?.name}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Brand : </span> {detail?.brand?.name}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Availability : </span> {detail?.quantity} products in
            stock
          </p>

          {/* <p className="f-13">
            <span className="f-bold f-13">Vendor :</span> {detail?.store_id}{" "}
            (Halal Lab)
          </p> */}
          <p className="f-13">
            <span className="f-bold f-13">Amt Sold : </span> {detail?.inStock}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Tags : </span> {detail?.tags}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
