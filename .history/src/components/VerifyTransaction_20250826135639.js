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


const VerifyTransaction = () => {
    

    useEffect(()=>{ 
        getCart()
        return;
    },[])

    
    
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

export default VerifyTransaction;
