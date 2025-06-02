import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Loading from "../../utils/loading";
import LimitWord from "../../utils/limitWord";
import currency from "../../utils/formatCurrency";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useVendor } from "../../context/VendorSignupContext";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const VendorStore = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [productList, setProductList] = useState(null);
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    const refLink = query.get('refLink');


    const getVendorProducts = async () => {
        // const storeId = user?.storeId;
        // if (!storeId) {
        //   console.warn("Store ID missing");
        //   return;
        // }
      
        setLoading(true);
      
        try {
          const response = await fetch(`${BASE_URL}/products/list-all-by-vendor?store_id=${refLink}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
      
          const result = await response.json();
          console.log("API Response:", result);
      
          if (result.status) {
            setProductList(result.data);
          } else {
            console.warn("API error:", result.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
      
      const filteredData = productList?.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

      useEffect(() => {
        getVendorProducts();
      }, []);

    return ( 
        <section className=" w-full" style={{display:"block"}}>
            {loading && <Loading/>}
            <div className="gallery">
                <div className="page__header">
                    <h1>My Store</h1>
                </div>
                {/* <div className=" flex flex-col img-detail g-5">
                                <p className='bold'>My Store URL</p>
                                <div className='flex justsb url w-full'>
                                <p>{`https://pmall.com.ng/products/?vendor_id=${user?.storeId}`}</p>
                                    <ContentCopyOutlinedIcon className='copy'/>
                                </div>
                            </div> */}
            
                <div className="flex-container w-full p-y my-40 g-20">
                    <div className="left w-full flex flex-col g-20 ">
                        <div className='flex justsb alc sort'>
                        <div>
                                <input type="text" placeholder="Search" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}/>
                            </div>
                            <div className='flex alc g-10'>
                                <select name="" id="">
                                    <option value="1">Sort</option>
                                    <option value="1">Category 1</option>
                                    <option value="1">Category 2</option>
                                    <option value="1">Category 3</option>
                                    <option value="1">Category 4</option>
                                    <option value="1">Category 5</option>
                                    <option value="1">Category 6</option>
                                </select>
                                <div className='flex alc'>
                                <GridViewOutlinedIcon />  
                                <FormatListBulletedOutlinedIcon />      
                                </div>   
                            </div>
                        </div>
                        {/* <div className='g-10 justsb'> */}
                        <div className="flex justsb g-10 m-pd-0">
                                <div className="row">
                            {filteredData?.map(product => (
                                <>
                                <div className="col-12 col-sm-6 col-md-4 col-lg-2 product-cart-wrap" style={{ margin: "15px 5px" }} key={product.id}>
                               
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
                                </div>
                              </div>
                                </>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
} 
 
export default VendorStore;