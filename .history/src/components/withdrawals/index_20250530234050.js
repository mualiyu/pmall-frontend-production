import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast";
import { BASE_URL } from "../../utils/config"; 
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "date", label: "Transaction Date" },
  { id: "date", label: "Transaction Date" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Transaction Status" },
  { id: "products", label: "Products" },
];


function createData(
  date,
    reference,
    amount,
    method,
    status
) {
  return {
    date,
    reference,
    amount,
    method,
    status
  };
}

const WithdrawalHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const fetchAllTransactions = () => {
    setLoading(true);
    fetch(`${BASE_URL}/customer/sales/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
    })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
          setTransactions(result.sales);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setToast({ message: "Error Fetching Transaction log", type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
        });
};


useEffect(()=> {
  fetchAllTransactions();
},[])


  return (
    <>
    <Loading loading={loading} />
    
    {!loading && (<section>
       
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc">
          <div className="mr-10">
          <CreditCardIcon />
          </div>
          <div>
          <h3>Transaction / Order History</h3> 
          <p className="text-muted mt-n-5"> Here, you will find all your transaction history</p>
          </div>
        </div>
      </section>
      <div className="s-divider"></div>
      

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Vendors Table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((trx)=> (
          <TableRow key={trx.id}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">{moment(trx.created_at).format("ll")} </h4>
                  </div>
                </div>
              </TableCell>
              
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                      { currency(trx.total_amount) } 
                      </h4>
                    </div>
              </div>
              </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                 { trx.payment_status }
                </h4>
                </div>
                </div>
                </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <ol style={{lineHeight: "2em"}}>
                      {trx?.products?.map((pro)=>(
                      <li key={pro.id} className="capitalize">{pro?.name} - ({currency(pro?.cost_price)}) </li>
                      ))}
                    </ol>
                   
                       </div>
                       </div>
               </TableCell>
            </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>

    </section>
    )}
    </>
  );
};

export default WithdrawalHistory;
