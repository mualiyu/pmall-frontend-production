import { Link, useParams } from "react-router-dom";
import useForm from "../../utils/useForm";
import { useVendor } from "../../context/AuthContext";
import ButtonLoader from "../../utils/buttonLoader";
import Toaster from "../../utils/toaster";

const NewPasswordPage = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      newPasswordHandler();
    }
  };

  const newPasswordHandler = () => {
    console.log(inputValues);
  };

  const { inputValues, onChangeHandler, handleResetPassword,loading, toastMsg, toastType  } = useVendor();
  const {email} = useParams()

  return (
    <section className="new-password">
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
            <h1>Set New Password</h1>
            <p>Please choose your new password</p>
            <form action="">
              <span className="flex gap-10">
                <div className="pos-rel flex">
                  <label className="abs py-10">New Password </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={onChangeHandler}
                    value={inputValues.password || ""}
                  />
                </div>
                <div className="pos-rel">
                  <label className="abs py-10">Confirm Password </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    onChange={onChangeHandler}
                    value={inputValues.confirmPassword || ""}
                  />
                </div>
              </span>
              <span>
                <button
                  className="reset-btn"
                  type="submit"
                  onClick={(e)=>handleResetPassword(e,email)}
                  disabled={loading}>
                   {loading ? <ButtonLoader /> : "Save New Password"}
                </button>
              </span>
            </form>
          </div>
          <div className="form-logo">
            <img src="/pmall-logo 1.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPasswordPage;
