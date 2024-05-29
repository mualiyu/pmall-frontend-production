import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
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
import { useUser } from "../../context/UserContext";
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
  { title: " Summer", year: 1994 },
  { title: "Clothing", year: 2001 },
  { title: "Ceramics", year: 1971 },
  { title: "Footwear", year: 2007 },
  { title: "Foodstuff", year: 1976 },
  { title: "Toys", year: 1962 },
  { title: "Children", year: 1944 },
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
  const [affilateTab, setAffilateTab] = useState(false);
  const [vendorTab, setVendorTab] = useState(false);
  const [productTab, setProductTab] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const [pmallUsers, setPmallUsers] = useState([]);
  const { loading, setLoading } = useVendor;
  console.log(user);
  const getUsers = () => {
    fetch("https://test.igeecloset.com/api/v1/get-all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + user?.token,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result.data.users);
        setPmallUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsersDetails = () => {
    //setLoading(true)
    fetch("https://test.igeecloset.com/api/v1/profile", {
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
        if (result.status) {
          setPmallUsers(result.data.user.referrals);
        }
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/");
    }
    getUsers();
  }, []);
  console.log(user);
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
      <section className="page__header">
        <div className="flex-container alc justsb w-100">
          <div>
            <ul className="flex-container g-20 sub__title">
              {/* {user?.accountType === "Admin" && ( */}
              <li className="active pointer" onClick={dashboard}>
                Dashboard
              </li>
              {/* )} */}
              {(user?.accountType === "Affiliate" ||
                user?.accountType === "Admin") && (
                <li className="pointer" onClick={affilate}>
                  Affilate Dashboard
                </li>
              )}
              {(user?.accountType === "Vendor" ||
                user?.accountType === "Admin") && (
                <li className="pointer" onClick={vendor}>
                  Vendor Dashboard
                </li>
              )}
              {(user?.accountType === "Vendor" ||
                user?.accountType === "Admin") && (
                <li className="pointer" onClick={product}>
                  Product
                </li>
              )}
            </ul>
          </div>
          <h3 className="pointer" onClick={() => setNewVendorModal(true)}>
            Manage
          </h3>
        </div>
      </section>
      {dashboardTab && (
        <div className="flex g-10 justsb">
          <div style={{ width: "75%" }}>
            <section style={{ marginBottom: 30 }}>
              <div
                className="flex g-10"
                style={{ justifyContent: "space-between" }}>
                <div className="left_top_dashboard">
                  <div className="balance">
                    <span className="balance-icon-container">
                      <CurrencyExchangeOutlinedIcon />
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">&#x20A6;000.00 </h1>
                      <h4 className="color-grey">Sales Wallet</h4>
                    </span>
                  </div>
                  <div className="balance">
                    <span className="balance-icon-container">
                      <AccountBalanceOutlinedIcon />
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">123 </h1>
                      <h4 className="color-grey">Total Products</h4>
                    </span>
                  </div>
                </div>
                <div className="left_top_dashboard">
                  <div className="balance">
                    <span className="balance-icon-container">
                      <AccountBalanceOutlinedIcon />
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">456 </h1>
                      <h4 className="color-grey">Total Affiliate</h4>
                    </span>
                  </div>
                  <div className="balance">
                    <span className="balance-icon-container">
                      <AccountBalanceOutlinedIcon />
                    </span>
                    <span className="balance-text">
                      <h1 className="flex">&#x20A6;000.00 </h1>
                      <h4 className="color-grey">
                        {user.accountType !== "Admin"
                          ? "Total Profit"
                          : "Total Stores"}
                      </h4>
                    </span>
                  </div>
                </div>
                <div className="center_top_dashboard">
                  <DebitCard />
                </div>
              </div>
            </section>
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
            <div className="s-divider"></div>

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
          </div>
          <div className="g-20 flex-col">
            <button class="btn btn-warning">
              {" "}
              {user.accountType === "Vendor"
                ? "Become an affiliate"
                : "Become a vendor"}{" "}
            </button>

            <div className="total-profit g-5 flex-col">
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
              </div>
            </div>

            {user.accountType !== "Vendor" && (
              <>
                <div className="recent-vendors">
                  <h1 style={{ marginBottom: 20, textTransform: "uppercase" }}>
                    Recently registerd vendors
                  </h1>
                  <p> Oops! You haven't registered any vendor</p>
                  <div className="gap-10">
                    {pmallUsers
                      ?.filter((user) => user.user_type === "Vendor")
                      .map((user) => (
                        <div className="flex">
                          <div className="user__avatar bg-success">
                            <h3 style={{ textTransform: "uppercase" }}>
                              {getInitials(user?.fname)}
                              {getInitials(user?.lname)}
                            </h3>
                          </div>
                          <div>
                            <h4 className="f-300 capitalze">
                              {user.fname} {user.lname} ({user.store_name})
                            </h4>
                            <p className="sub__title">
                              {moment(user.created_at).format(
                                "MMM DD [at] hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="recent-affilates">
                  <h1 style={{ marginBottom: 20, textTransform: "uppercase" }}>
                    Recently registerd affiliates
                  </h1>
                  <div className="gap-10">
                    {pmallUsers
                      ?.filter((user) => user.user_type === "Affiliate")
                      .map((user) => (
                        <div className="flex">
                          <div className="user__avatar bg-success">
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
                                "MMM DD [at] hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="recent-affilates">
                  <h1 style={{ marginBottom: 20, textTransform: "uppercase" }}>
                    HIGHEST PAYOUT AFFILIATES
                  </h1>
                  <div className="gap-10">
                    <div className="flex">
                      <div className="user__avatar bg-success">
                        <h3>AP</h3>
                      </div>
                      <div>
                        <h4 className="f-300">Ahmed Peter (84 Downlines)</h4>
                        <p className="sub__title">&#x20A6; 812,935</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="user__avatar bg-error">
                        <h3>PY</h3>
                      </div>
                      <div>
                        <h4 className="f-300">Philip Yahaya (200 Downlines)</h4>
                        <p className="sub__title">&#x20A6; 812,935</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="user__avatar bg-success">
                        <h3>DA</h3>
                      </div>
                      <div>
                        <h4 className="f-300">
                          Dennis Abdulmalik (78 Downlines)
                        </h4>
                        <p className="sub__title">&#x20A6; 812,935</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="user__avatar bg-warning">
                        <h3>OD</h3>
                      </div>
                      <div>
                        <h4 className="f-300">Ogun Dunamis (66 Downlines)</h4>
                        <p className="sub__title">&#x20A6; 812,935</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {affilateTab && <div>Affilate</div>}
      {vendorTab && <div>Vendor</div>}
      {productTab && <div>Product</div>}
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
