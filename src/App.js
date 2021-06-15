import React, { useState, useEffect, useReducer,useRef } from 'react'
import AppContext from './AppContext';
import Questions from './Components/ExaminationModule/Questions';
import Register1 from './Components/RegistrationModule/Register1';
import LogInCandidate from './Components/RegistrationModule/LogInCandidate';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import MyResult from './Components/ResultModule/MyResult';
import ErrorBoundary from './Components/ErrorBoundary';
import AdminAccount from './Components/Admin/AdminAccount';
import VerifiedList from './Components/Admin/VerifiedList';
import ExamPaper from './Components/Admin/ExamPaper';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidatesResult from './Components/ResultModule/CandidatesResult';


let URL = "http://localhost:3006/QuestionPaper";
let URL2 = "http://localhost:3006/CandidateRegInfo";
let URL3 = "http://localhost:3006/AdminRegInfo";
let URL4 = "http://localhost:3006/CandidateExamDetails";

const initialState = {
  MyAnswers: [],
  CurrQueAnswer: {},
  VerifyAdmin: [],
  VerifyUser: [],
  UserCheck: {
    UserID: "",
    Password: "",
    Capcha: "",
    CapchaEntered: "",
    UserCheckError: false
  },
  ExamTime: 0
}

const myReducer = (state, action) => {
  switch (action.type) {
    case 'MyAnswers': return { ...state, MyAnswers: action.payload };
    case 'CurrQueAnswer': return { ...state, CurrQueAnswer: action.payload };
    case 'VerifyAdmin': return { ...state, VerifyAdmin: action.payload };
    case 'VerifyUser': return { ...state, VerifyUser: action.payload };
    case 'UserCheck': return { ...state, UserCheck: action.payload };
    case 'ExamTime': return { ...state, ExamTime: action.payload };
    case 'UserCheckError': return { ...state, UserCheck: action.payload };
    default: return state;
  }
}



function App() {

  const [state, dispatch] = useReducer(myReducer, initialState);
  // let location=useLocation();
  let history = useHistory();

  // List Of Verified Candidate By Admin  

  const [VerifiedByAdmin, setVerifiedByAdmin] = useState([]);

  // LOad All Questions into state array of object when component mount first[]
  useEffect(() => {

    axios.get(URL).then((res) => {
      let myArray = res.data;
      dispatch({ type: 'CurrQueAnswer', payload: myArray[0] })

      dispatch({ type: 'MyAnswers', payload: res.data })

  // Admin data loading 
      axios.get(URL3).then((res) => {

        dispatch({ type: 'VerifyAdmin', payload: res.data })
      }).catch((err) => console.log(err))

    }).catch((error) => console.log(error));

  }, []);



  // Load the candidate registerd INformation into State To verify Registered Candidate

  // LOad The Every time whenever Candidate Registered [RegData]

  useEffect(() => {
    axios.get(URL2).then((res) => {
      // console.log(res.data);
      dispatch({ type: 'VerifyUser', payload: res.data })

    }).catch((err) => console.log(err));
  }, [VerifiedByAdmin])


  // console.log(alphabets.length);

  const generate = () => {
      let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    // console.log(status)
    let first = alphabets[Math.floor(Math.random() * alphabets.length)];
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let sixth = Math.floor(Math.random() * 10);
    let captcha = first.toString().toUpperCase() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString();
    // console.log(captcha);
    dispatch({ type: 'UserCheck', payload: { ...state.UserCheck, Capcha: captcha } })
  }

  // load state onchanging userinput

  const UsercheckUserData = (e) => {
    dispatch({ type: 'UserCheck', payload: { ...state.UserCheck, [e.target.name]: e.target.value } })
  }

  // chacking Registered user data  is Fair Or Not


  const endExam = useRef();
  const UserVerification = (e) => {
    e.preventDefault();
    let ExamStartTime = 0;
    if (state.UserCheck.Capcha.trim() === state.UserCheck.CapchaEntered.trim()) {
      state.VerifyUser.map((item) => {
        if ((item.UserID === state.UserCheck.UserID) && (item.Password === state.UserCheck.Password) && (item.Status === true)) {
         
          // Set the Examination Time After Candidate Get SuccessFully LogIn 
          ExamStartTime = 5000;

          // Set Duration Of Examination/QuestionPaper Time 
          let ExamTotalTime = (1000 *60);

        //Total time to Complete Examination After Candidate LogIn
          let ExamEndTime = ExamTotalTime + ExamStartTime;
         
         //Examination Alert 
          toast.success(`hello candidate Exam Will Start within ${ExamStartTime/1000} Seconds !`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({ type: 'USerCheck', payload: { ...state.UserCheck, UserID: "", Password: "" } })
          // console.log(state.UserCheck);

          // Examination Start after ExamStartTime

          setTimeout(() => {
            let CurrentTime = new Date().getTime();

            history.push("/questions");
            endExam.current = setInterval(() => {
              let ExamCounter = (Number(new Date().setTime(CurrentTime + ExamTotalTime)) - Number(new Date().getTime()));
              dispatch({ type: 'ExamTime', payload: ExamCounter })
              // console.log(ExamCounter);
            }, 1000)
          }, ExamStartTime);

          //Examination will End After ExamEndTime

          setTimeout(() => {
            axios.post(URL4, { id: "", CandidateName: state.UserCheck.UserID, CandidatePassword: state.UserCheck.Password, CandidateAnswerKey: state.MyAnswers })
              .then((resp) => {
                console.log(resp.statusText);
              }).catch((err) => console.log(err));
            history.push("/myResult");
            clearInterval(endExam.current);

          }, ExamEndTime)

          // Clear The Input Fields After Verified

          dispatch({ type: 'UserCheck', payload: { ...state.UserCheck, UserID:"",Password:"" } })

        }
        if(ExamStartTime===0) {
          dispatch({ type: 'UserCheckError', payload: { ...state.UserCheck, UserCheckError: true } })
        }

        return ExamStartTime;

      })
    } else {
      console.log(state.UserCheck.Capcha.trim());
      console.log(state.UserCheck.CapchaEntered.trim());
      toast.info("Dear, Candidate Please Enter Valid Capcha...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }


  //Admin Varification 

  const verifyByAdmin = (e) => {

    //Selected Candidate ID
    let myUserId = e.target.id;
    // console.log(myUserId);
    let myCandidate;

    // collect Candidate Data from Server
    axios.get(`${URL2}/${myUserId}`).then((res) => {
      myCandidate = res.data;

    //Changing Status true or false  
      let newStatus = (myCandidate.Status === true) ? false : true;
      // console.log(res.data);

    // Update that changes Status On Server  
      axios.put(`${URL2}/${myUserId}`, { ...myCandidate, Status: newStatus })
        .then((respo) => {
          // console.log(respo.data);
          setVerifiedByAdmin([respo.data])
        }).catch((error) => console.log(error));
    }).catch((err) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log(err)
    });
    // console.log(myCandidate);
  }
  const AdminVerification = (e) => {
    e.preventDefault();
    if (state.UserCheck.Capcha === state.UserCheck.CapchaEntered) {

    state.VerifyAdmin.map((item) => {
      ((item.UserID === state.UserCheck.UserID) && (item.Password === state.UserCheck.Password)) ?
        history.push("/adminAccount") : toast.warn(' Please Enter Valid Information !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      return null


    })
  }else {
    toast.info("Dear, Candidate  Enter Valid Capcha...Don't Copied Type Text", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }
  }


  // Load State answer Give by Candidate

  const handleChangeInput = (e) => {

    dispatch({ type: 'CurrQueAnswer', payload: { ...state.CurrQueAnswer, Option: e.target.value, OptionText: e.target.title } })
  }

  // Loadind Next Question by pressing Next Button

  const handleNextQuestion = (e) => {
    e.preventDefault();
    state.MyAnswers.map((question, INDEX) => {
      if (question.Question === state.CurrQueAnswer.Question) {
        state.MyAnswers.splice(INDEX, 1, { ...question, Option: state.CurrQueAnswer.Option, OptionText: state.CurrQueAnswer.OptionText })
        dispatch({ type: 'MyAnswers', payload: state.MyAnswers })



        if (INDEX < state.MyAnswers.length - 1) {
          state.MyAnswers.map((que, IND) => {
            if (que.Question === state.CurrQueAnswer.Question) {

              dispatch({ type: 'CurrQueAnswer', payload: state.MyAnswers[IND + 1] })
            }
            return null;
          });
        } else {

          if (window.confirm("Do You Want To End Examination")) {
            history.push("/myResult");
            clearInterval(endExam.current);

          }
        }



      }
      return INDEX;
    });
  }

  // Button For Clear Options

  const handleClearOptions = (e) => {
    e.preventDefault();
    state.MyAnswers.map((question, INDEX) => {
      if (question.Question === state.CurrQueAnswer.Question) {
        state.MyAnswers.splice(INDEX, 1, { ...question, Option: "", OptionText: "" })
        dispatch({ type: 'MyAnswers', payload: state.MyAnswers })
        if(state.MyAnswers.length>INDEX+1){
          dispatch({ type: 'CurrQueAnswer', payload: state.MyAnswers[INDEX + 1] })

        }
        
        
      }
      return INDEX;
    });
  }



  // Loadind Prevous Question by pressing Previos Button


  const handlePrevQuestion = (e) => {
    e.preventDefault();

    if (state.MyAnswers.length > 1) {
      state.MyAnswers.map((que, ind) => {
        if (que.Question === state.CurrQueAnswer.Question) {
          // console.log(que)
          dispatch({ type: 'CurrQueAnswer', payload: state.MyAnswers[ind - 1] })

        }
        return null;
      });

    } else {
      alert("No Question");
      dispatch({ type: 'CurrQueAnswer', payload: state.MyAnswers[0] })


    }
  }

 const selectQueByPanel=(e)=>{
   let QueInd=Number(e.target.value)-1
  dispatch({ type: 'CurrQueAnswer', payload: state.MyAnswers[Number(QueInd)] })

 }


  return (
    <div>
      <ToastContainer />
      <div className="ExamName bg-aqua w-100 text-center p-2 ">SCC EXAM</div>
      <AppContext.Provider value={{
        state: { state: state,endExam:endExam },
        handler: {
          handleChangeInput: handleChangeInput,
          handleNextQuestion: handleNextQuestion,
          handlePrevQuestion: handlePrevQuestion,
          UsercheckUserData: UsercheckUserData,
          UserVerification: UserVerification,
          AdminVerification: AdminVerification,
          verifyByAdmin: verifyByAdmin,
          generate: generate,
          selectQueByPanel:selectQueByPanel,
          handleClearOptions:handleClearOptions
        }
      }
      }>

        <Switch>
          <ErrorBoundary>
            <Route exact path="/home" component={Register1} />

            <Route exact path="/register" component={Register1} />

            <Route exact path="/logInCandidate" render={()=><LogInCandidate myHandlerAdmin={UserVerification} myHandlerUsercheck={UsercheckUserData} myHanderCapcha={generate} myState={state} text="Candidate" />} />

            <Route exact path="/candidatesResult" component={CandidatesResult} />

            <Route exact path="/myResult" component={MyResult} />

            <Route exact path="/admin" render={()=><LogInCandidate myHandlerAdmin={AdminVerification} myHandlerUsercheck={UsercheckUserData} myHanderCapcha={generate} myState={state} text="Admin"/>} />

            <Route exact path="/adminAccount" component={AdminAccount} />

            <Route exact path="/verifiedList" component={VerifiedList} />

            <Route exact path="/examPaper" component={ExamPaper} />

            <Route exact path="/questions" component={Questions} />

            <Redirect to="/home" />
          </ErrorBoundary>
        </Switch>


      </AppContext.Provider>

    </div>
  );
}

export default App;
