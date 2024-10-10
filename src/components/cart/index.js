import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/cartContext"


const Cart = () => {
    const [cart,setCart] =  useState([])
    const {cartLength} = useCart();
    const totalPrice = cart.map(item => item.selling_price * item.amtItems).reduce((acc, curr) => acc + curr, 0);
    const getCart = () => {
        if(typeof localStorage !== "undefined") {
             setCart(JSON.parse(localStorage.getItem('pmallCart')) || [])
        }
        return;
    }

    useEffect(()=>{ 
        getCart()
        return;
    },[cart])

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
        <div className='cart flex flex-col g-20'>
            <div className='head'>
                <img src="/pmall-logo 1.png" alt="test" />
            </div>
            <div className="w-full flex g-20 cart-container">
                <div className="w-full maincart">
                    <div className="flex justsb">
                        <div className="flex g-10">
                            <h3 className="cart-head">Cart</h3>
                            <p className="f-12">({cartLength} items)</p>
                        </div>
                        <div>
                            <p className="f-12 red bold pointer" onClick={clearCart}>x Clear cart</p>
                        </div>
                    </div>
                    <div className="cart-items">
                        {cartLength>0 && cart.map(item => (
                            <div className="cart-item">
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
                            <div className="flex justsb">
                                <p className="f-12">Subtotal</p>
                                <p className="f-12">&#x20A6;{totalPrice}.00</p>
                            </div>
                            <div className="flex justsb">
                                <p className="f-12">Discount</p>
                                <p className="f-12">-&#x20A6;0.00</p>
                            </div>
                            <div className="flex justsb total">
                                <p className="">Total</p>
                                <p className="bold">&#x20A6;{totalPrice}.00</p>
                            </div>
                        </div>
                        <Link to="/app/checkout"><p className="checkout-btn">continue to checkout</p></Link> 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;