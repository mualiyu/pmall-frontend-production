import { useEffect, useState } from 'react';
import Loading from "../../utils/loading";
import AdvertCarousel from "../../utils/adverts";
import ProductGrid from "../products/ProductGrid";
import CategorySlider from '../../utils/categoryCarousel';
import BrandSlider from '../../utils/brandCarousel';
import { Link } from "react-router-dom";
import useProductCategories from "../../hooks/useProductCategories";
import useProductBrands from "../../hooks/useBrands";

const StoreFront = () => {
    const { productCategories, loading, error } = useProductCategories();
    const { brands } = useProductBrands();
    const adverts = [
        { id: 1, image_path: "/advert/ld__banner.png", size: "large", url: "" },
        { id: 2, image_path: "fish-oil-vs-omega-3-large.webp", size: "large", url: "" },
        { id: 3, image_path: "/advert/large__banner.png", size: "large", url: "https://product2.com" },
        // { id: 4, image_path: "/ar.gif", size: "large", url: "" },
      ];

    useEffect(()=>{
        console.log(productCategories);
        console.log(brands);
    },[])
    return ( 
        <div className="store-container">
            <Loading loading={loading} />
            
<div className="site__content__main" style={{marginTop: '17%', marginBottom: '2%'}}>
        <div className="section imgBanners style6 no-pt-section">
            <div className="bannerContain">
                <div className="collection-banners">
                <div className="row">
                <div className="row  w-90" style={{margin: '20px auto'}}>
                    <div className="mobile-only">
                        <AdvertCarousel adverts={adverts} />
                    </div>
                </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 img-banner-item desktop-only">
                        <div className="imgBanner-grid-item">
                            <div className="inner topleft">
                                <a href="#">
                                    <span className="img">
                                        <img className="blur-up lazyloaded" data-src="/advert/ld__banner.png" src="/advert/ld__banner.png" alt="WELLNESS PRODUCTS" title=" "/>
                                    </span>
                                    {/* <span className="ttl"><span className="tt-small">WELLNESS PRODUCTS</span></span> */}
                                </a>
                            </div>
                                <div>
                                    {/* <img className="w-full b-15" src="/advert/sefdghfgjjh.png"/> */}
                                    <img className="w-full b-15" src="/advert/nbvczxvb.gif"/>
                                {/* <AdvertCarousel adverts={adverts} interval={5000} /> */}
                                </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 img-banner-item desktop-only">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 img-banner-item">
                                <div className="imgBanner-grid-item">
                                    <div className="inner topleft">
                                        <a href="#">
                                            <span className="img">
                                                <img className="blur-up lazyloaded" data-src="/fish-oil-vs-omega-3-large.webp" src="/fish-oil-vs-omega-3-large.webp" alt="SKIN CARE " title=" "/>
                                            </span>
                                            <span className="ttl"><span className="tt-small">SKIN CARE </span></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 img-banner-item nerrrd">
                                <div className="imgBanner-grid-item">
                                    <div className="inner topright">
                                        <a href="#">
                                            <span className="img">
                                                <img className="blur-up lazyloaded" data-src="/ar.gif" src="/ar.gif" alt="FITNESS PRODUCTS" title=" "/>
                                            </span>
                                            <span className="ttl"><span className="tt-small">FITNESS PRODUCTS</span></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row desktop-only" style={{marginTop: '15px'}}>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 img-banner-item last">
                                <div className="imgBanner-grid-item">
                                    <div className="inner topleft">
                                        <a href="#">
                                            <span className="img">
                                                <img className="blur-up lazyloaded" data-src="/advert/large__banner.png" src="/advert/large__banner.png" alt="GENERAL PRODUCTS" title=" "/>
                                            </span>
                                            {/* <span className="ttl"><span className="tt-small">GENERAL PRODUCTS</span></span> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row  w-90" style={{margin: '20px auto'}}>
            {/* <CategorySlider categories={brands} /> */}
            <BrandSlider brands={brands} />
        </div>
            <div className='px flex flex-col g-40 w-90'>
                    <div className='flex justsb g-10' style={{width: '100%'}}>
                    <ProductGrid />
                    </div>
                
            </div>
           
        </div>
      
        </div>
     );
}
 
export default StoreFront;