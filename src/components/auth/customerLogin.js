import { Link } from "react-router-dom";
import { useState } from "react";
import { useVendor } from "../../context/AuthContext";
import Toaster from "../../utils/toaster";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonLoader from "../../utils/buttonLoader";

const CustomerLogin = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = () => {
    console.log(inputValues);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    inputValues,
    onChangeHandler,
    customerLogin,
    loading,
    toastMsg,
    toastType,
  } = useVendor();
  console.log(loading)
  
  return (
    <section>
      <div className="login-screen">
        <div className="right">
          <div className="container">
            <Toaster text={toastMsg} className={toastType} />
            
            <h1>Hello again!</h1>
            <p className="bold">Welcome back, you've been missed!</p>
            <form action="">
              <div className="pos-rel">
                <label className="abs"> Username OR Email </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={onChangeHandler}
                  placeholder="username or email"
                  value={inputValues.username || ""}
                />
              </div>

              <div className="pos-rel">
                <label className="abs"> Your Password</label>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="pos-rel">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    onChange={onChangeHandler}
                    value={inputValues.password || ""}
                    placeholder="********"
                  />
                  <span onClick={togglePassword} className="cnwjien">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                </div>
              </div>

              <Link to="/auth/app/reset-account" className="forgotten bold">
                <p className="bold">Forgotten?</p>
              </Link>
              <span className="remember-me">
                <input type="checkbox" name="remember-me" />
                <p>Remember me</p>
              </span>
              <button
                className="login-btn bold"
                disabled={loading}
                type="submit"
                onClick={customerLogin}>
                {loading ? <ButtonLoader /> : "Login"}
              </button>
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

export default CustomerLogin;


