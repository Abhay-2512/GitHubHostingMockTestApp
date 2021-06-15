import React,{useContext} from 'react'
import AppContext from '../AppContext';
import {Link} from 'react-router-dom';


function Register() {
    const Mycontext = useContext(AppContext);
    const {accountOpen,handleRegPasswordInput,handleRegUserIdInput,handleRegUsernameInput} = Mycontext.handler;
    const {RegData} = Mycontext.state;
    return (
        <>
        <div className="w-100 text-capitalize text-center fs-1 fw-bold">Registration page</div>
        <div className="w-75 mx-auto d-flex justify-content-between">
           <Link to="/logInCandidate"><button className="btn btn-success float-end mb-3" >Candidate LogIn</button></Link>
            <Link to="/admin"><button className="btn btn-success float-end mb-3" >Admin LogIn</button></Link>
        </div>
        <div className="w-100 my-5">
        <form onSubmit={accountOpen} className="w-75 m-2 border border-1 border-blue mx-auto p-2">
        <div>
            <label className="form-label" htmlFor="username">Username : </label>
            <input type="text" className="form-control" value={RegData.Username} id="username" onChange={handleRegUsernameInput} ></input>
        </div>
        <div>
            <label className="form-label" htmlFor="userId">UserID : </label>
            <input type="text" className="form-control" id="userId" value={RegData.UserID} onChange={handleRegUserIdInput}></input>
        </div>
        <div>
            <label className="form-label" htmlFor="userPwd">Password : </label>
            <input type="password" className="form-control" id="userPwd" value={RegData.Password} onChange={handleRegPasswordInput}></input>
        </div>
        <div className="w-100 text-center">
            <input type="submit" value="Submit" className="btn btn-success btn-sm my-3"></input>
        </div>
        </form>            
        </div>
        </>
    )
}

export default Register
