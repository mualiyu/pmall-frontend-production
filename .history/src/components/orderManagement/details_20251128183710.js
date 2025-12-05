import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/config"; 
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
   
    const columns = [
        { id: "name", label: "Product Name" },
        { id: "quantity", label: "Quantity" },
        { id: "price", label: "Unit Price" },
        { id: "status", label: "Status" },
        { id: "action", label: "Action" },
      ];

      const location = useLocation();
    const order = location?.state?.order;
        const [activeTab, setActiveTab] = React.useState('cart');
        const { user, setUser } = useUser();
        const [loading, setLoading] = useState(false)

const handleStatus = () => {
    console.log("hey")
}
        const handleTabChange = (tabName) => {
          setActiveTab(tabName);
        };
      
        const handleSubmit = () => {
          // Submit form logic goes here
          alert('Form submitted successfully!');
        };

        const getProductDetails = () => {
            setLoading(true);
            fetch(`${BASE_URL}/order/${order?.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  Accept: "application/json",
                  Authorization: "Bearer " + user?.token,
                },
              }
            )
              .then((resp) => resp.json())
              .then((result) => {
                console.log(result);
                // setDetails(result?.data);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
            //   console.log(detail);
          };

       
  useEffect(() => {
      console.log(location?.state.order);
    getProductDetails();
  }, []);   
    return ( 
        <section className=" w-full" style={{display:"block"}}>
            <div className="order-summary flex flex-col alc">
                <div className="page__header w-full">
                    <h1>Order {order?.id}</h1>
                </div>
                
                  <div className="flex-container w-full p-y my-40 g-40">
                      <div className="left w-full flex flex-col g-20 " style={{borderRadius: 0}}>
                          
                        
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
                                    {/* {galleryImages.map(details => ( */}
                                        <TableRow>
                                            <TableCell>Name of Product</TableCell>
                                            <TableCell>
                                                <div className='flex alc g-5'>
                                                    <p>80 </p>
                                                </div> 
                                            </TableCell>
                                            <TableCell>&#x20A6;2000</TableCell>
                                            <TableCell>Pending</TableCell>
                                            <TableCell>
                                                 <select
            name="pickup_location"
            className="last-name form-control"
            onChange={handleStatus}
            style={{marginTop: 4, textTransform: 'capitalize'}}>
               <option>Manage Order</option>
              {user?.accountType === 'Vendor' && (
                <>
                  <option>Push to Stockist</option>
                  <option>Deliver to Stockist</option>
                </>
              )}
              {user?.accountType === 'Stockist' && (
                 <>
                  <option>Out for Delivery</option>
                  <option>Received From Vendor</option>
                  <option>Packaging</option>
                  <option>Returned</option>
                  <option>Cancelled</option>
                  <option>Confirmed</option>
                  <option>Delivered</option>
                </>
              )}
            
          </select>
                                            </TableCell>
                                      </TableRow>
                                    {/* ))} */}
                              
                              </TableBody>
                            </Table>
                          </TableContainer>
                          
                      </div>
                      <div className=" right flex flex-col g-20 w-400">
                          <div className="flex flex-col g-20">
                              <p className='bold'>Summary</p>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Status</p>
                                  <p>Pending Delivery</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Dd</p>
                                  <p>#123823</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Date</p>
                                  <p>20 Nov, 2023</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Product Total Cost</p>
                                  <p>$948.5</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Payment Status</p>
                                  <p>Paid</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Selected Stockist</p>
                                  <p>$948.5</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Customer </p>
                                  <p>Ahmed Peter Hassan</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'> Telephone</p>
                                  <p>1234567890</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'> Delivery Address</p>
                                  <p>3157 W. grey St. Utica, pennysl yvania 57867</p>
                              </div>
                              
                              
                          </div>
                          
                          
                          <div className='backshadow flex flex-col g-5'>
                              <div className='flex track-btn all-center '  onClick={() => handleTabChange('billing')}>
                                  <LocalShippingOutlinedIcon  />
                                  <p>Track order</p>
                              </div>
                          </div>
                      </div>
                  </div>
                
                 
            </div>
      
        </section>
     );
} 
 
export default OrderDetails;