import profile from "../../assets/imgs/passport.png";
const UserDetails = () => {
    return ( 
        <section className="page__header w-full" style={{display:"block"}}>
            <div className="user-details">
                <div className="page__header">
                    <h1>User Details</h1>
                </div>
            
                <div className="flex-container w-full p-y my-40 g-20">
                    <div className="left w-full flex flex-col g-20 items-center">
                        <div className="top flex flex-col g-10 items-center">
                            <img src={profile} className="profile_pic b-round"/>
                            <h1>John Doe</h1>
                            <p>#abcdefg123456hgyufjhjyg</p>
                        </div>
                        <div className="details w-full flex flex-col g-20">
                            <p>User Attributes(47)</p>
                            <input type="text" placeholder="Search"/>
                            <div className="flex-container">
                                <h3>Store Name</h3>
                                <p>johndoehub</p>
                            </div>
                            <div className="flex-container">
                                <h3>Email</h3>
                                <p>johndoe123@gmai.com</p>
                            </div>
                            <div className="flex-container">
                                <h3>Last interaction</h3>
                                <p>40 mins ago</p>
                            </div>
                            <div className="flex-container">
                                <h3>Phone Number</h3>
                                <p>09012344577</p>
                            </div>
                            <div className="flex-container">
                                <h3>Signup</h3>
                                <p>1st jun, 2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full right">
                        <div className="flex flex-col g-20">
                            <div className="flex-container">
                                <h3>Role</h3>
                                <p>Limited Access</p>
                            </div>
                            <div className="flex-container alc">
                                <div className="flex g-5 alc">
                                    <h3>password:</h3>
                                    <input type="text" placeholder="Search"/>
                                </div>
                                <button className="btn btn-primary p-25" >Edit</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default UserDetails;