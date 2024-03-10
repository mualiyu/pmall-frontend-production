import profile from "../../assets/imgs/passport.png";
import Rating from '@mui/material/Rating';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useVendor } from "../../context/VendorSignupContext";
import Modal from "@mui/material/Modal";
import { useUser } from "../../context/UserContext";
import { useParams } from 'react-router-dom';

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
  

const UserDetails = () => {
    const [value, setValue] = React.useState(4);
    const { user, setUser } = useUser();
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const {inputValues,onChangeHandler,VendorUpdateProfile,newVendorModal,setNewVendorModal,submittedValues,setState,profileDetails,setProfileDetails, handleModalClose} = useVendor();

      const getUsersDetails = () => {
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
            if(profileDetails == undefined){
                setProfileDetails(result.data.user);
            }
            setState({
                fname:result.data.user.fname,
                lname:result.data.user.lname,
                email:result.data.user.email,
                phone:result.data.user.phone,
                store_name:result.data.user.store_name,
                store_url:result.data.user.store_url,
                acct_name:result.data.user.acct_name,
                acct_type:result.data.user.acct_type,
                acct_number:result.data.user.acct_number,
                bank:result.data.user.bank,
                state:result.data.user.state,
                lga:result.data.user.lga,
                address:result.data.user.address
            })
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        getUsersDetails();
      }, [submittedValues]);
    return ( 
        <section className="page__header w-full" style={{display:"block"}}>
            <div className="user-details">
                <div className="page__header">
                    <h1>User Details</h1>
                </div>
            
                <div className="flex-container flex-col w-full p-y my-40 g-20">
                    <div>
                    <button className="btn btn-primary p-25 pull-right"
                    onClick={() => setNewVendorModal(true)} 
                    >
                    Edit profile
                    </button>
                    </div>
                    <div className="left w-full flex g-20 items-center">
                        <div className="br">
                            <div className="top flex flex-col g-20 items-center">
                                <img src={profile} className="profile_pic b-round"/>
                                <h1>John Doe</h1>
                                <div className="flex alc">
                                    <Rating name="read-only" value={value} readOnly />
                                    <p>214 Rates</p>
                                </div>
                            </div>
                        </div>
                        {profileDetails &&
                            <div className="details w-full grid grid-3 g-40">
                                <div className="flex g-10">
                                    <p>Store Name</p>
                                    { <h4>{profileDetails?.store_name}</h4>}
                                </div>
                                <div className="flex g-10">
                                    <p>Email</p>
                                    <h4>{profileDetails?.email}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Last interaction</p>
                                    <h4>40 mins ago</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Phone Number</p>
                                    <h4>{profileDetails?.phone}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Signup</p>
                                    <h4>1st jun, 2023</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>First Name</p>
                                    <h4>{profileDetails?.fname}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Last Name</p>
                                    <h4>{profileDetails?.lname || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Username</p>
                                    <h4>{profileDetails?.username}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>User Type</p>
                                    <h4>{profileDetails?.user_type}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Description</p>
                                    <h4>{profileDetails?.description || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Ref Id</p>
                                    <h4>{profileDetails?.ref_id || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Store id</p>
                                    <h4>{profileDetails?.store_id || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Bank Account Name</p>
                                    <h4>{profileDetails?.acct_name || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Account Number</p>
                                    <h4>{profileDetails?.acct_number || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Account Type</p>
                                    <h4>{profileDetails?.acct_type || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Bank</p>
                                    <h4>{profileDetails?.bank || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>State</p>
                                    <h4>{profileDetails?.state || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>LGA</p>
                                    <h4>{profileDetails?.lga || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Role id</p>
                                    <h4>{profileDetails?.role_id || "null"}</h4>
                                </div>
                                <div className="flex g-10">
                                    <p>Package Id</p>
                                    <h4>{profileDetails?.package_id || "null"}</h4>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="w-full right">
                    <div className="flex g-0">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab label="Affiliate" {...a11yProps(0)} />
              <Tab label="Vendor" {...a11yProps(1)} />
              <Tab label="Stockiest" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <h1>test</h1>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <button
                className="btn btn-primary p-25 mt-15"
                style={{ float: "right" }}>
                Add new role
              </button>
             <h2>test2</h2>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
           <h3>test3</h3>
          </TabPanel>
        </Box>
      </div>
                    </div>
                </div>
            </div>
            {profileDetails &&
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
                            name="fname"
                            placeholder="e.g Adamu"
                            onChange={onChangeHandler}
                            value={inputValues.fname|| profileDetails.fname}
                        />
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label> Lastname</label>
                        <input
                            type="text"
                            className="form-control-input "
                            name="lname"
                            placeholder="e.g Norris"
                            onChange={onChangeHandler}
                            value={inputValues.lname || profileDetails.lname}
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
                            placeholder="email@domain.com"
                            onChange={onChangeHandler}
                            value={inputValues.email || profileDetails.email}
                        />
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label> phone number</label>
                        <input
                            type="number"
                            className="form-control-input "
                            name="phone"
                            placeholder="e.g. 0803 000 0000"
                            onChange={onChangeHandler}
                            value={inputValues.phone ||  profileDetails.phone}
                        />
                        </div>
                    </section>

                    <section className="flex-container mb-lg">
                        <div className="pos-rel w100-m10 ">
                        <label> Store Name </label>
                        <input
                            type="text"
                            className="form-control-input "
                            name="store_name"
                            placeholder="e.g Hooli Stores"
                            onChange={onChangeHandler}
                            value={inputValues.store_name ||  profileDetails.store_name}
                        />
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label> Store ULR </label>
                        <input
                            type="text"
                            disabled
                            className="form-control-input "
                            name="store_url"
                            placeholder="https://pmall.ng/hooli_stores"
                            onChange={onChangeHandler}
                            value={inputValues.store_url ||  profileDetails.store_url}
                        />
                        </div>
                    </section>
                    <section className="flex-container mb-lg">
                        <div className="pos-rel w100-m10 ">
                        <label>Bank Account Name </label>
                        <input
                            type="text"
                            className="form-control-input "
                            name="acct_name"
                            placeholder="e.g. Ahmed Peter"
                            onChange={onChangeHandler}
                            value={inputValues.acct_name ||  profileDetails.acct_name}
                        />
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label> Account Number </label>
                        <input
                            type="number"
                            className="form-control-input "
                            name="acct_number"
                            placeholder="e.g. 0458060996"
                            onChange={onChangeHandler}
                            value={inputValues.acct_number ||  profileDetails.acct_number}
                        />
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Account Type </label>
                        <select
                            className="search__bar w-100"
                            defaultValue={"default"}
                            name="acct_type"
                            onChange={onChangeHandler}
                            value={inputValues.acct_type ||  profileDetails.acct_type}
                            >
                            <option value="default"> Select Account Type</option>
                            <option value="personal"> Personal </option>
                            <option value="business"> Business</option>
                        </select>
                        </div>
                    </section>

                    <section className="flex-container mb-lg">
                        <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Select Bank</label>
                        <select
                            className="search__bar w-100"
                            defaultValue={"default"}
                            name="bank"
                            onChange={onChangeHandler}
                            value={inputValues.bank||  profileDetails.bank}
                            >
                            <option value="default"> Select Bank</option>
                            <option value="Bank 1"> Bank 1</option>
                            <option value="Bank 2"> Bank 2</option>
                            <option value="Bank 3"> Bank 3</option>
                            <option value="Bank 4"> Bank 4</option>
                        </select>
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Store Location</label>
                        <select
                            className="search__bar w-100"
                            defaultValue={"default"}
                            name="state"
                            onChange={onChangeHandler}
                            value={inputValues.state ||  profileDetails.state}
                            >
                            <option value="default"> Select State</option>
                            <option value="State 1"> State 1</option>
                            <option value="State 2"> State 2</option>
                            <option value="State 3"> State 3</option>
                            <option value="State 4"> State 4</option>
                        </select>
                        </div>
                        <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Local Government Area</label>
                        <select
                            className="search__bar w-100"
                            defaultValue={"default"}
                            name="lga"
                            onChange={onChangeHandler}
                            value={inputValues.lga ||  profileDetails.lga}
                            >
                            <option value="default"> Select LGA</option>
                            <option value="LGA 1"> LGA 1</option>
                            <option value="LGA 2"> LGA 2</option>
                            <option value="LGA 3"> LGA 3</option>
                            <option value="LGA 4"> LGA 4</option>
                        </select>
                        </div>
                    </section>
                    <section className="flex-container mb-lg">
                        <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Address</label>
                        <textarea
                            placeholder="Enter store address"
                            className="form-textarea w-100"
                            onChange={onChangeHandler}
                            name="address"
                            value={inputValues.address ||  profileDetails.address}
                            ></textarea>
                        </div>

                        <div className="pos-rel w100-m10"></div>
                    </section>
                    <div className="flex__normal w-30 pull-right mt-35">
                        <button
                        onClick={handleModalClose}
                        className="btn btn-secondary p-25 pull-right mr-10">
                        Cancel
                        </button>
                        <button className="btn btn-primary p-25 pull-right" onClick={VendorUpdateProfile }>
                        Save
                        </button>
                    </div>
                    </form>
                </section>
                </Box>
            </Modal>
            } 
        </section>
     );
}
 
export default UserDetails;