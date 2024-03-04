import React, { createContext, useContext, useState } from "react";
import Toaster from "../utils/toaster";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const VendorSignupProvider = ({ children }) => {
  const [inputValues, setState] = useState({});
  const [submittedValues, setSubmittedValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    if (e) {
      e.preventDefault();
      setLoading(true);
      fetch("https://test.igeecloset.com/api/v1/register/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((res) => {
          alert("successful");
          setLoading(false);
          console.log(res);
          if (res.ok) {
            window.location.href = "/";
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const onAffilateSubmitHandler = async (e) => {
    if (e) {
      e.preventDefault();
      setLoading(true);
      fetch("https://test.igeecloset.com/api/v1/register/affiliate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((res) => {
          alert("successful");
          console.log(res);
          if (res.ok) {
            setLoading(false);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    console.log(inputValues);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://test.igeecloset.com/api/v1/login", {
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
        if (result.status) {
          console.log(result.data);
          localStorage.setItem("authToken", result.data.token);
          setUser({
            username: result.data.user.username,
            email: result.data.user.email,
            token: result.data.token,
            accountType: result.data.user.user_type,
            storeName: result.data.user.store_name,
            storeId: result.data.user.store_id,
            loggedIn: true,
          });
          setTimeout(() => {
            navigate("/app/dashboard");
            // window.location.href = "/app/dashboard";
          }, 2000);

          setLoading(false);
        } else {
          console.log(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
        Toaster("Oops! " + err.message);
        setLoading(false);
      });
    console.log(inputValues);
  };

  const onForgotPasswordHandler = async (e) => {
    if (e) {
      e.preventDefault();
      setLoading(true);
      fetch("https://test.igeecloset.com/api/v1/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((res) => {
          alert("successful");
          console.log(res);
          if (res.ok) {
            setLoading(false);
            window.location.href = "/auth/app/verify-token";
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.email = "mualiyuoox@gmail.com";

    // Validate credentials

    fetch("https://test.igeecloset.com/api/v1/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((res) => {
        alert("successful");
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    console.log(inputValues);
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.email = "mualiyuoox@gmail.com";

    // Validate credentials

    fetch("https://test.igeecloset.com/api/v1/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((res) => {
        alert("successful");
        console.log(res);
        if (res.ok) {
          setLoading(false);
          window.location.href = "/auth/app/Set-new-password";
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    console.log(inputValues);
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

  return (
    <AuthContext.Provider
      value={{
        inputValues,
        onChangeHandler,
        onSubmitHandler,
        handleLogin,
        onAffilateSubmitHandler,
        onForgotPasswordHandler,
        handleResetPassword,
        handleVerifyToken,
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
