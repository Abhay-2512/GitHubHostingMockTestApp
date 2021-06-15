import axios from 'axios';
import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


class MyForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            successMsg: ""

        }
    }
    handleInputFields = (e) => {
        let name = e.target.name;
        let val = (name === "gender") ? e.target.id : e.target.value;
        this.setState({ [name]: val });
    }

    isEmail = (val) => {
        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(val)) {
            return true;
        }
    }

    formValidation = () => {
        let Errors = this.state.Error;
        let Obj = this.state;
        let isFormValid = true;
        const { Username, Password, Email, UserID, Mobile, Exam, gender } = this.state;
        if (Username && Password && Email && UserID && Mobile && Exam && gender) {
            if (this.isEmail(Email)) {

                isFormValid = this.isEmail(Email)
            } else {
                alert("Please Enter Valid Email !");
                document.getElementById("userEmail").focus();

                isFormValid = false;
            }




        } else {
            let ObjKeys = Object.keys(Obj);
            ObjKeys.map((ele) => {
                if (Obj[ele] === "") {
                    Errors[ele] = `Please Enter Valid ${ele} ?`
                    this.setState({ Error: this.state.Error });

                }
                return null;
            })

            isFormValid = false;
        }

        return isFormValid;
    }
    // Error Hiding when focus
    hideError = (e) => {
        let Errors = this.state.Error;
        Errors[e.target.name] = "";
        this.setState({
            Errors: this.state.Error
        })
    }
    showError = (e) => {
        // let Errors=this.state.Error;
        if (e.target.value === "") {
            this.formValidation()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        if (this.formValidation()) {
            let data = {
                Username: this.state.Username,
                Email: this.state.Email,
                UserID: this.state.UserID,
                Password: this.state.Password,
                gender: this.state.gender,
                Exam: this.state.Exam
            }
            axios.post("http://tutorslog.com/user.php", data)
                .then((res) => {
                    this.setState({ successMsg: "Account created successfully." });
                    this.setState({
                        Username: "",
                        Email: "",
                        Password: "",
                        UserID: "",
                        Mobile: "",
                        gender: "",
                        Exam: ""
                    })
                    console.log(res)
                })
                .catch((err) => {
                    alert("something went wrong !");
                     console.log(err);
                });

        }

    }

    render() {
        // console.log(this.state.Error);

        return (
            <> {<span>{this.state.Error.Username}</span>}

                <div className="w-100 text-capitalize text-center fs-1 fw-bold">Registration page</div>
                <div className="w-75 mx-auto d-flex justify-content-between">
                    <button className="btn btn-success float-end mb-3">Candidate LogIn</button>
                    <button className="btn btn-success float-end mb-3">Admin LogIn</button>
                </div>
                {this.state.successMsg ? <div className="p-3 bg-aqua w-50 mx-auto">{this.state.successMsg}</div> : null}
                <div className="w-100 my-5">
                    <form onSubmit={this.handleSubmit} className="w-75 m-2 border border-1 border-blue mx-auto p-2">
                        <div>
                            <label className="form-label" htmlFor="username">Username : </label>
                            <input type="text" autoComplete="off" onFocus={this.hideError} onBlur={this.showError} className="form-control" name="Username" value={this.state.Username} id="username" onChange={this.handleInputFields} ></input>
                            {this.state.Error.Username ? <span className="text-danger">{this.state.Error.Username}</span> : null}
                        </div>
                        <div>
                            <label className="form-label" htmlFor="userId">UserID : </label>
                            <input type="text" autoComplete="off" onFocus={this.hideError} onBlur={this.showError} className="form-control" name="UserID" id="userId" value={this.state.UserId} onChange={this.handleInputFields}></input>
                            {(this.state.Error.UserID) ? <span className="text-danger">{this.state.Error.UserID}</span> : null}

                        </div>
                        <div>
                            <label className="form-label" htmlFor="userPwd">Password : </label>
                            <input type="password" autoComplete="off" onFocus={this.hideError} onBlur={this.showError} className="form-control" name="Password" id="userPwd" value={this.state.Password} onChange={this.handleInputFields}></input>
                            {(this.state.Error.Password) ? <span className="text-danger">{this.state.Error.Password}</span> : null}

                        </div>
                        <div>
                            <label className="form-label" htmlFor="userEmail">Email : </label>
                            <input type="text" autoComplete="off" onFocus={this.hideError} onBlur={this.showError} className="form-control" name="Email" id="userEmail" value={this.state.Email} onChange={this.handleInputFields}></input>
                            {(this.state.Error.Email) ? <span className="text-danger">{this.state.Error.Email}</span> : null}

                        </div>
                        <div>
                            <label className="form-label" htmlFor="userMobile">Mobile : </label>
                            <input type="text" autoComplete="off" onFocus={this.hideError} onBlur={this.showError} className="form-control" name="Mobile" id="userMobile" value={this.state.Mobile} onChange={this.handleInputFields}></input>
                            {this.state.Error.Mobile ? <span className="text-danger">{this.state.Error.Mobile}</span> : null}

                        </div>
                        <div>
                            <label className="form-label py2" htmlFor="userGender">Gender : </label>
                            <div className="d-flex align-item-center">
                                <input type="radio" onFocus={this.hideError} onBlur={this.showError} className="radio-light m-1 mx-2" id="Male" name="gender" onChange={this.handleInputFields}></input><label className="fs-5 mx-2" htmlFor="Male">Male</label>
                                <input type="radio" onFocus={this.hideError} onBlur={this.showError} className="radio-light m-1 mx-2" id="FeMale" name="gender" onChange={this.handleInputFields}></input><label className="fs-5 mx-2" htmlFor="FeMale">FeMale</label>
                            </div>
                            {(this.state.Error.gender) ? <span className="text-danger">{this.state.Error.gender}</span> : null}

                        </div>
                        <div className="w-100">
                            <label>Select Examination :</label>
                            <div className="text-center w-25 mx-auto">
                                <select name="Exam" onFocus={this.hideError} onBlur={this.showError} className="mx-auto w-100" value={this.state.Exam} onChange={this.handleInputFields}>
                                    <option value="">SELECT EXAM</option>
                                    <option value="CGL">SSC-CGL</option>
                                    <option value="CHSL">SSC-CHSL</option>
                                    <option value="MTS">SSC-MTS</option>
                                    <option value="GROUP-D">RRB-GROUP-D</option>
                                    <option value="NTPC">RRB-NTPC</option>
                                </select>
                            </div>
                            {(this.state.Error.Exam) ? <span className="text-danger">{this.state.Error.Exam}</span> : null}

                        </div>
                        <div className="w-100 text-center">
                            <input type="submit" value="Submit" className="btn btn-success btn-sm my-3"></input>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default MyForm
