import React, { createContext, useContext, useEffect, useState } from "react";
import Toaster from "../utils/toaster";
import { useUser } from "./UserContext";

const AuthContext = createContext();

export const VendorSignupProvider = ({ children }) => {
  const [inputValues, setState] = useState({});
  const [submittedValues, setSubmittedValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("");
  const [packages, setPackages] = useState({});
  const [customer, setCustomer] = useState(null); // Store user data

  const { setUser } = useUser();

  // Vendor Registration
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;
    fetch("https://api.pmall.com.ng/api/v1/register/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Awesome! Registration was successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = "/auth/sign-in";
          }, 2000);

          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setLoading(false);
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // Start Affiliate Registration
  const onAffilateSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/register/affiliate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Awesome! Registration was successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = "/auth/sign-in";
          }, 2000);

          setLoading(false);
        } else {
          console.log(result.message);
          setToastMsg(result.message);
          setToastType("error");
          setLoading(false);
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // User Login function

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          console.log(result.data);
          localStorage.setItem("authToken", result.data.token);
          setUser({
            id: result.data.user.id,
            username: result.data.user.username,
            email: result.data.user.email,
            token: result.data.token,
            accountType: result.data.user.user_type,
            storeName: result.data.user.store_name,
            storeId: result.data.user.store_id,
            loggedIn: true,
            fname: result.data.user.fname,
            lname: result.data.user.lname,
            userAvatar: result.data.user.photo,
            regDate: result.data.user.created_at,
            refId: result.data.user.my_ref_id,
          });
          setToastMsg("Boom! Login successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
          setTimeout(() => {
            window.location.href = "/app/dashboard";
          }, 2000);

          setLoading(false);
        } else {
          console.log(result.message);
          setToastMsg(
            "Oops! there seems to be an error. Confirm login credientials"
          );
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const customerLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          localStorage.setItem("authToken", result?.token);
          // dispatch(
          setUser({
            id: result.customer.id,
            username: result.customer.username,
            email: result.customer.email,
            token: result.token,
            accountType: result.customer.user_type,
            loggedIn: true,
            fname: result.customer.fname,
            lname: result.customer.lname,
            regDate: result.customer.created_at,
            refId: result.customer.my_ref_id,
          });
          // );
          setToastMsg("Boom! Login successful");
          setToastType("success");
          setLoading(false);
          window.location.reload();
        } else {
          console.log(result.message);
          setToastMsg(
            "Oops! there seems to be an error. Confirm login credientials"
          );
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Start Forgot Password
  const onForgotPasswordHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;
    fetch("https://api.pmall.com.ng/api/v1/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Request Sent Successful!");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
          setTimeout(() => {
            window.location.href = `/auth/app/verify/ ${inputValues.email}`;
          }, 2000);
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // Reset New Password Function
  const handleResetPassword = async (e, email) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.email = email
    fetch("https://api.pmall.com.ng/api/v1/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Looks good! New Password has been set... ");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = "/";
          }, 5000);
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // Verify token function

  const handleVerifyToken = async (e, email) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.email = email
    fetch("https://api.pmall.com.ng/api/v1/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("That was right...");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = "/auth/app/reset";
          }, 5000);
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  const onChangeHandler = (e) => {
    if (!e?.persist) {
      setState(inputValues, {
        ...inputValues,
        [e?.target.name]: e?.target.value,
      });
    } else {
      e?.persist();
      const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
    }
  };

  const getPackages = async (e) => {
    setLoading(true);

    fetch("https://api.pmall.com.ng/api/v1/account-packages/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.status) {
          console.log(result);
          setPackages(result.data);
        } else {
          console.log(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        inputValues,
        onChangeHandler,
        onSubmitHandler,
        handleLogin,
        customerLogin,
        onAffilateSubmitHandler,
        onForgotPasswordHandler,
        handleResetPassword,
        handleVerifyToken,
        toastMsg,
        toastType,
        submittedValues,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useVendor must be used within a VendorSignupProvider ");
  }

  return context;
};