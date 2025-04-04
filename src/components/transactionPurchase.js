import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
// import queryString from 'query-string';
import currency from "../utils/formatCurrency";
import "./transaction.css";

function TransactionPurchase() {
    const { trxref } = useParams();
    const [searchParams] = useSearchParams();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

  useEffect(() => {
  const transactionReference = searchParams.get("trxref");
    autoVerifyTransaction(transactionReference);
    // const fetchTransaction = async () => {
    //   try {
    //     const token = localStorage.getItem("authToken");
    //     const response = await axios.get(
    //       `https://api.pmall.com.ng/api/v1/customer/transactions/${transactionId}`,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );
    //     console.log(response);
    //     setTransaction(response.data.data);
    //   } catch (err) {
    //     setError("Failed to fetch transaction details.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchTransaction();
  }, []);



  const autoVerifyTransaction = (refId) => {
    console.log("Please wait.... Verifying transaction")
    const loggedInUser = localStorage.getItem("authToken");
    console.log(loggedInUser);
    if (!loggedInUser) {
        console.log("No authentication token found.");
        return;
    }

    fetch(`https://api.pmall.com.ng/api/v1/customer/checkout/paystack/verify/${refId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${loggedInUser}`,
        },
    })
    .then((resp) => resp.json())
    .then((result) => {
        console.log(result);
        if (result.status) {
          console.log(result)
            // window.location.href = `/checkout/transaction/${refId}`;
        } else {
            console.error("Verification failed:", result.message);
        }
    })
    .catch((err) => console.log("Fetch error:", err));
};


  if (loading) return <p>Loading transaction details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!transaction) return <p>No transaction found.</p>;



  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md fluid__contain">
            <div className="w-full flex justify-between items-center">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold mt-lg c-success">Transaction Successful</h1>
                </div>
            </div>

            <div className="transaction-table">
        <div className="row">
          <div className="cell label">Transaction ID:</div>
          <div className="cell">TSDHFN999</div>
        </div>
        <div className="row">
          <div className="cell label">Status:</div>
          <div className="cell c-success">Successful</div>
        </div>
        <div className="row">
          <div className="cell label">Amount Paid:</div>
          <div className="cell">{currency(3742400)}</div>
        </div>
        <div className="row">
          <div className="cell label">Payment Method:</div>
          <div className="cell">Paystack</div>
        </div>
        <div className="row">
          <div className="cell label">Date:</div>
          <div className="cell">18 March 2025</div>
        </div>
      </div>

      <h3>Order Summary</h3>
      <div className="transaction-table">
        <div className="row header">
          <div className="cell">Product</div>
          <div className="cell">Price</div>
          <div className="cell">Quantity</div>
          <div className="cell">Total</div>
        </div>
        {/* {transaction.items?.map((item) => ( */}
          {/* <div className="row" key={item.id}> */}
          <div className="row">
          <div className="cell">1</div>
            <div className="cell">Skin Care Product</div>
            <div className="cell">{currency(24000)}</div>
            <div className="cell">2</div>
            <div className="cell">{currency(48000)}</div>
          </div>
          <div className="row">
          <div className="cell">2</div>
            <div className="cell">Oral B</div>
            <div className="cell">{currency(24000)}</div>
            <div className="cell">4</div>
            <div className="cell">{currency(48000)}</div>
          </div>
          <div className="row">
          <div className="cell">3</div>
            <div className="cell">Dyclofenant Tube</div>
            <div className="cell">{currency(24000)}</div>
            <div className="cell">6</div>
            <div className="cell">{currency(48000)}</div>
          </div>
          <div className="row">
          <div className="cell">4</div>
            <div className="cell">Mega Hari Growth Power 3X</div>
            <div className="cell">{currency(24000)}</div>
            <div className="cell">1</div>
            <div className="cell">{currency(48000)}</div>
          </div>
        {/* ))} */}
      </div>

      {/* Next Actions */}
      <div className="next-actions">
        {/* <Link to={`/orders/${transaction.order_id}`} className="btn">View Order</Link> */}
        <Link to={`/orders/`} className="btn">View Order</Link>
        <Link to="/store" className="btn">Return to Store</Link>
        <Link to="/support" className="btn">Need Help?</Link>
      </div>
        </div>
  )
}

export default TransactionPurchase