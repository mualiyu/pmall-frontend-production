import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState(
    {
      id: id,
      store_id: "PMS-892049",
      name: "Fire design T-shirt",
      amtItems: 1,
      cost_price: 450000,
      description: "A dummy t shirt template for a brand called on-fire, available in not so different colors",
      image:"https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain",
      inStock: 2,
      more_images: "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain",
      quantity:4,
      selling_price:15000,
      tags: "Fashion"
    }
  );
  const [numOfItems, setNumOfItems] = useState(1)
  
  const incAmt = () => {
    setNumOfItems(numOfItems+1)
  }

  const decAmt = () => {
    if(numOfItems > 1){
      setNumOfItems(numOfItems-1)
    }
  }


  const getProductDetails = () => {
    fetch(
      "https://api.pmall.com.ng/api/v1/products/get-single?product_id=" + id,
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
        console.log(result.data.product);
        setDetails(result.data.product);
        setMoreImages(result?.data?.product?.more_images.split(","));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
    <div className="prod-details mt-50">
      <div className="left">
        <div>
          <div>
            <div>
              <img src={detail.image ? detail.image : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="main-image" />
            </div>
            <div className="other-images">
              <img src={detail.more_images ? detail.more_images : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="image" />
              <img src={detail.more_images? detail.more_images : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="image" />
              <img src={detail.more_images ? detail.more_images : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="image" />
              <img src={detail.more_images ? detail.more_images : "https://th.bing.com/th/id/OIP.608kpIxTz9H4RyDpKCimXQHaHa?rs=1&pid=ImgDetMain"} alt="" className="image" />
            </div>
          </div>
          <div className="other-images">
            <img src={moreImages[0]} alt="" className="image" />
            <img src={moreImages[1]} alt="" className="image" />
            <img src={moreImages[2]} alt="" className="image" />
          </div>
        </div>
      </div>
      <div className="right">
        <h3 className="prod-name">{detail.name ? detail.name : "Fire design T-shirt"}</h3>
        <Rating
          name="read-only"
          value={value}
          className="rating"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          readOnly
        />
        {detail.selling_price ? <h4 className="prod-price">
        &#x20A6;{addCommasToNumberString(detail?.selling_price)} <span className="former-price"> &#x20A6;{addCommasToNumberString(detail?.cost_price)}</span>
        </h4> : <h4 className="prod-price">N15,000</h4> }
        <p className="prod-desc">
          {detail.description ? detail.description : "A dummy t shirt template for a brand called on-fire, available in not so different colors"}
        </p>
        <h3 className="f18">Available Options</h3>
        <div className="variations">
          <div>
            <p className="f-13  mb-10">Size</p>
            <div className="flex g-10">
              <p className="size">S</p>
              <p className="size">M</p>
              <p className="size">L</p>
              <p className="size">XL</p>
              <p className="size">XXL</p>
            </div>
          </div>
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
          <div className="favourite flex all-center">
            <FavoriteIcon />
          </div>
        </div>
        <div className="flex gap-10">
          <p className="f-13">
            <span className="f-bold f-13">Category : Category</span> {detail.category_id}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Brand : Nike</span> {detail.brand_id}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Availability : 17</span> {detail.quantity} products in
            stock
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Vendor :</span> {detail.store_id}{" "}
            (Halal Lab)
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Amt Sold : 5</span> {detail.inStock}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Tags : Fashion, Clothing</span> {detail.tags}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
