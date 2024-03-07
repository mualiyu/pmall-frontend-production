import { Link } from "react-router-dom";
import { useState } from "react";
import useForm from "../../utils/useForm";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AffilateForm = ({ inputValues, onChangeHandler }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <span className="affilate-form">
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10"> First Name * </label>
          <input
            type="text"
            name="fname"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.fname || ""}
            placeholder="e.g  Lois"
          />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Last Name * </label>
          <input
            type="text"
            name="lname"
            className="last-name form-control"
            onChange={onChangeHandler}
            value={inputValues.lname || ""}
            placeholder="e.g  Ahmed"
          />
        </div>
      </span>
      <div className="pos-rel flex">
        <label className="abs py-10"> Email *</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.email || ""}
          placeholder="e.g  youremail@gmail.com"
        />
      </div>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10"> Username *</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.username || ""}
            placeholder="e.g  madamlois"
          />
        </div>

        <div className="pos-rel">
          <label className="abs py-10"> Phone Number * </label>
          <input
            type="number"
            name="phone"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.phone || ""}
            placeholder="e.g  080123456789"
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10"> Password * </label>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="pos-rel">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
              autoComplete="false"
            />
            <span onClick={togglePassword} className="cnwjien">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Select Package * </label>
          <select
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}>
            <option value="1">Basic - 70,000 </option>
            <option value="2">Standard - 165,000</option>
            <option value="3">Silver - 214,000</option>
            <option value="4">Gold - 280,000</option>
          </select>
          {/* <input
                        type="number" 
                        name="package_id" 
                        className="form-control"
                        onChange={onChangeHandler}
                        value={inputValues.package_id || ""}
                    /> */}
        </div>
      </span>
      <div className="pos-rel phone flex">
        <label className="abs py-10"> Referral id</label>
        <input
          type="text"
          name="ref_id"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.ref_id || ""}
          placeholder="e.g  PM-000000000"
        />
      </div>
    </span>
  );
};

export default AffilateForm;
