const LoginScreen = () => {
    return ( 
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
                        <input type="text" name="username" placeholder="Username" className="input"/>
                        <input type="password" name="password" placeholder="Password" className="input" />
                        <p className="forgotten">forgotten?</p>
                        <span className="remember-me">
                            <input type="checkbox" name="remember-me" />
                            <p>Remember me</p>
                        </span>
                        <button className="login-btn">Login</button>
                        <p>Don't have an account yet?</p>
                        <button className="create-account">Create account</button>
                    </form>
                </div>
                <div className="form-logo">
                    <img src="/pmall-logo 1.png" alt="" />
                </div>
            </div>
        </div>
     );
}
 
export default LoginScreen;