import { Link } from "react-router-dom";
import { useVendor } from "../../context/AuthContext";
import useForm from "../../utils/useForm";
import ButtonLoader from "../../utils/buttonLoader";
import Toaster from "../../utils/toaster";



const ResetPassword = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      resetHandler();
    }
  };

  const resetHandler = () => {
    console.log(inputValues);
  };

  const { inputValues, onChangeHandler, onForgotPasswordHandler,loading, toastMsg, toastType  } = useVendor();

  return (
    <section>
      <Toaster text={toastMsg} className={toastType} />
      <div className="reset-password">
        {/* <div className="left">
          <p className="head">Admin Login</p>
          <div className="center">
            <h3>Welcome back,</h3>
            <p>Connecting people and services</p>
          </div>
        </div> */}
        <div className="right">
          <div className="container">
            <h1>Password Reset</h1>
            <p>
              No worries! We will send you reset instructions to your registered
              email address
            </p>
            <form action="">
              <div className="pos-rel">
                <label className="abs py-10">Username/Email </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={onChangeHandler}
                  placeholder="Enter your Email or Username"
                  value={inputValues.email || ""}
                />
              </div>
              <span>
                <button
                  className="reset-btn"
                  type="submit"
                  onClick={onForgotPasswordHandler}
                  disabled={loading}>
                  {loading ? <ButtonLoader /> : "Reset Password"}
                </button>
                <p className="center bold">Suddenly remember it?</p>
                <Link to="/">
                  <button className="back-to-login bold">
                    Back to Login
                  </button>
                </Link>
              </span>
            </form>
            <div className="form-logo">
            <img src="/pmall-logo 1.png" alt="" />
          </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
