import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Loading from "../../utils/loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Line } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import moment from "moment";
// import { FaBook } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DebitCard from "../../utils/debitCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useUser, useLogOut } from "../../context/UserContext";
import getInitials from "../../utils/getInitials";
import { useVendor } from "../../context/VendorSignupContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const top100Films = [
  { title: "Beauty" },
  { title: "Phones" },
  { title: "Gadgets" },
  { title: "Electronics", year: 2008 },
  { title: "Makeup", year: 1957 },
  { title: "Cough", year: 1993 },
];

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
  { id: "product_name", label: "Product Name" },
  { id: "date", label: "Date" },
  { id: "transaction_id", label: "Transaction Id" },
  { id: "amt", label: "Amount" },
  { id: "sales", label: "Sales" },
];

const options = {
  responsive: true,
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 40,
      ticks: {
        stepSize: 10,
      },
      grid: {
        borderDash: [10],
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "oct",
];

const data = {
  labels,
  datasets: [
    {
      data: [10, 30, 22, 40, 15, 35, 18, 12, 27, 32],
      backgroundColor: "transparent",
      borderColor: "rgb(23, 175, 23)",
      pointBorderColor: "transparent",
      pointBorderWidth: 4,
      tension: 0.5,
    },
  ],
};

function createData(product_name, date, transaction_id, amt, sales) {
  return { product_name, date, transaction_id, amt, sales };
}

const Dashboard = () => {
  const [newVendorModal, setNewVendorModal] = useState(false);
  const [dashboardTab, setDashboardTab] = useState(true);
  const [allDownlines, setAllDownlines] = useState(null);
  const [affilateTab, setAffilateTab] = useState(false);
  const [vendorTab, setVendorTab] = useState(false);
  const [productTab, setProductTab] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const [countAffiliates, setCountAffiliates] = useState(0);
  const [productList, setProductList] = useState(null);
  const [countVendors, setCountVendors] = useState(0);
  const [pmallUser, setPmallUser] = useState([]);
  const { loading, setLoading, setProfileDetails } = useVendor();
  const userBadge = ["#ffe7c7", "#c3d0f3", "#10ac7e3d"];
  const logOut = useLogOut(); 
  

const getVendorProducts = (ref)=> {
  console.log(ref);
  fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        if (result.status) {
          setProductList(result.data);
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
}
  
const getUsersDetails = () => {
  setLoading(true);
  const isPrivilegedUser = ["Admin", "Vendor", "Affiliate"].includes(user?.accountType);
  const endpoint = isPrivilegedUser ? "profile" : "customer/profile";
  fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: "Bearer " + user?.token,
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result.status) {
        const profileData = result?.data?.user || result?.customer;
        setPmallUser(profileData);
        getMyNetwork();

        if (profileData?.user_type === "Vendor") {
          getVendorProducts(profileData?.store_id);
        }
      } else {
        console.warn("Failed to fetch user details:", result.message);
      }
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
    })
    .finally(() => {
      setLoading(false);
    });
};


  const countTotalDownlines = (persons) => {
    let count = 0;
    const countRecursive = (userList) => {
        if (!userList || userList.length === 0) return;
        userList.forEach((user) => {
            count++;
            if (user.all_downline?.length > 0) {
                countRecursive(user.all_downline);
            }
        });
    };
    countRecursive(persons);
    return count;
};

  const getMyNetwork = () => {
    setLoading(true);
    fetch(`${BASE_URL}/profile/hierarchy-all-downline`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
    })
        .then((resp) => resp.json())
        .then((result) => {
    console.log(result.data)
    setCountAffiliates(result?.data?.allDownline.reduce((count, item) => item.user_type === "Affiliate" ? count + 1 : count, 0));
          setCountVendors(result?.data?.allDownline.reduce((count, item) => item.user_type === "Vendor" ? count + 1 : count, 0));
            setAllDownlines(result?.data?.allDownline || []);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
};


  useEffect(() => {
    let isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/");
    }
    getUsersDetails();
  }, []);

  // useEffect(() => {
    
    // getUsers();
  // }, []);
  const dashboard = () => {
    setAffilateTab(false);
    setProductTab(false);
    setVendorTab(false);
    setDashboardTab(true);
  };
  const affilate = () => {
    setAffilateTab(true);
    setProductTab(false);
    setVendorTab(false);
    setDashboardTab(false);
  };
  const vendor = () => {
    setAffilateTab(false);
    setProductTab(false);
    setVendorTab(true);
    setDashboardTab(false);
  };
  const product = () => {
    setAffilateTab(false);
    setProductTab(true);
    setVendorTab(false);
    setDashboardTab(false);
  };

  return (
    <section className="dashboard">
      <Loading loading={loading}/>
      <section className="page__header">
        <div className="flex-container alc justsb w-100">
          <div>
            <ul className="flex-container sub__title">
              {/* {user?.accountType === "Admin" && ( */}
                <div className="user__avatar bg-error">
                <h3>
                {user?.fname?.charAt(0)?.toUpperCase() || ''}
                {user?.lname?.charAt(0)?.toUpperCase() || ''}
                </h3>
              </div>
              <li className="active pointer" onClick={dashboard}>
              Hi {user?.fname} {user?.lname}! <p className="text-muted">Dashboard</p>
              </li>
             
            </ul>
          </div>
          {user?.accountType === "Admin" && (
          <h3 className="pointer" onClick={() => setNewVendorModal(true)}>
            Manage
          </h3>
          )}
           {/* {user?.accountType !== "Admin" && (
          <Link to="/" className="pointer h3 bold" style={{fontSize: 14}}>
            Visit Mall
          </Link>
           )} */}
           <div className="no-large-display pointer" onClick={logOut}>
           <PowerSettingsNewIcon/> Log Out
           </div>
           
           {/* {visible ?
         <div onClick={hideSidebar} className="no-large-display pointer">
          <CloseIcon />
        </div > :  
        <div onClick={showSidebar}  className="no-large-display pointer">
          <MenuIcon />
        </div>} */}
        </div>
      </section>
      {!loading && user?.user_type !== "Admin" && !pmallUser.acct_number && (
      <section>
        <div className="profile__notification">
           Good to see you {user.fname}! Just a few steps left to hitting the ground running. Add your banking details <Link to="/app/users/details" className="f-13"> Smash this link </Link>
            </div>
      </section>
      )}
      {dashboardTab && (
        <div className="flex g-10 justsb mobile-block">
          
          <div className="w-75 mobile-full">
            <section style={{ marginBottom: 30 }}>
              <div
                className="flex g-10 justsb mobile-grid">
              <div className="flex g-10 s-around w-100 dash-mobile-stat">
                <div className="left_top_dashboard">
                  <div className="balance">
                    <span className="">
                      {user.accountType === "Vendor" ? (
                        <div
                        className="user__avatar wd-50"
                        style={{
                          backgroundColor:
                            userBadge[
                              Math.floor(Math.random() * userBadge.length)
                            ],
                          color: "#1a3e9c",
                        }}>
                        <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> PS </h3>
                        </div>
                      ) : (
                        <div
                            className="user__avatar wd-50"
                            style={{
                              backgroundColor:'#ffb31f3d',
                              color: "#ffb31f",
                            }}>
                            <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> TV </h3>
                            </div>
                      )}
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">{countVendors ? countVendors : 0 } </h1>
                      <p className="text-muted">
                        {user.accountType === "Vendor"
                          ? "Products Sold"
                          : "Total Vendors"}
                      </p>
                    </span>
                  </div>
                  <div className="balance">
                    <span className="">
                      {user.accountType === "Vendor" ? (
                        <div
                        className="user__avatar wd-50"
                        style={{
                          backgroundColor:
                            userBadge[
                              Math.floor(Math.random() * userBadge.length)
                            ],
                          color: "#1a3e9c",
                        }}>
                        <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> TP </h3>
                        </div>
                      ) : (
                        <div
                            className="user__avatar wd-50"
                            style={{
                              backgroundColor:'#c3d0f3',
                              color: "#1a3e9c",
                            }}>
                            <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> TA </h3>
                            </div>
                      )}
                    </span>
                    <span className="balance-text">
                    {user.accountType === "Affiliate" && (
                      <h1 className="flex"> {countAffiliates ? countAffiliates : 0 } </h1>
                    )}
                      {user.accountType === "Vendor" && (
                      <h1 className="flex">{productList?.length} </h1>
                      )}
                      <p className="text-muted">
                        {user.accountType === "Vendor"
                          ? "Total Products"
                          : "Total Affiliates"}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="left_top_dashboard">
                  <div className="balance">
                    <span className="">
                      {user.accountType !== "Admin" ? (
                        // <CurrencyBitcoinIcon />
                        // <div className="flex">
                          <div
                            className="user__avatar wd-50"
                            style={{
                              backgroundColor: '#10ac7e3d',
                              color: "#466f48",
                            }}>
                            <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> PW </h3>
                            </div>
                      ) : (
                        <div
                            className="user__avatar wd-50"
                            style={{
                              backgroundColor:
                                userBadge[
                                  Math.floor(Math.random() * userBadge.length)
                                ],
                              color: "#1a3e9c",
                            }}>
                            <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> TS </h3>
                            </div>
                      )}
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">
                      {user.accountType !== "Admin"
                          ? pmallUser?.wallet?.pmt 
                          : "0"}

                        
                      </h1>
                      <p className="text-muted">
                        {" "}
                        {user.accountType !== "Admin"
                          ? "PMT Wallet"
                          : "Total Stores"}
                      </p>
                    </span>
                  </div>
                  <div className="balance">
                    <span className="">
                      {user.accountType !== "Admin" ? (
                        <div
                        className="user__avatar wd-50"
                        style={{
                          backgroundColor:'#fa50053d',
                          color: "#a74d47",
                        }}>
                        <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> PV </h3>
                        </div>
                      ) : (
                        <div
                            className="user__avatar wd-50"
                            style={{
                              backgroundColor:'#c3d0f3',
                              color: "#1a3e9c",
                            }}>
                            <h3 className="bold" style={{ textTransform: "uppercase", fontSize: 13 }}> TA </h3>
                            </div>
                      )}
                    </span>
                    <span className="balance-text">
                    {user.accountType === "Admin"
                          ? <h1 className="flex">0 </h1>
                          : user.accountType === "Vendor"
                          ? <h1 className="flex">0.00 </h1>
                          : <h1 className="flex">{pmallUser?.wallet?.pv} </h1>
                    }
                      <p className="text-muted">
                      {user.accountType === "Admin"
                          ? "Total Affiliates"
                          : user.accountType === "Vendor"
                          ? "Daily Sales" 
                          : "Point Value"
                        }
                      </p>
                    </span>
                  </div>
                </div>
                </div>
                <div className="center_top_dashboard dash-mobile-debit">
                  <DebitCard currentLoggedInUser={pmallUser}/>
                </div>
              </div>
            </section>
            {user?.accountType === "Vendor" && (
            <div
              style={{ width: "100%", maxHeight: "100%" }}
              className="dashboard-chart gap-10 g-20">
              <div className="gap-10 g-20">
                <div className="flex-container">
                  <h3>General Sale Activity</h3>
                  <ul className="g-20">
                    <l1 className="pointer">All Time</l1>
                    <l1 className="pointer active">1Month</l1>
                    <l1 className="pointer"> 14 Days</l1>
                  </ul>
                </div>
                <div className="flex-container">
                  <span className="flex flex-col g-5">
                    <p style={{ color: "#80808091" }}>Sale Generated</p>
                    <h1 style={{ fontSize: 20 }}>&#x20A6;0.00</h1>
                  </span>
                  <button>View Report</button>
                </div>
              </div>
              <Line options={options} data={data} />
            </div>
            )}
            <div className="s-divider"></div>
{user.user_type==="Vendor" && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="Vendors Table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-success">
                          <h3>AP</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300"></h4>
                          <h4 className="f-300">Paypal Payment</h4>
                          <p className="sub__title">Withdraw</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h4 className="f-300">Jan 18,2023</h4>
                      <p className="sub__title">09:30 PM</p>
                    </TableCell>
                    <TableCell> Pay-3083-23 </TableCell>
                    <TableCell> 12,340 </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success"> Delievered</span>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-error">
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Mecury Inc.</h4>
                          <p className="sub__title">Transfered</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h4 className="f-300">Dec 12,2022</h4>
                      <p className="sub__title">08:50 PM</p>
                    </TableCell>
                    <TableCell> Mer-1249-23 </TableCell>
                    <TableCell> 8,6265 </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error"> Undelievered</span>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-success">
                          <h3>AP</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300"></h4>
                          <h4 className="f-300">Paypal Payment</h4>
                          <p className="sub__title">Withdraw</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h4 className="f-300">Jan 18,2023</h4>
                      <p className="sub__title">09:30 PM</p>
                    </TableCell>
                    <TableCell> Pay-3083-23 </TableCell>
                    <TableCell> 12,340 </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success"> Delievered</span>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-error">
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Mecury Inc.</h4>
                          <p className="sub__title">Transfered</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h4 className="f-300">Dec 12,2022</h4>
                      <p className="sub__title">08:50 PM</p>
                    </TableCell>
                    <TableCell> Mer-1249-23 </TableCell>
                    <TableCell> 8,6265 </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error"> Undelievered</span>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-error">
                          <h3>MS</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Paypal Payment</h4>
                          <p className="sub__title">Withdraw</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h4 className="f-300">Jan 18,2023</h4>
                      <p className="sub__title">09:30 PM</p>
                    </TableCell>
                    <TableCell> Pay-3083-23 </TableCell>
                    <TableCell> 12,340 </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success"> Delievered</span>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            )}
          </div>
          <div className="g-20 flex-col mobile-btn-inline" style={{width: "25%"}}>
            <button class="btn btn-warning withdraw__btn">
              {" "}
              {user.accountType === "Vendor"
                ? "Become an affiliate"
                : user.accountType === "Affiliate"
                ? "Become a vendor"
                : "Create a New Vendor"}
            </button>
            <button class="btn btn-primary withdraw__btn">
            Withdraw Money
            </button>

            {/* <div className="total-profit g-5 flex-col">
              <p>Total Profit</p>
              <h1 style={{ fontSize: 20 }}>&#x20A6;0.00</h1>
              <div className="withdraw">
                <div className="card">
                  <p>Pay With</p>
                  <span className="flex">
                    <img src="/icons8-mastercard-48.png" alt="" />
                    <select defaultValue={"default"}>
                      <option value="Parent 1"> Select Card</option>
                      <option value="Parent 2">
                        {" "}
                        Card 8345 **** **** ****
                      </option>
                      <option value="Parent 3">
                        {" "}
                        Card 4369 **** **** ****
                      </option>
                    </select>
                  </span>
                </div>
                <button>Withdraw Money</button>
              </div> */}
            {/* </div> */}

            {!loading && user.accountType !== "Vendor" && (
              <>
                <div className="recent-vendors">
                <div className="flex jusbtw">
                  <h1 style={{ marginBottom: 20, textTransform: "" }}>
                    My Vendors
                  </h1>
                  <Link to="/app/network/genealogy">
                  <p className="text-muted f-11">See Network</p>
                  </Link>
                  </div>
                  {countAffiliates === 0 && (
                    <p>
                      {" "}
                      Oops! No worries. Register a Vendor to start earning
                      endless commissions
                    </p>
                  )}

                  <div className="gap-10">
                    {allDownlines
                      ?.filter((user) => user.user_type === "Vendor")
                      .map((user) => (
                        <div className="flex">
                          <div
                            className="user__avatar"
                            style={{
                              backgroundColor:
                                userBadge[
                                  Math.floor(Math.random() * userBadge.length)
                                ],
                              color: "#1a3e9c",
                            }}>
                            <h3 style={{ textTransform: "uppercase" }}>
                              {getInitials(user?.fname)}
                              {getInitials(user?.lname)}
                            </h3>
                          </div>
                          <div>
                            <h4 className="f-300 capitalze">
                              {user.fname} {user.lname} ({user.store_id})
                            </h4>
                            <p className="sub__title">
                              {moment(user.created_at).format(
                                "DD MMM YYYY [at] hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="recent-affilates">
                <div className="flex jusbtw">
                  <h1 style={{ marginBottom: 20, textTransform: "" }}>
                    My Affiliates
                  </h1>
                  <Link to="/app/network/genealogy">
                  <p className="text-muted f-11">See Network</p>
                  </Link>
                  </div>
                  {countVendors === 0 && (
                    <p>
                      {" "}
                      Oops! No worries. Register an Affiliate to start earning
                      endless commissions
                    </p>
                  )}
                  <div className="gap-10">
                    {allDownlines
                      ?.filter((user) => user.user_type === "Affiliate")
                      .map((user) => (
                        <div className="flex">
                          <div
                            className="user__avatar"
                            style={{
                              backgroundColor:
                                userBadge[
                                  Math.floor(Math.random() * userBadge.length)
                                ],
                              color: "#1a3e9c",
                            }}>
                            <h3 style={{ textTransform: "uppercase" }}>
                              {getInitials(user?.fname)}
                              {getInitials(user?.lname)}
                            </h3>
                          </div>
                          <div>
                            <h4 className="f-300 capitalze">
                              {user.fname} {user.lname} -{user.my_ref_id}
                            </h4>
                            <p className="sub__title">
                              {moment(user.created_at).format(
                                "DD MMM YYYY [at] hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="recent-affilates">
                  <h1 style={{ marginBottom: 20,}}>
                  Top Performing Affiliates
                  </h1>
                  <div className="gap-10">
                  {allDownlines
                      ?.filter(
                        (user) =>
                          user.user_type === "Affiliate" &&
                          Array.isArray(user.all_downline) &&
                          user.all_downline.length > 0
                      )
                      .sort(
                        (a, b) =>
                          countTotalDownlines(b.all_downline) - countTotalDownlines(a.all_downline)
                      )
                      .map((user) => (
                        <div className="flex">
                          <div
                            className="user__avatar"
                            style={{
                              backgroundColor:
                                userBadge[
                                  Math.floor(Math.random() * userBadge.length)
                                ],
                              color: "#1a3e9c",
                            }}>
                            <h3 style={{ textTransform: "uppercase" }}>
                              {getInitials(user?.fname)}
                              {getInitials(user?.lname)}
                            </h3>
                          </div>
                          <div>
                            <h4 className="f-300 capitalze">
                            {user.fname} {user.lname} - ({countTotalDownlines(user.all_downline)} downlines)
                            </h4>
                            <p className="sub__title">
                              {moment(user.created_at).format(
                                "DD MMM YYYY [at] hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* {affilateTab && <div>Affilate</div>}
      {vendorTab && <div>Vendor</div>}
      {productTab && <div>Product</div>} */}
      {/* Modal for vendors */}

      <Modal
        open={newVendorModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Vendor</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder">
                <img src={profile} className="profile_pic" alt="profile" />
                <button className="btn btn-primary p-25 mt-15">
                  Upload Photo
                </button>
              </div>
            </div>
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Product Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="ProductName"
                    placeholder="e.g IPhone 14"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Category</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Category</option>
                    <option value="Parent 1"> Category 1</option>
                    <option value="Parent 2"> Category 2</option>
                    <option value="Parent 3"> Category 3</option>
                    <option value="Parent 4"> Category 4</option>
                  </select>
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Brand</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Brand</option>
                    <option value="Parent 1"> Brand 1</option>
                    <option value="Parent 2"> Brand 2</option>
                    <option value="Parent 3"> Brand 3</option>
                    <option value="Parent 4"> Brand 4</option>
                  </select>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>Selling Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="sellingPrice"
                    placeholder="1,150,000"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Cost Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="costPrice"
                    placeholder="1,100,000"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tags"
                          placeholder="Tags"
                        />
                      )}
                    />
                  </Stack>
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label>More Images</label>
                  <input
                    type="file"
                    className="form-control-input "
                    name="moreImages"
                    accept=".jpg,.png,.jpeg"
                    multiple
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Description </label>
                  <textarea
                    placeholder="Enter product description"
                    className="form-textarea w-100"></textarea>
                </div>

                <div className="pos-rel w100-m10"></div>
              </section>

              <div className="flex__normal w-30 pull-right mt-35">
                <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right">
                  Save
                </button>
              </div>
            </form>
          </section>
        </Box>
      </Modal>

      
    </section>
  );
};

export default Dashboard;
