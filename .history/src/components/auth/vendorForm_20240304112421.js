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
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10">Referral id * </label>
          <input
            type="text"
            name="ref_id"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.ref_id || ""}
          />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> package id * </label>
          <input
            type="number"
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}
            value={inputValues.package_id || ""}
          />
        </div>
      </span>
    </div>
  );
};

export default VendorForm;
