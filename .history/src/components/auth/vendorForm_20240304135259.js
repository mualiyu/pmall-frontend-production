import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

const VendorForm = ({ inputValues, onChangeHandler }) => {
  return (
    <div>
      <div className="pos-rel flex">
        <label className="abs py-10"> Store Name *</label>
        <input
          type="text"
          name="store_name"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.store_name || ""}
          placeholder="e.g  CALISTUS HERBALS"
        />
      </div>
      <span className="flex">
        <div className="pos-rel email">
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
        <div className="pos-rel phone">
          <label className="abs py-10"> Phone Number *</label>
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
          <label className="abs py-10"> First Name * </label>
          <input
            type="text"
            name="fname"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.fname || ""}
            placeholder="e.g  Ahmed"
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
            placeholder="e.g  Roy"
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10">Referral id * </label>
          <input
            type="text"
            name="ref_id"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.ref_id || ""}
            placeholder="e.g  PM-123456789"
          />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Select Package* </label>
          <select
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}>
            <option value="1">Starter Pack - 35,000 </option>
            <option value="2">Premium - 60,000</option>
            <option value="3">Elite - 83,000</option>
            <option value="4">Delux - 140,000</option>
          </select>
          {/* <input
            type="number"
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}
            value={inputValues.package_id || ""}
          /> */}
        </div>
      </span>
    </div>
  );
};

export default VendorForm;
