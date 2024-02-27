import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';


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

const SiteSettings = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    return ( 
        <div className="scroll-container">
            <div className="settings flex flex-col g-20">
                <h1>Settings</h1>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example">
                        <Tab label="General settings" {...a11yProps(0)} />
                        <Tab label="Payment settings" {...a11yProps(1)} />
                        <Tab label="SEO settings" {...a11yProps(2)} />
                        <Tab label="Shop settings" {...a11yProps(3)} />
                        <Tab label="Company Information" {...a11yProps(3)} />
                    </Tabs>
                    </Box>
                    
                    <TabPanel value={value} index={0}>
                        <div>
                            <div className="flex justsb tab alc">
                                <div className="flex flex-col g-10 left">
                                    <h3 className="bold">Logo</h3>
                                    <p>Upload your site logo from here. <br/> 
                                    Dimension of the logo should be <span className="bold">138x34 Pixel</span>  <br/>
                                    Image size should not be more than<span className="bold"> 2 MB </span> </p>
                                </div>
                                <div className="shadow w-full right">
                                    <div className="flex flex-col g-10 alc dotted">
                                        <CloudUploadIcon className="icon" />
                                        <p><span className="bold blue">Upload an image</span> or drag and drop</p>
                                        <p>PNG, JPG</p>
                                    </div>
                                    <div className="w-full">
                                        <div className="img">
                                            <img src="/pmall-logo 1.png" alt="" />
                                            <CloseIcon className="close"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justsb tab alc">
                                <div className="flex flex-col g-10 left">
                                    <h3 className="bold">Collapse Logo</h3>
                                    <p>Upload your site collapse logo from here. <br/> 
                                    Dimension of the logo should be <span className="bold">32x32 Pixel</span>  <br/>
                                    Image size should not be more than<span className="bold"> 2 MB </span> </p>
                                </div>
                                <div className="shadow w-full right">
                                    <div className="flex flex-col g-10 alc dotted">
                                        <CloudUploadIcon className="icon" />
                                        <p><span className="bold blue">Upload an image</span> or drag and drop</p>
                                        <p>PNG, JPG</p>
                                    </div>
                                    <div className="w-full">
                                        <div className="img">
                                            <img src="/pmall-logo 1.png" alt="" />
                                            <CloseIcon className="close"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justsb tab alc">
                                <div className="flex flex-col g-10 left">
                                    <h3 className="bold">Information</h3>
                                    <p>Change your site information from here</p>
                                </div>
                                <div className="shadow w-full right">
                                <form style={{ width: "100%" }} className="flex flex-col g-10">
                                    
                                    <div className="pos-rel w100-m10 ">
                                    <label> Site Title</label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="title"
                                        value="Pmall"
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label>Site Subtitle</label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="subtitle"
                                        value="Your next ecommerce"
                                    />
                                    </div>
                                
                                    <div className="pos-rel w100-m10 ">
                                    <label> Sign Up Points </label>
                                    <input
                                        type="number"
                                        className="form-control-input "
                                        name="signup_points"
                                        value="100"
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label> Minimum cart amount </label>
                                    <input
                                        type="number"
                                        className="form-control-input "
                                        name="min_cart_amt"
                                        value={0}
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7"> Wallet Currency Ratio </label>
                                    <input
                                        type="number"
                                        className="form-control-input "
                                        name="wallet_currency_ratio"
                                        value={3}
                                    />
                                    </div>
                                
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7">Maximum Question Limit </label>
                                    <input
                                        type="number"
                                        className="form-control-input "
                                        name="max_question_limits"
                                        value={5}
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Tax Class </label>
                                        <select
                                            className="search__bar w-100"
                                            defaultValue={"default"}>
                                            <option value="default">Global </option>
                                        </select>
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Shipping Class </label>
                                        <select
                                            className="search__bar w-100"
                                            defaultValue={"default"}>
                                                <option value="default">Global </option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col g-10">
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Use OTP at checkout</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable Must Verify Email</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable Guest Checkout</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable Free Shipping</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable AI</p>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div> 
                            <div className="flex justsb tab alc">
                                <div className="flex flex-col g-10 left">
                                    <h3 className="bold">Payment</h3>
                                    <p>Configure Payment Option</p>
                                </div>
                                <div className="shadow w-full right">
                                <form style={{ width: "100%" }} className="flex flex-col g-10"> 
                                    <div className="flex items-center g-5">
                                        <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                        </label>
                                        <p className="bold">Enable Cash On Delivery</p>
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Currency </label>
                                        <select
                                            className="search__bar w-100"
                                            defaultValue={"default"}>
                                                <option value="default">US Dollar</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center g-5">
                                        <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                        </label>
                                        <p className="bold">Enable Gateway</p>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="flex justsb tab alc">
                                <div className="flex flex-col g-10 left">
                                    <h3 className="bold">Currency Options</h3>
                                    <p>The following options effect how prices are displayed on the frontend</p>
                                </div>
                                <div className="shadow w-full right">
                                <form style={{ width: "100%" }} className="flex flex-col g-20"> 
                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Select Currency Formation <span className="red">*</span> </label>
                                        <select
                                            className="search__bar w-100"
                                            defaultValue={"default"}>
                                                <option value="default">English (United States)</option>
                                        </select>
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Number of Factional Digit <span className="red">*</span></label>
                                        <input
                                        type="number"
                                        className="form-control-input "
                                        name="factionalDigits"
                                        value="2"
                                    />
                                    </div>
                                    <p>Sample Output: <span className="bg-blue">&#x20A6;987,456,321.12</span> </p>
                                </form>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                     <div>
                        <div className="flex justsb tab ">
                            <div className="flex flex-col g-10 left mt-50">
                                <h3 className="bold">SEO</h3>
                                <p>Change your site SEO from here</p>
                            </div>
                            <div className="shadow w-full right">
                            <form style={{ width: "100%" }} className="flex flex-col g-10">
                                
                                <div className="pos-rel w100-m10 ">
                                <label>Meta Title</label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="title"
                                />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                <label>Meta Description</label>
                                <textarea
                                    rows={5}
                                    className="form-control-input "
                                    name="metaDescription"
                                />
                                </div>
                            
                                <div className="pos-rel w100-m10 ">
                                <label> Meta Tags </label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="metaTags"
                                />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                <label>Canonical URL </label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="url"
                                />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7"> OG Title </label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="OgTitle "
                                />
                                </div>
                            
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7">OG Description </label>
                                <textarea
                                    rows={5}
                                    className="form-control-input "
                                    name="OgDescription"
                                />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                    <label className="mb-7"> OG Image </label>
                                    <div className="flex flex-col g-10 alc dotted">
                                        <CloudUploadIcon className="icon" />
                                        <p><span className="bold blue">Upload an image</span> or drag and drop</p>
                                        <p>PNG, JPG</p>
                                    </div>
                                </div>
                                    
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7"> Twitter Handle </label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="twitterHandle"
                                    placeholder="your twitter username (exp: @username)"
                                />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                <label className="mb-7"> Twitter Card Type </label>
                                <input
                                    type="text"
                                    className="form-control-input "
                                    name="twitterCardType"
                                    placeholder="one of summary,summary_type_image,app,or player"
                                />
                                </div>
                            </form>
                            </div>
                        </div>
                        <button className="btn btn-primary p-25 mt-15  pull-right">
                        Save Settings
                        </button>
                     </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div>
                            <div className="flex justsb tab ">
                                <div className="flex flex-col g-10 left mt-50">
                                    <h3 className="bold">Delivery Schedule</h3>
                                    <p>Add your delivery schedule time with proper description from here</p>
                                </div>
                                <div className="shadow w-full right">
                                    <form style={{ width: "100%" }} className="flex flex-col g-10">
                                        <div className="flex justsb g-40 alc">
                                            <div className="flex flex-col g-10 w-full">
                                                <div className="pos-rel w100-m10 ">
                                                <label>Title/time</label>
                                                <input
                                                    type="text"
                                                    className="form-control-input "
                                                    name="title"
                                                    value="Express Delivery"
                                                />
                                                </div>
                                                <div className="pos-rel w100-m10 ">
                                                <label>Meta Description</label>
                                                <textarea
                                                    rows={5}
                                                    className="form-control-input "
                                                    name="metaDescription"
                                                    value="90 min express delivery"
                                                />
                                            </div>
                                        </div>
                                        <p className="red pointer">Remove</p>
                                        </div>
                                        <div className="flex justsb g-40 alc">
                                            <div className="flex flex-col g-10 w-full">
                                                <div className="pos-rel w100-m10 ">
                                                <label>Title/time</label>
                                                <input
                                                    type="text"
                                                    className="form-control-input "
                                                    name="title"
                                                    value="Morning"
                                                />
                                                </div>
                                                <div className="pos-rel w100-m10 ">
                                                <label>Meta Description</label>
                                                <textarea
                                                    rows={5}
                                                    className="form-control-input "
                                                    name="metaDescription"
                                                    value="8.00 AM - 11.00 AM"
                                                />
                                            </div>
                                        </div>
                                        <p className="red pointer">Remove</p>
                                        </div>
                                        <div className="flex justsb g-40 alc">
                                            <div className="flex flex-col g-10 w-full">
                                                <div className="pos-rel w100-m10 ">
                                                <label>Title/time</label>
                                                <input
                                                    type="text"
                                                    className="form-control-input "
                                                    name="title"
                                                    value="Noon"
                                                />
                                                </div>
                                                <div className="pos-rel w100-m10 ">
                                                <label>Meta Description</label>
                                                <textarea
                                                    rows={5}
                                                    className="form-control-input "
                                                    name="metaDescription"
                                                    value="11.00 AM - 2.00 PM"
                                                />
                                            </div>
                                        </div>
                                        <p className="red pointer">Remove</p>
                                        </div>
                                        <div className="flex justsb g-40 alc">
                                            <div className="flex flex-col g-10 w-full">
                                                <div className="pos-rel w100-m10 ">
                                                <label>Title/time</label>
                                                <input
                                                    type="text"
                                                    className="form-control-input "
                                                    name="title"
                                                    value="Afternoon"
                                                />
                                                </div>
                                                <div className="pos-rel w100-m10 ">
                                                <label>Meta Description</label>
                                                <textarea
                                                    rows={5}
                                                    className="form-control-input "
                                                    name="metaDescription"
                                                    value="2.00 PM - 5.00 PM"
                                                />
                                            </div>
                                        </div>
                                        <p className="red pointer">Remove</p>
                                        </div>
                                        <div className="flex justsb g-40 alc">
                                            <div className="flex flex-col g-10 w-full">
                                                <div className="pos-rel w100-m10 ">
                                                <label>Title/time</label>
                                                <input
                                                    type="text"
                                                    className="form-control-input "
                                                    name="title"
                                                    value="Evening"
                                                />
                                                </div>
                                                <div className="pos-rel w100-m10 ">
                                                <label>Meta Description</label>
                                                <textarea
                                                    rows={5}
                                                    className="form-control-input "
                                                    name="metaDescription"
                                                    value="5.00 PM - 8.00 PM"
                                                />
                                            </div>
                                        </div>
                                        <p className="red pointer">Remove</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary p-25 mt-15">
                                            Add Delivery Time
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                
                            </div>
                            <div className="flex justsb tab">
                                <div className="flex flex-col g-10 left mt-50">
                                    <h3 className="bold">Shop Settings</h3>
                                    <p>Add your shop settings information from here</p>
                                </div>
                                <div className="shadow w-full right">
                                    <form style={{ width: "100%" }} className="flex flex-col g-20">\
                                    <div className="flex flex-col g-20">
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable product review system before publish ?</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable Google Map Address</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable Terms & Conditions for vendors</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable coupons for vendors</p>
                                        </div>
                                        <div className="flex items-center g-5">
                                            <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                            </label>
                                            <p className="bold">Enable review popup?</p>
                                        </div>
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Review mechanism</label>
                                        <select
                                            className="search__bar w-100"
                                            defaultValue={"default"}>
                                                <option value="default">Give purchased product a review only for one time. (By default) </option>
                                        </select>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary p-25 mt-15  pull-right">
                                Save Settings
                                </button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <div>
                            <div className="flex justsb tab ">
                                <div className="flex flex-col g-10 left mt-50">
                                    <h3 className="bold">Address</h3>
                                    <p>Add your address from here</p>
                                </div>
                                <div className="shadow w-full right">
                                <form style={{ width: "100%" }} className="flex flex-col g-10 bb-dashed"> 
                                    <section className="flex-container mb-lg">
                                        <div className="pos-rel w100-m10 ">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            className="form-control-input "
                                            name="ProductName"
                                        />
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                        <label className="mb-7">Country</label>
                                        <input
                                            type="text"
                                            className="form-control-input "
                                            name="country"
                                            value="Nigeria"
                                        />
                                        </div>
                                    </section>
                                
                                    <section className="flex-container mb-lg">
                                        <div className="pos-rel w100-m10 ">
                                        <label> State</label>
                                        <input
                                            type="text"
                                            className="form-control-input "
                                            name="ProductName"
                                            value="Abuja"
                                        />
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> ZIP</label>
                                        <input
                                            type="text"
                                            className="form-control-input "
                                            name="ProductName"
                                        />
                                        </div>
                                    </section>
                                
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7">Street Address </label>
                                    <textarea
                                        rows={5}
                                        className="form-control-input "
                                        name="StreetAddress"
                                    />
                                    </div>

                                    <div className="pos-rel w100-m10 ">
                                        <label className="mb-7"> Contact Number </label>
                                        <input
                                            type="NUMBER"
                                            className="form-control-input "
                                            name="twitterHandle"
                                            value="+23490929012212"
                                        />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7"> Website </label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="twitterHandle"
                                       value="https://redq.io"
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7"> Email </label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="twitterCardType"
                                        value="demo@demo.com"
                                    />
                                    </div>
                                </form>
                                <div className="w-full mt-10">
                                    <section className="flex-container mb-lg alc">
                                        <div className="pos-rel w100-m10 ">
                                            <label className="">Select social platform</label>
                                            <select
                                                className="search__bar w-100 form-control-input"
                                                defaultValue={"default"}>
                                                <option value="default">Facebook</option>
                                            </select>
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                            <label>Add profile url</label>
                                            <input
                                                type="text"
                                                className="form-control-input "
                                                name="ProductName"
                                               value="https://www.facebook.com/redqinc"
                                            />
                                        </div>
                                        <p className="red">Remove</p>
                                    </section>
                                    <section className="flex-container mb-lg alc">
                                        <div className="pos-rel w100-m10 ">
                                            <label className="">Select social platform</label>
                                            <select
                                                className="search__bar w-100 form-control-input"
                                                defaultValue={"default"}>
                                                <option value="default"> Twitter</option>
                                            </select>
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                            <label>Add profile url</label>
                                            <input
                                                type="text"
                                                className="form-control-input "
                                                name="ProductName"
                                                value="https://twitter.com/RedqTeam"
                                            />
                                        </div>
                                        <p className="red">Remove</p>
                                    </section>
                                    <section className="flex-container mb-lg alc">
                                        <div className="pos-rel w100-m10 ">
                                            <label className="">Select social platform</label>
                                            <select
                                                className="search__bar w-100 form-control-input"
                                                defaultValue={"default"}>
                                                <option value="default">Instagram</option>
                                            </select>
                                        </div>
                                        <div className="pos-rel w100-m10 ">
                                            <label> Add profile url</label>
                                            <input
                                                type="text"
                                                className="form-control-input "
                                                name="ProductName"
                                                value="https://www.instagram.com/redqteam"
                                            />
                                        </div>
                                        <p className="red">Remove</p>
                                    </section>
                                    <button className="btn btn-primary p-25 mt-15">
                                        Add new social profile
                                    </button>
                                </div>
                                </div>
                            </div>
                            <div className="flex justsb tab ">
                                <div className="flex flex-col g-10 left mt-50">
                                    <h3 className="bold">Footer</h3>
                                    <p>Change your Footer information from here</p>
                                </div>
                                <div className="shadow w-full right">
                                <form style={{ width: "100%" }} className="flex flex-col g-10">
                                    
                                    <div className="pos-rel w100-m10 ">
                                    <label>Site Link</label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="title"
                                        value="https://pickbazar.redq.io"
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label> Copyright Text </label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="metaTags"
                                        value="Copyright © REDQ. All rights reserved worldwide."
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label>External Text</label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="url"
                                        value="REDQ"
                                    />
                                    </div>
                                    <div className="pos-rel w100-m10 ">
                                    <label className="mb-7"> External Link </label>
                                    <input
                                        type="text"
                                        className="form-control-input "
                                        name="OgTitle "
                                        value="https://redq.io"
                                    />
                                    </div>
                                </form>
                                </div>
                            </div>
                            <button className="btn btn-primary p-25 mt-15  pull-right">
                            Save Settings
                            </button>
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div>
     );
}
 
export default SiteSettings;