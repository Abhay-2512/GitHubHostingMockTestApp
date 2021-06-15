
import React, {useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';


let URL2 = "http://localhost:3006/CandidateRegInfo";


let myReg = {
    Username: "",
    Email: "",
    Password: "",
    UserID: "",
    Mobile: "",
    gender: "",
    Exam: "",
    Error: {
      Username: "",
      Email: "",
      Password: "",
      UserID: "",
      Mobile: "",
      gender: "",
      Exam: ""
    },
    successMsg: "",
    Status:false
  }


function Register1() {

     // State To Store the User Info For LogIn Examination
  const [RegData, setRegData] = useState(myReg);

    
  // All Input Fields HAndler

  const handleInputFields = (e) => {
    let name = e.target.name;
    let val = (name === "gender") ? e.target.id : e.target.value;
    setRegData({ ...RegData, [name]: val });
  }

  // Check Email Pattern callback

  const isEmail = (val) => {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(val)) {
      return true;
    }
  }

  // All Field Validation function

  const formValidation = () => {
    let Errors = RegData.Error;
    let Obj = RegData;
    let isFormValid = true;
    const { Username, Password, Email, UserID, Mobile, Exam, gender } = RegData;
    if (Username && Password && Email && UserID && Mobile && Exam && gender) {
      if (isEmail(Email)) {

        isFormValid = isEmail(Email)
      } else {
        toast.warn("Please Enter Valid Email !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        document.getElementById("userEmail").focus();

        isFormValid = false;
      }
    } else {
      
      //Iterate the State Object Keys

      let ObjKeys = Object.keys(Obj);
      ObjKeys.map((ele) => {
        if (Obj[ele] === "") {
          Errors[ele] = `Please Enter Valid ${ele} ?`
          setRegData({...RegData,Error:Errors});

        }
        return null;
      })

      isFormValid = false;
    }

    return isFormValid;
  }


   // function for hide Error when focus on Input

   const hideError = (e) => {
    let Errors = RegData.Error;
    // Errors[e.target.name] = "";
    setRegData({...RegData,
      // Errors: RegData.Error,
      Error:{...Errors,[e.target.name]:""}
    })
  }

  // function for hide Error when blur on Input


  const showError = (e) => {
    // let Errors=this.state.Error;
    if (e.target.value === "") {
      formValidation()
    }
  }


  // Send Registered Data to Server and LOgIn pag Open

  const accountOpen = (e) => {
    e.preventDefault();
    if (formValidation()===true) {
      let mydata = {
        id:"",
        Username: RegData.Username,
        Email: RegData.Email,
        UserID: RegData.UserID,
        Password: RegData.Password,
        gender: RegData.gender,
        Exam: RegData.Exam,
        Status:RegData.Status
      }

      axios.post(URL2, mydata)
        .then((res) => {
          setRegData({...RegData,
            Username: "",
            Email: "",
            Password: "",
            UserID: "",
            Mobile: "",
            gender: "",
            Exam: "",
            successMsg: "Account created successfully."
          })
          console.log(res)
        })
        .catch((err) => {
          toast.error("something went wrong !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            
          console.log(err);
        });
    }
  }
    

    return (
        <> 
            
            <div className="w-100 text-capitalize text-center fs-1 fw-bold">Registration page</div>
            <div className="d-flex justify-content-center text-center my-3 ">
                <Link to="/logInCandidate"><button className="btn btn-success mx-1 mb-3" >Candidate LogIn</button></Link>
                <Link to="/candidatesResult"><button className="btn btn-success mb-3" >Result LogIn</button></Link>
                <Link to="/admin"><button className="btn btn-success mx-1 mb-3" >Admin LogIn</button></Link>
            </div>
            {RegData.successMsg ? <div className="p-1 text-blue text-center border border-1 w-50 mx-auto" style={{backgroundColor:"lightgreen",borderRadius:"20px"}}>{RegData.successMsg}</div> : null}
            <div className="w-100 my-2">
                <form onSubmit={accountOpen} className="w-75 m-2 border border-1 border-blue mx-auto p-2">
                    <div>
                        <label className="form-label pt-3" htmlFor="username">Username : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Username" value={RegData.Username} id="username" onChange={handleInputFields} ></input>
                        {RegData.Error.Username ? <span className="text-danger">{RegData.Error.Username}</span> : null}
                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userId">UserID : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="UserID" id="userId" value={RegData.UserId} onChange={handleInputFields}></input>
                        {(RegData.Error.UserID) ? <span className="text-danger">{RegData.Error.UserID}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userPwd">Password : </label>
                        <input type="password" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Password" id="userPwd" value={RegData.Password} onChange={handleInputFields}></input>
                        {(RegData.Error.Password) ? <span className="text-danger">{RegData.Error.Password}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userEmail">Email : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Email" id="userEmail" value={RegData.Email} onChange={handleInputFields}></input>
                        {(RegData.Error.Email) ? <span className="text-danger">{RegData.Error.Email}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3" htmlFor="userMobile">Mobile : </label>
                        <input type="text" autoComplete="off" onFocus={hideError} onBlur={showError} className="form-control" name="Mobile" id="userMobile" value={RegData.Mobile} onChange={handleInputFields}></input>
                        {RegData.Error.Mobile ? <span className="text-danger">{RegData.Error.Mobile}</span> : null}

                    </div>
                    <div>
                        <label className="form-label pt-3 py2" htmlFor="userGender">Gender : </label>
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
