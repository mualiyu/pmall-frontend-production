import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser, useLogOut } from "../../context/UserContext";
import PersonIcon from '@mui/icons-material/Person';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useCart } from "../../context/CartContext"
import Badge from '@mui/material/Badge';
import CategoryDropdown from "../../utils/categoryDropdown"
import MenuIcon from '@mui/icons-material/Menu';
import { useCategories } from "../../context/CategoryContext"


function Header() {
    const navigate = useNavigate();
    const [itemsOnCart, setItemsOnCart] = useState(0);
    const [loading, setLoading] = useState(false);
    const { storeCategories, error } = useCategories();
    const extraLinks = ['Health', 'Wellness', 'Fitness', 'Beauty', 'Personal Care', 'Combo Products', 'Become an Affiliate'];
    const [categories, setProductCategories] = useState([]);
    const { cartCount } = useCart();
    const { user, setUser } = useUser();
    const logOut = useLogOut(); 

return (
    <>
            {/* {!user?.token && ( */}
                <div className="top__top__header">
                    <div className="flex justsb alc" style={{height: '45px'}}>
                        <img src="/top_banner_2.gif" style={{ width: '100%' }} alt="Promotional banner" loading="lazy" className="" />
                    </div>
                    <div className='px flex flex-col search-container w-90'>
                        <div className="flex justsb alc dgcwuywsndh" style={{marginTop: '15px'}}>
                            <div className="callout">
                            <button className="callout_btn"> 
                            <MenuIcon/>
                             </button>
                           
                            <div className="callout_menu">
                                <div className="flex justsb">
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Login</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span> Sell on Pmall</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Locate a Store</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  New Offers</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Customer Care</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> My Orders</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Vouchers</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Inbox</li>
                                            
                                            <li> Logout</li>
                                        </ul>
                                    </div>
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span> Sign Up</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Become an Affiliate</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Get Support  </li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Buy for Someone</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> About Pmall</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Pending Reviews</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Account Management</li>
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Logout</li>
                                        </ul>
                                    </div>
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Profile Settings</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Security Settings</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Address Book</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> iRecharge</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Mine PMT</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Wallet</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Promotions</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Academy</li>
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Blu Pay</li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <a href="/" style={{width: '15%'}}>
                                <img src="/new PMALL logo  (10).png" alt="PMall Logo" style={{width: '100%'}} className="pmall____logo"/>
                                </a>
                            <form className="flex alc store-container__search no-display" aria-label="Search form">
                                <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" />
                            </form>
                            <div className='flex alc bbnex'>
                                
                        {/* User Account menu and Log out */}
                            {user?.loggedIn ? (
                            <div className="myaccount">
                            <button className="myaccount_btn flex"> 
                                <PersonIcon className="lg-icon" /> 
                                <div className="text-left">
                                        <p className="bold"> {`Hello ${user?.fname}`} </p>
                                        <p className="fw-400">Manage Account</p>
                                        </div>
                                        
                                {/* <span style={{color: 'rebeccapurple'}}>
                                Manage Account
                                </span> */}
                             </button>
                            <div className="myaccount_menu">
                                <div className="flex justsb">
                                    <div className="myaccount__main__menu">
                                        <ul>
                                            <Link to="/app/dashboard" className="no-underline pointer">
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  Dashboard</li>
                                            </Link>
                                            <Link to="/app/transaction/history" className="no-underline pointer">
                                            <li><span class="material-icons">keyboard_double_arrow_right</span>  My Orders</li>
                                            </Link>
                                            <Link to="/app/dashboard" className="no-underline pointer">
                                            <li> <span class="material-icons">keyboard_double_arrow_right</span> Support </li>
                                            </Link>
                                            
                                            <li onClick={logOut}> <span class="material-icons">keyboard_double_arrow_right</span> Logout</li>

                                        </ul>
                                    </div>
                                </div>
                                </div>
                                </div>
                            ): (
                                <Link to="/auth/sign-in" className="bold flex alc sb">
                                        <PersonIcon />
                                        <p>
                                           Account Login 
                                        </p>
                                    </Link>
                            )}


                                    &nbsp; &nbsp; &nbsp;
                                    {/* Cart */}
                                    <div className="bold flex alc no__underline" style={{padding: 10}}>
                                        <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                                            <HeadphonesIcon className="lg-icon"/>
                                        </Badge>
                                        <div>
                                        <p className="fw-400"> Call us now: <span className="c-red fw-400">07084802028</span> </p>
                                        <p className="fw-400 mt-n-5">Email: <span className="text-muted fw-400">support@pmall.com.ng </span></p>
                                        </div>
                                        {/* <p className="cart__count">
                                            {itemsOnCart?.length === 0 ? 0 : itemsOnCart?.length }
                                        </p> */}
                                    </div>
                            </div>
                        </div>
                    <div className="flex justsb mb-lg  bbnex">
                        {loading ? 'loading...' : (
                          <CategoryDropdown />
                          )}
                            <div className="w-100 justsb alc g-20 pointer kkkwieiw ">
                                
                                {extraLinks.map((text, idx) => (
                                    <div key={idx} className="f-bold f-13 no-display">{text}</div>
                                ))}
                            
                            <form className="flex alc store-container__search no-large-display w-100" aria-label="Search form">
                                <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" className='w-full' />
                            </form>
                            <Link to="/auth/">
                                <button className="sell_on_pmall_btn">Sell on Pmall</button>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            {/* )} */}


            <div></div>
        </>
)
                        }
export default Header;