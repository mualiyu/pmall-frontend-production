import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const OrderDetails= () => {
    const galleryImages = [
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
        {name:"image 1",image:"/1.png", quantity:1, price:50.47},
    ]
    const columns = [
        { id: "image", label: "Image" },
        { id: "name", label: "Name" },
        { id: "quantity", label: "Quantity" },
        { id: "price", label: "Price" },
      ];

      
        const [activeTab, setActiveTab] = React.useState('cart');
      
        const handleTabChange = (tabName) => {
          setActiveTab(tabName);
        };
      
        const handleSubmit = () => {
          // Submit form logic goes here
          alert('Form submitted successfully!');
        };
    return ( 
        <section className=" w-full" style={{display:"block"}}>
            <div className="order-summary flex flex-col alc">
                <div className="page__header w-full">
                    <h1>Order #123783</h1>
                </div>
                <div className={`flex alc tab-icons justsb ${activeTab === 'order' && "hidden"}`}>
                  <div className='tab-btn active'>
                    <ShoppingCartIcon />
                  </div>
                  <div className={`bar ${activeTab == "billing"  && "active"} ${activeTab == "payment" && "active"}`}></div>
                  <div className={`tab-btn ${activeTab == "billing" && "active"} ${activeTab == "payment" && "active"}`}>
                    <LibraryBooksIcon />
                  </div>
                  <div className={`bar ${activeTab == "payment" && "active"}`} ></div>
                  <div className={`tab-btn ${activeTab == "payment" && "active"}`}>
                    <MonetizationOnIcon  />
                  </div>
                </div>
                {activeTab === 'cart' && (
                  <div className="flex-container w-full p-y my-40 g-40">
                      <div className="left w-full flex flex-col g-20 ">
                          <div className='flex justsb alc sort'>
                              <p>File</p>
                              <div className='flex alc g-10'>
                                  <select name="" id="">
                                      <option value="1">Sort</option>
                                  </select>  
                              </div>
                          </div>
                        
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              size="small"
                              aria-label="Vendors Table">
                              <TableHead>
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell>{column.label}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                    {galleryImages.map(details => (
                                        <TableRow>
                                            <TableCell className="b-r">
                                                <div className="d-flex alc f-10 flex-start">
                                                <img src={details.image} className="w30"/>
                                                </div>
                                            </TableCell>
                                            <TableCell>{details.name}</TableCell>
                                            <TableCell>
                                                <div className='flex alc g-5'>
                                                    <p>-</p>
                                                    <p>{details.quantity} </p>
                                                    <p>+</p>
                                                </div> 
                                            </TableCell>
                                            <TableCell>&#x20A6;{details.price}</TableCell>
                                            <TableCell>
                                            {" "}
                                            <DeleteOutlineOutlinedIcon />{" "}
                                            </TableCell>
                                      </TableRow>
                                    ))}
                              
                              </TableBody>
                            </Table>
                          </TableContainer>
                          
                      </div>
                      <div className=" right flex flex-col g-20 w-400">
                          <div className="flex flex-col g-20">
                              <p className='bold'>Summary</p>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Order id</p>
                                  <p>#123823</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline">
                                  <p className='bold'>Date</p>
                                  <p>20 Nov, 2023</p>
                              </div>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Total</p>
                                  <p>$948.5</p>
                              </div>
                          </div>
                          <div className='backshadow flex flex-col g-5'>
                              <p className='bold'>Shipping Address</p>
                              <p>3157 W. grey St. Utica, pennyslyvania 57867</p>
                          </div>
                          <div className='backshadow flex flex-col g-5'>
                              <p className='bold'>Payment Method</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae accusamus aperiam eveniet eaque labore perspiciatis officiis recusandae quisquam fugit vero dolores provident praesentium quas temporibus inventore est facilis, beatae at.</p>
                          </div>
                          <div className='backshadow flex flex-col g-5'>
                              <p className='bold'>Expected Date of Delivery</p>
                              <p>20 Nov, 2023</p>
                              <div className='flex track-btn all-center '  onClick={() => handleTabChange('billing')}>
                                  <LocalShippingOutlinedIcon  />
                                  <p>Track order</p>
                              </div>
                          </div>
                      </div>
                  </div>
                )}
                 {activeTab === 'billing' && (
                  <div className="flex-container w-full p-y my-40 g-40">
                      <div className="left w-full flex flex-col g-20 ">
                         <h1>Guest Information</h1>
                          <form style={{width: '100%'}} >
                            <section className="flex-container mb-lg">
                            <div className="pos-rel w100-m10 ">
                                      <label className="">First Name</label>
                                      <input
                                      type="text"
                                      className="form-control-input "
                                      name="firstName"
                                      />
                                  </div>   
                                  <div className="pos-rel w100-m10 ">
                                      <label className="">Last Name</label>
                                      <input
                                      type="text"
                                      className="form-control-input "
                                      name="lastName"
                                      />
                                  </div>   
                            </section>
                            <section className="flex-container mb-lg">
                                  <div className="pos-rel w100-m10 ">
                                      <label className="">Email</label>
                                      <input
                                      type="email"
                                      className="form-control-input "
                                      name="email"
                                      />
                                  </div>   
                                  <div className="pos-rel w100-m10 ">
                                      <label className="">Phone</label>
                                      <input
                                      type="number"
                                      className="form-control-input "
                                      name="phone"
                                      />
                                  </div>   
                            </section>
                            <section className="flex-container mb-lg">
                              <div className="pos-rel w100-m10 ">
                                <label className="">Address</label>
                                <input
                                type="text"
                                className="form-control-input "
                                name="address"
                                />
                              </div> 
                              <div className="pos-rel w100-m10 ">
                              <label className="mb-7">Country</label>
                              <select className="search__bar w-100" defaultValue={'default'}>
                                  <option value="default">Nigeria</option>
                                  <option value="Parent 1"> Brand 1</option>
                                  <option value="Parent 2"> Brand 2</option>
                                  <option value="Parent 3"> Brand 3</option>
                                  <option value="Parent 4"> Brand 4</option>
                              </select>
                            </div>     
                            </section>
                            <section className="flex-container mb-lg">
                                <div className="pos-rel w100-m10 ">
                                    <label className="">Town/city</label>
                                    <input
                                    type="text"
                                    className="form-control-input "
                                    name="city"
                                    />
                                </div>
                                <div className="pos-rel w100-m10 ">
                                    <label className="">State</label>
                                    <input
                                    type="text"
                                    className="form-control-input "
                                    name="state"
                                    />
                                </div>    
                                <div className="pos-rel w100-m10 ">
                                    <label className="">Zip/postal code</label>
                                    <input
                                    type="text"
                                    className="form-control-input "
                                    name="city"
                                    />
                                </div>     
                            </section>
                            <div className="flex">
                              <button className="btn-primary billing-btn w-full" onClick={() => handleTabChange('payment')}>
                              Deliver to this address
                            </button>
                            </div>
                          </form>
                      </div>
                      <div className=" right flex flex-col g-20 w-400">
                          <div className="flex flex-col g-20">
                              <p className='bold'>Summary</p>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Order id</p>
                                  <p>#123823</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline">
                                  <p className='bold'>Date</p>
                                  <p>20 Nov, 2023</p>
                              </div>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Total</p>
                                  <p>$948.5</p>
                              </div>
                          </div>
                      </div>
                  </div>
                )}
                {activeTab === 'payment' && (
                  <div className="flex-container w-full p-y my-40 g-40">
                      <div className="left w-full flex flex-col g-20 ">
                         <h1>Payment Options</h1>
                          <form style={{width: '100%'}} >
                            <section className="flex-container flex-col g-20 mb-lg">
                                <div className='flex alc g-10 border'>
                                    <input type="radio" name="payment" id="1" />
                                    <div>
                                        <p>Credit/Debit Card</p>
                                        <p>We support mastercard,visa,discover or stripe</p>
                                    </div>
                                </div>
                                <div className='flex alc g-10 border'>
                                    <input type="radio" name="payment" id="2" />
                                    <div>
                                        <p>Cash on Delivery</p>
                                        <p>pay with cash when your order is delivered</p>
                                    </div>
                                </div>
                            </section>
                            <div className="flex" >
                              <button className="btn-primary billing-btn w-full" onClick={() => handleTabChange('order')}>
                              Complete order
                            </button>
                            </div>
                          </form>
                      </div>
                      <div className=" right flex flex-col g-20 w-400">
                            <div className="flex flex-col g-20 shadow">
                                <p className='bold'>Billing & Addrress</p>
                                  <p className='bold'>Ahmed peter</p>
                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nihil optio omnis doloremque similique hic, accusantium a .</p>
                          </div>
                          <div className="flex flex-col g-20 shadow">
                              <p className='bold'>Summary</p>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Order id</p>
                                  <p>#123823</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline">
                                  <p className='bold'>Date</p>
                                  <p>20 Nov, 2023</p>
                              </div>
                              <div className=" flex g-5 img-detail underline">
                                  <p className='bold'>Total</p>
                                  <p>$948.5</p>
                              </div>
                          </div>
                      </div>
                  </div>
                )}
                {activeTab === 'order' && (
                  <div className="flex-container w-full p-y my-40 g-40">
                      <div className="left w-full flex flex-col g-20 ">
                         <h1>Order details</h1>
                          <div className='flex justsb'>
                              <div className='flex flex-col g-10 shadow w-full'>
                                  <div className='flex alc'>
                                    <PersonIcon />
                                    <h3 className='bold'>Customer Details</h3>
                                  </div>
                                  <p><span className='bold'>Name:</span> Ahmed Peter</p>
                                  <p><span className='bold'>Phone:</span> 2349088776655</p>
                                  <p><span className='bold'>Email:</span> AhmedPeter@gmai.com</p>
                              </div>
                              <div className='flex flex-col g-10 shadow w-full'>
                                  <div className='flex alc'>
                                    <LocalShippingIcon />
                                    <h3 className='bold'>Shipping Address</h3>
                                  </div>
                                  <p><span className='bold'>Address:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil neque, excepturi earum .</p>
                                  <p><span className='bold'>Order date:</span> Feb 10, 2024 at 10:17PM</p>
                              </div>
                              <div className='flex flex-col g-10 shadow w-full'>
                                    <div className='flex alc'>
                                        <MonetizationOnIcon />
                                    <h3 className='bold'>Shipping Address</h3>
                                   </div>
                                  <h3 className='bold'>Payment Method</h3>
                                  <p><span className='bold'>Method:</span> Cash on delivery</p>
                                  <p><span className='bold'>Status:</span> Pending</p>
                                  <p><span className='bold'>Shipping fee:</span> &#x20A6;1700</p>
                              </div>
                          </div>
                          <div>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              size="small"
                              aria-label="Vendors Table">
                              <TableHead>
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell>{column.label}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                    {galleryImages.map(details => (
                                        <TableRow>
                                            <TableCell className="b-r">
                                                <div className="d-flex alc f-10 flex-start">
                                                <img src={details.image} className="w30"/>
                                                </div>
                                            </TableCell>
                                            <TableCell>{details.name}</TableCell>
                                            <TableCell>
                                                <div className='flex alc g-5'>
                                                    <p>-</p>
                                                    <p>{details.quantity} </p>
                                                    <p>+</p>
                                                </div> 
                                            </TableCell>
                                            <TableCell>&#x20A6;{details.price}</TableCell>
                                            <TableCell>
                                            {" "}
                                            <DeleteOutlineOutlinedIcon />{" "}
                                            </TableCell>
                                      </TableRow>
                                    ))}
                              
                              </TableBody>
                            </Table>
                          </TableContainer>
                          </div>
                      </div>
                     
                  </div>
                )}
            </div>
      
        </section>
     );
} 
 
export default OrderDetails;