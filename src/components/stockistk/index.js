import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/config"; 
import Toast from "../../utils/Toast"
// import PackageName from "../../utils/accountPackages"
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { Chart, ArcElement } from "chart.js";
import {CircularProgress} from "@mui/material";
import OrderTable from "../../assets/allOrders/orders";

Chart.register(ArcElement);

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



const data = {
  datasets: [
    {
      data: [83, 20],

      backgroundColor: ["rgba(236, 112, 122, 1)", "rgba(16, 172, 126, 1)"],
    },
  ],
};

var config = {
  cutout: 28,
  responsive: true,
  maintainAspectRatio: true,
  options: {},
};

function createData(
  stockist,
  location,
  email,
  phone,
  plan,
  status,
  registered,
) {
  return {
    stockist,
    location,
    email,
    phone,
    plan,
    status,
    registered,
  };
}

const Stockists = () => {
  const [newstockistModal, setNewstockistModal] = useState(false);
  const [allstockists, setAllstockists] = useState([]);
  // const [stockistPackages, setstockistPackages] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const handleModalClose = () => setNewstockistModal(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [error, setError] = useState("");
 const [allStockists, setAllStockists] = useState([]);
  const [affiliateId, setAffiliateId] = useState('');

useEffect(() => {
  const fetchAffiliateId = async () => {
    try {
 
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Please log in first.");
        return;
      }

      const response = await fetch("https://stage.api.pmall.com.ng/api/v1/affiliate/ref-id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      
      const refId = data.affiliate_id || data.ref_id || data.data?.ref_id;

      setAffiliateId(refId);
      setFormData((prev) => ({ ...prev, my_ref_id: refId }));
      
      console.log("Fetched Affiliate ID:", refId);
    } catch (error) {
      console.error("Error fetching affiliate ID:", error);
    }
  };

  fetchAffiliateId();
   fetchStockists();
}, []);


    const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      store_name: "",
      my_ref_id: "",
      country: "",
      state: "",
      city: ""
    });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log(formData);
        const response = await fetch(`${BASE_URL}/stockists/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.token,
        },
     body: JSON.stringify({
        affiliate_id: formData.my_ref_id,
        name: `${formData.fname} ${formData.lname}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.store_name,
        country: formData.country,
        state: formData.state,
        city: formData.city
      }),
      
      });
      
      if (!response.ok) {
        console.log(error);
        setToast({ message: "Failed to register stockist!", type: "error" });
        setTimeout(() => setToast(null), 7000);
        setLoading(false);
      }
      const result = await response.json();
      console.log(result);
      setToast({ message: `${result.message}`, type: "success" });
      setLoading(false);
      handleModalClose();
      
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        store_name: "",
        my_ref_id: "",
        country: "",
        state: "",
        city: "",
      });
      setTimeout(() => setToast(null), 9000);
      fetchStockists();
    } catch (error) {
      setLoading(false);
      setToast({ message: "Failed to register stockist!", type: "error" });
      setTimeout(() => setToast(null), 7000);
    }
  };

  const fetchStockists = () => {
    setLoading(true);

    let determineWhoIsLoggedIn = 
  user.accountType === "Admin" ? "stockists/fetchstockist" : 
  user.accountType === "Affiliate" ? "stockists/affiliate_stockist"  "";
  
    fetch(`${BASE_URL}/{determineWhoIsLoggedIn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        
        setAllStockists(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stockists:", err);
        setLoading(false);
      });
  };

   const columns = [
    { id: "name", label: "Name" },
    { id: "affiliate_id", label: "Affiliate ID" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "country", label: "Country" },
    { id: "state", label: "State" },
    { id: "city", label: "City" },
    
  ];

  useEffect(() => {
    fetchStockists();
  }, []);
  
  return (
    <section>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc">
          <GroupsIcon />
          <h3>Manage Stockists</h3>
        </div>
      </section>
      <div className="s-divider"></div>
      <section style={{ display: "flex" }}>
        <div className="stat m-10">
          <div className="left__stat py-32">
            <div>
              <Doughnut data={data} options={config} className="w80" />
            </div>
            <h3 className="stat__value ml-10">
              {allstockists?.length}
              <p className="sub__title">Total stockists</p> &nbsp;
            </h3>
          </div>
          <div className="right__stat">
            <div className="right__sub s-divider">
              <h3 className="stat__value c-success">83</h3>
              <p className="sub__title">Active</p>
            </div>
            <div className="right__sub">
              <h3 className="stat__value c-error">20</h3>
              <p className="sub__title">Inactive</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by name or ID"
          />
          <select className="search__bar w-200" defaultValue={"default"}>
            <option value="default"> Select Status</option>
            <option value="Status 1"> Status 1</option>
            <option value="Status 2"> Status 2</option>
            <option value="Status 3"> Status 3</option>
            <option value="Status 4"> Status 4</option>
          </select>
        </div>
        <div className="">
          <button
            className="btn btn-primary p-25"
            onClick={() => setNewstockistModal(true)}>
            Add Stockists
          </button>
          
        </div>
      </section>

       <TableContainer component={Paper}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <CircularProgress />
        </div>
      ) : (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Stockists Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {allStockists.length > 0 ? (
              allStockists.map((stockist) => (
                <TableRow key={stockist.id}>
                  <TableCell>{stockist.name || "N/A"}</TableCell>
                  <TableCell>{stockist.affiliate_id || "N/A"}</TableCell>
                  <TableCell>{stockist.email || "N/A"}</TableCell>
                  <TableCell>{stockist.phone || "N/A"}</TableCell>
                  <TableCell>{stockist.address || "N/A"}</TableCell>
                  <TableCell>{stockist.country || "N/A"}</TableCell>
                  <TableCell>{stockist.state || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No stockists found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>

      {/* Modal for Stockists */}

      <Modal
        open={newstockistModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add stockist</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal" style={{marginTop: 65}}>
            <div className="w-200">
              <div className="">
              </div>
            </div>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Firstname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="fname"
                    onChange={onChangeHandler}
                    value={formData.fname}
                    placeholder="e.g Adamu"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Lastname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="lname"
                    onChange={onChangeHandler}
                    value={formData.lname}
                    placeholder="e.g Norris"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> email address</label>
                  <input
                    type="email"
                    className="form-control-input "
                    name="email"
                    onChange={onChangeHandler}
                    value={formData.email}
                    placeholder="email@domain.com"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> phone number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="phone"
                    onChange={onChangeHandler}
                    value={formData.phone}
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Store Name </label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="store_name"
                    onChange={onChangeHandler}
                    value={formData.store_name}
                    placeholder="e.g Hooli Stores"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                
                <div className="pos-rel w100-m10 ">
                  <label> Store ULR </label>
                  <input
                    type="text"
                    disabled
                    className="form-control-input "
                    name="store_url"
                    placeholder="https://pmall.ng/hooli_stores"
                  />
                </div>
              </section>
         <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                <label> Country</label>
                <input
                  type="text"
                  className="form-control-input "
                  name="country"
                  onChange={onChangeHandler}
                  value={formData.country}
                  placeholder="e.g Nigeria"
                />
              </div>
              <div className="pos-rel w100-m10 ">
                <label> State</label>
                <input
                  type="text"
                  className="form-control-input "
                  name="state"
                  onChange={onChangeHandler}
                  value={formData.state}
                  placeholder="e.g Abuja"
                />
              </div>
                 <div className="pos-rel w100-m10 ">
                <label>City</label>
                <input
                  type="text"
                  className="form-control-input "
                  name="state"
                  onChange={onChangeHandler}
                  value={formData.city}
                  placeholder="e.g Abuja Municipal"
                />
              </div>
            </section>

            <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                <label className="mb-7"> Your Affiliate ID (Auto-filled)</label>
                <input
                  type="text"
                  className="form-control-input "
                  name="my_ref_id"
                  value={formData.my_ref_id}
                  readOnly
                  placeholder="Loading..."
                />
              </div>
            </section>

              {error && <p className="text-danger">{error}</p>}
              <div className="flex__normal pull-right mt-35">
          <button type="button" disabled={loading} className="btn btn-secondary p-25 pull-right mr-10"
          onClick={handleModalClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary p-25 pull-right" disabled={loading}>
          {loading ? "Saving record..." : "Register stockist"} 
          </button>
        </div>
            </form>
          </section>
        </Box>
      </Modal>
      <OrderTable/>
    </section>
  );
};

export default Stockists;