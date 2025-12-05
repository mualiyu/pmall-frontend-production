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
import moment from "moment";
const OrderDetails= () => {
   
    const columns = [
        { id: "name", label: "Product Name" },
        { id: "quantity", label: "Quantity" },
        { id: "price", label: "Unit Price" },
        { id: "total", label: "Total Cost" },
        { id: "status", label: "Status" },
        { id: "action", label: "Action" },
      ];

      const location = useLocation();
    const order = location?.state?.order;
        const [activeTab, setActiveTab] = React.useState('cart');
        const { user, setUser } = useUser();
        const [loading, setLoading] = useState(false)

const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    console.log("Push to Stockist")
    // setSelectedStockist(parseInt(selectedValue));
    if(selectedStatus == 'push-to-stockist') {
      console.log("Pushed to Stockist")

      try {
        const response = await fetch(`${BASE_URL}/orders/push`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.token,
            },
            // body: JSON.stringify(requestBody),
        });

        const result = await response.json();
        console.log("Checkout Result:", result);

        // if (!result.status) {
        //     setToast({ message: `Checkout initiation failed: ${result.message}`, type: "error" });
        // setTimeout(() => setToast(null), 5000);
        //     console.error("Checkout initiation failed:", result);
        //     return false;
        // }
        // setToast({ message: "Product(s) mapped to user... Initiating payment...", type: "warning" });
        // setTimeout(() => setToast(null), 5000);
        // return result.sale; // Return sale data for payment

    } catch (error) {
        // setToast({ message: "Error during checkout initiation:", type: "error" });
        setTimeout(() => setToast(null), 5000);
        console.error("Error:", error);
        return false;
    }
    }
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
                    <h1>Order No:  {order?.id}</h1>
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
                                    {order?.products?.map(ord => (
                                        <TableRow>
                                            <TableCell>{ord?.name}</TableCell>
                                            <TableCell>
                                                <div className='flex alc g-5'>
                                                    <p>{ord?.pivot?.quantity} </p>
                                                </div> 
                                            </TableCell>
                                            <TableCell>&#x20A6;{ord?.selling_price}</TableCell>
                                            <TableCell>&#x20A6;{ord?.pivot.total}</TableCell>
                                            <TableCell>{ord?.status === '0' ? "Pending" : "Delivered" }</TableCell>
                                            <TableCell>
                                                 <select
            name="order-status"
            className="last-name form-control"
            onChange={handleStatusChange}
            style={{marginTop: 4, textTransform: 'capitalize'}}>
               <option>Manage Order</option>
              {user?.accountType === 'Vendor' && (
                <>
                  <option value="push-to-stockist">Push to Stockist</option>
                  <option value="deliver-to-stockist">Deliver to Stockist</option>
                </>
              )}
              {user?.accountType === 'Stockist' && (
                 <>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="received-from-vendor">Received From Vendor</option>
                  <option value="packaging">Packaging</option>
                  <option value="returned">Returned"</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                </>
              )}
            
          </select>
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
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Status</p>
                                  <p style={{textTransform: 'capitalize'}}>{order.status}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order ID</p>
                                  <p>#{order?.id}</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Date</p>
                                  <p>
                                    {moment(order.created_at).format("ll")} @{" "}
                                    {moment(order.created_at).format("LT")}
                                   </p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Product Total Cost</p>
                                  <p>&#x20A6;{order?.total_amount}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Payment Status</p>
                                  <p style={{textTransform: 'capitalize'}}>{order?.payment_status}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Selected Stockist</p>
                                  <p style={{textTransform: 'capitalize'}}>{order?.stockist?.name}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Customer </p>
                                  <p style={{textTransform: 'capitalize'}}> {order?.customer?.fname} {order.customer?.lname}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'> Telephone</p>
                                  <p>{order?.customer?.phone}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'> Delivery Address</p>
                                  <p style={{textTransform: 'capitalize'}}>{order?.customer?.address}</p>
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