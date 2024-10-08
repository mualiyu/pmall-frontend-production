import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Link } from 'react-router-dom';
import { useCart } from "../../context/cartContext"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
    const [products, setProducts] = useState([]);
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
        fetch("https://api.pmall.com.ng/api/v1/public/products/list-all", {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result);
            setProducts(result.data);
            // for (const item of result) {
            //     if (item.status === 0) {
            //     publishedCount++;
            //     }
            // }
            })
            .catch((err) => {
            console.log(err);
            });
    };

    const getProduct = () => {
        fetch("https://api.pmall.com.ng/api/v1/public/products/list-all-by-category?category_id=1", {
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result,"edibles");
            // setProducts(result.data);
            // for (const item of result) {
            //     if (item.status === 0) {
            //     publishedCount++;
            //     }
            // }
            })
            .catch((err) => {
            console.log(err);
            });
    };


    useEffect(()=>{
        getProducts()
        getProduct()
    },[])
    return ( 
        <div className="store-container">
            <div className="flex justsb alc top">
                <p>Default welcome message! Join free or signin</p>
                <div className="flex justsb alc g-10">
                    <div className='flex alc sb'>
                        <LockIcon />
                        <p>Login</p>
                    </div>
                    <div className='flex alc sb'>
                        <Person2Icon />
                        <p>My Account</p>
                    </div>
                    <div className='sb'>
                        <select name="" id="">
                            <option value="1">English</option>
                        </select>
                    </div>
                    <div className='sb'>
                        <select name="" id="">
                            <option value="1">USD</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='px flex flex-col g-40 search-container'>
                <div className="flex justsb alc g-40">
                    <img src="/pmall-logo 1.png" alt="" />
                    <form action="" className="flex alc search">
                        <input type="text" placeholder='Search item...' />
                        <div className='flex alc g-20'>
                            <p className=''>All Category</p>
                            <SearchIcon />
                        </div>
                    </form>
                    <div className='flex alc g-10'>
                        <FavoriteBorderIcon className='icon'/>
                        <Link to="/app/cart">
                            <div className='cart-box pointer'>
                                <ShoppingCartOutlinedIcon className='icon'/>
                                <p className='cart-items-count'>{cartLength}</p>
                            </div>
                        </Link>
                        <h3>My cart</h3>
                    </div>
                </div>
                <div className="flex g-40 alc">
                    <select name="" id="">
                        <option value="1">All Departments</option>
                    </select>
                    <div className="flex alc g-20">
                    <select name="" id="">
                        <option value="1">HOME</option>
                    </select>
                    <select name="" id="">
                        <option value="1">SHOP</option>
                    </select>
                    <select name="" id="">
                        <option value="1">PROMOTIONS</option>
                    </select>
                    <select name="" id="">
                        <option value="1">BLOGS</option>
                    </select>
                    <select name="" id="">
                        <option value="1">PAGES</option>
                    </select>
                 </div>
                </div>
                <div className="flex g-20">
                    <div className='flex flex-col g-20'>
                        <img src="/Screenshot 2024-03-21 214441.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 214722.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 215058.png" alt="" className="w-full" />
                    </div>
                    <div className='flex flex-col g-20'>
                        <img src="/Screenshot 2024-03-21 215316.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 215417.png" alt="" className="w-full" />
                    </div>
                    <div className='flex flex-col g-20'>
                        <img src="/Screenshot 2024-03-21 215854.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 215944.png" alt="" className="w-full" />
                        <img src="/Screenshot 2024-03-21 220017.png" alt="" className="w-full" />
                    </div>
                </div>
                <div className="flex justsb ">
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <SchoolOutlinedIcon className='icon' />
                        </div>
                        <p>Education</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <LunchDiningOutlinedIcon className='icon' />
                        </div>
                        <p>Food & Restaurant</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <SportsEsportsOutlinedIcon className='icon' />
                        </div>
                        <p>Game & Software</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <FitnessCenterOutlinedIcon className='icon' />
                        </div>
                        <p>Gym & Sport</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <MedicationLiquidOutlinedIcon className='icon' />
                        </div>
                        <p>Health & Beauty</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <HomeWorkOutlinedIcon className='icon'/>
                        </div>
                        <p>Hotel & Resort</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <LocalMallOutlinedIcon className='icon' />
                        </div>
                        <p>Mall & Store</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <MovieCreationOutlinedIcon className='icon' />
                        </div>
                        <p>Movie &  Entertainment</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <MusicNoteOutlinedIcon className='icon' />
                        </div>
                        <p>Music & Festival</p>
                    </div>
                    <div className='flex flex-col g-10 alc'>
                        <div className='border'>
                            <CardTravelOutlinedIcon className='icon' />
                        </div>
                        <p>Travel Tour</p>
                    </div>
                </div>
            </div>
            <div className='px flex flex-col g-40'>
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
                        <div className='flex  g-20'>
                            {products?.map(product => (
                                <Link to={"/app/products/details/"+product.id } className='no-underline'>
                                <div className='bg-white product-card'>
                                    <div className='img-div'>
                                        <img src={product.image} alt="" className='w-ful' width={300} height={300} />
                                    </div>
                                    <div className='desc'>
                                        <div className='main-desc flex flex-col g-5'>
                                            <h3>{product.name}</h3>
                                            <h3 className='red bold'>N{product.selling_price}</h3>
                                            <div className="mt-5 bt">
                                                <p>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div className='flex justsb g-10'>
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
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <h3>test3</h3>
                    </TabPanel>
                </Box>
                </div>
                <div className='flex flex-col alc g-20 bg-yellow'>
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

                <div className='flex flex-col alc g-20 bg-white-container'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40 section-tabs'>
                            <h1>Health & Beauty</h1>
                            <ul className='flex g-20'>
                                <l1>Lip Treatment</l1>
                                <l1 className="bl">Make Up</l1>
                                <l1>Skin Care</l1>
                                <l1>Hair Care</l1>
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
                <div className='store-footer flex flex-col g-40'>
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