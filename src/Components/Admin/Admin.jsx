import React,{useContext} from 'react';
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom';


function Admin() {
    const MyAcContext = useContext(AppContext);
const {AdminVerification,UsercheckUserData} = MyAcContext.handler;
const {state} = MyAcContext.state;
let UserCheck=state.UserCheck;
return (
    <div className="w-100 text-capitalize ">
    <div className="w-75 mx-auto my-2 text-capitalize text-center">Admin LOGIN page</div>
    <form onSubmit={AdminVerification} className="w-75 mx-auto border border-1 border-black p-3">
    <div>
        <label className="form-label my-1" htmlFor="loguserId">UserID : </label>
        <input type="text" className="form-control my-1" name="UserID"  value={UserCheck.UserID} id="loguserId" onChange={UsercheckUserData} ></input>
    </div>
    <div>
        <label className="form-label my-1" htmlFor="loguserPwd">Password : </label>
        <input type="password" value={UserCheck.Password} name="Password" className="form-control my-1" id="loguserPwd" onChange={UsercheckUserData}></input>
    </div>
    <div className="w-100 text-center">
        <input type="submit" value="Submit" className="btn btn-success btn-sm my-2"></input>
    </div>
    </form>
    <div className="w-75 mx-auto">
        <Link to="/register"><button className="btn btn-success float-end my-2" >Register Here</button></Link>
    </div>
        
    </div>
)
}

export default Admin
