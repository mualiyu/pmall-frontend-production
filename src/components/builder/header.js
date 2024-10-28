import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCategories } from "../../context/CategoryContext";
// import { useCart } from "../../context/CartContext";
import SearchIcon from '@mui/icons-material/Search';
import { useUser } from "../../context/UserContext";
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

function Header({ showCart = true, showAccount = true, showCategories = true, extraLinks = ['Male', 'Female', 'Fitness', 'General', 'Combo Products', 'Sell On PMall', 'Become an Affiliate'] }) {
    const { categories, loading, error } = useCategories();
    // const { cartCount } = useCart();
    const { user } = useUser();

    useEffect(()=>{
        // console.log(cartCount)
    },[])

    return (
       
        
        
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
                        {showAccount && (
                            <Link to="/auth/sign-in" className="bold flex alc sb">
                                <Person4Icon />
                                <p>Login</p>
                            </Link>
                        )}
                        {showCart && (
                            <Link to="/app/cart" className="bold flex alc">
                                {/* <Badge badgeContent={cartCount} color="secondary"> */}
                                <Badge color="secondary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                                <p>Cart</p>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex alc mb-lg">
                {showCategories && (
                    <div className="flex g-20 alc mr-lg">
                        {loading ? (
                            <p>Loading categories...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <select style={{ border: '2px solid #c27465', padding: 12, borderRadius: 15, fontWeight: 600 }}>
                                <option value="1">All Categories</option>
                                {categories.map(category => (
                                    <option value={category.name} key={category.id}>{category.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
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
        
    );
}

export default Header;
