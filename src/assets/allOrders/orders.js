
import React, { useEffect, useState } from "react";
import "./orders.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://stage.api.pmall.com.ng/api/v1/sales");
        const json = await res.json();

        if (json.status === true) {
          setOrders(json.data);
        }
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2 className="order-title">All Orders</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total (NGN)</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Products</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="no-data">
                Loading orders...
              </td>
            </tr>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td data-label="Order ID">{order.id}</td>

                <td data-label="Customer">
                  {order.customer?.fname} {order.customer?.lname}
                </td>

                <td data-label="Total">
                  ₦{Number(order.total_amount).toLocaleString()}
                </td>

                <td data-label="Status">
                  <span className="status">{order.status}</span>
                </td>

                <td data-label="Payment">
                  <span className="payment">{order.payment_status}</span>
                </td>

                <td data-label="Products">
                  {order.products?.length || 0}
                </td>

                <td data-label="Date">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;