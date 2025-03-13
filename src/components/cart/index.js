import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import currency from "../../utils/formatCurrency";

const Cart = () => {
    const [cart, setCart] = useState(() => {
        if (typeof localStorage !== "undefined") {
            return JSON.parse(localStorage.getItem("pmallCart")) || [];
        }
        return [];
    });

    const { cartLength } = useCart();
    const { user } = useUser();

    const totalPrice = cart.reduce((acc, item) => acc + item.selling_price * item.amtItems, 0) || 0;

    useEffect(() => {
        localStorage.setItem("pmallCart", JSON.stringify(cart));
    }, [cart]); // Automatically sync cart with localStorage

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
    };

    const incrementItemAmt = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, amtItems: item.amtItems + 1 } : item
        );
        updateCart(updatedCart);
    };

    const decrementItemAmt = (id) => {
        const updatedCart = cart
            .map(item =>
                item.id === id && item.amtItems > 1 ? { ...item, amtItems: item.amtItems - 1 } : item
            )
            .filter(item => item.amtItems > 0); // Removes items with zero quantity
        updateCart(updatedCart);
    };

    const deleteCartItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("pmallCart");
    };

    return (
        <div className="cart flex g-20 mt-lg mt-20p">
            <div className="w-full flex g-20 cart-container">
                <div className="w-full maincart">
                    <div className="flex justsb">
                        <div className="flex g-10">
                            <h3 className="cart-head">Cart</h3>
                            <p className="f-12">({cart.length} items)</p>
                        </div>
                        <div>
                            <p className="f-12 red bold pointer" onClick={clearCart}>x Clear cart</p>
                        </div>
                    </div>

                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <>
                                <span> There are no products in your cart. </span>
                                <Link to="/"> 
                                    <p style={{ color: 'red', fontWeight: 700 }}>Return to store</p> 
                                </Link>
                            </>
                        ) : (
                            cart.map(item => (
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
                                        <p className="f-16">{currency(item.selling_price)}</p>
                                    </div>
                                    <p className="f-16 pointer" onClick={() => deleteCartItem(item.id)}>x</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
                            <p className="f-12">{currency(totalPrice.toFixed(2))}</p>
                        </div>
                        <div className="flex justsb bold b-b">
                            <p className="f-12">Discount</p>
                            <p className="f-12">{currency(0.00)}</p>
                        </div>
                        <div className="flex justsb bold b-b">
                            <p className="f-12">VAT</p>
                            <p className="f-12">{currency((totalPrice * 0.075).toFixed(2))}</p>
                        </div>
                        <div className="flex justsb total bold b-b">
                            <p>Total</p>
                            <p className="bold">{currency((totalPrice + totalPrice * 0.075).toFixed(2))}</p>
                        </div>
                    </div>

                    {cart.length > 0 && (
                        <Link to="/app/checkout" className="mt-lg" style={{ marginTop: 25 }}>
                            <p className="btn bg-accent text-center uppercase">Checkout</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
