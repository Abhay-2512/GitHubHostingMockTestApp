
import React, { useContext } from 'react'
// import axios from 'axios';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';


function Register1() {
    const Mycontext = useContext(AppContext);
    const { accountOpen,handleInputFields,hideError,showError} = Mycontext.handler;
    const { RegData } = Mycontext.state;
    

    return (
        <> 
            <div className="w-100 text-capitalize text-center fs-1 fw-bold">Registration page</div>
            <div className="w-75 mx-auto d-flex justify-content-between">
                <Link to="/logInCandidate"><button className="btn btn-success float-end mb-3" >Candidate LogIn</button></Link>
                <Link to="/admin"><button className="btn btn-success float-end mb-3" >Admin LogIn</button></Link>
            </div>
            {RegData.successMsg ? <div className="p-1 text-blue text-center border border-1 w-50 mx-auto" style={{backgroundColor:"lightgreen",borderRadius:"20px"}}>{RegData.successMsg}</div> : null}
            <div className="w-100 my-2">
                <form onSubmit={accountOpen} className="w-75 m-2 border border-1 border-blue mx-auto p-2">
                    <div>
                        <label className="form-label" htmlFor="username">Username : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Username" value={RegData.Username} id="username" onChange={handleInputFields} ></input>
                        {RegData.Error.Username ? <span className="text-danger">{RegData.Error.Username}</span> : null}
                    </div>
                    <div>
                        <label className="form-label" htmlFor="userId">UserID : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="UserID" id="userId" value={RegData.UserId} onChange={handleInputFields}></input>
                        {(RegData.Error.UserID) ? <span className="text-danger">{RegData.Error.UserID}</span> : null}

                    </div>
                    <div>
                        <label className="form-label" htmlFor="userPwd">Password : </label>
                        <input type="password" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Password" id="userPwd" value={RegData.Password} onChange={handleInputFields}></input>
                        {(RegData.Error.Password) ? <span className="text-danger">{RegData.Error.Password}</span> : null}

                    </div>
                    <div>
                        <label className="form-label" htmlFor="userEmail">Email : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Email" id="userEmail" value={RegData.Email} onChange={handleInputFields}></input>
                        {(RegData.Error.Email) ? <span className="text-danger">{RegData.Error.Email}</span> : null}

                    </div>
                    <div>
                        <label className="form-label" htmlFor="userMobile">Mobile : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Mobile" id="userMobile" value={RegData.Mobile} onChange={handleInputFields}></input>
                        {RegData.Error.Mobile ? <span className="text-danger">{RegData.Error.Mobile}</span> : null}

                    </div>
                    <div>
                        <label className="form-label py2" htmlFor="userGender">Gender : </label>
                        <div className="d-flex align-item-center">
                            <input type="radio" onFocus={hideError} onBlur={showError} className="radio-light m-1 mx-2" id="Male" name="gender" onChange={handleInputFields}></input><label className="fs-5 mx-2" htmlFor="Male">Male</label>
                            <input type="radio" onFocus={hideError} onBlur={showError} className="radio-light m-1 mx-2" id="FeMale" name="gender" onChange={handleInputFields}></input><label className="fs-5 mx-2" htmlFor="FeMale">FeMale</label>
                        </div>
                        {(RegData.Error.gender) ? <span className="text-danger">{RegData.Error.gender}</span> : null}

                    </div>
                    <div className="w-100">
                        <label>Select Examination :</label>
                        <div className="text-center w-25 mx-auto">
                            <select name="Exam" onFocus={hideError} onBlur={showError} className="mx-auto w-100" value={RegData.Exam} onChange={handleInputFields}>
                                <option value="">SELECT EXAM</option>
                                <option value="CGL">SSC-CGL</option>
                                <option value="CHSL">SSC-CHSL</option>
                                <option value="MTS">SSC-MTS</option>
                                <option value="GROUP-D">RRB-GROUP-D</option>
                                <option value="NTPC">RRB-NTPC</option>
                            </select>
                        </div>
                        {(RegData.Error.Exam) ? <span className="text-danger">{RegData.Error.Exam}</span> : null}

                    </div>
                    <div className="w-100 text-center">
                        <input type="submit" value="Submit" className="btn btn-success btn-sm my-3"></input>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register1;
