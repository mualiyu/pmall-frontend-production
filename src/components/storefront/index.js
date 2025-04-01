import { useEffect, useState } from 'react';
import Loading from "../../utils/loading";
import ProductGrid from "../products/ProductGrid";
import CategorySlider from '../../utils/categoryCarousel';
import { Link } from "react-router-dom";
import useProductCategories from "../../hooks/useProductCategories";

const StoreFront = () => {
    const { productCategories, loading, error } = useProductCategories();
  
    useEffect(()=>{
        console.log(productCategories);
    },[])
    return ( 
        <div className="store-container">
            <Loading loading={loading} />
            
<div className="site__content__main" style={{marginTop: '17%'}}>
        <div class="section imgBanners style6 no-pt-section">
            <div class="bannerContain">
                <div class="collection-banners">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 img-banner-item">
                        <div class="imgBanner-grid-item">
                            <div class="inner topleft">
                                <a href="#">
                                    <span class="img">
                                        <img class="blur-up lazyloaded" data-src="/top-natural-health-products-2021-large.webp" src="/top-natural-health-products-2021-large.webp" alt="WELLNESS PRODUCTS" title=" "/>
                                    </span>
                                    <span class="ttl"><span class="tt-small">WELLNESS PRODUCTS</span></span>
                                </a>
                            </div>
                                <div>
                                    <img src="/pmall___ad.png" alt="" className='w-full b-15'/>
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
                                                <img class="blur-up lazyloaded" data-src="/ceramides-skincare-benefits-large.webp" src="/ceramides-skincare-benefits-large.webp" alt="FITNESS PRODUCTS" title=" "/>
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
                                                <img class="blur-up lazyloaded" data-src="/best-intermittent-fasting-foods-large.jpg" src="/best-intermittent-fasting-foods-large.jpg" alt="GENERAL PRODUCTS" title=" "/>
                                            </span>
                                            <span class="ttl"><span class="tt-small">GENERAL PRODUCTS</span></span>
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
            <CategorySlider categories={productCategories} />
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