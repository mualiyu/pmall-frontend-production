import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/config"; 
import Toast from "../../utils/Toast"
import PackageName from "../../utils/accountPackages"
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

const columns = [
  { id: "vendor", label: "Vendor Name" },
  { id: "location", label: "Location" },
  { id: "email", label: "Email Address" },
  { id: "phone", label: "Phone Number" },
  { id: "plan", label: "Package" },
  { id: "registered", label: "Registered" },
  { id: "status", label: "Status" },
];

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
  vendor,
  location,
  email,
  phone,
  plan,
  status,
  registered,
) {
  return {
    vendor,
    location,
    email,
    phone,
    plan,
    status,
    registered,
  };
}

const Stockist = () => {
  const [newStockistModal, setNewStockistModal] = useState(false);
  const [allAffiliates, setAllAffiliates] = useState([]);
  const [selectParent, setSelectParent] = useState("yes");
  const [allStockist, setallStockist] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const handleModalClose = () => setNewStockistModal(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    affiliate_id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state:  "",
      city : ""
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchStockists = () => {
    setLoading(true);
    fetch(`${BASE_URL}/stockists`, {
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
    // fetchAllPackages()
      setAllAffiliates(result.data.affiliates || [])
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/stockists/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
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
        affiliate_id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        state:  "",
        city : ""
      });
			setTimeout(() => setToast(null), 9000);
      // fetchVendors();
      // Make Payment
      // window.location.href = result?.data?.payment.authorization_url;
    } catch (error) {
      setLoading(false);
      setToast({ message: "Failed to register vendor!", type: "error" });
			setTimeout(() => setToast(null), 7000);
    }
  };


useEffect(()=> {
  fetchStockists();
},[])
  return (
    <section>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc">
          <GroupsIcon />
          <h3>Manage Stockist</h3>
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
              {allStockist?.length}
              <p className="sub__title">Total Stockist</p> &nbsp;
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
            onClick={() => setNewStockistModal(true)}>
            Add Stockist
          </button>
        </div>
      </section>

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
            {allStockist?.map((vendor)=>(
            <TableRow onClick={() => navigate("details")} key={vendor.id}>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                <div className={`user__avatar ${vendor.acct_number !== null ? "bg-success" : "bg-error"}`}>
                    <h3 className="uppercase">
                      {vendor.fname[0]}{vendor.lname[0]}</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">{vendor.fname} {vendor.lname}</h4>
                    <p className="sub__title">{vendor.store_name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> {vendor.state ? vendor.state : 'N/A'} [{vendor.lga ? vendor.lga : 'N/A'} ]</TableCell>
              <TableCell> {vendor.email}</TableCell>
              <TableCell> {vendor.phone}</TableCell>
              <TableCell> 
                <PackageName id={vendor.package_id} type={vendor.user_type} />  
              </TableCell>
              <TableCell> {moment(vendor.created_at).format("ll")} </TableCell>
              <TableCell>
                {" "}
                <span className={`badge ${vendor.acct_number !== null ? "bg-success" : "bg-error"}`}>
                  {vendor.acct_number !== null ? "Active" : "Inactive"}
                  </span>{" "}
              </TableCell>
            </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for vendors */}

      <Modal
        open={newStockistModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Stockist</h4>
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
                  <label> Stockist Center Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    onChange={onChangeHandler}
                    value={formData.name}
                    placeholder="KYC Stockist Center"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className=""> Affiliate Id</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="my_ref_id"
                    onChange={onChangeHandler}
                    value={formData.affiliate_id}
                    placeholder="e.g. PM-000000"
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
                  <label> phone Number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="phone"
                    onChange={onChangeHandler}
                    value={formData.phone}
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Stockist Location(Address)</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="address"
                    onChange={onChangeHandler}
                    value={formData.address}
                    placeholder="100 Main Street, ..."
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
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> City</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="city"
                    onChange={onChangeHandler}
                    value={formData.city}
                  />
                </div>
                
              </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Select Affiliate </label>
                  <select
                    className="search__bar w-100"
                    name="selectParent"
                    value={selectParent}
                    onChange={(e) => setSelectParent(e.target.value)}
          >
                    <option value="yes"> Yes</option>
                    <option value="no"> No</option>
                  </select>
                </div>
                {selectParent === "yes" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Choose Affilate</label>
                  <select
                    className="search__bar w-100"
                    value={formData.affiliate_id}
                    name="my_ref_id"
                    onChange={onChangeHandler}>
                      <option> Select Parent</option>
                      {
                        allAffiliates.map((affiliate)=>(
                          <option value={affiliate.my_ref_id} className="title-case"> {affiliate.fname} {affiliate.lname} => ({affiliate.my_ref_id})</option>
                        ))
                      }
                    
                  </select>
                </div>
                )}

              {selectParent === "no" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Affiliate Id</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="my_ref_id"
                    onChange={onChangeHandler}
                    value={formData.affiliate_id}
                    placeholder="e.g. PM-000000"
                  />
                </div>
              )}
              </section>

              {error && <p className="text-danger">{error}</p>}
              <div className="flex__normal pull-right mt-35">
          <button type="button" disabled={loading} className="btn btn-secondary p-25 pull-right mr-10"
          onClick={handleModalClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary p-25 pull-right" disabled={loading}>
          {loading ? "Saving record..." : "Register Stockist"} 
          </button>
        </div>
            </form>
          </section>
        </Box>
      </Modal>
    </section>
  );
};

export default Stockist;
