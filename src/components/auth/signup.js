import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";
import AffilateForm from "./affilateForm";
import VendorForm from "./vendorForm";
import { useState } from "react";
import { useVendor } from "../../context/AuthContext";
import Toaster from "../../utils/toaster";
import ButtonLoader from "../../utils/buttonLoader";

const SignUp = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      signUpHandler();
    }
  };

  const signUpHandler = () => {
    console.log(inputValues);
  };

  const {
    inputValues,
    onChangeHandler,
    onSubmitHandler,
    onAffilateSubmitHandler,
    toastMsg,
    toastType,
    loading,
    submittedValues,
  } = useVendor();
  const [vendorForm, setVendorForm] = useState(true);
  console.log(loading)
  return (
    <div className="signup-screen">
      <div
        className={`${!vendorForm ? "affiliate__banner" : "vendor__banner"}`}>
        {/* <p className="head">Admin Login</p>
        <p className="copyright-footer">Copyright 2023 - All rights reserved</p> */}
      </div>
      <div className={`right ${!vendorForm && "pb-0"}`}>
        <Toaster text={toastMsg} className={toastType} />
        <div className="main">
          <h1>{vendorForm ? "Become a Vendor" : "Become an Affiliate"}</h1>
          <p className="right-head bold">Connecting people and services</p>
          <div className="vendor-affilate-container">
            <div className="vendor-affilate">
              <p
                className="pointer"
                onClick={() => {
                  setVendorForm(true);
                }}>
                Vendor
              </p>
              <p
                className="pointer"
                onClick={() => {
                  setVendorForm(false);
                }}>
                Affilate
              </p>
            </div>
            <span className={`line  ${!vendorForm && "affilate"}`}></span>
          </div>
          <form
            action=""
            className={!vendorForm && "affilate"}
            onSubmit={onSubmitHandler}>
            {vendorForm ? (
              <VendorForm
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
              />
            ) : (
              <AffilateForm
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onChangeHandler}
              />
            )}
            <span className="t-and-c">
              <input type="checkbox" name="t-and-c" />
              <p className="bold">
                I agree to the{" "}
                <Link to="/app/Terms" className="purple bold">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/app/Conditions" className="purple bold">
                  Conditions
                </Link>{" "}
                of Pmall Nigeria
              </p>
            </span>
            {vendorForm ? (
              <button
                className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                onClick={signUpHandler}
                disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Continue"}
              </button>
            ) : (
              <button
                className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                onClick={onAffilateSubmitHandler}
               disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Continue"}
              </button>
            )}
            <p className="have-an-account bold">
              Already have an account? &nbsp;
              <Link to="/">
                <span className="bold"> Login </span>
              </Link>
            </p>
          </form>
        </div>
        <div className="form-logo">
          <img src="/pmall-logo 1.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
