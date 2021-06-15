import React from 'react';
// import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';


function LogInCandidate(props) {
    const {myHandlerUsercheck,myHandlerAdmin,myHanderCapcha,myState,text} = props;
    // useEffect(()=>{
    //     myHanderCapcha()
    // },[])

    let UserCheck = myState.UserCheck;

   
    return (
        <div className="w-100 text-capitalize ">
        {(UserCheck.UserCheckError)?<p className="text-center w-100 text-danger fw-bold bg-aqua">Candidate Please Enter Valid Info Or Check Status </p>:null}
            <h2 className="w-75 mx-auto my-2 text-capitalize text-center">{text} LogIn Page</h2>
            <form onSubmit={myHandlerAdmin} id="LogInCandidate" className="w-75 mx-auto border border-1 border-black p-3">
                <div>
                    <label className="form-label my-1" htmlFor="loguserId">UserID : </label>
                    <input type="text" className="form-control my-1" name="UserID" value={UserCheck.UserID} id="loguserId" onChange={myHandlerUsercheck} ></input>
                </div>
                <div>
                    <label className="form-label my-1" htmlFor="loguserPwd">Password : </label>
                    <input type="password" value={UserCheck.Password} name="Password" className="form-control my-1" id="loguserPwd" onChange={myHandlerUsercheck}></input>
                </div>
                <div className="d-flex justify-content-center">
                    <div >
                    <p className="m-3 p-1 fs-3 text-center fw-bold text-danger border-0" id="generated-captcha" style={{backgroundColor:"aqua",width:"200px",height:"50px"}} >{UserCheck.Capcha}</p>
                        {/* <input type="text" className="m-3 p-1 fs-3 w-50 text-center fw-bold text-danger border-0" value={UserCheck.Capcha} style={{backgroundColor:"aqua"}}  id="generated-captcha" /> */}
                    </div>
                    <div className="d-flex flex-column m-3">
                    <button type="button" className="capcha-try my-1" id="gen" onClick={myHanderCapcha} >Try Another</button>
                        <input type="text" id="entered-captcha"  name="CapchaEntered" className="my-1 form-control" placeholder="Enter the captcha.." onChange={myHandlerUsercheck} />
                    </div>
                    
                </div>
                <div className="w-100 text-center">
                    <input type="submit" value="Submit" className="btn btn-success btn-sm my-2"></input>
                </div>
            </form>
            {(text==="Candidate")?
            <div className="w-75 mx-auto">
                <Link to="/register"><button className="btn btn-success float-end my-2" >Register Here</button></Link>
                <Link to="/verifiedList"><button className="btn btn-success float-start my-2" >Check Status</button></Link>
            </div>:<div className="w-75 mx-auto">
                <Link to="/register"><button className="btn btn-success float-end my-2" >Back To home</button></Link>
            </div>}

        </div>
    )
}

export default LogInCandidate
