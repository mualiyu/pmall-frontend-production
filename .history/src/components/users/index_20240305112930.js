// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { Chart, ArcElement } from "chart.js";
import { useVendor } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
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
  { id: "user", label: "Account Holder" },

  { id: "email", label: "Email" },
  { id: "contact", label: "Phone Number" },
  { id: "store", label: "Assigned Store" },
  { id: "account_type", label: "User Type" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
];

const roles = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "members", label: "Members" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function createData(user, email, contact, store, account_type, status, action) {
  return { user, email, contact, store, account_type, status, action };
}

const Users = () => {
  const [newUserModal, setnewUserModal] = useState(false);
  const handleModalClose = () => setnewUserModal(false);
  const [value, setValue] = useState(0);
  const [pmallUsers, setPmallUsers] = useState([]);
  const { user } = useUser();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(user?.token);
    getUsers();
  }, [user]);

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
        console.log(result);
        setPmallUsers(result.data.users);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getInitials = (name) => {
    if (name) {
      let arr = name?.split("");
      return arr[0];
    }
    return false;
  };

  const { submittedValues } = useVendor();
  return (
    <section>
      <section className="page__header">
        <div className="flex-container alc">
          <AccessibilityNewIcon />
          <h3>Manage Users</h3>
        </div>
        <div className="">
          <button
            className="btn btn-primary p-25"
            onClick={() => setnewUserModal(true)}>
            Add User
          </button>
        </div>
      </section>
      <div className="s-divider"></div>
      <section className="stat m-10">
        <div className="left__stat py-32">
          <div>
            <Doughnut data={data} options={config} className="w80" />
          </div>
          <h3 className="stat__value ml-10">
            209
            <p className="sub__title">Total Users</p> &nbsp;
          </h3>
        </div>
        <div className="right__stat">
          <div className="right__sub s-divider">
            <h3 className="stat__value c-success">21</h3>
            <p className="sub__title">Affiliates</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-error">109</h3>
            <p className="sub__title">Vendors</p>
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
            <option value="default"> Filter by User Type</option>
            <option value="all"> All Users </option>
            <option value="admin"> Administrator</option>
            <option value="affiliate"> Affiliate </option>
            <option value="vendor"> Vendor</option>
          </select>
        </div>
      </section>

      <div className="flex g-0">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Total Products (120)" {...a11yProps(0)} />
              <Tab label="Roles" {...a11yProps(1)} />
              <Tab label="Priviledges" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="Users Table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pmallUsers.map((user, index) => (
                    <TableRow>
                      <TableCell className="b-r">
                        <div className="d-flex alc f-10 flex-start">
                          <div className="user__avatar bg-success">
                            <h3>
                              {getInitials(user?.fname)}
                              {getInitials(user?.lname)}
                            </h3>
                          </div>
                          <div className="lheight13">
                            <h4 className="f-300">
                              {user.fname} {user.lname}
                            </h4>
                            <p className="sub__title">{user.username}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell> {user.email}</TableCell>
                      <TableCell> {user.phone}</TableCell>
                      <TableCell>
                        <div className="lheight13">
                          <h4 className="f-300">
                            {user.store !== null ? user.store : user.user_type}
                          </h4>
                          <p className="sub__title">
                            {user.store_id !== null
                              ? user.store_id
                              : user.my_ref_id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell> {user.user_type} </TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-success">
                          {user.status === 1 ? "Active" : "Inactive"}
                        </span>{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-error">
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Philip Yahaya</h4>
                          <p className="sub__title">donPStores</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell> fakemail@outlook.com</TableCell>

                    <TableCell> 0803 000 0000</TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">Calista Stores</h4>
                        <p className="sub__title">3GTRT</p>
                      </div>
                    </TableCell>
                    <TableCell> Vendor </TableCell>
                    <TableCell> Custom Access </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error">Inactive </span>
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
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Philip Yahaya</h4>
                          <p className="sub__title">yaksMan</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell> fakemail@outlook.com</TableCell>

                    <TableCell> 0803 000 0000</TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">N/A</h4>
                        <p className="sub__title">-</p>
                      </div>
                    </TableCell>
                    <TableCell> Affiliate </TableCell>
                    <TableCell> Time Tracking </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error">Inactive </span>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="b-r">
                      <div className="d-flex alc f-10 flex-start">
                        <div className="user__avatar bg-warning">
                          <h3>DA</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Dennis Abdulmalik</h4>
                          <p className="sub__title">Abdul07</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell> fakemail@outlook.com</TableCell>
                    <TableCell> 0803 000 0000</TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">Abdulmalik Stores</h4>
                        <p className="sub__title">AC810B</p>
                      </div>
                    </TableCell>
                    <TableCell> Vendor </TableCell>
                    <TableCell> Sales Manager </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error">Inactive </span>
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
                          <h4 className="f-300">Dennis Abdulmalik</h4>
                          <p className="sub__title">danDGreat</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell> fakemail@outlook.com</TableCell>
                    <TableCell> 0803 000 0000</TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">PMall Nigeria</h4>
                        <p className="sub__title">882LR</p>
                      </div>
                    </TableCell>
                    <TableCell> Admin </TableCell>
                    <TableCell> Company Admin </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success">Active </span>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <button
                className="btn btn-primary p-25 mt-15"
                style={{ float: "right" }}>
                Add new role
              </button>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="Users Table">
                  <TableHead>
                    <TableRow>
                      {roles.map((column) => (
                        <TableCell>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="b-r">Company Admin</TableCell>

                      <TableCell> Quickbooks Default</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-success">Active</span>{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon />{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="b-r">
                        Custom Access (Ben Thompson)
                      </TableCell>

                      <TableCell> Custom Role</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-success">Active</span>{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon />{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="b-r">Custom Access 1</TableCell>

                      <TableCell> Custom Role</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-error">Inactive</span>{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon />{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="b-r">Inventory Manager</TableCell>
                      <TableCell> Custom Role</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-success">active</span>{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <MoreVertIcon />{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="b-r">Master Admin</TableCell>

                      <TableCell> Quickbooks Default</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {" "}
                        <span className="badge bg-success">Active</span>{" "}
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
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="flex flex-col g-20">
              <div className="mt-10 access-level">
                <h3>Roles</h3>
                <select
                  className="search__bar mt-10 w-400"
                  defaultValue={"default"}>
                  <option value="default"> Limited Access</option>
                  <option value="Store 1"> Store 1</option>
                  <option value="Store 2"> Store 2</option>
                  <option value="Store 3"> Store 3</option>
                  <option value="Store 4"> Store 4</option>
                </select>
              </div>
              <div className="flex justsb">
                <div className="flex g-20 w-480 justsb">
                  <p>Permissions</p>
                  <div className="flex g-20 chalk ">
                    <p>MEMBERS</p>
                    <p>PERMISSIONS</p>
                  </div>
                </div>
                <div className="flex g-20 chalk">
                  <p>MEMBERS</p>
                  <p>PERMISSIONS</p>
                </div>
              </div>
              <div className="flex g-10 flex-wrap">
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>CUSTOMERS</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>SALES</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>VENDORS</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>INVENTORY</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>PAYROLL</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
                <div
                  className="flex justsb w-480 items-center"
                  style={{ border: "1px solid #8c8c8cd6", padding: "5px" }}>
                  <div className="flex items-center g-5">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                    <p>BOOK KEEPING</p>
                  </div>
                  <div className="flex g-20 chalk items-center">
                    <p className="w30">3</p>
                    <button className="btn btn-primary p-25 ">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>

      {/* Modal to add Driver */}
      <Modal
        open={newUserModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add New User</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-200">
              <div className="profile_pic_holder b-round">
                <img src={profile} className="profile_pic b-round" />
                <button className="btn btn-primary p-25 mt-15">
                  Upload Photo
                </button>
              </div>
            </div>
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Firstname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="username"
                    placeholder="e.g Ahmed"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Lastname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="username"
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
                    name="username"
                    placeholder="hooli"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> contact number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="contact"
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> email address</label>
                  <input
                    type="email"
                    className="form-control-input "
                    name="username"
                    placeholder="email@domain.com"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> User Role</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Role</option>
                    <option value="Role 1"> Role 1</option>
                    <option value="Role 2"> Role 2</option>
                    <option value="Role 3"> Role 3</option>
                    <option value="Role 4"> Role 4</option>
                  </select>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Assigned Store</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default"> Select Store</option>
                    <option value="Store 1"> Store 1</option>
                    <option value="Store 2"> Store 2</option>
                    <option value="Store 3"> Store 3</option>
                    <option value="Store 4"> Store 4</option>
                  </select>
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Send user email about account</label>
                  <select
                    className="search__bar w-100"
                    defaultValue={"default"}>
                    <option value="default" selected>
                      {" "}
                      Yes, absolutely!
                    </option>
                    <option value="no"> No, there's no need</option>
                  </select>
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Set Password</label>
                  <input
                    type="password"
                    className="form-control-input "
                    name="password"
                    placeholder="******"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Confirm Password</label>
                  <input
                    type="password"
                    className="form-control-input "
                    name="confirm_password"
                    placeholder="******"
                  />
                </div>
              </section>

              <div className="flex__normal w-30 pull-right mt-w35">
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

export default Users;
