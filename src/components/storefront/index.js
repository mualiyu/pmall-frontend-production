import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from 'react';
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
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
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
                        <ShoppingCartOutlinedIcon className='icon'/>
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
                        <img src="/Screenshot 2024-03-19 145936.png" alt="" className='w-full'/>
                        <img src="/Screenshot 2024-03-19 145810.png" alt="" className='w-full' />
                    </div>
                </div>
                <div>
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
                        <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <h3>Tab2</h3>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <h3>test3</h3>
                    </TabPanel>
                </Box>
                </div>
                <div className='flex flex-col alc g-20'>
                    <h1>Hello Summer 2024</h1>
                    <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                </div>
                <div className='flex flex-col alc g-20'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40'>
                            <h1>Health & Beauty</h1>
                            <ul className='flex g-20'>
                                <l1>Lip Treatment</l1>
                                <l1>Make Up</l1>
                                <l1>Skin Care</l1>
                                <l1>Hair Care</l1>
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                </div>
                <img src="/Screenshot 2024-03-19 163035.png" alt="img" />
                <div className='flex flex-col alc g-20'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40'>
                            <h1>Health & Beauty</h1>
                            <ul className='flex g-20'>
                                <l1>Lip Treatment</l1>
                                <l1>Make Up</l1>
                                <l1>Skin Care</l1>
                                <l1>Hair Care</l1>
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                </div>
            <img src="/Screenshot 2024-03-19 163145.png" alt="" />
            <div className='flex flex-col g-20'>
                    <h1>Hello Summer 2024</h1>
                    <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                    
                    
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                </div>
                <img src="/Screenshot 2024-03-19 164641.png" alt="" />
                <div className='flex flex-col alc g-20'>
                    <div className='w-full flex justsb'>
                        <div className='flex alc g-40'>
                            <h1>Health & Beauty</h1>
                            <ul className='flex g-20'>
                                <l1>Lip Treatment</l1>
                                <l1>Make Up</l1>
                                <l1>Skin Care</l1>
                                <l1>Hair Care</l1>
                            </ul>
                        </div>
                        <p>View All</p>
                    </div>
                    <div className='flex justsb'>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-19 154643.png" alt="" />
                                <p>4.0</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h3>N4000.00</h3>
                                <p> amet consectetur adipisicing elit</p>
                            </div>
                        </div>
                </div>

                <img src="/Screenshot 2024-03-20 162550.png" alt="" />

                <div className='flex justsb alc'>
                    <div>
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
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                        <div className='flex justsb alc'>
                            <h4>Blog</h4>
                            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing.</h4>
                        </div>
                    </div>
                    <div>
                        <h3>NEVER MISS THESE DEALS</h3>
                        <div className='grid grid-2 g-20'>
                            <div>
                                <img src="/Screenshot 2024-03-20 163309.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-20 163409.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-20 163446.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-20 163531.png" alt="" />
                                <h3>Super Huge Discounted Deal</h3>
                                <p>Login to get chance with $500 coupon</p>
                            </div>
                        </div>
                    </div>
                    <div>
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
                    <div>
                        <img src="/pmall-logo 1.png" alt="" />
                        <h2>The Deals aren't gonna grab themselves</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci sunt ullam, architecto autem praesentium atque omnis obcaecati perferendis excepturi modi nulla quae consectetur, animi, ut sapiente ipsam exercitationem eius iste.</p>
                        <div className='flex alc'>
                            <div className='flex flex-col'>
                                <img src="/Screenshot 2024-03-20 164510.png" alt="" />
                                <img src="/Screenshot 2024-03-20 164608.png" alt="" />
                            </div>
                            <div>
                                <img src="/Screenshot 2024-03-20 164716.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justsb'>
                        <div>
                            <h3>Our Mission</h3>
                            <div>
                                <p>Financing</p>
                                <p>Product recyling</p>
                                <p>Sustainability</p>
                                <p>Gift Return</p>
                            </div>    
                        </div>
                        <div>
                            <h3>Support</h3>
                            <div>
                                <p>Product Support</p>
                                <p>Pc Setup & Support</p>
                                <p>Services</p>
                                <p>Extended Services Plans</p>
                                <p>Community</p>
                            </div>    
                        </div>
                        <div>
                            <h3>Company</h3>
                            <div>
                                <p>About Us</p>
                                <p>Careers</p>
                                <p>Affilates</p>
                                <p>Blog</p>
                            </div>    
                        </div>
                        <div>
                            <h3>Quick Links</h3>
                            <div>
                                <p>Store Location & Hours</p>
                                <p>Click & Collect</p>
                                <p>Payment</p>
                                <p>Delivery</p>
                                <p>Return & Refunds</p>
                                <p>Secure Shopping</p>
                                <p>Store Services</p>
                            </div>    
                        </div>
                        <div>
                            <h3>Connect Us</h3>
                            <div>
                                <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>Hotline: +234 9012345678</p>
                                <p>Email: pmall@gmail.com</p>
                            </div>    
                        </div>
                    </div>
                    <div className='flex justsb'>
                        <div>
                            <h2>PAYMENT METHOD</h2>
                            <div className='flex g-10 alc'>
                                <img src="/Screenshot 2024-03-20 222401.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222533.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222559.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222647.png" alt="" />
                                <img src="/Screenshot 2024-03-20 222720.png" alt="" />
                            </div>
                        </div>
                        <div>
                            <h2>Connect Us</h2>
                            <div>
                                
                            </div>
                        </div>
                        <div>
                            <h2>Newsletter</h2>
                        <form action="" className='flex'>
                            <input type="email" name="" id="" />
                            <button>Subscribe</button>
                        </form>
                        </div>
                    </div>
                    <div>
                        <h3>PMall revolutionize online shopping by giving you cash to shop</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident officiis assumenda? Inventore minima atque architecto eius, nihil laudantium minus perferendis maiores commodi soluta repellat odio explicabo at cumque facilis!</p>
                    </div>
                    <div className='w-full flex all-center'>
                        <p>Pmall 2024</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default StoreFront;