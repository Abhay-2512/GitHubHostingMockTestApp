import React,{useReducer} from 'react';
import {Link ,} from 'react-router-dom';
import MyExamPrintA from './MyExamPrintA';
import axios from 'axios';
import { toast } from 'react-toastify';

let URL4 = "http://localhost:3006/CandidateExamDetails";

const initialState={
    ExamDetail:{},
    showDetail:false,
    state:{
        UserID:"",
        Password:"",
        Attempt:""
    }
}
const reducer=(state,action)=>{
    switch(action.type){
        case 'ExamDetail':return {...state,ExamDetail:action.payload};
        case 'showDetail':return {...state,showDetail:true};
        case 'state':return {...state,state:action.payload};
        default :return state;
    }
}


function CandidatesResult() {

    const [State,dispatch]=useReducer(reducer,initialState)
    
    const handleInputFields=(e)=>{
       let name=e.target.name;
        let val=e.target.value;
        dispatch({type:'state',payload:{...State.state,[name]:val}})
    }

    

    const CandidateVerification=(e)=>{
        e.preventDefault();
        axios.get(URL4).then((res)=>{
            let ExamData=res.data
            // console.log(ExamData);
        
            let checkCandidate=0;
            ExamData.map((item) => {
          if ((item.CandidateName.trim() === State.state.UserID.trim()) && (item.CandidatePassword.trim() === State.state.Password.trim())) {
            let CurrCandidate=ExamData.filter((ele)=>{
                checkCandidate=1;
                  return  ele.CandidateName===State.state.UserID ;

            })
            dispatch({type:'ExamDetail',payload:CurrCandidate[Number(State.state.Attempt)-1]})
            // console.log(CurrCandidate);
            dispatch({type:'showDetail'})
    
            }
            
            

        return null
         })
         if(checkCandidate===0){
            toast.info("Dear, Candidate Your Not Attempted Exam !, Please Attempt Exam ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
         }    

        })
        }
           return ((State.showDetail)?(
                <div>
                        <MyExamPrintA values={State.ExamDetail} />
                </div>
                

            ):
            (<div className="w-100 text-capitalize ">
            <div className="w-75 mx-auto my-2 text-capitalize text-center">Result LOGIN page</div>
            <form onSubmit={CandidateVerification} id="LogInCandidate" className="w-75 mx-auto border border-1 border-black p-3">
            <div>
                <label className="form-label my-1" htmlFor="loguserId">UserID : </label>
                <input type="text" className="form-control my-1" name="UserID"   id="loguserId"   onChange={handleInputFields} ></input>
            </div>
            <div>
                <label className="form-label my-1" htmlFor="loguserPwd">Password : </label>
                <input type="password"  name="Password" className="form-control my-1" id="loguserPwd" onChange={handleInputFields}   ></input>
            </div>
            <div>
                <label className="form-label my-1" htmlFor="Attempt">No of Attempt : </label>
                <input type="number"  name="Attempt" className="form-control my-1 w-auto" id="Attempt" onChange={handleInputFields}   ></input>
            </div>
            <div className="w-100 text-center">
                <input type="submit" value="Submit" className="btn btn-success btn-sm my-2"></input>
            </div>
            </form>
            <div className="w-75 mx-auto">
                <Link to="/register"><button className="btn btn-success float-end my-2" >Register Here</button></Link>
                <Link to="/verifiedList"><button className="btn btn-success float-start my-2" >Check Status</button></Link>
            </div>
                
            </div>))
        
}

export default CandidatesResult
