import React,{useContext} from 'react';
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom';
function AdminAccount() {
    const MyAcContext = useContext(AppContext);
const {verifyByAdmin} = MyAcContext.handler;
const {state} = MyAcContext.state;
let VerifyUser=state.VerifyUser;
    return (
        <div className="w-100">
        <h2 className="text-center fs-1 my-5">WelCome To Admin Account</h2>
        <div className="w-75 mx-auto">
           <Link to="/examPaper" className="btn btn-success float-start mb-1">Set Question Paper</Link>
        </div>
        <table className="table table-hover table-bordered table-active table-striped w-75 mx-auto" >
            <thead>
                <tr>
                    <th>SR</th>
                    <th>USERNAME</th>
                    <th>USER ID</th>
                    <th>PASSWORD</th>
                    <th>VERIFICATION</th>
                </tr>
            </thead>
            <tbody>
            {VerifyUser.map((user,ind)=>{

             return(
                 <tr key={ind}>
                    <td>{user.id}</td>
                    <td>{user.Username}</td>
                    <td>{user.UserID}</td>
                    <td>{user.Password}</td>
                    <td className="text-center"><button type="button" id={user.id} className={(user.Status===true)?"btn btn-success":"btn btn-danger"} onClick={verifyByAdmin} >{(user.Status===false)?('Verify'):('Verified')}</button></td>
                </tr>);
            })}

            </tbody>
        </table>
        <div className="w-75 mx-auto">
            <Link to="/admin"><button className="btn btn-success float-end my-2">Back</button></Link>
        </div>
            
        </div>
    )
}

export default AdminAccount
