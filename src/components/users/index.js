// import * as React from "react";
import * as React from "react";
import { useState} from "react";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);


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
  { id: "user", label: "Account Holder" },
 
  { id: "email", label: "Email" },
  { id: "contact", label: "Phone Number" },
  { id: "store", label: "Assigned Store" },
  { id: "account_type", label: "User Type" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
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



function createData(user, email, contact, store, account_type, status, action) {
  return { user, email, contact, store, account_type, status, action };
}

const Users = () => {
  
    const [newUserModal, setnewUserModal] = useState(false);
    const handleModalClose = () => setnewUserModal(false);

  return (
    <section>
      <section className="page__header">
        <div className="flex-container alc">
          <AccessibilityNewIcon />
          <h3>Manage Users</h3>
        </div>
        <div className="">
          <button className="btn btn-primary p-25" onClick={() => setnewUserModal(true)}>Add User</button>
        </div>
      </section>
      <div className="s-divider"></div>
      <section className="stat m-10">
      <div className="left__stat py-32">
          <div>
              <Doughnut data={data} options={config} className="w80" />
          </div>
          <h3 className="stat__value ml-10">209
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
          <select className="search__bar w-200" defaultValue={'default'}>
            <option value="default"> Filter by User Type</option>
            <option value="all"> All Users </option>
            <option value="admin"> Administrator</option>
            <option value="affiliate"> Affiliate </option>
            <option value="vendor"> Vendor</option>
          </select>
        </div>
       
      </section>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Users Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
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
                  <h4 className="f-300">Ahmed Peter</h4>
                  <p className="sub__title">governor</p>
                  </div>
                </div>
              </TableCell>
              
              <TableCell> talk2ahmedpeter@gmail.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                <div className="lheight13">
                      <h4 className="f-300">PMall Nigeria</h4>
                      <p className="sub__title">882LR</p>
                    </div>
              </TableCell>
              <TableCell> Admin </TableCell>
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

{/* Modal to add Driver */}
      <Modal
          open={newUserModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="mb-35">
              <Typography id="modal-modal-title">
                <h4 className="summary__title t-xl title-case">
                  Add New User
                </h4>
              </Typography>
              <div className="s-divider"></div>
            </div>
<section className="flex__normal">
<div className="w-200">
    <div className="profile_pic_holder b-round">
            <img src={profile} className="profile_pic b-round"/>
            <button className="btn btn-primary p-25 mt-15">Upload Photo</button>
        
    </div>
    </div>
            <form style={{width: '100%'}} >
              
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
                    <label className="mb-7">  User Role</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Role</option>
                            <option value="Role 1"> Role 1</option>
                            <option value="Role 2"> Role 2</option>
                            <option value="Role 3"> Role 3</option>
                            <option value="Role 4"> Role 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Assigned Store</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Store</option>
                            <option value="Store 1"> Store 1</option>
                            <option value="Store 2"> Store 2</option>
                            <option value="Store 3"> Store 3</option>
                            <option value="Store 4"> Store 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Send user email about account</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default" selected> Yes, absolutely!</option>
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

<div className="flex__normal w-30 pull-right mt-35">
              <button onClick={handleModalClose} className="btn btn-secondary p-25 pull-right mr-10">
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
