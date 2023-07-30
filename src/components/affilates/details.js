import * as React from "react";
import { useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from '@mui/icons-material/Groups';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import {Chart, ArcElement} from 'chart.js'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
Chart.register(ArcElement);

const top100Films = [
  { title: 'Beauty',},
  { title: 'Phones'},
  { title: 'Gadgets'},
  { title: 'Electronics', year: 2008 },
  { title: 'Makeup', year: 1957 },
  { title: "Cough", year: 1993 },
  { title: ' Summer', year: 1994 },
  { title: 'Clothing', year: 2001 },
  { title: 'Ceramics', year: 1971 },
  { title: 'Footwear', year: 2007 },
  { title: 'Foodstuff', year: 1976 },
  { title: 'Toys', year: 1962 },
  { title: 'Children', year: 1944 },
];


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '70%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "sent_date", label: "REGISTERED DATE" },
  { id: "docs", label: "REFERRAL ID" },
  { id: "associated_project", label: "USERNAME" },
  { id: "value", label: "USER ACCT" },
  { id: "balance_due", label: "TEL" },
  { id: "status", label: "STATUS" },
  { id: "date", label: "EMAIL" },
];

const data = {
    datasets: [
      {
        data: [83, 20],
       
        backgroundColor: [
          'rgba(236, 112, 122, 1)',
          'rgba(16, 172, 126, 1)'
        ]
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
        {...other}
      >
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  



function createData(ref, vendor,item, product_cost,customer_name, status,payment, date, action) {
  return {ref, vendor,item, product_cost,customer_name, status,payment, date, action };
}

const AffilateDetails = () => {
  const [newVendorModal, setNewVendorModal] = useState(false);
  const handleModalClose = () => setNewVendorModal(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="vendor-details">
      <section className="page__header">
        <div className="flex-container alc">
            <h3 style={{fontSize: "15px"}}><span style={{color: "#8c8c8cd6",fontSize: "15px"}}>Affilates /</span> Zain Ahmad</h3>
        </div>
        <div className="flex g-20 all-center">
          <span className="calender flex all-center">
            <CalendarMonthOutlinedIcon />
              <select className="search__bar" defaultValue={'default'}>
                  <option value="default"> Select Date</option>
                  <option value="Parent 1"> Feb 17-Feb 21, 2022</option>
              </select>
          </span>
            <h3 className="capitalize pointer flex all-center black"><ListAltOutlinedIcon />REFERRED USERS</h3>
            <p  style={{color: "#8c8c8cd6"}}>|</p>
            <h3 className="capitalize pointer flex all-center black">< CreateOutlinedIcon />EDIT ACCOUNTS DETAILS</h3>
        </div>
      </section>
      <section>
          <div className="flex main-stats" style={{gap:"80px"}}>
            <div className="flex-col g-20">
                <h3 className="g-5">Amount Accumulated</h3>
                <div className="flex g-20">
                    <div className="flex-col g-5">
                        <h3>#22.47k</h3>
                        <p className="capitalize stat-p green"><TripOriginRoundedIcon/> Delievered (2) </p>
                    </div>
                    <div className="flex-col g-5">
                        <h3>#5.47k</h3>
                        <p className="capitalize stat-p yellow"><TripOriginRoundedIcon/> PENDING (4)</p>
                    </div>
                </div>
            </div>
            <div  className="flex-col g-20">
                <h3>Amount Withdrawn</h3>
                <div className="flex g-20">
                    <div className="flex-col g-5">
                        <h3>#34.2k</h3>
                        <p className="capitalize stat-p green"><TripOriginRoundedIcon/>  Delievered (1)</p>
                    </div>
                    <div className="flex-col g-5">
                        <h3>#10.8k</h3>
                        <p className="capitalize stat-p yellow"> <TripOriginRoundedIcon/> PENDING (1)</p>
                    </div>
                </div>
            </div>
            <div  className="flex-col g-20">
                <h3>Balance Left</h3>
                <div className="flex g-20">
                    <div className="flex-col g-5">
                        <p className="capitalize stat-p green" style={{fontSize:"20px"}}><TripOriginRoundedIcon style={{fontSize:"15px"}}/> #34.2k</p>
                    </div>
                </div>
            </div>
          </div>
      </section>
      <div className="flex g-0">
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
              <select className="search__bar w-100" defaultValue={'default'}>
                <option value="default"> Sort by</option>
                <option value="Status 1"> Status 1</option>
                <option value="Status 2"> Status 2</option>
                <option value="Status 3"> Status 3</option>
                <option value="Status 4"> Status 4</option>
              </select>
            </span>
            <select className="search__bar w-200 capitalize" defaultValue={'default'}>
              <option value="default" >OPTIONS</option>
              <option value="Status 1"> Status 1</option>
              <option value="Status 2"> Status 2</option>
              <option value="Status 3"> Status 3</option>
              <option value="Status 4"> Status 4</option>
            </select>
          </div>
        </section>
        <TabPanel value={value} index={0}>
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
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 2000</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell>Halal Lab </TableCell>
                  <TableCell> #200 </TableCell>
                  <TableCell> 08012345678</TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                  </TableCell>
                  <TableCell>zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 2000</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell> Halal Lab </TableCell>
                  <TableCell> #1000 </TableCell>
                  <TableCell>08012345678</TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                  </TableCell>
                  <TableCell> zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>

                  <TableRow>
                  <TableCell className="b-r">Nov 10, 2000</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell>Halal Lab</TableCell>
                  <TableCell> #350 </TableCell>
                  <TableCell> 08012345678 </TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-error">Overdue</span>{" "}
                  </TableCell>
                  <TableCell> zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 2000</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell> Halal Lab </TableCell>
                  <TableCell> #200 </TableCell>
                  <TableCell>08012345678 </TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                  </TableCell>
                  <TableCell>zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 2000</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell>Halal Lab</TableCell>
                  <TableCell> #1000 </TableCell>
                  <TableCell> 08012345678 </TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                  </TableCell>
                  <TableCell> zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 200</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell> Halal Lab </TableCell>
                  <TableCell> #200 </TableCell>
                  <TableCell> 08012345678</TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-success">Accepted</span>{" "}
                  </TableCell>
                  <TableCell>zain@email.com </TableCell>
                  <TableCell>
                      {" "}
                      <MoreVertIcon />{" "}
                  </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell className="b-r">Nov 10, 200</TableCell>
                  <TableCell>
                      <div className="lheight13">
                          <h4 className="f-300">Estimate</h4>
                          <p className="sub__title">#001006</p>
                      </div>
                  </TableCell>
                  <TableCell>Halal Lab </TableCell>
                  <TableCell> #1000 </TableCell>
                  <TableCell> 08012345678 </TableCell>
                  <TableCell>
                      {" "}
                      <span className="badge bg-warning">pending</span>{" "}
                  </TableCell>
                  <TableCell>zain@email.com </TableCell>
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
        <section>
          <div className="right-sidebar">
            <div className="flex g-10" style={{alignItems:"center",marginBottom:"20px"}}>
              <img src={profile} alt="" className="profile_pic b-round"/>
              <div>
                <h3>Zain Ahmad</h3>
                <p  className="chalk">Halal Lab</p>
              </div>
            </div>
            <div className="gap-10">
              <h3 className="capitalize chalk">CUSTOMER INFO</h3>
              <div className="gap-10" style={{marginBottom:"10px"}}>
                <div className="flex g-10">
                  <EmailOutlinedIcon/>
                  <span className="gap-10">
                    <p><span className="chalk">Work :</span> zain@email.com</p>
                    <p><span className="chalk">Personal :</span> zain@halallab.co</p>
                  </span>
                </div>
                <div className="flex g-10">
                  <LocalPhoneOutlinedIcon />
                  <span className="gap-10">
                    <p><span className="chalk">Work :</span> (480) 555-0103</p>
                    <p><span className="chalk">Personal :</span> (316) 555-0116</p>
                  </span>
                </div>
                <div className="flex g-10">
                  <PlaceOutlinedIcon />
                  <span className="gap-10">
                    <p>4517 Washinton Ave, Manchester, Kentucky 39495</p>
                    <p>2118 Thornridge Cir, Syracuse, Connecticut 35624</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="py-20 bdtop">
              <h3 className="capitalize chalk">LEAD SOURCE</h3>
              <p>Facebook Ad</p>
            </div>
            <div className="py-20 bdtop">
              <h3 className="capitalize chalk">CREATED</h3>
              <p><span className="chalk">by</span> Nijum Chy <span className="chalk">on</span> 03/14/2021</p>
            </div>
            <div className="pdy-10 bdtop gap-10">
              <h3 className="capitalize chalk">SALES REPRESENTATIVE</h3>
              <div className="flex">
                <img src={profile} alt="" className="profile_pic b-round"/>
                <select className="search__bar" defaultValue={'default'} style={{border:"none"}}>
                  <option value="default"> Select Date</option>
                  <option value="Parent 1"> Feb 17-Feb 21, 2022</option>
                </select>
              </div>
            </div>
            <div className="bdtop py-20">
              <h3 className="capitalize chalk">NOTES</h3>
              <p>Faruk ahmad is an awesome people,Lorem ipsum dolor sit amet consectetur, adipisicing elitd?</p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for vendors */}

    </section>
  );
};

export default AffilateDetails;
