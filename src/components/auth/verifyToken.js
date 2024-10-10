import { Link, useParams } from "react-router-dom";
import useForm from "../../utils/useForm";
import { useVendor } from "../../context/AuthContext";
import ButtonLoader from "../../utils/buttonLoader";
import Toaster from "../../utils/toaster";

const VerifyToken = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      newPasswordHandler();
    }
  };

  const newPasswordHandler = () => {
    console.log(inputValues);
  };

  //const [inputValues, onChangeHandler, onSubmitHandler] = useForm(newPasswordHandler);
  const { inputValues, onChangeHandler, handleVerifyToken,loading, toastMsg, toastType  } = useVendor();
  const {email} = useParams()
  return (
    <section className="new-password">
      <Toaster text={toastMsg} className={toastType} />
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
            <h1>Enter Token</h1>
            <p>Please input the token sent to your email</p>
            <form action="">
              <span className="flex gap-10">
                <div className="pos-rel flex">
                  <label className="abs py-10">Token </label>
                  <input
                    type="text"
                    className="form-control"
                    name="token"
                    onChange={onChangeHandler}
                    value={inputValues.token || ""}
                  />
                </div>
              </span>
              <span>
                <button
                  className="reset-btn"
                  type="submit"
                  onClick={(e)=>handleVerifyToken(e,email)}
                  disabled={loading}>
                  {loading ? <ButtonLoader /> : "Validate Token"}
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

export default VerifyToken;
