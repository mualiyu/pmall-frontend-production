import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../builder/header";
import { useCart } from "../../context/CartContext"

const Cart = () => {
    const [cart,setCart] =  useState([])
    const {cartLength} = useCart();
    const totalPrice = cart.map(item => item.selling_price * item.amtItems).reduce((acc, curr) => acc + curr, 0);
    const getCart = () => {
        console.log((JSON.parse(localStorage.getItem('pmallCart'))));
        if(typeof localStorage !== "undefined") {
             setCart(JSON.parse(localStorage.getItem('pmallCart')) || [])
        }
        return;
    }

    useEffect(()=>{ 
        getCart()
        return;
    },[])

    const incrementItemAmt = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, amtItems: item.amtItems + 1 };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
    };

    const decrementItemAmt = (id) => {
        const updatedCart = cart.map(item => {
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
                        {cart && cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="flex g-20  testtt">
                                    <img src={item.image} alt="" />
                                    <div>
                                        <p className="f-12 bold">{item.name}</p>
                                        <p>{item.tags}</p>
                                    </div>
                                </div>
                                <div className="flex g-10 all-center cart-item-count">
                                    <p className="f-12 count flex all-center" onClick={()=>decrementItemAmt(item.id)}>-</p>
                                    <p className="f-12">{item.amtItems}</p>
                                    <p className="f-12 count flex all-center" onClick={()=>incrementItemAmt(item.id)}>+</p>
                                </div>
                                <div>
                                    <p className="f-16 bold">&#x20A6;{item.selling_price}</p>
                                </div>
                                <p className="f-16  pointer" onClick={()=> deleteCartItem(item.id)}>x</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="promo-code">
                        <p className="f-12 bold">Promo code</p>
                        <div className="coupon">
                            <form action="">
                                <input type="text" />
                                <button>Apply</button>
                            </form>
                        </div>
                        <div className="flex flex-col g-20 calculation">
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Subtotal</p>
                                <p className="f-12">&#x20A6;{totalPrice}.00</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Discount</p>
                                <p className="f-12">-&#x20A6;0.00</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">VAT</p>
                                <p className="f-12">&#x20A6;{totalPrice * 0.075}</p>
                            </div>
                            <div className="flex justsb total bold b-b">
                                <p className="">Total</p>
                                <p className="bold">&#x20A6;{totalPrice + (totalPrice * 0.075)}.00</p>
                            </div>
                        </div>
                        <Link to="/app/checkout" className="mt-lg" style={{marginTop: 25}}>
                        <p className="btn bg-accent p-25 text-center uppercase">Checkout</p>
                        </Link> 
                    </div>
                </div>
        </div>
        </div>
     );
}
 
export default Cart;