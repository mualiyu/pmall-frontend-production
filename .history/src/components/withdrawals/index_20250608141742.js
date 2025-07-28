import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Modal from "@mui/material/Modal";
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
  { id: "reference", label: "Transaction Reference" },
  { id: "amount", label: "Amount" },
  { id: "method", label: "Method" },
  { id: "status", label: "Transaction Status" },
  
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
  const [newWithdrawalModal, setNewWithdrawalModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const handleModalClose = () => setNewWithdrawalModal(false);

  const fetchAllWithdrawalRequests = () => {
    setLoading(true);
    fetch(`${BASE_URL}/withdrawal/history`, {
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
          // setTransactions(result.sales);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setToast({ message: "Error Fetching Transaction log", type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
        });
};

const makeWithdrawal = async(e) => {
  if (e) {
    e.preventDefault(); 
    setLoading(true)
    inputValues.more_images = moreImages?.join(", ")
    console.log(inputValues)
  try {
    const response = await fetch(
      `${BASE_URL}/products/create`, {
      method: 'POST',
      headers:{ 
        'Content-Type': 'application/json;charset=UTF-8', 
        "Accept": "application/json" ,
        'Authorization': `Bearer ${user?.token}`
      },
        body:JSON.stringify(inputValues)
    });
    console.log(inputValues)
    if (response.ok) {
      const data = await response.json();
      console.log('product:', data); 
      setToastMsg("Great! Product added successfully");
      setToastType("success")
      setInterval(() => {
        setToastMsg("");
}, 5000);
      setLoading(false)
      setNewProduct(data)
      handleModalClose()
    } else {
      const error = await response.text();
      console.error('Error posting product:', error);
      setLoading(false)
      setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
      setToastType("error")
      setInterval(() => {
        setToastMsg("");
}, 3000);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
};

useEffect(()=> {
  fetchAllWithdrawalRequests();
},[])


  return (
    <>
    <Loading loading={loading} />
    
    {!loading && (<section>
       
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc jusbtw">
          <div className="flex-container alc">
          <div className="mr-10">
          <CreditCardIcon />
          </div>
          <div>
          <h3>Withdrawal History</h3> 
          <p className="text-muted mt-n-5"> Here, you will find all your withdrawal history</p>
          </div>
          </div>
          <div>
          
          <button
              className="btn btn-primary p-25"
              // onClick={() => setNewRequestModal(true)}
              >
              New Request
            </button>
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
          {/* <TableBody>
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
           
          </TableBody> */}
        </Table>
      </TableContainer>


      <Modal
        open={newWithdrawalModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Make Withdrawal</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <form style={{ width: "100%" }}>
              
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label> Withdrawal Method</label>
                  <select
                  className="form-control-input "
                  name="method"
                    onChange={onChangeHandler}
                    value={inputValues.method || ""}
                    >
                    <option value="default"> Select Withdrawal Method</option>
                    
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Wallet">Wallet</option>
                  </select>
                </div>

                <div className="pos-rel w100-m10 ">
                  <label>Amount to Withdraw</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="amount"
                    placeholder="500"
                    onChange={onChangeHandler}
                    value={inputValues.amount || ""}
                  />
                </div>
              </section>
             
             
              

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Remarks </label>
                  <textarea
                    placeholder=""
                    className="form-textarea w-100 mt-10"
                    name="remarks"
                    onChange={onChangeHandler}
                    value={inputValues.remarks || ""}
                    ></textarea>
                </div>

                {/* <div className="pos-rel w100-m10"></div> */}
              </section>

              <div className="flex__normal pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right"
                 onClick={ makeWithdrawal}
                disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Initiate Withdrawal"}
                </button>
              </div>
            </form>
           
          </section>
        </Box>
      </Modal>
      

    </section>
    )}
    </>
  );
};

export default WithdrawalHistory;
