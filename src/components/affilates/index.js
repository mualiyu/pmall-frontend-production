import * as React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import moment from "moment";
import Toast from "../../utils/Toast"
import PackageName from "../../utils/accountPackages"
import { BASE_URL } from "../../utils/config"; 
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
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
  { id: "affilate", label: "Affilate" },
  { id: "username", label: "Username" },
  { id: "accountpackage", label: "Account Package" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Telephone Number" },
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
  affilate,
  username,
  AccountPackage,
  email,
  phone,
  registered,
  status,
) {
  return {
    affilate,
    username,
    AccountPackage,
    email,
    phone,
    registered,
    status,
  };
}

const Affilates = () => {
  const [newAffilateModal, setNewAffilateModal] = useState(false);
  const [allAffiliates, setAllAffiliates] = useState([]);
  const [affiliatePackages, setAffiliatePackages] = useState([]);
  const [selectParent, setSelectParent] = useState("yes");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] =useState(false);
  const [error, setError] = useState("");
  const handleModalClose = () => setNewAffilateModal(false);
  const navigate = useNavigate();
  const { user } = useUser();


  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    ref_id: "",
    package_id: affiliatePackages.length > 0 ? affiliatePackages[0].id : "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/register/affiliate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setToast({ message: "Failed to register Affiliate!", type: "error" });
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
        username: "",
        password: "",
        ref_id: "",
        package_id: "",
      });
			setTimeout(() => setToast(null), 9000);
      fetchAffiliates();
    } catch (error) {
      setLoading(false);
      setToast({ message: "Failed to register Affiliate!", type: "error" });
			setTimeout(() => setToast(null), 7000);
    }
  };

  const fetchAffiliates = () => {
    setLoading(true);
    fetch(`${BASE_URL}/get-all-affiliates`, {
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
    fetchAllPackages()
      setAllAffiliates(result.data.affiliates || [])
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
};

const fetchAllPackages = () => {
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
  setAffiliatePackages(result.data.packages.filter(pkg => pkg.type === "Affiliate"));
          setLoading(false);
      })
      .catch((err) => {
          setLoading(false);
      });
};


useEffect(()=> {
  fetchAffiliates();
},[])


  return (
    <section>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <section className="page__header">
        <div className="flex-container alc">
          <GroupsIcon />
          <h3>Manage Affilates</h3>
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
              {allAffiliates.length}
              <p className="sub__title">Total Affilates</p> &nbsp;
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
            onClick={() => setNewAffilateModal(true)}>
            Add Affilate
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
            {allAffiliates.map((affiliate)=> (
          <TableRow onClick={() => navigate("details")}>
              <TableCell className="b-r" key={affiliate.id}>
                <div className="d-flex alc f-10 flex-start">
                  <div className={`user__avatar ${affiliate.acct_number !== null ? "bg-success" : "bg-error"}`}>
                    <h3 className="uppercase">
                      {affiliate.fname[0]}{affiliate.lname[0]}
                    </h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300 uppercase">{affiliate.fname} {affiliate.lname}</h4>
                    <p className="sub__title">{affiliate.my_ref_id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> { affiliate.username }</TableCell>
              <TableCell>
                <PackageName id={affiliate.package_id} type={affiliate.user_type} />
              </TableCell>
              <TableCell> 
              {affiliate.email}
              </TableCell>
              <TableCell> { affiliate.phone } </TableCell>
              
              <TableCell> {moment(affiliate.created_at).format("ll")} </TableCell>
              <TableCell>
                {" "}
                <span className={`badge ${affiliate.acct_number !== null ? "bg-success" : "bg-error"}`}>
                  {affiliate.acct_number !== null ? "Active" : "Inactive"}
                  </span>{" "}
              </TableCell>
            </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for vendors */}

      <Modal
        open={newAffilateModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Affilate</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
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
                    onChange={onChangeHandler}
                    value={formData.fname}
                    name="fname"
                    placeholder="e.g Ahmed"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Lastname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.lname}
                    name="lname"
                    placeholder="e.g Peter"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Username</label>
                  <input
                    type="text"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.username}
                    name="username"
                    placeholder="hooli"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> contact number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.phone}
                    name="phone"
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> email address</label>
                  <input
                    type="email"
                    onChange={onChangeHandler}
                    value={formData.email}
                    className="form-control-input "
                    name="email"
                    placeholder="email@domain.com"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={onChangeHandler}
                    value={formData.password}
                    className="form-control-input "
                    name="password"
                    placeholder="******"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Select Parent For Affiliate </label>
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
                  <label className="mb-7"> Select affilate</label>
                  <select
                    className="search__bar w-100"
                    value={formData.ref_id}
                    onChange={onChangeHandler}>
                      <option> Select Parent</option>
                      {
                        allAffiliates.map((affiliate)=>(
                          <option value={affiliate.id} className="title-case"> {affiliate.fname} {affiliate.lname} => ({affiliate.my_ref_id})</option>
                        ))
                      }
                    
                  </select>
                </div>
                )}

              {selectParent === "no" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Referral Id</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="ref_id"
                    onChange={onChangeHandler}
                    value={formData.ref_id}
                    placeholder="e.g. PM-000000"
                  />
                </div>
              )}
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Package Type </label>
                  <select
            name="package_id"
            className="search__bar w-100"
            value={formData.package_id}
            onChange={onChangeHandler}>
              {
                affiliatePackages.map((pack)=>(
                  <option value={pack.id} key={pack.id}>{pack.name} - {pack.price} </option>
                ))
              }
          </select>
                </div>
              </section>
             
              {error && <p className="text-danger">{error}</p>}
              <div className="flex__normal pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  disabled={loading}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary p-25 pull-right" disabled={loading}>
                {loading ? "Saving record..." : "Register Affiliate"} 
                </button>
              </div>
            </form>
          </section>
        </Box>
      </Modal>
    </section>
  );
};

export default Affilates;
