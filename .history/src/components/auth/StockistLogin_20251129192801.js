import react from "react";
import { useState } from "react";
import { useVendor } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Toaster from "../../utils/toaster";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonLoader from "../../utils/buttonLoader";

const StockistLogin = () => {
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


  return (
    <section>
      <div className="w-600 d-flex alc">
      <Toaster text={toastMsg} className={toastType} />
        <div className="w-50">
        <div className="w-70 m-auto" >
          <h3>Stockist Login</h3>
          <h4>Welcome to Pmall Dispatch</h4>
          
          <div className="pos-rel">
            <label className="abs py-10" style={{marginTop: '-30px'}}> Username/Email</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={onChangeHandler}
              placeholder="example@email.com"
              value={inputValues.username || ""}
            />
          </div>
          <div className="pos-rel">
            <label className="abs py-10" style={{marginTop: '-30px'}}> Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
              onKeyPress={onEnter}
            />
            <p className="subtitle"> Forgotten password?</p>
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit" onClick={loginHandler}>
            Log In
          </button>

          <div className="footer">
            <p className="copyright"> Pmall &copy; 2025. All rights reserved.</p>
          </div>
        </div>
        </div>

        {/* </div> */}
        <div className="login__bg"></div>
      </div>
    </section>
  );
};

export default StockistLogin;
