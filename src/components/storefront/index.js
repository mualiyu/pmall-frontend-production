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
    // const adverts = [
    //     { id: 1, image_path: "/advert/sefdghfgjjh.png", size: "large", url: "https://product1.com" },
    //     { id: 2, image_path: "/advert/asfgdsfxvdsfbdh.gif", size: "large", url: "https://product1.com" },
    //     { id: 3, image_path: "https://pmallstores.netlify.app/Screenshot%202024-03-19%20163145.png", size: "large", url: "https://product2.com" },
    //     { id: 4, image_path: "/advert/rsefrgfhfj.gif", size: "large", url: "https://product3.com" },
    //   ];

    useEffect(()=>{
        console.log(productCategories);
        console.log(brands);
    },[])
    return ( 
        <div className="store-container">
            <Loading loading={loading} />
            
<div className="site__content__main" style={{marginTop: '17%', marginBottom: '2%'}}>
        <div class="section imgBanners style6 no-pt-section">
            <div class="bannerContain">
                <div class="collection-banners">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 img-banner-item">
                        <div class="imgBanner-grid-item">
                            <div class="inner topleft">
                                <a href="#">
                                    <span class="img">
                                        <img class="blur-up lazyloaded" data-src="/advert/ld__banner.png" src="/advert/ld__banner.png" alt="WELLNESS PRODUCTS" title=" "/>
                                    </span>
                                    {/* <span class="ttl"><span class="tt-small">WELLNESS PRODUCTS</span></span> */}
                                </a>
                            </div>
                                <div>
                                    {/* <img className="w-full b-15" src="/advert/sefdghfgjjh.png"/> */}
                                    <img className="w-full b-15" src="/advert/nbvczxvb.gif"/>
                                {/* <AdvertCarousel adverts={adverts} interval={5000} /> */}
                                </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 img-banner-item">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6 img-banner-item">
                                <div class="imgBanner-grid-item">
                                    <div class="inner topleft">
                                        <a href="#">
                                            <span class="img">
                                                <img class="blur-up lazyloaded" data-src="/fish-oil-vs-omega-3-large.webp" src="/fish-oil-vs-omega-3-large.webp" alt="SKIN CARE " title=" "/>
                                            </span>
                                            <span class="ttl"><span class="tt-small">SKIN CARE </span></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6 img-banner-item">
                                <div class="imgBanner-grid-item">
                                    <div class="inner topright">
                                        <a href="#">
                                            <span class="img">
                                                <img class="blur-up lazyloaded" data-src="/ar.gif" src="/ar.gif" alt="FITNESS PRODUCTS" title=" "/>
                                            </span>
                                            <span class="ttl"><span class="tt-small">FITNESS PRODUCTS</span></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{marginTop: '15px'}}>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 img-banner-item last">
                                <div class="imgBanner-grid-item">
                                    <div class="inner topleft">
                                        <a href="#">
                                            <span class="img">
                                                <img class="blur-up lazyloaded" data-src="/advert/large__banner.png" src="/advert/large__banner.png" alt="GENERAL PRODUCTS" title=" "/>
                                            </span>
                                            {/* <span class="ttl"><span class="tt-small">GENERAL PRODUCTS</span></span> */}
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