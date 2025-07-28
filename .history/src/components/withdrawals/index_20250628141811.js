import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Box from "@mui/material/Box";
import Toaster from "../../utils/toaster";
import ButtonLoader from "../../utils/buttonLoader";
import Typography from "@mui/material/Typography";
import { useVendor } from "../../context/VendorSignupContext";
import Modal from "@mui/material/Modal";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast";
import PackageName from "../../utils/accountPackages"
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

const WithdrawalHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [newWithdrawalModal, setNewWithdrawalModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const [toastType, setToastType] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const { user } = useUser();
  const [balanceInsufficient, setBalanceInsufficient] = useState(false);
  const {inputValues, setState, onChangeHandler,  visible, setVisible,} = useVendor();
  const handleModalClose = () => setNewWithdrawalModal(false);

  const handleChange = (event, newValue) => {
    const selectedTitles = newValue.join(', ');
    console.log(selectedTitles);
  
    setState((inputValues) => ({
      ...inputValues,
      tags: selectedTitles,
    }));
  };
  
  const fetchAllWithdrawalRequests = () => {
    setLoading(true);

    let adminUrl = `${BASE_URL}/admin-withdrawal/list`;
  let otherAccountUrl = `${BASE_URL}/withdrawal/history`;

  let url = user.accountType === 'Admin' ? adminUrl : otherAccountUrl;


    fetch(url, {
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
          setWithdrawals(result.withdrawals);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setToast({ message: "Error Fetching Withdrawal log", type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
        });
};

const handleWithdrawalAction = (action, transactionId) => {
  setLoadingId(transactionId);
  var endpoints = {
    approve: `${BASE_URL}/admin-withdrawal/approve/${transactionId}`,
    reject: `${BASE_URL}/admin-withdrawal/reject/${transactionId}`,
    complete: `${BASE_URL}/admin-withdrawal/complete/${transactionId}`
  };
  
  var url = endpoints[action];

  fetch(url, {
    method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
  })
  .then(function(response) {
    if (!response.ok) {
      setToast({ message: 'Network response was not ok: ' + response.statusText, type: "error" });
      setLoadingId(null); 
    }
    return response.json();
  })
  .then(function(result) {
    setToast({ message: 'Withdrawal ' + action + 'd successfully!', type: action == 'reject' ? 'error' : 'success' });
    setLoadingId(null); 
    fetchAllWithdrawalRequests();
  })
  .catch(function(error) {
    setToast({ message: 'Error performing withdrawal action:', type: "error" }); 
    setLoadingId(null); 
  });
}


const validateWallet = (value) => {
  const amount = parseFloat(value);
  const walletBalance = parseFloat(user.wallet);

  if (!isNaN(amount) && amount > walletBalance) {
    setBalanceInsufficient(true);
  } else {
    setBalanceInsufficient(false);
  }
};


const makeWithdrawal = async(e) => {
  if (e) {
    e.preventDefault(); 
    setLoading(true)
    console.log(inputValues)
  try {
    const response = await fetch(
      `${BASE_URL}/withdrawal/request?wallet_id=${user.walletID}&amount=${inputValues.amount}&method=${inputValues.method}&remarks=${inputValues.remarks}`, {
      method: 'POST',
      headers:{ 
        'Content-Type': 'application/json;charset=UTF-8', 
        "Accept": "application/json" ,
        'Authorization': `Bearer ${user?.token}`
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('request:', data); 
      setToast({ message: "Great! Request submitted successfully", type: "success" });
      fetchAllWithdrawalRequests();
      setInterval(() => {
        setToastMsg("");
}, 5000);
      setLoading(false)
      // setNewWithdrawalModal(data)
      handleModalClose()
    } else {
      const error = await response.text();
      console.error('Error posting request:', error);
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
  console.log(user);
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
            <h3>Withdrawal History 
              <span className="badge error">{withdrawals?.length}</span>
              </h3> 
              <p className="text-muted mt-n-5"> Here, you will find all your withdrawal history</p>
          </div>
        </div>
        <button
        style={{position: 'absolute', right: '22%'}}
              className="btn btn-primary p-25"
              onClick={() => setNewWithdrawalModal(true)}
              >
              New Request
            </button>
            </div>
      </section>
      <div className="s-divider"></div>
      

      <TableContainer component={Paper} style={{marginTop: '10%'}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Vendors Table">
          <TableHead>
            <TableRow>
              <th> Request Date </th>
              <th> Reference </th>
              {user.accountType === "Admin" && (
                <>
              <th> Customer </th>
              <th> Acct Details </th>
              </>
              )}
              <th>  Method </th>
              <th>  Amount </th>
              <th>  Status </th>
              {user.accountType === "Admin" && (
              <th> Actions </th>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals?.map((trx)=> (
          <TableRow key={trx.id}>
              
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="">{moment(trx.created_at).format("llll")} </h4>
                  </div>
                </div>
              </TableCell>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="">{ trx.reference } </h4>
                  </div>
                </div>
              </TableCell>
              {user.accountType === "Admin" && (
                <>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                      <h4 class="f-300 capitalize">{ trx?.user?.fname }  { trx?.user?.lname } </h4>
                      <p class="sub__title">( <PackageName id={trx?.user?.package_id } type={trx?.user.user_type} />)</p>
                    </div>
              </div>
              </TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                      <h4 class="f-300">{trx?.user?.acct_name } </h4>
                      <p class="sub__title">{trx?.user?.acct_number } ({trx?.user?.bank })</p>
                    </div>
              </div>
              </TableCell>
              </>
              )}
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="">
                      { trx.method } 
                      </h4>
                    </div>
              </div>
              </TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                    <h4 className="">
                      { currency(trx.amount) } 
                      </h4>
                    </div>
              </div>
              </TableCell>
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                  <h4
                      className={
                        "capitalize pd-7 badge " +
                        (trx.status === 'approved'
                          ? 'bg-success'
                          : trx.status === 'rejected'
                          ? 'bg-error'
                          : 'bg-warning')
                      }
                    >
                      {trx.status}
                    </h4>
                </div>
                </div>
                </TableCell>
                {user?.accountType === "Admin" && (
              <TableCell>
              <div className="d-flex alc f-10 flex-start">
                  <div className="lheight13">
                  {trx.status !== 'rejected' && trx.status !== 'completed' && (
                  <button
              className="btn btn-danger p-25"
              disabled={loadingId === trx.id}
              onClick={() => handleWithdrawalAction('reject', trx.id)}
              >
                {loadingId === trx.id ? 'Loading...' : 'Decline'}
              
            </button>
                  )}
            {trx.status === 'approved' && trx.status !== 'completed' && (
            <button
              className="btn btn-warning p-25"
              disabled={loadingId === trx.id}
              onClick={() => handleWithdrawalAction('complete', trx.id)}
              >
                {loadingId === trx.id ? 'Loading...' : 'Mark Complete'}
              
            </button>
            )}

            {trx.status !== 'approved' && trx.status !== 'completed' && (
                  <button
              className="btn btn-primary p-25"
              disabled={loadingId === trx.id}
              onClick={() => handleWithdrawalAction('approve', trx.id)}
              >
                 {loadingId === trx.id ? 'Loading...' : 'Approve'}
               
            </button>
)}
                </div>
                </div>
                </TableCell>
              )}
            </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>


      <Modal
        open={newWithdrawalModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <div className="flex jusbtw">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Make Withdrawal</h4>
            </Typography>
            <div>
              <p>Available Balance</p>
            <h3 style={{fontSize: 29}}>{currency(user.wallet)}</h3>
            </div>
            </div>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      onChangeHandler(e);
                      validateWallet(value);
                    }}
                    value={inputValues.amount || ""}
                  />
                  {balanceInsufficient && <p className="insufficient">Insufficient Balance</p> }
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
                disabled={balanceInsufficient}
                 onClick={ makeWithdrawal}
                // disabled={loading}
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
