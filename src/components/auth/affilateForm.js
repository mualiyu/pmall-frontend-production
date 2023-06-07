import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

const AffilateForm = ({inputValues, onChangeHandler}) => {
    
    return ( 
        <span className="affilate-form">
            <span className="flex">
                <div className="pos-rel">
                    <label className="abs py-10"> Username *</label>
                    <input
                        type="text" 
                        name="userName" 
                        className="form-control" 
                        onChange={onChangeHandler}
                        value={inputValues.userName || ""}
                    />
                </div>

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
            <span className="flex">
                <div className="pos-rel">
                    <label className="abs py-10"> Password * </label>
                    <input
                        type="password" 
                        name="password" 
                        className="form-control"
                        onChange={onChangeHandler}
                        value={inputValues.password || ""}
                    />
                </div>
                <div className="pos-rel">
                    <label className="abs py-10"> Confirm password * </label>
                    <input
                        type="password" 
                        name="confirmPassword" 
                        className="form-control"
                        onChange={onChangeHandler}
                        value={inputValues.confirmPassword || ""}
                    />
                </div>
            </span>
            <div className="pos-rel phone flex">
                <label className="abs py-10"> Referral id</label>
                <input
                    type="text" 
                    name="referralId" 
                    className="form-control"
                    onChange={onChangeHandler}
                    value={inputValues.referralId || ""}
                />
            </div>
        </span>
     );
}
 
export default AffilateForm;