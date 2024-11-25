import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from "../utils/buttonLoader";


const CheckoutPage = () => {
    const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        lga: '',
        password: '',
        password_confirmation: ''
    });
    const [customer, setCustomer] = useState()
    const [loading, setLoading] = useState(false)

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
          ...formDetails,
          [name]: value,
        });
      };
    const [cart,setCart] =  useState([])
    const {cartLength} = useCart();
    const totalPrice = cart.map(item => item.selling_price * item.amtItems).reduce((acc, curr) => acc + curr, 0);
    const getCart = () => {
        if(typeof localStorage !== "undefined") {
             setCart(JSON.parse(localStorage.getItem('pmallCart')) || [])
        }
        return;
    }

    const onSubmit = async () => {
        // Prevent default form submission
        var token;
        setLoading(true);
        fetch("https://api.pmall.mukeey.com.ng/api/v1/customer/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
          body: JSON.stringify(formDetails),
        })
          .then((resp) => resp.json())
          .then((result) => {
            setLoading(false);
            console.log(result);
            if (result.status) {
               setLoading(false);
               console.log(JSON.parse(localStorage.getItem('pmallCart')));
               const checkingOutProducts = JSON.parse(localStorage.getItem('pmallCart'))
               token = result.token
               const requestBody = {
                customer_id: result.customer.id,
                products: [
                {
                    product_id: checkingOutProducts?.id,
                    quantity: cart?.length,
                }
                ]
            }
            fetch("https://api.pmall.mukeey.com.ng/api/v1/customer/checkout/initiate", {
                method: "POST",
                headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + result.token,
                },
                body: JSON.stringify(requestBody), 
            })
                .then((resp) => resp.json())
                .then((result) => {
                console.log(result);
                if(result.status) {
                    setLoading(false);
                    const saleData = {
                        sale_id: result.sale.id,
                        amount:result.sale.total_amount
                    }
                    fetch("https://api.pmall.mukeey.com.ng/api/v1/customer/checkout/paystack/initiate", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                        },
                        body: JSON.stringify(saleData), 
                    })
                        .then((resp) => resp.json())
                        .then((result) => {
                        console.log(result);
                        if (result.status) {
                            console.log(result)
                            window.location.href = result.authorization_url
                        }
                        })
                        .catch((err) => {
                        console.log(err);
                        });
                    }
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
          setLoading(false);
      };

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

    // const initiateCheckout = (e) => {
    //     e.preventDefault();
    //     onSubmit()
    //     if(customer){
    //         const requestBody = {
    //             customer_id: customer.customer.id,
    //             products: [
    //             {
    //                 product_id: 1,
    //                 quantity: 3
    //             }
    //             ]
    //         }
        
    
    //         fetch("https://api.pmall.mukeey.com.ng/api/v1/customer/checkout/initiate", {
    //             method: "POST",
    //             headers: {
    //             "Content-Type": "application/json;charset=UTF-8",
    //             Accept: "application/json",
    //             Authorization: "Bearer " + customer.token,
    //             },
    //             body: JSON.stringify(requestBody), 
    //         })
    //             .then((resp) => resp.json())
    //             .then((result) => {
    //             console.log(result);
    //         // setProducts(result.data);
    //             }) 
    //             .catch((err) => {
    //             console.log(err);
    //             });
    //         }
    // };

    // const config = {
    //     public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,
    //     tx_ref: Date.now(),
    //     amount: totalPrice,
    //     currency: 'NGN',
    //     payment_options: 'card,mobilemoney,ussd',
    //     customer: {
    //     email: formDetails.email,
    //     phonenumber: formDetails.phone,
    //     name: formDetails.name,
    //     },
    //     customizations: {
    //     title: 'My Store Payment',
    //     description: 'Payment for items in cart',
    //     },
    // };
    
    // const fwConfig = {
    //     ...config,
    //     text: 'Pay with Flutterwave!',
    //     callback: (response) => {
    //         console.log(response);
    //         if (response.status === 'successful') {
    //             // Redirect to success page after successful payment
    //             navigate('/app/transaction-history'); // Using React Router to navigate
    //         } else {
    //             console.log('Payment failed or was cancelled');
    //             // You can navigate to a failure page or show an error message
    //         }
    //         closePaymentModal(); // This will close the modal programmatically
    //     },
    //     onClose: () => {
    //         console.log('Payment modal closed');
    //     },
    // };
    return (
        <div>
            <Link to="/"><p className="back">Back to marketplace</p></Link>
            <div className="checkout-container flex g-20">
            <div className="checkout">
                <h1>Checkout</h1>
                <div className="checkout-sections">
                    <div className="checkout-section">
                        <h2>Shipping Details</h2>
                        <form>
                            <div className="flex g-10">
                                <div className="form-group w-full">
                                    <label>First Name</label>
                                    <input
                                        type="text" 
                                        placeholder="Enter your full name"  
                                        id="fname"
                                        name="fname"
                                        value={formDetails.fname}
                                        onChange={handleInputChange} 
                                        className="w-full"
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Last Name</label>
                                    <input
                                        type="text" 
                                        placeholder="Enter your full name"  
                                        id="lname"
                                        name="lname"
                                        value={formDetails.lname}
                                        onChange={handleInputChange} 
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex g-10">
                                <div className="form-group w-full">
                                    <label>Username</label>
                                    <input
                                        type="text" 
                                        placeholder="Enter your full name"  
                                        id="username"
                                        name="username"
                                        value={formDetails.username}
                                        onChange={handleInputChange} 
                                        className="w-full"
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Email</label>
                                    <input
                                    type="email" 
                                    placeholder="Enter your email" 
                                    id="email"
                                    name="email"
                                    value={formDetails.email}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                 type="number"
                                  placeholder="Enter your phone numberik"
                                  id="phone"
                                  name="phone"
                                  value={formDetails.phone}
                                  onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" placeholder="Enter your address"  id="adddress"
                                        name="address"
                                        value={formDetails.address}
                                        onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" placeholder="Enter your city" id="state"
                                        name="state"
                                        value={formDetails.state}
                                        onChange={handleInputChange}  />
                            </div>
                            <div className="form-group">
                                <label>LGA</label>
                                <input type="text" placeholder="Enter your LGA" id="lga"
                                        name="lga"
                                        value={formDetails.lga}
                                        onChange={handleInputChange}  />
                            </div>
                            <div className="flex g-10">
                                <div className="form-group w-full">
                                    <label>Password</label>
                                    <input
                                        type="password" 
                                        placeholder="Enter your Password"  
                                        id="password"
                                        name="password"
                                        value={formDetails.password}
                                        onChange={handleInputChange} 
                                        className="w-full"
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password" 
                                        placeholder="Confirm your Password"  
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formDetails.password_confirmation}
                                        onChange={handleInputChange} 
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className="checkout-right">
                <h1>Order summary</h1>
                <div className='cart flex flex-col g-20'>
                <div className="g-20 flex flex-col">
                    <div className="w-full maincart">
                        <div className="cart-items">
                            {cart?.length>0 && cart.map(item => (
                                <div className="cart-item">
                                    <div className="flex items-center g-10">
                                        <img src={item.image} alt="" />
                                        <div>
                                            <p className="f-12 bold">{item.name}</p>
                                            <p>{item.tags}</p>
                                            <p className="f-12">&#x20A6;{item.selling_price}</p>
                                        </div>
                                    </div>
                                    <div className="flex g-10 all-center cart-item-count">
                                        <p className="f-12 count flex all-center" onClick={()=>decrementItemAmt(item.id)}>-</p>
                                        <p className="f-12">{item.amtItems}</p>
                                        <p className="f-12 count flex all-center" onClick={()=>incrementItemAmt(item.id)}>+</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="promo-code">
                        <div className="flex flex-col g-20">
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
                            <div className="btn bg-accent p-25 text-center uppercase" style={{marginTop: 25}} onClick={onSubmit}>
                                {loading ? "loading..." : "Make Payment"}
                            </div>
                            {/* <FlutterWaveButton {...fwConfig} className="checkout-btn pointer"/> */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CheckoutPage;
