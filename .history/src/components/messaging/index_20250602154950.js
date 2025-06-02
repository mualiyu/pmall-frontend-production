import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import Loading from "../../utils/loading";
import currency from "../../utils/formatCurrency";
import Toast from "../../utils/Toast"
import { BASE_URL } from "../../utils/config"; 
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
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

const Messaging = () => {
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] =useState(false);
  const [toast, setToast] = useState(null);
  const handleModalClose = () => setNewMessageModal(false);

const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const [inputValues, setInputValues] = useState({
    to: "",
    type: "",
    subject: "",
    description: "",
  });


  const fetchAllMessages = () => {
    setLoading(true);
    fetch(`${BASE_URL}/account-packages/all`, {
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
    setAllPackages(result.data.packages || [])
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
      message: inputValues.name,
      title: inputValues.title,
      type: inputValues.title, // Convert to integer
      to: inputValues.to,
      description: inputValues.description,
  };
console.log(payload);
  try {
      const response = await fetch(`${BASE_URL}/`, {
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
      

      <section className="flex-container alc mb-10" style={{float: 'right'}}>
        <div className="" >
          <button
            className="btn btn-primary p-25"
            onClick={() => setNewMessageModal(true)}>
            Create New Message
          </button>
        </div>
      </section>

      {/* <TableContainer component={Paper}>
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
      </TableContainer> */}

      {/* Modal for vendors */}

      <Modal
        open={newMessageModal}
        onClose={handleModalClose}
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
                  <label> Package Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    placeholder="Gold"
                    onChange={onChangeHandler}
                    value={inputValues.name || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                <label className="mb-7"> Select Package Type</label>
                <select
                            className="search__bar w-100"
                            name="type"
                            onChange={onChangeHandler}
                            value={inputValues.type}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Affiliate">Affiliate</option>
                        </select>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Package Price </label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="price"
                    onChange={onChangeHandler}
                    value={inputValues.price || ""}
                    placeholder="20000"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100 ">
                  <label className="mb-7"> Package Description </label>
                  <textarea
                    placeholder="Provide description for package"
                    className="form-textarea w-100i"
                    name="description"
                    onChange={onChangeHandler}
                    value={inputValues.description || ""}
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
                        {loading ? "Saving package..." : "Save Record"}
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
