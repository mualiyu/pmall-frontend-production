import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast"
import { BASE_URL } from "../../utils/config"; 
import usePaginatedFilter from "../../hooks/usePaginatedFilters";
import PaginationControls from "../../utils/PaginationControls";
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


const Messaging = () => {
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] =useState(false);
  const [toast, setToast] = useState(null);
  const handleModalClose = () => setNewMessageModal(false);

  const pagination = usePaginatedFilter({
    data: allMessages,
    searchKey: ["created_at","subject", "body", "email", "recipient_role"],
    statusKey: "status",
    // statusOptions: MESSAGE_STATUSES,
  });

  const {  paginatedData, currentPage, totalPages, pageSize, searchTerm, statusFilter, setCurrentPage, setPageSize, setSearchTerm, setStatusFilter } = pagination;


const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const [inputValues, setInputValues] = useState({
    body: "",
    subject: "",
    recipient_type: "",
    recipient_email: "",
  });


  const fetchAllMessages = () => {
    setLoading(true);
    // let determinWhoseOrder = user?.accountType === "Stockist" ? `stockist/order/${order?.id}` : `vendor/order/${order?.id}`;
    let userType = user?.accountType === "Customer" ? "customer.message/inbox" : "message/inbox"
    fetch(`${BASE_URL}/${userType}`, {
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
    setAllMessages(result?.data || [])
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
};



// Handle form input changes
const onChangeHandler = (e) => {
  setInputValues({ ...inputValues, [e.target.name]: e.target.value });
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent page reload
  setLoading(true);
  setError("");

  const payload = {
      body: inputValues.body,
      subject: inputValues.subject,
      recipient_type: inputValues.recipient_type, 
      recipient_email: inputValues.recipient_email,
      send_email: true,
  };
console.log(payload);
  try {
      const response = await fetch(`${BASE_URL}/message/new`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
          body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setToast({ message: "Message sent successfully!", type: "success" });
			setTimeout(() => setToast(null), 5000);
          handleModalClose(); 
          fetchAllMessages();
      } else {
        setToast({ message: `${result.message}`, type: "error" });
			setTimeout(() => setToast(null), 5000);
      }
  } catch (err) {
    setToast({ message: `${err.message}`, type: "error" });
			setTimeout(() => setToast(null), 5000);
      setError(err.message);
  } finally {
      setLoading(false);
  }
};


useEffect(()=> {
  fetchAllMessages();
},[])


  return (
    <>
    <Loading loading={loading} />
    
    {!loading && (<section>
       
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc">
          <div className="mr-10">
          <EmailIcon />
          </div>
          <div>
          <h3>Messaging/Support/Announcements</h3> 
          <p className="text-muted mt-n-5"> This section allows user to send and receive messages</p>
          </div>
        </div>
      </section>
      <div className="s-divider"></div>
      
      
      <section className="flex-container alc p-y my-40">
        {/* Starts Here */}
        <div className="">
        <PaginationControls {...pagination} />
      </div>
      {/* Ends Here */}
      {user?.accountType === "Admin" && (
        <div className="">
          <button
            className="btn btn-primary p-25"
            onClick={() => setNewMessageModal(true)}>
            Create New Message
          </button>
        </div>
        )}
      </section>
      


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="messages Table">
          <TableHead>
            <TableRow>
              
                <TableCell>Date</TableCell>
                <TableCell>Msg. Subject</TableCell>
                {user.accountType=== "Admin" && (
                  <>
                <TableCell>Message Type</TableCell>
                <TableCell>Email To</TableCell>
                </>
                )}
                <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {paginatedData?.map((msg)=> (
          <TableRow onClick={() => navigate("details")} key={msg.id}>
            <TableCell>
              <div className="d-flex alc  flex-start">
                  <div className="lheight13">
                    <p className="title-case">
                       {moment(msg?.message?.created_at).format("ll")}
                       </p>
                       </div>
                       </div>
               </TableCell>

              <TableCell className="b-r">
                <div className="d-flex alc  flex-start">
                  <div className="lheight13">
                    <p className="title-case">{msg?.message?.subject} </p>
                  </div>
                </div>
              </TableCell>
              {user.accountType=== "Admin" && (
                  <>
              <TableCell>
              <div className="d-flex alc  flex-start">
                  <div className="lheight13">
                    <p className="title-case">
                 { msg?.recipient_role }
                </p>
                </div>
                </div>
                </TableCell>
              <TableCell> 
              <div className="d-flex alc  flex-start">
                  <div className="lheight13">
                    <p className="title-case">
                    { msg?.recipient_role === "single" ? msg?.message?.recipient?.email : `all ${msg?.recipient_role}s` }
                      </p>
                    </div>
              </div>
              </TableCell>
              </>
              )}
              <TableCell> 
              <div className="d-flex alc  flex-start">
                  <div className="lheight13">
                    <p className="title-case">
                      { msg?.message?.body } 
                      </p>
                    </div>
              </div>
              </TableCell>
              
              
            </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for message */}

      <Modal
        open={newMessageModal}
        onClose={handleModalClose}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Create New Message</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Subject of Message</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="subject"
                    placeholder="Subject of message"
                    onChange={onChangeHandler}
                    value={inputValues.subject || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                <label className="mb-7"> Send this Message To</label>
                <select
                            className="search__bar w-100"
                            name="recipient_type"
                            onChange={onChangeHandler}
                            value={inputValues.recipient_type}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="vendors">To all  Vendors</option>
                            <option value="affiliates"> To all Affiliates</option>
                            <option value="customer">To all Customers</option>
                            <option value="single">To a Single User</option>
                        </select>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Recipient Email </label>
                  <input
                    type="email"
                    className="form-control-input "
                    name="recipient_email"
                    onChange={onChangeHandler}
                    value={inputValues.recipient_email || ""}
                    placeholder="e.g email@example.com"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100 ">
                  <label className="mb-7">  Message </label>
                  <textarea
                    placeholder="Provide description for package"
                    className="form-textarea w-100i"
                    name="body"
                    onChange={onChangeHandler}
                    value={inputValues.body || ""}
                    ></textarea>
                </div>
              </section>
              {error && <p className="text-danger">{error}</p>}
              

              <div className="flex__normal pull-right mt-35">
              <button
                        type="button"
                        onClick={handleModalClose}
                        className="btn btn-secondary p-25 pull-right mr-10"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary p-25 pull-right" disabled={loading}>
                        {loading ? "Sending Message..." : "Send Message"}
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

export default Messaging;
