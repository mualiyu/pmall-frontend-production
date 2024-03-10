import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useUser } from "../../context/UserContext";

const ProductDetails = () => {
  const {id} = useParams();
  const { user } = useUser();
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState([]);
  const getProductDetails = () => {
    fetch("https://test.igeecloset.com/api/v1/products/get-single?product_id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + user?.token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result.data.product);
        setDetails(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const addCommasToNumberString = (numberString) =>{
    return  numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  return (
    <div className="prod-details mt-50">
      <div className="left">
       
          <div>
            <div>
              <img src={detail.image} alt="" className="main-image" />
            </div>
            <div className="other-images">
              <img src={detail?.more_images} alt="" className="image" />
              <img src={detail?.more_images} alt="" className="image" />
              <img src={detail?.more_images} alt="" className="image" />
            </div>
          </div>
      
      </div>
      <div className="right">
        <h3 className="prod-name">{detail.name}</h3>
        <Rating
          name="read-only"
          value={value}
          className="rating"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          readOnly
        />
        {detail.selling_price && <h4 className="prod-price">
        &#x20A6;{addCommasToNumberString(detail?.selling_price)} <span className="former-price"> &#x20A6;{addCommasToNumberString(detail?.cost_price)}</span>
        </h4>}
        <p className="prod-desc">
          {detail.description}
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
              <p>-</p>
              <p>1</p>
              <p>+</p>
            </div>
          </div>
        </div>
        <div className="flex g-10">
          <button className="f-13">Add to Cart</button>
          <div className="favourite flex all-center">
            <FavoriteIcon />
          </div>
        </div>
        <div className="flex gap-10">
          <p className="f-13">
            <span className="f-bold f-13">Category :</span> {detail.category_id}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Brand :</span> {detail.brand_id}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Availability :</span> {detail.quantity} products in
            stock
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Vendor :</span> {detail.store_id} (Halal Lab)
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Amt Sold : </span> {detail.inStock}
          </p>
          <p className="f-13">
            <span className="f-bold f-13">Tags : </span> {detail.tags}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
