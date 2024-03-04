import react from "react";
import { Link } from "react-router-dom";
import { useVendor } from "../../context/AuthContext";
import useForm from "../../utils/useForm";
import Toaster from "../../utils/toaster";

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

  //const [inputValues, onChangeHandler, onSubmitHandler] = useForm(loginHandler);
  const { inputValues, onChangeHandler, handleLogin } = useVendor();
  return (
    <section>
      <div className="login-screen">
        <div className="left">
          <p className="head">Admin Login</p>
          <div className="center">
            <h3>Welcome back,</h3>
            <p>Connecting people and services</p>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <h1>Hello again!</h1>
            <p>Welcome back, you've been missed!</p>
            <form action="">
              <div className="pos-rel">
                <label className="abs"> Username </label>
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
                <label className="abs"> Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={onChangeHandler}
                  value={inputValues.password || ""}
                />
              </div>

              <Link to="/auth/app/Reset-password" className="forgotten bold">
                <p>Forgotten?</p>
              </Link>
              <span className="remember-me">
                <input type="checkbox" name="remember-me" />
                <p>Remember me</p>
              </span>
              <button className="login-btn" type="submit" onClick={handleLogin}>
                Login
              </button>
              <p>Don't have an account yet?</p>
              <Link to="/auth/app/Signup">
                <button className="create-account">Create account</button>
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
