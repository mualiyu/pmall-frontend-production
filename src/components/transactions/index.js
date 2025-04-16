import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast"
import { BASE_URL } from "../../utils/config"; 
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

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
  { id: "to", label: "Message to" },
  { id: "type", label: "Type" },
  { id: "subject", label: "Msg. Subject" },
  { id: "description", label: "Message" },
];


function createData(
  to,
  type,
  subject,
  description,
) {
  return {
    to,
    type,
    subject,
    description,
  };
}

const TransactionOrderHistory = () => {
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] =useState(false);
  const [toast, setToast] = useState(null);
  const handleModalClose = () => setNewMessageModal(false);

const [error, setError] = useState("");
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
    setLoading(false);
  })
        .catch((err) => {
            console.log(err);
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
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allPackages.map((packageItem)=> (
          <TableRow onClick={() => navigate("details")} key={packageItem.id}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">{packageItem.name} </h4>
                  </div>
                </div>
              </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                 { packageItem.type }
                </h4>
                </div>
                </div>
                </TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                      { currency(packageItem.price) } 
                      </h4>
                    </div>
              </div>
              </TableCell>
              
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="uppercase">
                       {moment(packageItem.created_at).format("ll")}
                       </h4>
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

export default TransactionOrderHistory;
