import React, { useContext } from 'react'
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom'

function MyResult() {
    const QuizData = useContext(AppContext)
    const { state} = QuizData.state;
    let MyAnswers=state.MyAnswers;
    // const { RegisterPageFromLog } = QuizData.handler;

    let Answered = MyAnswers.filter((ele) => {
        return ele.OptionText !== undefined;
    });
    
    let counter = 0;
    MyAnswers.map((ele) => {
        if (ele.OptionText === ele.CureAnswer) {
            counter++;
            return counter;
        }
        return counter;
    })
    // console.log(counter);
    let myScore=(counter - ((Answered.length-counter) / 3)).toFixed(2);


    return (
        <div className="w-100">
            <h1 className="text-center my-3">Examination Result Analysis</h1>
            <div className="mx-auto my-5" style={{width:"90%"}}>
                <h2>Total Question Attemptted={MyAnswers.length}</h2>
                <h2>Total Questions Answered   = {Answered.length}</h2>
                <h2>Total Questions Correct    = {counter}</h2>
                <div className="d-flex flex-row justify-content-evenly h-auto my-5">
                <div className="text-center my-5">
                    <div className="myRound">{` ${Answered.length}/${MyAnswers.length}`}</div>
                    <h2>Attempted</h2>
                </div>
                <div className="text-center my-5">
                    <div className="myRound">{(( myScore / (MyAnswers.length)) * 100).toFixed(1)}</div>
                    <h2>Percentile</h2>
                </div>
                <div className="text-center my-5">
                    <div className="myRound">{(( myScore / (Answered.length)) * 100).toFixed(1)}</div>
                    <h2>Accuracy</h2>
                </div>
                <div className="text-center my-5">
                    <div className="myRound">{myScore}</div>
                    <h2>Score</h2>
                </div>

                </div>

            </div>
            <div className="w-25 mx-auto py-2 my-2 text-center">
            <Link to="/register"><button className="btn btn-success p-1" >Back To Home page</button></Link>
            </div>

        </div>
    )
}

export default MyResult
