import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../builder/Header";
import { useCart } from "../../context/CartContext"
import { useUser } from "../../context/UserContext";
import { useCategories } from "../../context/CategoryContext"
import SearchIcon from '@mui/icons-material/Search';
import Person4Icon from '@mui/icons-material/Person4';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

const Cart = () => {
    const [cart,setCart] =  useState([])
    const {cartLength} = useCart();
    const { cartCount } = useCart();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
const [categories, setProductCategories] = useState(null)
const { storeCategories, error } = useCategories();
    const extraLinks = ['Male', 'Female', 'Fitness', 'General', 'Combo Products', 'Sell On PMall', 'Become an Affiliate'];
    const totalPrice = cart?.map(item => item.selling_price * item.amtItems).reduce((acc, curr) => acc + curr, 0);
    const getCart = () => {
        console.log((JSON.parse(localStorage.getItem('pmallCart'))));
        getProductsCategories();
        if(typeof localStorage !== "undefined") {
             setCart(JSON.parse(localStorage.getItem('pmallCart')) || [])
        }
        
        return;
    }

    useEffect(()=>{ 
        
        getCart()
        return;
    },[])

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
            setProductCategories(result?.data);
            setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            });
    };

    
    const incrementItemAmt = (id) => {
        const updatedCart = cart?.map(item => {
            if (item.id === id) {
                return { ...item, amtItems: item.amtItems + 1 };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
    };

    const decrementItemAmt = (id) => {
        const updatedCart = cart?.map(item => {
            if (item.id === id) {
                return { ...item, amtItems: item.amtItems - 1 };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
    };
    const clearCart = () => {
        // Clear the cart
        setCart([]);
        localStorage.removeItem('pmallCart'); 
  
    };

    const deleteCartItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('pmallCart', JSON.stringify(updatedCart));

    };
    
    return (
    <div> {/* Wrapper for the entire component */}
        <div>
            {/* {!user?.token && ( */}
            <div>
                <div className="flex justsb alc mb-lg">
                    <img src="/top_banner_2.gif" style={{ width: '100%' }} alt="Promotional banner" loading="lazy" />
                </div>
                <div className="px flex flex-col g-40 search-container w-90">
                    <div className="flex justsb alc g-40">
                        <img src="/pmall-logo 1.png" alt="PMall Logo" />
                        <form className="flex alc search" aria-label="Search form">
                            <input type="text" placeholder="Search for Products, Brands, or Categories" aria-label="Search input" />
                            <button type="submit" className='flex alc g-20 shfhegwer' aria-label="Search button">
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
                            {extraLinks?.map((text, idx) => (
                                <div key={idx} className="f-bold f-13">{text}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Cart Section */}
        <div className='cart flex g-20 mt-lg'>
            <div className="w-full flex g-20 cart-container">
                <div className="w-full maincart">
                    <div className="flex justsb">
                        <div className="flex g-10">
                            <h3 className="cart-head">Cart</h3>
                            <p className="f-12">({cart?.length} items)</p>
                        </div>
                        <div>
                            <p className="f-12 red bold pointer" onClick={clearCart}>x Clear cart</p>
                        </div>
                    </div>
                    <div className="cart-items">
                        {cart && cart?.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="flex g-20 testtt">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <p className="f-12 bold">{item.name}</p>
                                        <p>{item.tags}</p>
                                    </div>
                                </div>
                                <div className="flex g-10 all-center cart-item-count">
                                    <p className="f-12 count flex all-center" onClick={() => decrementItemAmt(item.id)}>-</p>
                                    <p className="f-12">{item.amtItems}</p>
                                    <p className="f-12 count flex all-center" onClick={() => incrementItemAmt(item.id)}>+</p>
                                </div>
                                <div>
                                    <p className="f-16 bold">&#x20A6;{item.selling_price}</p>
                                </div>
                                <p className="f-16 pointer" onClick={() => deleteCartItem(item.id)}>x</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="promo-code">
                        <p className="f-12 bold">Promo code</p>
                        <div className="coupon">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Enter promo code" />
                                <button type="submit">Apply</button>
                            </form>
                        </div>
                        <div className="flex flex-col g-20 calculation">
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Subtotal</p>
                                <p className="f-12">&#x20A6;{totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Discount</p>
                                <p className="f-12">-&#x20A6;0.00</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">VAT</p>
                                <p className="f-12">&#x20A6;{(totalPrice * 0.075).toFixed(2)}</p>
                            </div>
                            <div className="flex justsb total bold b-b">
                                <p>Total</p>
                                <p className="bold">&#x20A6;{(totalPrice + totalPrice * 0.075).toFixed(2)}</p>
                            </div>
                        </div>
                        <Link to="/app/checkout" className="mt-lg" style={{ marginTop: 25 }}>
                            <p className="btn bg-accent p-25 text-center uppercase">Checkout</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}
 
export default Cart;