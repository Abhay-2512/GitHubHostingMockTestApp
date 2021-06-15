import React, { useState, useEffect } from 'react'
import AppContext from './AppContext';
import Questions from './Components/Questions';
// import Register from './Components/Register';
import Register1 from './Components/Register1';
import LogInCandidate from './Components/LogInCandidate';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import MyResult from './Components/MyResult';
import ErrorBoundary from './Components/ErrorBoundary';
import Admin from './Components/Admin/Admin';
import AdminAccount from './Components/Admin/AdminAccount';
import VerifiedList from './Components/Admin/VerifiedList';
import ExamPaper from './Components/Admin/ExamPaper';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import MyExamPrint from './Components/MyExamPrint';


let URL = "http://localhost:3004/QuestionPaper";
let URL2 = "http://localhost:3004/CandidateRegInfo";
let URL3 = "http://localhost:3004/AdminRegInfo";


function App() {

  let history = useHistory();

  const [ExamTime, setExamTime] = useState(0);

  // State To Load server Data To Verify Registerd USer
  const [VerifyUser, setVerifyUser] = useState([]);

  // State To Load server Data To Verify Registerd Admin

  const [VerifyAdmin, setVerifyAdmin] = useState([]);

  // List Of Verified Candidate By Admin  

  const [VerifiedByAdmin, setVerifiedByAdmin] = useState([]);

  // State To Store and Collect User Entered Infomation
  const [UserCheck, setUserCheck] = useState({
    UserID: "",
    Password: ""
  });

  // Exam Paper Set Question bt Admin handle state
  // const [ExamQuestion, setExamQuestion] = useState(
  //   {
  //     id: 1,
  //     CureAnswer: "",
  //     Question: "",
  //     Answers: [],

  //   }
  // )



  // Examination States After Verifying the Candidate

  // load all Questions For Examination and Store into State
  const [AllQuestions, setAllQuestions] = useState([]);

  // State To Collect Answer choosen By Candidate
  const [MyAnswers, setMyAnswers] = useState([]);

  // console.log(VerifiedByAdmin);
  // State to Load Question ONe by One
  const [CurrQueAnswer, setCurrQueAnswer] = useState({});


  // LOad All Questions into state array of object when component mount first[]
  useEffect(() => {
    axios.get(URL).then((res) => {
      let myArray = res.data;
      setCurrQueAnswer(myArray[0]);
      // console.log(res.data);
      setAllQuestions(res.data);
      setMyAnswers(res.data);
      // console.log(typeof myArray);

      // Admin data loading 
      axios.get(URL3).then((res) => {
        // console.log(res.data);
        setVerifyAdmin(res.data);
      }).catch((err) => console.log(err))

    }).catch((error) => console.log(error));

  }, []);

  // Load the candidate registerd INformation into State To verify Registered Candidate

  // LOad The Every time whenever Candidate Registered [RegData]

  useEffect(() => {
    axios.get(URL2).then((res) => {
      // console.log(res.data);
      setVerifyUser(res.data);
    }).catch((err) => console.log(err));
  }, [VerifiedByAdmin])


  // load state onchanging userinput

  const UsercheckUserId = (e) => {
    setUserCheck({ ...UserCheck, UserID: e.target.value })
  }
  const UsercheckPassword = (e) => {
    setUserCheck({ ...UserCheck, Password: e.target.value })
  }

  // chacking Registered user data  is Fair Or Not
  let endExam;
  const UserVerification = (e) => {
    e.preventDefault();
    let ExamStartTime = 0;
    VerifyUser.map((item) => {
      if ((item.UserID === UserCheck.UserID) && (item.Password === UserCheck.Password) && (item.Status === true)) {
        ExamStartTime = 5000;
        let ExamTotalTime = (1000 * 60 * 2);
        let ExamEndTime = ExamTotalTime + ExamStartTime;
        toast.success("hello candidate Exam Will Start within 5 Seconds !", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // alert("hello candidate Press OK and Exam Will Start within 5 Seconds");
        setUserCheck({ ...UserCheck, UserID: "" });
        setUserCheck({ ...UserCheck, Password: "" });

        setTimeout(() => {
          let CurrentTime = new Date().getTime();

          history.push("/questions");
          endExam = setInterval(() => {
            let ExamCounter = (Number(new Date().setTime(CurrentTime + ExamTotalTime)) - Number(new Date().getTime()));
            setExamTime(ExamCounter);
            console.log(ExamCounter);
          }, 1000)
        }, ExamStartTime);
        setTimeout(() => {

          history.push("/myResult");
          clearInterval(endExam);

        }, ExamEndTime)

      }
      return ExamStartTime;

    })
    if (ExamStartTime) {

    } else {
      toast.info("Dear, Candidate Please Enter Valid Data , Please Check Status ", {
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


  const verifyByAdmin = (e) => {
    let myUserId = e.target.id;
    console.log(myUserId);
    let myCandidate;
    axios.get(`${URL2}/${myUserId}`).then((res) => {
      myCandidate = res.data;
      let newStatus = (myCandidate.Status === true) ? false : true;
      // console.log(res.data);
      axios.put(`${URL2}/${myUserId}`, { ...myCandidate, Status: newStatus })
        .then((respo) => {
          // console.log(respo.data);
          setVerifiedByAdmin([...VerifiedByAdmin, respo.data])
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
      console.log(err)
    });
    // console.log(myCandidate);
  }
  const AdminVerification = (e) => {
    e.preventDefault();
    VerifyAdmin.map((item) => {
      ((item.UserID === UserCheck.UserID) && (item.Password === UserCheck.Password)) ?
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
  }

  // const SaveAndEndExam = () => {
  //   // setState("false");
  //   setMyAnswers([]);
  //   // clearInterval(endExam);
  //   // handleNextQuestion()

  //   // window.location.reload();
  // }

  // Load State answer Give by Candidate

  const handleChangeInput = (e) => {
    // e.target.checked=true;
    setCurrQueAnswer({
      ...CurrQueAnswer, Option: e.target.value, OptionText: e.target.title
    });
    // console.log(CurrQueAnswer);
  }

  // Loadind Next Question by pressing Next Button

  const handleNextQuestion = (e) => {
    e.preventDefault();
    // e.target.setAttribute("checked",false);
    // alert("hi");
    MyAnswers.map((question, INDEX) => {
      if (question.Question === CurrQueAnswer.Question) {

        MyAnswers.splice(INDEX,1,{...question,Option:CurrQueAnswer.Option,OptionText:CurrQueAnswer.OptionText})
        setMyAnswers([...MyAnswers]);

        // if(Number(CurrQueAnswer.id)===1){
        //   setMyAnswers([
        //     ...MyAnswers, { ...question, Option: CurrQueAnswer.Option, OptionText: CurrQueAnswer.OptionText }
        //   ]);
        //   console.log(MyAnswers);
        //   AllQuestions.map((que,IND) => {
        //     if (que.Question === CurrQueAnswer.Question) {
      
        //       setCurrQueAnswer(AllQuestions[IND + 1]);
        //     }
        //     return null;
        //   });

        // }else{
        //   MyAnswers.map((ele)=>{
        //     if(CurrQueAnswer.id===ele.id){
        //       if(CurrQueAnswer.OptionText===ele.OptionText){
        //         MyAnswers.splice(INDEX,1,ele)
        //         setMyAnswers([...MyAnswers]);
        //         console.log(MyAnswers);
        //         if(MyAnswers.length>INDEX+1){
        //           MyAnswers.map((que,IND) => {
        //             if (que.Question === CurrQueAnswer.Question) {
              
        //               setCurrQueAnswer(MyAnswers[IND + 1]);
        //             }
        //             return null;
        //           });
        //         }else{
        //           AllQuestions.map((que,IND) => {
        //             if (que.Question === CurrQueAnswer.Question) {
              
        //               setCurrQueAnswer(AllQuestions[IND + 1]);
        //             }
        //             return null;
        //           });
        //         }
                

        //       }else{
        //         MyAnswers.splice(INDEX,1,{...question,Option: CurrQueAnswer.Option, OptionText: CurrQueAnswer.OptionText})
        //         setMyAnswers([...MyAnswers]);
        //         console.log(MyAnswers);

        //       }
        //     }else{
        //       setMyAnswers([
        //         ...MyAnswers, { ...question, Option: CurrQueAnswer.Option, OptionText: CurrQueAnswer.OptionText }
        //       ]);

        //       console.log(MyAnswers);
        //       AllQuestions.map((que,IND) => {
        //         if (que.Question === CurrQueAnswer.Question) {
          
        //           setCurrQueAnswer(AllQuestions[IND + 1]);
        //         }
        //         return null;
        //       });

        //     }
        //     return null
        //   })
        // }
        

        // if (CurrQueAnswer.Option) {
          
        //   console.log(MyAnswers);


        //   if (CurrQueAnswer.Option) {
        //     MyAnswers.splice(INDEX, 1, { ...question, Option: CurrQueAnswer.Option, OptionText: CurrQueAnswer.OptionText })
        //     setMyAnswers([...MyAnswers])
        //     console.log(MyAnswers);

        //   }

        // }
        //  else {
        //   setMyAnswers([
        //     ...MyAnswers, { ...question, Option: CurrQueAnswer.Option, OptionText: CurrQueAnswer.OptionText }
        //   ]);
        //   console.log(MyAnswers);
        // }



      }
      return null;
    });
    MyAnswers.map((que,IND) => {
      if (que.Question === CurrQueAnswer.Question) {

        setCurrQueAnswer(MyAnswers[IND + 1]);
      }
      return null;
    });

  }

  // Loadind Prevous Question by pressing Previos Button


  const handlePrevQuestion = (e) => {
    e.preventDefault();
    // alert("hi");

    if(MyAnswers.length>1){
    AllQuestions.map((que,ind) => {
      if (que.Question === CurrQueAnswer.Question) {
        console.log(que)
        setCurrQueAnswer(MyAnswers[ind - 1]);
      }
      return null;
    });

  }else{
    alert("No Question");
  }
  }


  return (
    <div>
      <ToastContainer />
      <div className="ExamName bg-aqua w-100 text-center p-2 ">SCC EXAM</div>
      <AppContext.Provider value={{
        state: {
          AllQuestions, MyAnswers, CurrQueAnswer, VerifyUser, UserCheck, VerifiedByAdmin, ExamTime
        },
        handler: {
          handleChangeInput: handleChangeInput,
          handleNextQuestion: handleNextQuestion,
          handlePrevQuestion: handlePrevQuestion,
          UsercheckUserId: UsercheckUserId,
          UsercheckPassword: UsercheckPassword,
          UserVerification: UserVerification,
          AdminVerification: AdminVerification,
          verifyByAdmin: verifyByAdmin
        }
      }
      }>

        <Switch>
          <ErrorBoundary>
            <Route exact path="/home" component={Register1} />

            <Route exact path="/register" component={Register1} />

            <Route exact path="/logInCandidate" component={LogInCandidate} />

            <Route exact path="/myResult" component={MyResult} />

            <Route exact path="/admin" component={Admin} />

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
