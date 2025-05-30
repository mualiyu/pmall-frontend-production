import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext";
import currency from "../utils/formatCurrency";
import Toast from "../utils/Toast";
import { BASE_URL } from "../utils/config"; 
import ButtonLoader from "../utils/buttonLoader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Toaster from "../utils/toaster";
import { useVendor } from "../context/AuthContext";



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


const CheckoutPage = () => {
    const { user, setUser } = useUser();
    const [showPassword, setShowPassword] = useState(false);
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
    const [value, setValue] = useState(0);
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };



  const handleChangeAccount = () => {
      localStorage.removeItem('user');
      window.location.reload();
  }



  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    inputValues,
    onChangeHandler,
    customerLogin,
    toastMsg,
    toastType,
  } = useVendor();

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
          ...formDetails,
          [name]: value,
        });
      };
    const [cart,setCart] =  useState([]);
    const [toast, setToast] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const totalPrice = cart.map(item => item.selling_price * item.amtItems).reduce((acc, curr) => acc + curr, 0);
    const getCart = () => {
        if(typeof localStorage !== "undefined") {
             setCart(JSON.parse(localStorage.getItem('pmallCart')) || []);
             console.log("Response text:", localStorage.getItem('authToken'));
        }
        return;
    }
    
    const handleErrors = (errorResponse) => {
        if (!errorResponse?.message) return "An unknown error occurred.";
    
        const errorMessages = Object.entries(errorResponse.message).map(
            ([field, messages]) => `${field}: ${messages.join(", ")}`
        );
    
        return errorMessages.join("\n"); // Joining all error messages for display
    };

    


    const registerUser = async () => {
        if (user?.loggedIn) return user; // If logged in, return user data.
    
        console.log("User not logged in, attempting registration...");
        setToast({ message: "Attempting registration...", type: "warning" });
        setTimeout(() => setToast(null), 5000);
        try {
            const response = await fetch(`${BASE_URL}/customer/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                },
                body: JSON.stringify(formDetails),
            });
    
            const result = await response.json();
    
            if (!result.status) {
                setToast({ message: `Registration Failed... ${result}`, type: "error" });
                setTimeout(() => setToast(null), 5000);
                return false; // Registration failed
            }
    
            setCustomer(result);

            const newUserLoggedIn = {
                username: result?.customer?.username,
                password: formDetails?.password
            }
            // autoLogin User
            try {
                const response = await fetch(`${BASE_URL}/customer/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json",
                  },
                  body:  JSON.stringify(newUserLoggedIn)
                });
                console.log(response);
                if (!response.ok) {
                  const errorData = await response.json();
                  console.error("Error:", errorData);
                  Toaster(errorData.message || "Login failed", "error");
                  return;
                }
               
            
                const data = await response.json();
                const token = data?.data?.token;
                localStorage.setItem("userToken", token);
            setToast({ message: "User registered... attempting checkout...", type: "success" });
            setTimeout(() => setToast(null), 5000);
              } catch (error) {
                console.error("Unexpected error:", error);
                Toaster("Something went wrong. Please try again.", "error");
                setLoading(false);
              }
            console.log(result);
            localStorage.setItem("authToken", result?.token);
            setUser({
                id: result.customer.id,
                username: result.customer.username,
                email: result.customer.email,
                token: result.token,
                loggedIn: true,
                fname: result.customer.fname,
                lname: result.customer.lname,
                regDate: result.customer.created_at,
              });
            
            // setCheckoutMessage(handleErrors(result));
            return result; // Return newly registered customer data
    
        } catch (error) {
            setToast({ message: `Error during registration: ${error}`, type: "error" });
        setTimeout(() => setToast(null), 5000);
            setCheckoutMessage(handleErrors(error));
            return false;
        }
    };
    
    const initiateCheckout = async (customerData) => {
        const tokenToUse = user?.loggedIn ? user?.token : customerData?.token;
        const customerId = user?.loggedIn ? user?.id : customerData?.customer.id;
        
        if (!tokenToUse || !customerId) {
            setToast({ message: "Token or Customer ID missing! Cannot proceed. Kindly login again as we couldn't verify the user", type: "error" });
            setTimeout(() => setToast(null), 5000);
            return false;
        }
    
        const checkingOutProducts = JSON.parse(localStorage.getItem('pmallCart')) || [];
        if (checkingOutProducts.length === 0) {
            setToast({ message: "Cart is empty! Cannot proceed.", type: "error" });
            setTimeout(() => setToast(null), 5000);
            console.error("Cart is empty! Cannot proceed.");
            return false;
        }
    
        const requestBody = {
            customer_id: customerId,
            products: checkingOutProducts.map(product => ({
                product_id: product.id,
                quantity: product.amtItems
            }))
        };
    
        console.log("Checkout Request Body:", requestBody);
    
        try {
            const response = await fetch(`${BASE_URL}/customer/checkout/initiate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                    Authorization: "Bearer " + tokenToUse,
                },
                body: JSON.stringify(requestBody),
            });
    
            const result = await response.json();
            console.log("Checkout Result:", result);
    
            if (!result.status) {
                setToast({ message: `Checkout initiation failed: ${result.message}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
                console.error("Checkout initiation failed:", result);
                return false;
            }
            setToast({ message: "Product(s) mapped to user... Initiating payment...", type: "warning" });
            setTimeout(() => setToast(null), 5000);
            return result.sale; // Return sale data for payment
    
        } catch (error) {
            setToast({ message: "Error during checkout initiation:", type: "error" });
            setTimeout(() => setToast(null), 5000);
            console.error("Error during checkout initiation:", error);
            return false;
        }
    };
    
    const initiatePayment = async (saleData, customerData) => {
        const tokenToUse = user?.loggedIn ? user?.token : customerData?.token;
        if (!tokenToUse) {
            setToast({ message: "Token is missing! Cannot proceed.", type: "error" });
            setTimeout(() => setToast(null), 5000);
            console.error("Token is missing! Cannot proceed.");
            return false;
        }
    
        const paymentData = {
            sale_id: saleData.id,
            amount: saleData.total_amount,
        };
    
        console.log("Payment Request Body:", paymentData);
    
        try {
            const response = await fetch(`${BASE_URL}/customer/checkout/paystack/initiate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                    Authorization: "Bearer " + tokenToUse,
                },
                body: JSON.stringify(paymentData),
            });
    
            const result = await response.json();
            console.log("Payment Result:", result);
    
            if (!result.status) {
                setToast({message: `Payment initiation failed: ${result.message}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
                console.error("Payment initiation failed:", result);
                return false;
            }
    
            console.log("Redirecting to payment page...");
            window.location.href = result.authorization_url;
            localStorage.removeItem("pmallCart");
            return true; // Payment initiated successfully
    
        } catch (error) {
            setToast({message: `Error during payment initiation: ${error}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
            console.error("Error during payment initiation:", error);
            return false;
        }
    };
    
    const onSubmit = async () => {
        try {
            setBtnLoader(true);
            const customerData = await registerUser();
            if (!customerData) {
                setToast({message: `Registration step failed!`, type: "error" });
            setTimeout(() => setToast(null), 5000);
                console.error("Registration step failed!");
                setBtnLoader(false);
                return;
            }
    
            const saleData = await initiateCheckout(customerData);
            if (!saleData) {
                setToast({message: `Oops! Not your fault, try logging back in again`, type: "error" });
            setTimeout(() => setToast(null), 9000);
                console.error("Checkout step failed!");
                setBtnLoader(false);
                return;
            }
    
            const paymentSuccess = await initiatePayment(saleData, customerData);
            if (!paymentSuccess) {
                setToast({message: `Payment step failed!`, type: "error" });
                setTimeout(() => setToast(null), 5000);
                console.error("Payment step failed!");
                setBtnLoader(false);
            }
            
        } catch (error) {
            setToast({message: `Error during submission: ${error}`, type: "error" });
                setTimeout(() => setToast(null), 5000);
            console.error("Error during submission:", error);
        } finally {
            setBtnLoader(false);
        }
    };

    


    useEffect(()=>{ 
        getCart()
        return;
    },[])

    const incrementItemAmt = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => 
                item.id === id ? { ...item, amtItems: item.amtItems + 1 } : item
            );
    
            console.log(updatedCart);
            localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    const decrementItemAmt = (id) => {
        const updatedCart = cart
            .map(item => 
                item.id === id && item.amtItems > 1 
                    ? { ...item, amtItems: item.amtItems - 1 } 
                    : item
            )
            .filter(item => item.amtItems > 0); 
    
        setCart(updatedCart);
        localStorage.setItem('pmallCart', JSON.stringify(updatedCart));
    };
    
    return (
        <div className="mt-20p">
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <Link to="/"><p className="back f-bold">Back to Market Place</p></Link>
            <div className="checkout-container flex g-20">
            <div className="checkout">
                <h1>Checkout</h1>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example">
                     
                        <Tab label="Returning Customer" {...a11yProps(0)} />
                        <Tab label="New Customer" {...a11yProps(1)} />
                      
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="checkout-login">
                        <div className="">
                            <Toaster text={toastMsg} className={toastType} />
                            
                            {!user.loggedIn ? (
                            <form action="">
                                <p className="bold">Already have an account?</p>
                            <div cInfolassName="pos-rel">
                                <label className="abs"> Username / Email </label>
                                <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={onChangeHandler}
                                placeholder="username or email"
                                value={inputValues.username || ""}
                                />
                            </div>

                            <div className="pos-rel">
                                <label className="abs"> Your Password</label>
                                <div
                                style={{ display: "flex", alignItems: "center" }}
                                className="pos-rel">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    onChange={onChangeHandler}
                                    value={inputValues.password || ""}
                                    placeholder="********"
                                />
                                <span onClick={togglePassword} className="cnwjien">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                                </div>
                            </div>

                           
                            <button
                                className="login-btn bold"
                                disabled={loading}
                                type="submit"
                                onClick={customerLogin}>
                                {loading ? <ButtonLoader /> : "Login"}
                            </button>
                           
                            </form>

                            ) : (
                <div className="profile-container">
                    <div>
                        <div className="promo-code w-full" style={{width: '100%'}}>
                        <div className="flex flex-col g-20">
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Logged In As </p>
                                <p className="f-12">{user.fname} {user.lname}</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Email</p>
                                <p className="f-12">{user.email}</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Member Since</p>
                                <p className="f-12">{new Date(user.regDate).toLocaleDateString()}</p>
                            </div>
                            
                        </div>
                        <div class="btn bg-accent p-25 text-center uppercase" style={{marginTop: '10%',width: '35%'}}  onClick={() => handleChangeAccount()} >
                            Use a different account ?
                        </div>

                        </div>
                    </div>
                    </div>
                    
      )}
 </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                </TabPanel>
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
                                            <p className="f-12 bold title-case">{item.name}</p>
                                            <p>{item.tags}</p>
                                            <p className="f-12">{currency(item.selling_price)}</p>
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
                                <p className="f-12"> {currency(totalPrice)}</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">Discount</p>
                                <p className="f-12">-&#x20A6;0.00</p>
                            </div>
                            <div className="flex justsb bold b-b">
                                <p className="f-12">VAT</p>
                                <p className="f-12">{currency(totalPrice * 0.075)}</p>
                            </div>
                            <div className="flex justsb total bold b-b">
                                <p className="">Total</p>
                                <p className="bold">{currency(totalPrice + (totalPrice * 0.075))}</p>
                            </div>
                        </div>


                        <button 
    className="btn bg-accent p-25 text-center uppercase"
    style={{ marginTop: 25 }}
    onClick={onSubmit}
    disabled={btnLoader}
>
    {btnLoader ? <ButtonLoader/> : 'Pay Now!'}
</button>
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
