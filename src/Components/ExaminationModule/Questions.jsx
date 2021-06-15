import React from 'react'
// import AppContext from '../AppContext';
// import MyExamPrintA from './MyExamPrintA';
// import MyResult from './MyResult';
// import MyExamPrint from './MyExamPrint';
import Question from './Question';
// import {toast}from 'react-toastify';


function Questions() {
    // const value2 = useContext(AppContext);
    // const { AllQuestions, MyAnswers } = value2.state;
    // if ((AllQuestions.length)===(MyAnswers.length)){
    //     toast.success("Exam End Thank You!", {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     })
// }

    return (
        <div>
            <Question />
        </div>
    )
}

export default Questions;
