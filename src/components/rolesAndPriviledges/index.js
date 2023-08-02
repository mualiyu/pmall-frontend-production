import profile from "../../assets/imgs/passport.png";

const RolesAndPriviledges = () => {
    return ( 
        <div className="roles-n-priviledges mt-10">
            <div className="justsb user-info">
                <div className="flex">
                    <div className="profile_pic_holder b-round">
                        <img src={profile} className="profile_pic b-round"/>
                    </div>
                    <div className="flex flex-col g-5">
                        <div className="flex all-center g-5">
                            <h3 className="f18">John Fisher</h3>
                            <select className="search__bar " defaultValue={'default'}>
                                <option value="default"> Active</option>
                                <option value="Store 1"> Store 1</option>
                                <option value="Store 2"> Store 2</option>
                                <option value="Store 3"> Store 3</option>
                                <option value="Store 4"> Store 4</option>
                            </select>
                        </div>
                        <p className="chalk">W-2 Employee | Limited access</p>
                        <div>
                            <p>john.fisher@gumshoe.com</p>
                        </div>
                        <div>
                            <p>(234) 809-643-2245</p>
                        </div>
                    </div>
                    </div>
                <div className="flex flex-col justsb">
                    <button className="btn btn-primary p-25 mt-15">View Activity</button>
                    <div className="chalk">
                        <p>Last Login</p>
                        <p>July 15,2017 9:32 AM ET </p>
                    </div>
                </div>
            </div>
            <div className="mt-10 access-level">
                <h3>Access level</h3>
                <select className="search__bar mt-10" defaultValue={'default'}>
                    <option value="default"> Limited Access</option>
                    <option value="Store 1"> Store 1</option>
                    <option value="Store 2"> Store 2</option>
                    <option value="Store 3"> Store 3</option>
                    <option value="Store 4"> Store 4</option>
                </select>
            </div>
        </div>
     );
}
 
export default RolesAndPriviledges;