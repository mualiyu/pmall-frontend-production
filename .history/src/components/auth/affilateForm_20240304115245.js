import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AffilateForm = ({ inputValues, onChangeHandler }) => {
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
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10"> Password * </label>
          <div style={{ display: "flex" }}>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
            />
            <VisibilityOffIcon />
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
        />
      </div>
    </span>
  );
};

export default AffilateForm;
