import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

const SignUp = () => {

    const onEnter = (e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
            signUpHandler();
        }
      };
    
      const signUpHandler = () => {
        console.log(inputValues);
      };
    
    const [inputValues, onChangeHandler, onSubmitHandler] = useForm(signUpHandler);

    return ( 
        <div className="signup-screen">
            <div className="left">
                <p className="head">Admin Login</p>
                <p className="copyright-footer">Copyright  2023 - All rights reserved</p>
            </div>
            <div className="right">
                <div className="main">
                    <h1>Create new account</h1>
                    <p className="right-head">Connecting people and services</p>
                    <div className="vendor-affilate-container">
                        <div className="vendor-affilate">
                            <p className="pointer">Vendor</p>
                            <p className="pointer">Affilate</p>
                        </div>
                        <span className="line"></span>
                    </div>
                    <form action="">
                    <div className="pos-rel">
                        <label className="abs py-10"> Store Name*</label>
                        <input
                         type="text" 
                         name="storeName" 
                         className="form-control" 
                         onChange={onChangeHandler}
                         value={inputValues.storeName || ""}
                    />
                    </div>
                        <span className="flex">
                            <div className="pos-rel">
                                <label className="abs py-10"> Email*</label>
                                <input
                                 type="email" 
                                 name="email" 
                                 className="email form-control" 
                                 onChange={onChangeHandler}
                                 value={inputValues.email || ""}
                                />
                            </div>
                            <div className="pos-rel">
                                <label className="abs py-10"> Phone Number*</label>
                                <input
                                 type="text" 
                                 name="phoneNumber" 
                                 className="phone form-control"
                                 onChange={onChangeHandler}
                                 value={inputValues.phoneNumber || ""}
                                />
                            </div>
                        </span>
                        <span className="flex">
                            <div className="pos-rel">
                                <label className="abs py-10"> First Name* </label>
                                <input
                                 type="text" 
                                 name="firstName" 
                                 className="first-name form-control"
                                 onChange={onChangeHandler}
                                 value={inputValues.firstName || ""}
                                />
                            </div>
                            <div className="pos-rel">
                                <label className="abs py-10"> Last Name* </label>
                                <input
                                 type="text" 
                                 name="lastName" 
                                 className="last-name form-control"
                                 onChange={onChangeHandler}
                                 value={inputValues.lastName || ""}
                                />
                            </div>
                        </span>
                        <span className="t-and-c">
                            <input
                             type="checkbox" 
                             name="t-and-c" 
                            />
                            <p>I agree to the <Link to="/app/Terms" className="purple">terms</Link> and <Link to="/app/Conditions" className="purple">conditions</Link> of Pmall Nigeria</p>
                        </span>
                        <button
                         className="continue-btn" 
                         onClick={signUpHandler}
                        >
                            Continue
                        </button>
                        <p className="have-an-account">Already have an account?</p>
                        <Link to="/app/Login"><button className="back-to-login">Back to Login</button></Link>
                    </form>
                </div>
                <div className="form-logo">
                    <img src="/pmall-logo 1.png" alt="" />
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;