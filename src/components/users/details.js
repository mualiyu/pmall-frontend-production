import profile from "../../assets/imgs/passport.png";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Person2Icon from '@mui/icons-material/Person2';
import moment from "moment";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useVendor } from "../../context/VendorSignupContext";
import PackageName from "../../utils/accountPackages"
import Modal from "@mui/material/Modal";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import nigeriaStateAndLgas from "../nigeriaStateAndLgas.json";
import ButtonLoader from "../../utils/buttonLoader";
import Toaster from "../../utils/toaster";
import currency from "../../utils/formatCurrency";

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

const banks = [
  { id: "1", name: "Access Bank", code: "044" },
  { id: "2", name: "Citibank", code: "023" },
  { id: "3", name: "Diamond Bank", code: "063" },
  { id: "4", name: "Dynamic Standard Bank", code: "" },
  { id: "5", name: "Ecobank Nigeria", code: "050" },
  { id: "6", name: "Fidelity Bank Nigeria", code: "070" },
  { id: "7", name: "First Bank of Nigeria", code: "011" },
  { id: "8", name: "First City Monument Bank", code: "214" },
  { id: "9", name: "Guaranty Trust Bank", code: "058" },
  { id: "10", name: "Heritage Bank Plc", code: "030" },
  { id: "11", name: "Jaiz Bank", code: "301" },
  { id: "12", name: "Keystone Bank Limited", code: "082" },
  { id: "13", name: "Providus Bank Plc", code: "101" },
  { id: "14", name: "Polaris Bank", code: "076" },
  { id: "15", name: "Stanbic IBTC Bank Nigeria Limited", code: "221" },
  { id: "16", name: "Standard Chartered Bank", code: "068" },
  { id: "17", name: "Sterling Bank", code: "232" },
  { id: "18", name: "Suntrust Bank Nigeria Limited", code: "100" },
  { id: "19", name: "Union Bank of Nigeria", code: "032" },
  { id: "20", name: "United Bank for Africa", code: "033" },
  { id: "21", name: "Unity Bank Plc", code: "215" },
  { id: "22", name: "Wema Bank", code: "035" },
  { id: "23", name: "Zenith Bank", code: "057" },
  { id: "24", name: "Opay Microfinance Bank", code: "059" },
  { id: "25", name: "Kuda Microfinance Bank", code: "017" },
  { id: "26", name: "Moniepoint Microfinance Bank", code: "077" },
];

const UserDetails = () => {
  const [value, setValue] = React.useState(4);
  const { user } = useUser();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    inputValues,
    onChangeHandler,
    VendorUpdateProfile,
    newVendorModal,
    setNewVendorModal,
    submittedValues,
    setState,
    profileDetails,
    setProfileDetails,
    handleModalClose,
    loading,
    setLoading,
    toastMsg,
    toastType,
  } = useVendor();

  const [selectedState, setSelectedState] = useState("");
  const [lgas, setLgas] = useState([]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);

    const matchingLgas =
      nigeriaStateAndLgas.find((state) => state.state === newState)?.lgas || [];
    setLgas(matchingLgas);
    console.log(matchingLgas);
    if (!e?.persist) {
      setState(inputValues, {
        ...inputValues,
        [e?.target.name]: e?.target.value,
      });
    } else {
      e?.persist();
      const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
    }
  };

  const getUsersDetails = () => {
    setLoading(true);
    fetch("https://api.pmall.com.ng/api/v1/profile", {
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
        if (profileDetails === undefined) {
          setProfileDetails(result.data.user);
          console.log(profileDetails);
        }
        setProfileDetails(result.data.user);
        setState({
          fname: result.data.user.fname,
          lname: result.data.user.lname,
          email: result.data.user.email,
          phone: result.data.user.phone,
          store_name: result.data.user.store_name,
          store_url: result.data.user.store_url,
          acct_name: result.data.user.acct_name,
          acct_type: result.data.user.acct_type,
          acct_number: result.data.user.acct_number,
          bank: result.data.user.bank,
          state: result.data.user.state,
          lga: result.data.user.lga,
          address: result.data.user.address,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsersDetails();
  }, [submittedValues]);

  return (
    <section className="w-full" style={{ display: "block" }}>
      <Toaster text={toastMsg} className={toastType} />
      <div className="user-details">
        <div className="page__header">
        <div className="flex-container alc">
          <Person2Icon />
          <h3>User Profile</h3> 
        </div>
        </div>

        <div className="flex-container flex-col w-full p-y my-40 g-20">
          <div>
            <button
              className="btn btn-primary p-25 pull-right"
              onClick={() => setNewVendorModal(true)}>
              Edit profile
            </button>
          </div>
         
          <div className="left w-full flex g-20" style={{backgroundColor: '#f1f1f1'}}>
            <div className="">
              <div className="top flex flex-col g-20 items-center">
                <img src={profile} className="profile_pic" />
                <h1 style={{ textTransform: "capitalize" }}>
                  {profileDetails?.fname} {profileDetails?.lname}
                </h1>
                <h4 className="f-300 center" style={{marginTop: '-20px'}}>({profileDetails?.user_type})</h4>
                {/* <div className="flex alc">
                  <Rating name="read-only" value={value} readOnly />
                  <p>0 Rates</p>
                </div> */}
                <div className="flex flex-col g-30 mt-10">
                  {profileDetails?.user_type === "Vendor" && (
                    <div className="g-10">
                      {<h4 className="f-300">{profileDetails?.store_name}</h4>}
                      <p>Store Name</p>
                      
                    </div>
                  )}
                  <div className="flex" style={{justifyContent: 'space-between'}}>
                  <div className="g-10 mr-10">
                  <h4 className="f-300" >{profileDetails?.username || "N/A"}</h4>
                    <p>Username</p>
                    
                  </div>
                  <div className="g-10">
                <h4 className="f-300"> {moment(profileDetails?.created_at).format("ll")}</h4>
                  <p>Member Since</p>
                 
                </div>
                </div>

                  <div className="g-10">
                  <h4 className="f-300">{profileDetails?.email}</h4>
                    <p>Email</p>
                    
                  </div>

                  <div className="g-10">
                  <h4 className="f-300">{profileDetails?.phone}</h4>
                    <p>Phone Number</p>
                   
                  </div>
                  
                </div>
              </div>
            </div>

            {loading && <ButtonLoader />}
            {profileDetails && (



              <div className="details w-full grid grid-3 bl-dashed">
                
                <div className="g-10">
                <h4 className="f-300">{profileDetails?.my_ref_id || "N/A"}</h4>
                  <p>Referral ID</p>
                  
                </div>
                <div className="g-10">
                <h4 className="f-300 title-case">{profileDetails?.acct_type || "N/A"}</h4>
                  <p>Bank Account Type</p>
                </div>
                <div className="g-10">
                <h4 className="f-300">
                <PackageName id={profileDetails?.package_id} type={profileDetails?.user_type}/>
                  </h4>
                  <p>Package Type </p>
                  
                </div>
                {profileDetails.user_type === "Vendor" && (
                  <div className="g-10">
                    <h4 className="f-300">{profileDetails?.store_id || "N/A"}</h4>
                    <p>Store ID</p>
                    
                  </div>
                )}

              

                <div className="g-10">
                <h4 className="f-300">{profileDetails?.acct_name || "N/A"}</h4>
                  <p>Bank Account Name</p>
                  
                </div>
                <div className="g-10">
                <h4 className="f-300">{profileDetails?.acct_number || "N/A"}</h4>
                  <p>Bank Account Number</p>
                  
                </div>
                
                <div className="g-10">
                <h4 className="f-300">{profileDetails?.bank || "N/A"}</h4>
                  <p>Bank</p>
                  
                </div>
                {profileDetails.user_type === "Vendor" && (
                  <>
                    <div className="g-10">
                    <h4 className="f-300">{profileDetails?.state || "N/A"}</h4>
                      <p>State</p>
                      
                    </div>
                    <div className="g-10">
                    <h4 className="f-300">{profileDetails?.lga || "N/A"}</h4>
                      <p>LGA</p>
                      
                    </div>
                  </>
                )}
                {/* <div className="g-10">
                  <p>Role ID</p>
                  <h4>{profileDetails?.role_id || "N/A"}</h4>
                </div> */}
                
                <div className="g-10">
                  <h4 className="f-300">
                    {profileDetails?.status === "1" ? "Active" : "Not Active"}
                  </h4>
                  <p>Account Status</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
     
      {profileDetails && (
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
                      disabled
                      onChange={onChangeHandler}
                      value={inputValues.fname || profileDetails.fname}
                    />
                  </div>
                  <div className="pos-rel w100-m10 ">
                    <label> Lastname</label>
                    <input
                      type="text"
                      className="form-control-input "
                      name="lname"
                      disabled
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
                      disabled
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
                      value={inputValues.phone || profileDetails.phone}
                    />
                  </div>
                </section>
                {profileDetails.user_type === "Vendor" && (
                  <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                      <label> Store Name </label>
                      <input
                        type="text"
                        className="form-control-input title-case"
                        name="store_name"
                        disabled
                        onChange={onChangeHandler}
                        value={
                          inputValues.store_name || profileDetails.store_name
                        }
                      />
                    </div>
                    <div className="pos-rel w100-m10 ">
                      <label> Store URL </label>
                      <input
                        type="text"
                        disabled
                        className="form-control-input "
                        name="store_url"
                        onChange={onChangeHandler}
                        value={
                          profileDetails?.store_url
                            ? profileDetails?.store_url
                            : `https://pmall.com.ng/${profileDetails.store_name}`
                        }
                      />
                    </div>
                  </section>
                )}
                <section className="flex-container mb-lg">
                  <div className="pos-rel w100-m10 ">
                    <label>Bank Account Name </label>
                    <input
                      type="text"
                      className="form-control-input "
                      name="acct_name"
                      placeholder="e.g. Ahmed Peter"
                      onChange={onChangeHandler}
                      value={inputValues.acct_name || profileDetails.acct_name}
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
                      value={
                        inputValues.acct_number || profileDetails.acct_number
                      }
                    />
                  </div>
                  <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Account Type </label>
                    <select
                      className="search__bar w-100"
                      defaultValue={"default"}
                      name="acct_type"
                      onChange={onChangeHandler}
                      value={inputValues.acct_type || profileDetails.acct_type}>
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
                      value={inputValues.bank || profileDetails.bank}>
                      <option value="default"> Select Bank</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {profileDetails.user_type === "Vendor" && (
                    <>
                      <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Store Location</label>
                        <select
                          className="search__bar w-100"
                          defaultValue={"default"}
                          name="state"
                          value={
                            selectedState ||
                            inputValues.state ||
                            profileDetails.state
                          }
                          onChange={handleStateChange}>
                          <option value="default"> Select State</option>
                          {nigeriaStateAndLgas.map((nigeriaStates) => (
                            <option
                              key={nigeriaStates.state}
                              value={nigeriaStates.state}>
                              {nigeriaStates.state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="pos-rel w100-m10 ">
                        <label className="mb-7"> Local Government Area</label>
                        <select
                          className="search__bar w-100"
                          defaultValue={"default"}
                          name="lga"
                          onChange={onChangeHandler}
                          value={inputValues.lga || profileDetails?.lga}
                          disabled={!selectedState}>
                          <option value="default"> Select LGA</option>
                          {lgas.map((lga) => (
                            <option key={lga} value={lga}>
                              {lga}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </section>
                <section className="flex-container mb-lg">
                  <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Address</label>
                    <textarea
                      placeholder="Enter store address"
                      className="form-textarea w-100"
                      onChange={onChangeHandler}
                      name="address"
                      value={
                        inputValues.address || profileDetails.address
                      }></textarea>
                  </div>

                  <div className="pos-rel w100-m10"></div>
                </section>
                <div className="flex__normal w-30 pull-right mt-35">
                  <button
                    onClick={handleModalClose}
                    className="btn btn-secondary p-25 pull-right mr-10">
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary p-25 pull-right"
                    onClick={VendorUpdateProfile}
                    disabled={loading}>
                    {loading ? <ButtonLoader /> : "Save"}
                  </button>
                </div>
              </form>
            </section>
          </Box>
        </Modal>
      )}
    </section>
  );
};

export default UserDetails;
