import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext";
import currency from "../utils/formatCurrency";
import Toast from "../utils/Toast";
import { BASE_URL } from "../utils/config"; 

    useEffect(()=>{ 
        
    },[])

    
    
    return (
        <div className="mt-20p">
            
            <p> Verifying transaction... </p>
        </div>
    );
};

export default VerifyTransaction;
