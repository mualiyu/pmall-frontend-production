import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import LimitWord from "./limitWord";
import currency from "./formatCurrency";

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-container">




<Slider {...settings}>
<div className="flex justsb g-10" style={{ padding: "25px" }}>
              <div className="row">
              {products?.map((product) => (
                  <div className="col-sssm-2 col-md-6 col-lg-3 col-xl-3 product-cart-wrap flex justsb" style={{ margin: "20px 9px" }} key={product.id}>
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
                            <h3 className="red bold product__cost">
                              {currency(product.selling_price || 0)}
                              &nbsp;
                              {product.cost_price && <span className="cost__price">{currency(product.cost_price)}</span>}
                            </h3>
                          </div>
                        </div>
                      </Link>
                      <div className="add-cart">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
</Slider>
    </div>
  );
};

export default ProductCarousel;
