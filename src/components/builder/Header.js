import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from "../../context/UserContext";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCart } from "../../context/CartContext"
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import { useCategories } from "../../context/CategoryContext"


function Header() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [itemsOnCart, setItemsOnCart] = useState(0);
    const [loading, setLoading] = useState(false);
    const { storeCategories, error } = useCategories();
    const extraLinks = ['Health', 'Wellness', 'Fitness', 'Beauty', 'Personal Care', 'Combo Products', 'Become an Affiliate'];
    const [categories, setProductCategories] = useState(null);
    const { cartCount } = useCart();
    const { user } = useUser();

    const handleShowCategory = (category) => {
        navigate(`/store/product/categories/${category.id}`, { state: { category } });
    }

    const handleViewAllCategories = () => {
        navigate("/");
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
            setProductCategories(result.data);
            setLoading(false);
            })
            .catch((err) => {
            setLoading(false);
            });
    };

    useEffect(()=>{
        getProductsCategories()
        setItemsOnCart(JSON.parse(localStorage.getItem("pmallCart")))
    },[])

return (
    <>
            {/* {!user?.token && ( */}
                <div className="top__top__header">
                    <div className="flex justsb alc" style={{height: '45px'}}>
                        <img src="/top_banner_2.gif" style={{ width: '100%' }} alt="Promotional banner" loading="lazy" />
                    </div>
                    <div className='px flex flex-col search-container w-90'>
                        <div className="flex justsb alc" style={{marginTop: '15px'}}>
                            <div className="callout">
                            <button className="callout_btn"> 
                            <MenuIcon/>
                             </button>
                           
                            <div className="callout_menu">
                                <div className="flex justsb">
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li> Login</li>
                                            <li>Sell on Pmall</li>
                                            <li> Locate a Store</li>
                                            <li> New Offers</li>
                                            <li> Customer Care</li>
                                            <li> My Orders</li>
                                            <li> Vouchers</li>
                                            <li> Inbox</li>
                                            
                                            <li> Logout</li>
                                        </ul>
                                    </div>
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li> Sign Up</li>
                                            <li> Become an Affiliate</li>
                                            <li> Get Support  </li>
                                            <li> Buy for Someone</li>
                                            <li> About Pmall</li>
                                            <li> Pending Reviews</li>
                                            <li> Account Management</li>
                                            <li> Logout</li>
                                        </ul>
                                    </div>
                                    <div className="callout__main__menu">
                                        <ul>
                                            <li> Profile Settings</li>
                                            <li> Security Settings</li>
                                            <li> Address Book</li>
                                            <li> iRecharge</li>
                                            <li> Mine PMT</li>
                                            <li> Wallet</li>
                                            <li> Promotions</li>
                                            <li> Academy</li>
                                            <li> Blu Pay</li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <img src="/new PMALL logo  (10).png" alt="PMall Logo" style={{width: '15%'}} />
                            <form className="flex alc store-container__search" aria-label="Search form">
                                <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" />
                            </form>
                            <div className='flex alc'>
                                    <Link to="/auth/sign-in" className="bold flex alc sb">
                                        <PersonIcon />
                                        <p>
                                            {user ? `Hello ${user.fname}` : 'Login'}
                                        </p>
                                    </Link>
                               &nbsp; &nbsp; &nbsp;
                                    <Link to="/app/cart" className="bold flex alc no__underline">
                                        <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                                            <ShoppingBasketIcon />
                                        </Badge>
                                        <p className="cart__count">
                                            {itemsOnCart.length}
                                        </p>
                                    </Link>
                            </div>
                        </div>
                        <div className="flex alc mb-lg">
                                <div className="flex g-20 alc mr-lg">
                                    {loading ? (
                                        <p>Loading categories...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <select 
                                        style={{ border: '2px solid #c27465', padding: 12, borderRadius: 15, fontWeight: 600 }} 
                                        onChange={(e) => {
                                            if (e.target.value === "1") {
                                                handleViewAllCategories(); 
                                            } else {
                                                const selectedCategory = categories.find(category => category.name === e.target.value);
                                                if (selectedCategory) {
                                                    handleShowCategory(selectedCategory);
                                                }
                                            }
                                        }}
                                    >
                                        <option value="1">Browse All Categories</option>
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

                                <button className="sell_on_pmall_btn">Sell on Pmall</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* )} */}
        </>
)
                        }
export default Header;