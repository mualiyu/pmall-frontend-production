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

      const handleLogin= async(e) => {
        e.preventDefault(); // Prevent default form submission
        inputValues.device_name = 1234;
      
        // Validate credentials 
      
        fetch("https://18.119.84.184/api/v1/login",{
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
          window.location.href ="/app/dashboard"
          }
        }).catch((err)=>{
          console.log(err)
        })
        console.log( inputValues)
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
        let accessToken = "5|4AcmYF8KTFHzdxi7PL178zte1uPZ4Gnz61UCr2f89d8b7156"
      try {
        const response = await fetch('http://18.119.84.184/api/v1/profile', {
          method: 'GET',
          headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" ,
            'Authorization': `Bearer ${accessToken}`
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          // Process the data (e.g., display it in a table, use it in your application)
          console.log('Users:', data); // Example logging
        } else {
          const error = await response.text();
          console.error('Error fetching users:', error);
          // Handle errors appropriately (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error('Network error:', error);
        // Handle network errors or other unexpected issues
      }
    }
    };

  return (
    <VendorSignupContext.Provider value={{ inputValues, onChangeHandler, onSubmitHandler,handleLogin,onAffilateSubmitHandler,onForgotPasswordHandler,handleResetPassword, handleVerifyToken,onGetUsers,submittedValues}}>
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