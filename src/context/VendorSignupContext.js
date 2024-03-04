import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const VendorSignupContext = createContext();

export const VendorSignupProvider = ({ children }) => {
    //const navigate = useNavigate();
    const [inputValues, setState]  = useState({});
    const [submittedValues, setSubmittedValues]  = useState({});

    const onSubmitHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("http://18.119.84.184/api/v1/register/vendor",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/app/vendors"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      };

      const onAffilateSubmitHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("http://18.119.84.184/api/v1/register/affiliate",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/app/affilates"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
        console.log(inputValues)
      };

     
      const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
      
        inputValues.device_name = 1234;
      
        const response = await fetch("http://18.119.84.184/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json",
          },
          body: JSON.stringify(inputValues),
        });
      
        if (!response.ok) {
          const error = await response.text(); // Extract error message
          console.error("Error:", error);
          alert("Login failed: " + error); // Display error to user
          return;
        }
      
        const data = await response.json(); // Parse JSON response
      
        const token = data.data.token;
        localStorage.setItem("userToken", token);
        console.log("Login successful:", data); 
      
       window.location.href = "/app/dashboard";
      };

      const onForgotPasswordHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("http://18.119.84.184/api/v1/forgot-password",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/auth/app/verify-token"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      };
      const handleResetPassword = async(e) => {
        e.preventDefault(); // Prevent default form submission
        inputValues.email = "mualiyuoox@gmail.com";
      
        // Validate credentials 
      
        fetch("http://18.119.84.184/api/v1/reset-password",{
          method:"POST",
          headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" 
        },
        body:JSON.stringify(inputValues)
        }).then((res)=>{
          alert("successful")
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        console.log( inputValues)
      };

      const handleVerifyToken = async(e) => {
        e.preventDefault(); // Prevent default form submission
        inputValues.email = "mualiyuoox@gmail.com";
      
        // Validate credentials 
      
        fetch("http://18.119.84.184/api/v1/verify-code",{
          method:"POST",
          headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" 
        },
        body:JSON.stringify(inputValues)
        }).then((res)=>{
          alert("successful")
          console.log(res)
          if(res.ok){
            window.location.href ="/auth/app/Set-new-password"
          }
        }).catch((err)=>{
          console.log(err)
        })
        console.log( inputValues)
      };

    const onChangeHandler = e => {
        if(!e?.persist){
            setState(inputValues, ({...inputValues, [e?.target.name]: e?.target.value })); 
        }else {
            e?.persist();
            const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
        }
        
    }

    
    const onGetUsers = async(e) => {
      if (e) {
        e.preventDefault(); 
        const token = localStorage.getItem("userToken");
      try {
        const response = await fetch('http://18.119.84.184/api/v1/get-all-users', {
          method: 'GET',
          headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" ,
            'Authorization': `Bearer ${token}`
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Users:', data); 
        } else {
          const error = await response.text();
          console.error('Error fetching users:', error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    };

    const VendorCreateProduct = async(e) => {
      if (e) {
        e.preventDefault(); 
        const token = localStorage.getItem("userToken");
      try {
        const response = await fetch('http://18.119.84.184/api/v1/products/create', {
          method: 'POST',
          headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" ,
            'Authorization': `Bearer ${token}`
          },
            body:JSON.stringify(inputValues)
        });
    console.log(inputValues)
        if (response.ok) {
          const data = await response.json();
          console.log('product:', data); 
        } else {
          const error = await response.text();
          console.error('Error posting product:', error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    };

    const uploadFile = async(e) => {
      if (e) {
        e.preventDefault(); 
        const token = localStorage.getItem("userToken");
        const formData = {};
          const file = e.target.files;
          if(file?.length){
          formData.file = file[0].name;
          console.log(file[0].name)
          }
      try {
        const response = await fetch('https://test.igeecloset.com/api/v1/products/upload-file', {
          method: 'POST',
          headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" ,
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('image:', data); 
        } else {
          const error = await response.text();
          console.error('Error uploading file:', error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    };

  return (
    <VendorSignupContext.Provider value={{ inputValues, setState, onChangeHandler, onSubmitHandler,handleLogin,onAffilateSubmitHandler,onForgotPasswordHandler,handleResetPassword, handleVerifyToken,onGetUsers,VendorCreateProduct,uploadFile,submittedValues}}>
      {children}
    </VendorSignupContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorSignupContext);

  if (!context) {
    throw new Error('useVendor must be used within a VendorSignupProvider ');
  }

  return context;
};