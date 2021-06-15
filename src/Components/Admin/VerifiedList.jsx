import React,{useContext} from 'react';
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

function VerifiedList() {
    const MyAcContext = useContext(AppContext);
    // const {RegisterPageFromLog} = MyAcContext.handler;
    const {state} = MyAcContext.state;
    let VerifyUser=state.VerifyUser;

    let selectedCandidate = VerifyUser.filter((item)=>{
       return item.Status===true;
   }) 
    let candidateInProcess = VerifyUser.filter((item)=>{
       return item.Status===false;
   }) 
    return (
        <div className="w-100">
        <ScrollToTop smooth={true} top={400} style={{backgroundColor:"blue",fontWeight:"bold",borderRadius:"50%"}} color="white" />
        <div className="w-75 my-3 mx-auto">
        <Link to="/register"><button className="btn btn-success my-2" >Back To Home page</button></Link>
        </div>
        <h2 className="text-center bg-success p-2">Verified Candidate List</h2>
            <table className="table table-bordered table-active table-striped w-75 mx-auto" >
            <thead>
                <tr>
                    <th>SR</th>
                    <th>USERNAME</th>
                    <th>USER ID</th>
                    <th className="text-center">VERIFICATION</th>
                </tr>
            </thead>
            <tbody>

            
            {selectedCandidate.map((user,ind)=>{

             return(
                 <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{user.Username}</td>
                    <td>{user.UserID}</td>
                    <td className="text-center"><button type="button" id={user.id} className={(user.Status===true)?"btn btn-success":"btn btn-danger"} >{(user.Status===false)?('Verify'):('Verified')}</button></td>
                </tr>);
            })}

            </tbody>
        </table>
        <h2 className="text-center bg-success p-2 my-3">Verification Under Process Candidate List</h2>
            <table className="table table-bordered table-active table-striped w-75 mx-auto" >
            <thead>
                <tr>
                    <th>SR</th>
                    <th>USERNAME</th>
                    <th>USER ID</th>
                    <th className="text-center">VERIFICATION</th>
                </tr>
            </thead>
            <tbody>

            
            {candidateInProcess.map((user,ind)=>{

             return(
                 <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{user.Username}</td>
                    <td>{user.UserID}</td>
                    <td className="text-center"><button type="button" id={user.id} className={(user.Status===true)?"btn btn-success":"btn btn-warning "} >{(user.Status===false)?('UnderProceed'):('Verified')}</button></td>
                </tr>);
            })}

            </tbody>
        </table>
        
        </div>
    )
}

export default VerifiedList
