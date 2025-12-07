import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/config";
import Toast from "../../utils/Toast";
import ButtonLoader from "../../utils/buttonLoader";
import currency from "../../utils/formatCurrency";
import Loading from "../../utils/loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
const OrderDetails = () => {
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
  const [activeTab, setActiveTab] = React.useState("cart");
  const [order, setOrder] = useState(location?.state?.order);
  const [receiving, setReceiving] = useState(false);
  const { user, setUser } = useUser();
  const [toast, setToast] = useState(null);
  const [statuses, setStatuses] = useState("");
  const [loading, setLoading] = useState(false);


  const handleReceive = async(ordx, e)=> {
    
    try {
      setReceiving(true);
      const response = await fetch(`${BASE_URL}/order/${ordx?.order?.id}/${e.target.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + user?.token,
        },
      });
      const result = await response.json();
      // setLoading(false);
      console.log(result);
      if (result.status) {
        setToast({
          message: `Successful!... ${result.message}`,
          type: "success",
        });
        setReceiving(false);
        setTimeout(() => setToast(null), 5000);
        getProductDetails();
      } else {
        setToast({ message: `Failed!... ${result.message}`, type: "error" });
        setStatuses("");
        setReceiving(false);
        setTimeout(() => setToast(null), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: `Failed... ${error}`, type: "error" });
      setTimeout(() => setToast(null), 5000);
      // setLoading(false);
      setStatuses("");
      setReceiving(false);
      return false; //  failed
    }
  }
  const handleStatusChange = async (orderState, e) => {
    setLoading(true);
    const selectedStatus = e?.target?.value;
    console.log("Order:", orderState);
    console.log("Selected Status:", selectedStatus);

    const requestBody = {
        stockist_id: order?.stockist?.id,
        sale_id: parseInt(orderState?.pivot?.sale_id),
        product_id: parseInt(orderState?.pivot?.product_id),
      };
      console.log(selectedStatus);
    // 👉 Check if the selected status is "push-to-stockist"
    if (selectedStatus === "push-to-stockist") {
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
        if (result.status) {
          setToast({
            message: `Successful!... ${result.message}`,
            type: "success",
          });
          setTimeout(() => setToast(null), 5000);
          getProductDetails();
          console.log("Pushing Result:", result);
        } else {
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
    } 
    
    if (selectedStatus === "deliver-to-stockist") {
      try {
        const response = await fetch(`${BASE_URL}/orders/delivertostockist`, {
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
        if (result.status) {
          setToast({
            message: `Successful!... ${result.message}`,
            type: "success",
          });
          setTimeout(() => setToast(null), 5000);
          getProductDetails();
          console.log("Delivered Result:", result);
        } else {
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
    } 

    setLoading(false);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSubmit = () => {
    // Submit form logic goes here
    alert("Form submitted successfully!");
  };

  const getProductDetails = () => {
    setLoading(true);
    let determinWhoseOrder = user?.accountType === "Stockist" ? `stockist/order/${order?.id}` : `vendor/order/${order?.id}`;
    fetch(`${BASE_URL}/${determinWhoseOrder}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + user?.token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setOrder(result?.data);
        } else {
          setToast({ message: `Failed!... ${result.message}`, type: "error" });
          setTimeout(() => setToast(null), 5000);
        }
        console.log(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (order.id) {
      getProductDetails();
    }
  }, []);

  return (
    <section className=" w-full" style={{ display: "block" }}>
      <Loading loading={loading} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="order-summary flex flex-col alc">
        <div className="page__header w-full">
          <h1 style={{fontSize: 28}}>Order No: {order?.id}</h1>
        </div>

        <div className="flex-container w-full p-y my-40 g-40">
          <div
            className="left w-full flex flex-col g-20 "
            style={{ borderRadius: 0 }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="Vendors Table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.products?.map((ord) => (
                    <TableRow>
                      <TableCell>{ord?.name}</TableCell>
                      <TableCell>
                        <div className="flex alc g-5">
                          <p>{ord?.pivot?.quantity} </p>
                        </div>
                      </TableCell>
                      <TableCell>{currency(ord?.selling_price)}</TableCell>
                      <TableCell>{currency(ord?.pivot.total)}</TableCell>
                      <TableCell>
                        <span
                          className="capitalize badge c-chalk"
                          style={{
                            backgroundColor:
                              ord?.status === "0"
                                ? "#ff9800"
                                : ord?.status === "pushed"
                                ? "#4caf50"
                                : ord?.status === "delivered-to-stockist"
                                ? "orange"
                                : ord?.status === "received"
                                ? "#4caf50"
                                : "red",
                          }}
                        >
                          {ord?.status === "0" ? "Pending" : ord?.status}
                        </span>
                      </TableCell>
                      {user?.accountType === "Vendor" && (
                        <TableCell>
                          <select
                            name="order-status"
                            className="last-name form-control"
                            value={statuses}
                            onChange={(e) => handleStatusChange(ord, e)}
                            style={{
                              marginTop: 4,
                              textTransform: "capitalize",
                            }}
                          >
                            <option value="">Manage Order</option>
                            <option value="push-to-stockist">
                              Push to Stockist
                            </option>
                            <option value="deliver-to-stockist">
                              Deliver to Stockist
                            </option>
                          </select>
                        </TableCell>
                      )}
                      
                      <TableCell>
  {ord?.status === "Awaiting Confirmation" && (
    <button
      onClick={(e) => handleReceive(ord, e)}
      disabled={receiving}
      className="btn btn-warning p-25"
    >
      {receiving ? <ButtonLoader /> : "Receive"}
    </button>
  )}
</TableCell>

                       
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className=" right flex flex-col g-20 w-400">
            <div className="flex flex-col g-20">
              <p className="bold" style={{
                    fontSize: 20,
                    color: '#1a3e9c',
                    borderBottom: 'thin dashed #c3c3c3',
                    paddingBottom: 11
              }}>
                Summary
                </p>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold">Order Status</p>
                <span className="badge c-chalk" style={{ 
                  textTransform: "capitalize",
                  backgroundColor:
                              order?.status === "pending"
                                ? "#ff9800"
                                : order?.status === "completed"
                                ? "#4caf50"
                                : order?.status === "delivered"
                                ? "orange"
                                : order?.status === "received"
                                ? "#4caf50"
                                : "red",
                   }}>
                  {order?.status}
                </span>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold">Order ID</p>
                <p>#{order?.id}</p>
              </div>
              <div className=" flex  g-5 img-detail underline j-spbtween">
                <p className="bold">Order Date</p>
                <p>
                  {moment(order?.created_at).format("ll")} @{" "}
                  {moment(order?.created_at).format("LT")}
                </p>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold"> Total Product Cost</p>
                <p>{currency(order?.total_amount)}</p>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold">Payment Status</p>
                <p style={{ textTransform: "capitalize" }}>
                  {order?.payment_status}
                </p>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold">Selected Stockist</p>
                <p style={{ textTransform: "capitalize" }}>
                  {order?.stockist?.name}
                </p>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold">Customer </p>
                <p style={{ textTransform: "capitalize" }}>
                  {" "}
                  {order?.customer?.fname} {order?.customer?.lname}
                </p>
              </div>
              {user.accountType !== "vendor" && (
                <>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold"> Telephone</p>
                <p>{order?.customer?.phone}</p>
              </div>
              <div className=" flex g-5 img-detail underline j-spbtween">
                <p className="bold"> Delivery Address</p>
                <p style={{ textTransform: "capitalize" }}>
                  {order?.customer?.address}
                </p>
              </div>
              </>
              )}
            </div>

            <div className="backshadow flex flex-col g-5">
              {user.accountType !== "stockist" && (
              <div
                className="flex track-btn all-center "
                onClick={() => handleTabChange("billing")}
              >
                <LocalShippingOutlinedIcon />
                <p>Track order</p>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
