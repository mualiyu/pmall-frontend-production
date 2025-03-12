import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/loading";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import ProductGrid from "../products/ProductGrid";
import Typography from "@mui/material/Typography";
import Header from "../builder/Header";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Link } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useCart } from "../../context/CartContext"
import { useCategories } from "../../context/CategoryContext"
import CategorySlider from '../../utils/categoryCarousel';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [showCart, setShowCart] = useState(true);
    const [showAccount, setShowAccount] = useState(true);
    const [showCategories, setShowCategories] = useState(true);
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

const StoreFront = () => {
    const navigate = useNavigate();
    const {cartLength} = useCart();
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    // const backgroundColors = ['#191970', '#36454F',  '#005f5f',  '#556B2F',  '#6A5ACD',  '#2E8B57',  '#4682B4',  '#9370DB',  '#D2691E',  '#4169E1',  '#008080',  '#CC5500',  '#800020',  '#4B0082'];
    const backgroundColors = ['#191970',   '#6A5ACD',  '#4169E1',  '#008080'];
    const [products, setProducts] = useState([]);
    const [categories, setProductCategories] = useState(null)
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
     
      const getRandomColor = (colorArray) => {
        const randomIndex = Math.floor(Math.random() * colorArray.length);
        return colorArray[randomIndex];
      };
      
      const handleViewAll = (category) => {
        navigate(`/store/product/categories/${category.id}`, { state: { category } });
    };


    const getProducts = () => {
        setLoading(true);
        getProductsCategories();
        fetch("https://api.pmall.com.ng/api/v1/public/products/list-all", {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result);
            setProducts(result.data);
            getProductsBySubCategories(3);
            setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            });
    };


    const getProductsBySubCategories = (sub_cat_id) => {
setLoading(true);
        fetch(`https://api.pmall.com.ng/api/v1/public/products/list-all-by-sub-category?sub_category_id=${sub_cat_id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result);
            // setProductSubCategories(result.data);
            setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            });
    }
    const getProductsCategories = () => {
        setLoading(true);
        fetch("https://api.pmall.com.ng/api/v1/public/products/get-all-categories", {
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


    const getProductByCategory = (cat_id) => {
        fetch(`https://api.pmall.com.ng/api/v1/public/products/list-all-by-category?category_id=${cat_id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result);
            })
            .catch((err) => {
            console.log(err);
            });
    };


const { storeCategories, error } = useCategories();
    const { cartCount } = useCart();
    const { user } = useUser();

    useEffect(()=>{
        getProducts();
        getProductByCategory(2);
    },[])
    return ( 
        <div className="store-container">
            <Loading loading={loading} />
            
<div className="site__content__main">
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

<CategorySlider categories={categories} />
                </div>


                
           
            <div className='px flex flex-col g-40 w-90'>
                <div className='flex flex-col g-40'>
                    <img src="/Screenshot 2024-03-19 150113.png" alt="" />
                    <div className='flex g-20'>
                        <div>
                            <img src="/Screenshot 2024-03-19 145936.png" alt="" className='w-full'/>
                        </div>
                        <div>
                            <img src="/Screenshot 2024-03-19 145810.png" alt="" className='w-full' />
                        </div>
                       
                    </div>
                </div>
                {/* <div className='bg-blue w-full'>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example">
                            <Tab label="Latest Deals" {...a11yProps(0)} />
                            <Tab label="Trending Deals" {...a11yProps(1)} />
                            <Tab label="Featured Deals" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                    <div className="row">
  {products?.map((product) => (
    <div className="col-sssm-2 col-md-6 col-lg-3 col-xl-3" style={{ margin: '0 5px' }} key={product.id}>
      <div className="product-info default-cover card">
        <Link to={`/product/${product.id}`} className="img-bg">
          <img
            src={product.image || '/default-image.jpg'} 
            alt={product.name || 'Product Image'} 
            className="product__image" 
            style={{ width: 150 }}
          />
        </Link>
        <Link to={`/product/${product.id}`} className="no__underline">
          <div className="product_desc">
            <div className="flex-col g-5">
              <p className="product__name bold uppercase">
                {LimitWord(product.name || 'Unnamed Product', 3)}
              </p>
              <h3 className="red bold product__cost">
                {currency(product.selling_price || 0)}
              </h3>
              {product.cost_price && (
                <h3 className="cost__price">
                  {currency(product.cost_price)}
                </h3>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  ))}
</div>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div class="row">
                {products?.map(product => (
    <div className="col-sssm-2 col-md-6 col-lg-3 col-xl-3" style={{ margin: '0 5px' }}>
        <div className="product-info default-cover card">
            <Link to={`/product/${product.id}`} className="img-bg">
                <img src={product.image} alt={product.name} className="product__image" style={{ width: 150 }} />
            </Link>
            <Link to={`/product/${product.id}`} className="no__underline">
                <div className='product_desc'>
                    <div className='flex-col g-5'>
                        <p className="product__name capitalize bold">{LimitWord(product.name, 3)}</p>
                        <h3 className='red bold product__cost'>{currency(product.selling_price)}</h3>
                        <h3 className='cost__price'>{currency(product.cost_price)}</h3>
                    </div>
                </div>
            </Link>
        </div>
    </div>
))}


											</div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        hello mannannaa
                    
                    </TabPanel>
                </Box>
                </div> */}
                
                {/* <CategoriesWithProducts categories={categories} /> */}

            {categories?.map(category => (
                <div className='flex flex-col alc g-20 bg-white-contain' key={category.id}>
                    <div className='w-full flex justsb style-header' style={{backgroundColor: getRandomColor(backgroundColors)}}>
                        <div className='g-40 w-full section-tabs'>
                            <div className="w-full flex justsb">
                            <h1 className="">{category.name}</h1>
                            <p className="view__all__btn"  onClick={() => handleViewAll(category)} >View all Products</p>
                            </div>
                            <ul className='flex g-15'>
                            {category.sub_categories?.slice(0, 7).map(sub => (
                                <l1 key={sub.id}>{sub.name}</l1>
                            ))}
                            </ul>
                        </div>
                        
                    </div>
                    <div className='flex justsb g-10' style={{padding: '25px'}}>
                    <ProductGrid 
                    categoryId={category.id} />
                    </div>
                </div>

            ))}
            </div>
        </div>
        </div>
     );
}
 
export default StoreFront;