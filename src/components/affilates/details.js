import * as React from "react";
import { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { Chart, ArcElement } from "chart.js";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
Chart.register(ArcElement);

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
  { id: "docs", label: "Id" },
  { id: "associated_project", label: "Full Name" },
  { id: "status", label: "Referrals" },
  { id: "date", label: "Contact" },
  { id: "date", label: "Status" },
  { id: "date", label: "Paid Amt" },
  { id: "date", label: "Unpaid Amt" },
  { id: "sent_date", label: "Affilate Since" },
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

function createData(
  ref,
  vendor,
  item,
  product_cost,
  customer_name,
  status,
  payment,
  date,
  action
) {
  return {
    ref,
    vendor,
    item,
    product_cost,
    customer_name,
    status,
    payment,
    date,
    action,
  };
}

const AffilateDetails = () => {
  const [newVendorModal, setNewVendorModal] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  const [value, setValue] = React.useState(0);
  const [affilateLinks, setAfillateLinks] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePopup = (id) => {
    setAfillateLinks(!affilateLinks);
  };

  const linkRef = useRef();

  return (
    <section className="vendor-details">
      <section className="page__header">
        <div className="flex-container alc">
          <h3 style={{ fontSize: "15px" }}>
            <span style={{ color: "#8c8c8cd6", fontSize: "15px" }}>
              Affilates /
            </span>{" "}
            Zain Ahmad
          </h3>
        </div>
        <div className="flex g-20 all-center">
          <span className="calender flex all-center">
            <CalendarMonthOutlinedIcon />
            <select className="search__bar" defaultValue={"default"}>
              <option value="default"> Select Date</option>
              <option value="Parent 1"> Feb 17-Feb 21, 2022</option>
            </select>
          </span>
          <h3 className="capitalize pointer flex all-center black">
            <ListAltOutlinedIcon />
            REFERRED USERS
          </h3>
          <p style={{ color: "#8c8c8cd6" }}>|</p>
          <h3 className="capitalize pointer flex all-center black">
            <CreateOutlinedIcon />
            EDIT ACCOUNTS DETAILS
          </h3>
        </div>
      </section>
      <section>
        <div className="flex main-stats" style={{ gap: "80px" }}>
          <div className="flex-col g-20">
            <h3 className="g-5 f18">Amount Accumulated</h3>
            <div className="flex g-20">
              <div className="flex-col g-5">
                <p
                  className="capitalize stat-p green"
                  style={{ fontSize: "20px" }}>
                  <TripOriginRoundedIcon style={{ fontSize: "15px" }} /> #48.4k
                </p>
              </div>
            </div>
          </div>
          <div className="flex-col g-20">
            <h3 className="f18">Amount Withdrawn</h3>
            <div className="flex g-20">
              <div className="flex-col g-5">
                <p
                  className="capitalize stat-p green"
                  style={{ fontSize: "20px" }}>
                  <TripOriginRoundedIcon style={{ fontSize: "15px" }} /> #14.2k
                </p>
              </div>
            </div>
          </div>
          <div className="flex-col g-20">
            <h3 className="f18">Balance Left</h3>
            <div className="flex g-20">
              <div className="flex-col g-5">
                <p
                  className="capitalize stat-p green"
                  style={{ fontSize: "20px" }}>
                  <TripOriginRoundedIcon style={{ fontSize: "15px" }} /> #34.2k
                </p>
              </div>
            </div>
          </div>
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
              <Tab label="Projects (21)" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <section className="flex-container alc p-y my-20 w-100">
            <div className=" flex all-center justsb g-20">
              <span className="calender flex all-center px-5">
                <SearchOutlinedIcon />
                <input
                  type="text"
                  className="search__bar w-200"
                  placeholder="Search documents"
                />
              </span>

              <span className="flex all-center calender">
                <SwapVertOutlinedIcon />
                <select className="search__bar w-100" defaultValue={"default"}>
                  <option value="default"> Sort by</option>
                  <option value="Status 1"> Status 1</option>
                  <option value="Status 2"> Status 2</option>
                  <option value="Status 3"> Status 3</option>
                  <option value="Status 4"> Status 4</option>
                </select>
              </span>
              <select
                className="search__bar w-200 capitalize"
                defaultValue={"default"}>
                <option value="default">OPTIONS</option>
                <option value="Status 1"> Status 1</option>
                <option value="Status 2"> Status 2</option>
                <option value="Status 3"> Status 3</option>
                <option value="Status 4"> Status 4</option>
              </select>
            </div>
          </section>
          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="Vendors Table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>50</TableCell>
                    <TableCell>Ahmed Peter </TableCell>
                    <TableCell> 6</TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      <div style={{ position: "relative" }}>
                        {" "}
                        <MoreVertIcon id="1" onClick={handlePopup} />{" "}
                        <div
                          className={`flex flex-col g-5 affilate-links ${
                            affilateLinks && "active"
                          }`}>
                          <p className="link">Affilate Profile</p>
                          <p className="link">Transactions</p>
                          <p className="link">Reports</p>
                          <p className="link">Direct Email</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12</TableCell>
                    <TableCell> Ahmed Peter </TableCell>
                    <TableCell> 63 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      <div style={{ position: "relative" }}>
                        {" "}
                        <MoreVertIcon
                          onClick={(id) => setAfillateLinks(!affilateLinks)}
                        />{" "}
                        <div
                          className={`flex flex-col g-5 affilate-links ${
                            affilateLinks && "active"
                          }`}>
                          <p className="link">Affilate Profile</p>
                          <p className="link">Transactions</p>
                          <p className="link">Reports</p>
                          <p className="link">Direct Email</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>15</TableCell>
                    <TableCell>Ahmed Peter</TableCell>
                    <TableCell> 350 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-error">Overdue</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>6</TableCell>
                    <TableCell> Ahmed Peter </TableCell>
                    <TableCell> 120 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>52</TableCell>
                    <TableCell>Ahmed Peter</TableCell>
                    <TableCell> 100 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>33</TableCell>
                    <TableCell> Ahmed Peter </TableCell>
                    <TableCell> 200 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>
                    <TableCell className="b-r">Nov 10, 2000</TableCell>
                    <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>27</TableCell>
                    <TableCell>Ahmed Peter </TableCell>
                    <TableCell> 10 </TableCell>
                    <TableCell>
                      <div className="lheight13">
                        <h4 className="f-300">zain@email.com </h4>
                        <p className="sub__title">08012345678</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                    </TableCell>
                    <TableCell>#9,000</TableCell>
                    <TableCell className="b-r">#0.00</TableCell>

                    <TableCell className="b-r">Nov 10, 2000</TableCell>
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
            Completed
          </TabPanel>
        </Box>
      </div>

      {/* Modal for vendors */}
    </section>
  );
};

export default AffilateDetails;
