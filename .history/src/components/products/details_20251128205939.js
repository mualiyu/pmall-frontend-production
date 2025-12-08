import { useEffect, useState, useCallback } from "react";
import Header from "../builder/Header";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getCart } from "../../utils/cartUtils";
import useProductCategories from "../../hooks/useProductCategories";
import Rating from "@mui/material/Rating";
import Loading from "../../utils/loading";
import { BASE_URL } from "../../utils/config"; 
import ProductCarousel from "../../utils/productCarousel";
import { useCart } from "../../context/CartContext"
import { useCategories } from "../../context/CategoryContext"

const ProductDetails = () => {
  const { id, productName } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState(null);
  const [numOfItems, setNumOfItems] = useState(1)
  const [categories, setProductCategories] = useState(null)
  const { products } = useProductCategories();

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
    setLoading(true);
    getProductsCategories();
    fetch(`${BASE_URL}/public/products/single-product?product_id=${id}`,
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      console.log(detail);
  };


  
 const getProductsCategories = () => {
        setLoading(true);
        fetch(`${BASE_URL}/public/products/get-all-categories`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            // console.log(result);
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

  const handleAddToCart = useCallback(() => {
    const numOfItems = 1;
    let cart = getCart();
console.log(cart);
    const isProductInCart = cart?.some((item) => item?.id === detail?.id);

    if (isProductInCart) {
      cart = cart.map((item) =>
        item.id === detail.id ? { ...item, amtItems: Math.max(1, (item.amtItems || 1) + numOfItems) } : item
      );
      setCartMessage(
        <div className="title-case">
          {detail.name} updated in cart! <br />
          <Link to="/cart" style={{ color: "orange", textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    } else {
      cart.push({ ...detail, amtItems: numOfItems });
      setCartMessage(
        <div className="title-case">
          {detail?.name} added to cart! <br />
          <Link to="/cart" style={{ color: "orange", fontWeight: 700, textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    }

    localStorage.setItem("pmallCart", JSON.stringify(cart));

    setTimeout(() => setCartMessage(""), 7000);
  }, []);


  const addCommasToNumberString = (numberString) =>{
    return  numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }
    const bestTaken = [
      { name: 'Before meal', value: true },
      { name: 'With meal', value: false },
      { name: 'After meal', value: false },
      { name: 'Morning', value: true },
      { name: 'Afternoon', value: true },
      { name: 'Night', value: true }
  ];

  const notFor = [
    { name: 'Pregnant women', value: true },
    { name: 'Breastfeeding mothers', value: true },
    { name: 'Kids under 4', value: true },
    { name: 'Kids under 8', value: true },
    { name: 'Kids under 12', value: false },
];


  return (
    <>
      <div className="relative">
        <div className="prod-details mt-50">
          <div className="left">
          <Loading loading={loading} />
            <div>
              <div>
                <div>

                {detail?.image ? (
      <img className="main-image" src={detail.image} alt="" className="main-image" />
    ) : (
      <Loading loading={loading} />
    )}
                </div>
                {moreImages && (
                  <div className="other-images">
                    <img src={moreImages[0]} alt="" className="image" />
                    <img src={moreImages[1]} alt="" className="image" />
                    <img src={moreImages[2]} alt="" className="image" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <h3 className="prod-name title-case">{detail?.name ? detail?.name : "..."}</h3>
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
            </h4> : <h4 className="prod-price">No Price Tag</h4> }
            <p className="prod-desc capitalize">
              {detail?.description ? detail?.description : "No description added for this product"}
            </p>
            {/* <h3 className="f18">Quantity</h3> */}
            <div className="variations" style={{margin: '20px 0'}}>
              {/* <div>
                <p className="f-13  mb-10">Size</p>
                <div className="flex g-10">
                  <p className="size">S</p>
                  <p className="size">M</p>
                  <p className="size">L</p>
                </div>
              </div> */}
              <div>
                {/* <p className="f-13  mb-10">Quantity</p> */}
                <h3 style={{margin: '7px 0'}}>Select Quantity</h3>
                <div className="flex g-20 size">
                  <p className="pointer" onClick={decAmt}>-</p>
                  <p>{numOfItems}</p>
                  <p className="pointer" onClick={incAmt}>+</p>
                </div>
              </div>
            </div>
            <div className="right">
             
            

            <h3>Product Information</h3>
      <div className="transaction-table sgdfhhjsd">
          <div className="row">
          <div className="cell">Category</div>
            <div className="cell">{detail?.category?.name}</div>
            </div>
            <div className="row">
            <div className="cell">Brand</div>
            <div className="cell">{detail?.brand?.name}</div>
          </div>
          <div className="row">
          <div className="cell">Availability</div>
            <div className="cell">{detail?.inStock > 0 ? "Yes" : "Out of Stock"} </div>
            </div>
            <div className="row">
            <div className="cell">Quanity Sold</div>
            <div className="cell">{detail?.quantity}</div>
          </div>
          <div className="row">
            <div className="cell">Product Tags</div>
            <div className="cell">{detail?.tags}</div>
          </div>
      </div>

      <div className="flex g-10">
              <button className="f-13" onClick={handleAddToCart}>Add to Cart</button>
              <Link to="/">
              <button className="f-13 btn-sec sjdhfscs">Continue Shopping</button>
              </Link>
            </div>


            </div>
          </div>

        
        
          {/* <div className={`cart-modal-container ${cartModalActive && "active"}`}>
            <div className="cart-modal">
              <CheckCircleIcon className="check"/>
                <h3>Item successfully added to cart  </h3>
                <div className="modal-btns">
                  <div  className="modal-btn btn-1">
                    <Link to="/cart"><p>Proceed to cart</p></Link>
                  </div>
                  <div  className="modal-btn btn-2">
                    <Link to="/"><p>Continue shopping</p></Link>
                  </div>
                </div>
            </div> */}
           
          {/* </div> */}
          </div>
          <div className="flex flex-col gap-5 p-5 rounded-lg shadow-md " style={{margin: '5% auto'}}>
        {/* <h3> Related Products </h3> */}
            <div className="flex gap-4 overflow-x-auto">
            <div className='flex justsb g-10' style={{width: '100%'}}>
            <ProductCarousel products={products} quantity={5} />
                    </div>
            </div>
            
        </div>

        </div>  
        {cartMessage && <p className="cart-message">{cartMessage}</p>}
      {/* </div>   */}
    </>
  );
};

export default ProductDetails;
