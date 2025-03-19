import { Link } from "react-router-dom";
import { useState } from "react";
import { useVendor } from "../../context/AuthContext";
import Toaster from "../../utils/toaster";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonLoader from "../../utils/buttonLoader";

const Login = () => {
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
    handleLogin,
    loading,
    toastMsg,
    toastType,
  } = useVendor();
  console.log(loading)
  
  return (
    <section>
      <div className="login-screen">
        <div className="left">
          <p className="head">Admin Login</p>
          <div className="center">
            <h3>Welcome back,</h3>
            <p className="bold">Connecting people and services</p>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <Toaster text={toastMsg} className={toastType} />
            <h1>Hello again!</h1>
            <p className="bold">Welcome back, you've been missed!</p>
            <form action="">
              <div className="pos-rel">
                <label className="abs"> Username / Email </label>
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
                onClick={handleLogin}>
                {loading ? <ButtonLoader /> : "Login"}
              </button>
              <p className="center">Don't have an account yet?</p>
              <Link to="/auth/app/Signup">
                <button className="create-account bold">Create account</button>
              </Link>
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

export default Login;