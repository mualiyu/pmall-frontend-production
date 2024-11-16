import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from 'react';
import LimitWord from '../../utils/limitWord';
import currency from '../../utils/formatCurrency';
import Loading from "../../utils/loading";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ProductCarousel from "../../utils/productCarousel";
import Typography from "@mui/material/Typography";
import Header from "../builder/Header";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Link } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import SearchIcon from '@mui/icons-material/Search';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useCart } from "../../context/CartContext"
import { useCategories } from "../../context/CategoryContext"

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
    const {cartLength} = useCart();
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setProductCategories] = useState(null)
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const productts = [
        {
          id: 1,
          name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          price: 4000.00,
          img:"/Screenshot 2024-03-19 154643.png",
          rating:4.0,
          desc: 'amet consectetur adipisicing elit'
        },
        {
          id: 2,
          name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          price: 4000.00,
          img:"/Screenshot 2024-03-19 154643.png",
          rating:4.0,
          desc: 'amet consectetur adipisicing elit'
        },
        {
          id: 3,
          name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          price: 4000.00,
          img:"/Screenshot 2024-03-19 154643.png",
          rating:4.0,
          desc: 'amet consectetur adipisicing elit'
        },
        {
          id: 4,
          name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          price: 4000.00,
          img:"/Screenshot 2024-03-19 154643.png",
          rating:4.0,
          desc: 'amet consectetur adipisicing elit'
        },
      ];
      
    const getProducts = () => {
        setLoading(true);
        getProductsCategories();
        fetch("https://api.pmall.mukeey.com.ng/api/v1/public/products/list-all", {
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
        fetch(`https://api.pmall.mukeey.com.ng/api/v1/public/products/list-all-by-sub-category?sub_category_id=${sub_cat_id}`, {
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

    const getProduct = () => {
        fetch("https://api.pmall.mukeey.com.ng/api/v1/public/products/list-all-by-category?category_id=1", {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result,"edibles");
            })
            .catch((err) => {
            console.log(err);
            });

            getProduct()
    };


const { storeCategories, error } = useCategories();
    const { cartCount } = useCart();
    const { user } = useUser();

    const extraLinks = ['Male', 'Female', 'Fitness', 'General', 'Combo Products', 'Sell On PMall', 'Become an Affiliate'];

    useEffect(()=>{
        getProducts()
    },[])
    return ( 
        <div className="store-container">
            <Loading loading={loading} />
            {/* Header Component */}
        <>
            {!user?.token && (
                <div>
                    <div className="flex justsb alc mb-lg">
                        <img src="/top_banner_2.gif" style={{ width: '100%' }} alt="Promotional banner" loading="lazy" />
                    </div>
                    <div className='px flex flex-col g-40 search-container w-90'>
                        <div className="flex justsb alc g-40">
                            <img src="/pmall-logo 1.png" alt="PMall Logo" />
                            <form className="flex alc search" aria-label="Search form">
                                <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" />
                                <button type="button" className='flex alc g-20 shfhegwer' aria-label="Search button">
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
                                {extraLinks.map((text, idx) => (
                                    <div key={idx} className="f-bold f-13">{text}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

            {/* Ends Header Component */}
                <div className="flex g-20 px w-90">
                    <div className='flex flex-col g-20'>
                        <img src="/pmall/3.png" alt="" className="w-full" />
                        <img src="/pmall/11.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 215058.png" alt="" className="w-full" />
                    </div>
                    <div className='flex flex-col g-20'>
                        <img src="/Screenshot 2024-03-21 215316.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 215417.png" alt="" className="w-full" />
                    </div>
                    <div className='flex flex-col g-20'>
                    {/* <ProductCarousel products={products} /> */}
                        <img src="/Screenshot 2024-03-21 215854.png" alt="" className="w-full" />
                        <img src="/pmall/17.png" alt="" className="w-full" />
                        <img src="/pmall/19.png" alt="" className="w-full" />
                    </div>
                </div>
                <div className="row  w-90" style={{margin: '20px auto'}}>
                {categories?.map(category => (
                           <div className='flex flex-col g-10 alc brand_stores m-5 mt-15 w-125p'>
                            <div className='border b-image'>
                                <img src={category.category_image} className='icon' width="60px" />
                            </div>
                            <p className="cat_title">{category.name}</p>
                        </div>
                        ))}
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
                <div className='bg-blue w-full'>
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
                    <div class="row">
                {products?.map(product => (
												<div class="col-sssm-2 col-md-6 col-lg-3 col-xl-3" style={{    margin: '0 5px'}}>
													<div class="product-info default-cover card">
                                                    <Link to={`/product/${product.id}`}   className="img-bg">
														
															<img src={product.image} alt={product.name} className="product__image" style={{width: 150}}/>
														</Link>
                                                        <Link to={`/product/${product.id}`}  className="no__underline"  >
                                                        <div className='product_desc'>
                                        <div className='flex-col g-5'>
                                            <p className="product__name bold uppercase">{LimitWord(product.name, 3)}</p>
                                            <h3 className='red bold product__cost'>{currency(product.selling_price)}</h3>
                                            <h3 className='cost__price'>{currency(product.cost_price)}</h3>
                                            {/* <div className="mt-5 bt">
                                                <p>{LimitWord(product.description, 10)}</p>
                                            </div> */}
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
    <div className="col-sm-2 col-md-6 col-lg-3 col-xl-3" style={{ margin: '0 5px' }}>
        <div className="product-info default-cover card">
            <Link to={`/product/${product.id}`} className="img-bg">
                <img src={product.image} alt={product.name} className="product__image" style={{ width: 150 }} />
            </Link>
            <Link to={`/product/${product.id}`} className="no__underline">
                <div className='product_desc'>
                    <div className='flex-col g-5'>
                        <p className="product__name capitalize">{LimitWord(product.name, 10)}</p>
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
                        <h3>test3</h3>
                    </TabPanel>
                </Box>
                </div>
                <div className='flex flex-col alc g-20 bg-yellow'>
                    <h1>Hello  2025</h1>
                    <div className='flex justsb g-10'>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-10'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>


            {categories?.map(category => (
                <div className='flex flex-col alc g-20 bg-white-container'>
                    <div className='w-full flex justsb'>
                        <div className='g-40 section-tabs'>
                            <h1 className="">{category.name}</h1>
                            <ul className='mt-lg flex g-15'>
                            {category.sub_categories?.slice(0, 7).map(sub => (
                                <l1 >{sub.name}</l1>
                            ))}
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb g-10'>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-10'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

            ))}

                <img src="/Screenshot 2024-03-19 163035.png" alt="img" />
                <div className='flex flex-col alc g-20 bg-white-container'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40 section-tabs'>
                            <h1>Travel Tour</h1>
                            <ul className='flex g-20'>
                                <l1>Nigeria</l1>
                                <l1>South Africa</l1>
                                <l1>Zambia</l1>
                                <l1>Ghana</l1>
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb g-10'>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-10'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <img src="/Screenshot 2024-03-19 163145.png" alt="" />
                <div className='flex flex-col g-20 bg-white-container'>
                    <h1>Hello Summer 2024</h1>
                    <div className='flex justsb g-10'>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-10'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div'>
                                    <img src="/Screenshot 2024-03-19 154643.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <img src="/Screenshot 2024-03-19 164641.png" alt="" />
                <div className='flex flex-col alc g-20 bg-white-container'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40 section-tabs'>
                            <h1>Mall & Store</h1>
                            <ul className='flex g-20'>
                                <l1>Resort</l1>
                                <l1>Software</l1>
                                <l1>Sports</l1>
                                <l1>Entertainment</l1>
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb g-10'>
                            <div className='bg-white product-card'>
                                <div className='img-div h-320'>
                                    <img src="/Screenshot 2024-03-23 144908.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-10'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div h-320'>
                                    <img src="/Screenshot 2024-03-23 145254.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div h-320'>
                                    <img src="/Screenshot 2024-03-23 145419.png" alt="" className='w-full' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white product-card'>
                                <div className='img-div h-320'>
                                    <img src="/Screenshot 2024-03-23 145605.png" alt="" className='w-full long' />
                                </div>
                                <div className='desc'>
                                    <div className='red-rating-container'>
                                        <p className='red-rating'>4.0</p>
                                    </div>
                                    <div className='main-desc flex flex-col g-5'>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                                        <h3 className='red bold'>N4000.00</h3>
                                        <div className="mt-5 bt">
                                            <p> amet consectetur adipisicing elit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <img src="/Screenshot 2024-03-20 162550.png" alt="" />

                <div className='flex justsb alc g-10'>
                    <div className='bg-white-container news flex flex-col gap-10'>
                        <div className='flex justsb'>
                            <h3>LATEST NEWS</h3>
                            <p>VIEW ALL</p>
                        </div>
                        <img src="/Screenshot 2024-03-20 163129.png" alt="" />
                        <h3>Where does it come from?</h3>
                        <div className='flex justsb'>
                            <h4>POSTED OCTOBER 3,2016</h4>
                            <h4>BY WPTHEMEGO</h4>
                        </div>
                        <div className='flex flex-col g-20 mt-5'>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                            <div className='flex justsb alc'>
                                <h4>Blog</h4>
                                <h4>Lorem, ipsum dolor sit amet consec.</h4>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white-container deals flex flex-col g-10'>
                        <h3>NEVER MISS THESE DEALS</h3>
                        <div className='grid grid-2 g-20'>
                            <div className='flex flex-col g-10'>
                                <img src="/Screenshot 2024-03-20 163309.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div className='flex flex-col g-10'>
                                <img src="/Screenshot 2024-03-20 163409.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div className='flex flex-col g-10'>
                                <img src="/Screenshot 2024-03-20 163446.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div className='flex flex-col g-10'>
                                <img src="/Screenshot 2024-03-20 163531.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                        </div>
                    </div>
                    <div className='partners bg-white-container'>
                        <h3>OUR PARTNERS</h3>
                        <div className='grid grid-2'>
                            <div>
                                <img src="/brand1.png" alt="" />
                            </div>
                            <div>
                                <img src="/brand2.png" alt="" />
                            </div>
                            <div>
                                <img src="/brand3.png" alt="" />
                            </div>
                            <div>
                                <img src="/brand4.png" alt="" />
                            </div>
                            <div>
                                <img src="/brand5.png" alt="" />
                            </div>
                            <div>
                                <img src="/brand6.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justsb'>
                    <img src="/phone.png" alt="" />
                    <div className='download-app'>
                        <img src="/pmall-logo 1.png" alt="" className='logo' />
                        <h2>The Deals aren't gonna grab themselves</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/> Adipisci sunt ullam, architecto autem praesentium atque omnis<br/> obcaecati perferendis excepturi modi nulla quae consectetur, animi, ut sapiente ipsam exercitationem eius iste.</p>
                        <div className='flex alc g-10'>
                            <div className='flex flex-col g-10'>
                                <img src="/Screenshot 2024-03-20 164510.png" alt="" />
                                <img src="/Screenshot 2024-03-20 164608.png" alt="" />
                            </div>
                            <div className='p-10 bg-white'>
                                <img src="/Screenshot 2024-03-20 164716.png" alt="" className='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='store-footer flex flex-col g-40 w-90'>
                    <div className='flex justsb'>
                        <div className='flex flex-col g-20'>
                            <h3>Our Mission</h3>
                            <div className='flex flex-col g-20'>
                                <p>Financing</p>
                                <p>Product recyling</p>
                                <p>Sustainability</p>
                                <p>Gift Return</p>
                            </div>    
                        </div>
                        <div className='flex flex-col g-20'>
                            <h3>Support</h3>
                            <div className='flex flex-col g-20'>
                                <p>Product Support</p>
                                <p>Pc Setup & Support</p>
                                <p>Services</p>
                                <p>Extended Services Plans</p>
                                <p>Community</p>
                            </div>    
                        </div>
                        <div className='flex flex-col g-20'>
                            <h3>Company</h3>
                            <div className='flex flex-col g-20'>
                                <p>About Us</p>
                                <p>Careers</p>
                                <p>Affilates</p>
                                <p>Blog</p>
                            </div>    
                        </div>
                        <div className='flex flex-col g-20' >
                            <h3>Quick Links</h3>
                            <div className='flex flex-col g-20'>
                                <p>Store Location & Hours</p>
                                <p>Click & Collect</p>
                                <p>Payment</p>
                                <p>Delivery</p>
                                <p>Return & Refunds</p>
                                <p>Secure Shopping</p>
                                <p>Store Services</p>
                            </div>    
                        </div>
                        <div className='flex flex-col g-20'>
                            <h3>Connect Us</h3>
                            <div className='flex flex-col g-20'>
                                <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>Hotline: +234 9012345678</p>
                                <p>Email: pmall@gmail.com</p>
                            </div>    
                        </div>
                    </div>
                    <div className='flex justsb'>
                        <div className='flex flex-col g-10 p-method'>
                            <h3>PAYMENT METHOD</h3>
                            <div className='flex g-10 alc'>
                                <img src="/Screenshot 2024-03-20 222401.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222533.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222559.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222647.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222720.png" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col g-10'>
                            <h3>Connect Us</h3>
                            <div className='flex g-20'>
                                <FacebookRoundedIcon className='icon'/>
                                <FacebookRoundedIcon className='icon'/>
                                <FacebookRoundedIcon className='icon'/>
                                <FacebookRoundedIcon className='icon'/>
                            </div>
                        </div>
                        <div className='newsletter flex flex-col g-10'>
                            <h3>Newsletter</h3>
                            <form action="" className='flex g-10'>
                                <input type="email" name="" id="" />
                                <button>Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col g-10'>
                        <h3>PMall revolutionize online shopping by giving you cash to shop</h3>
                        <p className='lh'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident officiis assumenda? Inventore minima atque architecto eius, nihil laudantium minus perferendis maiores commodi soluta repellat odio explicabo at cumque facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident officiis assumenda? Inventore minima atque architecto eius, nihil laudantium minus perferendis maiores commodi soluta repellat odio explicabo at cumque facilis!</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex all-center rights'>
                <p>Pmall 2024</p>
            </div>
        </div>
     );
}
 
export default StoreFront;