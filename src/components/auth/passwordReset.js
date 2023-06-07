import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

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

  const [inputValues, onChangeHandler, onSubmitHandler] = useForm(resetHandler);

  return (
    <section>
        <div className="reset-password">
            <div className="left">
                <p className="head">Admin Login</p>
                <div className="center">
                    <h3>Welcome back,</h3>
                    <p>Connecting people and services</p>
                </div>
            </div>
            <div className="right">
                <div className="container">
                    <h1>Password Reset</h1>
                    <p>No worries! We will send you reset instructions to your registered email address</p>
                    <form action="">
                        <div className="pos-rel">
                            <label className="abs py-10">Username/Email </label>
                            <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={onChangeHandler}
                            placeholder="talk2ahmedpeter@gmail.com"
                            value={inputValues.username || ""}
                            />
                        </div>
                        <span>
                            <button className="reset-btn"  type="submit" onClick={resetHandler}>Reset Password</button>
                            <p>Suddenly remember it?</p>
                            <Link to="/auth/app/Login"><button className="back-to-login">Back to Login</button></Link>
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

export default ResetPassword ;
