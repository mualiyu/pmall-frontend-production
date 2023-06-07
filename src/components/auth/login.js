import react from "react";
import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

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

  const [inputValues, onChangeHandler, onSubmitHandler] = useForm(loginHandler);

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
            <label className="abs py-10"> Username </label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={onChangeHandler}
              placeholder="talk2ahmedpeter@gmail.com"
              value={inputValues.username || ""}
            />
          </div>

          <div className="pos-rel">
            <label className="abs py-10"> Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
            />
          </div>

            <Link to="/auth/app/Reset-password" className="forgotten"><p>forgotten?</p></Link>
            <span className="remember-me">
                <input type="checkbox" name="remember-me" />
                <p>Remember me</p>
            </span>
            <button className="login-btn"  type="submit" onClick={loginHandler}>Login</button>
            <p>Don't have an account yet?</p>
            <Link to="/auth/app/Signup"><button className="create-account">Create account</button></Link>
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
