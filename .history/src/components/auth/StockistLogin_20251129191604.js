import react from "react";
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
      <div className="w-600 d-flex alc">
        <div className="w-50">
        <div className="w-70 m-auto" >
          <h3>Stockist Login</h3>
          <h4>Welcome to Pmall Dispatch</h4>
          
          <div className="pos-rel">
            <label className="abs py-10"> Usernam</label>
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
              onKeyPress={onEnter}
            />
            <p className="subtitle"> Forgotten password?</p>
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit" onClick={loginHandler}>
            Log In
          </button>

          <div className="footer">
            <p className="copyright"> Easy Ticket &copy; 2022. All rights reserved.</p>
          </div>
        </div>
        </div>

        {/* </div> */}
        <div className="login__bg"></div>
      </div>
    </section>
  );
};

export default Login;
