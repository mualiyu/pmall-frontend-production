import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import currency from "../utils/formatCurrency";
import "./transaction.css";

function TransactionPurchase() {
    // const { transactionId } = useParams();
    // const [transaction, setTransaction] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);


//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//           `https://api.pmall.com.ng/api/v1/customer/transactions/${transactionId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTransaction(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch transaction details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransaction();
//   }, [transactionId]);

//   if (loading) return <p>Loading transaction details...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!transaction) return <p>No transaction found.</p>;



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