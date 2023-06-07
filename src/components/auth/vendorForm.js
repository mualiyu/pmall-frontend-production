import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

const VendorForm = ({inputValues, onChangeHandler, onSubmitHandler}) => {
        
    return ( 
        <div>
            <div className="pos-rel flex">
                <label className="abs py-10"> Store Name *</label>
                <input
                    type="text" 
                    name="storeName" 
                    className="form-control" 
                    onChange={onChangeHandler}
                    value={inputValues.storeName || ""}
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
                        name="phoneNumber" 
                        className="form-control"
                        onChange={onChangeHandler}
                        value={inputValues.phoneNumber || ""}
                    />
                </div>
            </span>
            <span className="flex">
                <div className="pos-rel">
                    <label className="abs py-10"> First Name * </label>
                    <input
                        type="text" 
                        name="firstName" 
                        className="first-name form-control"
                        onChange={onChangeHandler}
                        value={inputValues.firstName || ""}
                    />
                </div>
                <div className="pos-rel">
                    <label className="abs py-10"> Last Name * </label>
                    <input
                        type="text" 
                        name="lastName" 
                        className="last-name form-control"
                        onChange={onChangeHandler}
                        value={inputValues.lastName || ""}
                    />
                </div>
            </span>
        </div>
     );
}
 
export default VendorForm;