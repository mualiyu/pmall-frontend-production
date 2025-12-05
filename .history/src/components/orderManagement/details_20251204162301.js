import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/config"; 
import Toast from "../../utils/Toast";
import Loading from "../../utils/loading";
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
        { id: "name", label: "Product" },
        { id: "quantity", label: "Quantity" },
        { id: "price", label: "Unit Price" },
        { id: "total", label: "Total Cost" },
        { id: "status", label: "Status" },
        { id: "action", label: "Action" },
      ];

      const location = useLocation();
    // const order = location?.state?.order;
        const [activeTab, setActiveTab] = React.useState('cart');
        const [order,setOrder] = useState(location?.state?.order);
        const { user, setUser } = useUser();
        const [toast, setToast] = useState(null);
        const [statuses, setStatuses] = useState("");
        const [loading, setLoading] = useState(false)

        const handleStatusChange = async (orderState, e) => {
          setLoading(true);
          const selectedStatus = e?.target?.value;
          console.log("Order:", orderState);
          console.log("Selected Status:", selectedStatus);
        
          // 👉 Check if the selected status is "push-to-stockist"
          if (selectedStatus !== "push-to-stockist") {
            console.log("No action taken... Status not push-to-stockist");
            return;
          }

          const requestBody = {
            stockist_id: order?.stockist?.id,
            sale_id: parseInt(orderState?.pivot?.sale_id),
            product_id: parseInt(orderState?.pivot?.product_id)
          };
        
          try {
            const response = await fetch(`${BASE_URL}/orders/push`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.token,
              },
              body: JSON.stringify(requestBody),
            });
        
            const result = await response.json();
            setLoading(false);
            if(result.status) {
              setToast({ message: `Successful!... ${result.message}`, type: "success" });
                setTimeout(() => setToast(null), 5000);
                // getProductDetails();
            console.log("Pushing Result:", result);
            }else {
              setToast({ message: `Failed!... ${result.message}`, type: "error" });
              setStatuses("");
              setTimeout(() => setToast(null), 5000);
            }
          } catch (error) {
            console.error("Error:", error);
            setToast({ message: `Failed... ${error}`, type: "error" });
                setTimeout(() => setToast(null), 5000);
                setLoading(false);
                setStatuses("");
                return false; //  failed
          }
          setLoading(false);
        };
        
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
                  "Accept": "application/json",
                  "Authorization": "Bearer " + user?.token,
                },
              }
            )
              .then((resp) => resp.json())
              .then((result) => {
                setLoading(false);
                console.log(result);
                if(result.status) {
                  setOrder(result.data.products);
                }else {
                  setToast({ message: `Failed!... ${result.message}`, type: "error" });
                  setTimeout(() => setToast(null), 5000);
                }
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
      if(order.id) {
        getProductDetails();
      }
  }, []);   


    return ( 
        <section className=" w-full" style={{display:"block"}}>
          <Loading loading={loading} />
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
                                            {user?.accountType === 'Vendor' && (
                                            <TableCell>
                                            
                                                 <select
                                  name="order-status"
                                  className="last-name form-control"
                                  value={statuses}
                                  onChange={(e) => handleStatusChange(ord, e)}
                                  style={{marginTop: 4, textTransform: 'capitalize'}}>
                                    <option value="">Manage Order</option>
                                        <option value="push-to-stockist">Push to Stockist</option>
                                        <option value="deliver-to-stockist">Deliver to Stockist</option>
                                </select>
                            
                             </TableCell>
                             )}
                             {(user?.accountType === 'Stockist' && ord.status === "1") && (
                             <TableCell>
                            <button  class="btn btn-warning p-25">
                                      Receive 
                            </button>
                        </TableCell>
                             )}
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
                                  <p style={{textTransform: 'capitalize'}}>{order?.status}</p>
                              </div>
                              <div className=" flex g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order ID</p>
                                  <p>#{order?.id}</p>
                              </div>
                              <div className=" flex  g-5 img-detail underline j-spbtween">
                                  <p className='bold'>Order Date</p>
                                  <p>
                                    {moment(order?.created_at).format("ll")} @{" "}
                                    {moment(order?.created_at).format("LT")}
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
                                  <p style={{textTransform: 'capitalize'}}> {order?.customer?.fname} {order?.customer?.lname}</p>
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