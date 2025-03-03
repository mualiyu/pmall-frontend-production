import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from "../../context/CartContext"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Person4Icon from '@mui/icons-material/Person4';
import LockIcon from '@mui/icons-material/Lock';
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function Header() {
    const [categories, setProductCategories] = useState(null);
    const [loading, setLoading] = useState(false);
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
    useEffect(()=>{
        getProductsCategories()
    },[])
return (
    // {}
    <>
    
<div className="flex justsb alc">
            <img src="/top_banner.gif" style={{width: '100%'}} />
            </div>
            <div className='px flex flex-col g-40 search-container'>
                <div className="flex justsb alc g-40">
                    <img src="/pmall-logo 1.png" alt="" />
                    <form action="" className="flex alc search">
                        <input type="text" placeholder='Search for Products, Brands or Categories' />
                        <div className='flex alc g-20 shfhegwer'>
                            <SearchIcon />
                        </div>
                    </form>
                    <div className='flex alc'>
                <Link to="/auth/sign-in" className="bold flex alc sb">
                        <Person4Icon />
                        <p>Login</p>
                        </Link>
                <Link to="/app/cart" className="bold flex alc">
                        <ShoppingCartOutlinedIcon />
                        <p>Cart</p>
                        </Link>
                    </div>
                </div>
                <div className="flex g-20 alc">
                    <select style={{
                        border: '2px solid #c27465',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: 600,
                    }}>
                        <option value="1">Browse All Categories</option>
                        {categories?.map(category => (
                            <option value={category.name} key={category.id}>        {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="w-100 justsb alc pointer">
                            <div className="f-bold f-13">
                                Health
                            </div>
                            <div className="f-bold f-13">
                            Wellness
                            </div>
                            <div className="f-bold f-13">
                            Fitness
                            </div>
                            <div className="f-bold f-13">
                            Beauty
                            </div>
                            <div className="f-bold f-13">
                            Personal Care
                            </div>
                            <div className="f-bold f-13">
                                Combo  Products
                            </div>
                        <div className="f-bold f-13">
                            Sell on PMall
                        </div>
                        <div className="f-bold f-13 ml-10 action_primary">
                            Become an Affiliate
                    </div>
                 </div>
                </div>
                </div>
                </>
)
                        }
export default Header;