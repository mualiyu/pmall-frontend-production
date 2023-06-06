import { Link } from "react-router-dom";

const SignUp = () => {
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
                        <input type="text" name="store-name" className="form-control"/>
                    </div>
                        <span className="flex">
                            <div className="pos-rel">
                                <label className="abs py-10"> Email*</label>
                                <input type="email" name="email" className="email form-control"/>
                            </div>
                            <div className="pos-rel">
                                <label className="abs py-10"> Phone Number*</label>
                                <input type="text" name="phone-number" className="phone form-control"/>
                            </div>
                        </span>
                        <span className="flex">
                            <div className="pos-rel">
                                <label className="abs py-10"> First Name* </label>
                                <input type="text" name="first-name"  className="first-name form-control"/>
                            </div>
                            <div className="pos-rel">
                                <label className="abs py-10"> Last Name* </label>
                                <input type="text" name="last-name"  className="last-name form-control"/>
                            </div>
                        </span>
                        <span className="t-and-c">
                            <input type="checkbox" name="t-and-c" />
                            <p>I agree to the <Link to="/app/Terms" className="purple">terms</Link> and <Link to="/app/Conditions" className="purple">conditions</Link> of Pmall Nigeria</p>
                        </span>
                        <button className="continue-btn">Continue</button>
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