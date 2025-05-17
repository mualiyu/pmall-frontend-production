import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { useUser } from "../../context/UserContext";
import useForm from "../../utils/useForm";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VendorForm = ({ inputValues, onChangeHandler }) => {
  
const [vendorPackages, setVendorPackages] = useState([]);
const [loading, setLoading] = useState(false);
const { user } = useUser();
const query = useQuery();
const refLink = query.get('refLink');




  const fetchAllPackages = () => {
    setLoading(true);
    fetch(`${BASE_URL}/account-packages/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
    })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(result);
    setVendorPackages(result.data.packages.filter(pkg => pkg.type === "Vendor"));
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
};

useEffect(()=>{
  fetchAllPackages()
},[])

  return (
    <div>
      <div className="pos-rel flex">
        <label className="abs"> Store Name *</label>
        <input
          type="text"
          name="store_name"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.store_name || ""}
          placeholder="CALISTUS HERBALS"
        />
      </div>
      <span className="flex">
        <div className="pos-rel email">
          <label className="abs"> Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.email || ""}
            placeholder="youremail@gmail.com"
          />
        </div>
        <div className="pos-rel phone">
          <label className="abs"> Phone Number *</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.phone || ""}
            placeholder="080123456789"
            autoComplete="false"
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs"> First Name * </label>
          <input
            type="text"
            name="fname"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.fname || ""}
            placeholder="Ahmed"
          />
        </div>
        <div className="pos-rel">
          <label className="abs"> Last Name * </label>
          <input
            type="text"
            name="lname"
            className="last-name form-control"
            onChange={onChangeHandler}
            value={inputValues.lname || ""}
            placeholder="Roy"
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs">Referral id * </label>
          <input
            type="text"
            name="ref_id"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.ref_id || ""}
            placeholder="PM-123456789"
          />
        </div>
        <div className="pos-rel">
          <label className="abs"> Select Package* </label>
          <select
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}>
              <option>Select a Package</option>
              {
                vendorPackages.map((pack)=>(
                  <option value={pack.id} key={pack.id}>{pack.name} - {pack.price} </option>
                ))
              }
          </select>
        </div>
      </span>
    </div>
  );
};

export default VendorForm;
