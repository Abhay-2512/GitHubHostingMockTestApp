import React, { useState } from 'react';
import axios from 'axios';
// import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


let URL = "http://localhost:3006/QuestionPaper";


function ExamPaper() {
    const [ExamQuestion, setExamQuestion] = useState(
        {
            id: 1,
            CureAnswer: "",
            Question: "",
            Answers: []



        }
    )
    // const MyAcContext = useContext(AppContext);
    // const {examQuetionInputHandle,addingExamQuestion} = MyAcContext.handler;
    // const {ExamQuestion} = MyAcContext.state;

    const examQuetionInputHandle = (e) => {
        let name = e.target.name;
        if(name==="Answers"){
            setExamQuestion({ ...ExamQuestion, Answers:ExamQuestion.Answers.push(e.target.value)});
        }
        if(name==="id"||name==="CureAnswer"||name==="Question"){
            let val = e.target.value;
            setExamQuestion({ ...ExamQuestion, [name]: val });

        }

    }
    const addingExamQuestion = (e) => {
        e.preventDefault();
        if (ExamQuestion.id && ExamQuestion.Answers && ExamQuestion.CureAnswer && ExamQuestion.Question) {

            let QuestionLoad = ExamQuestion;
            axios.post(URL, QuestionLoad).then((res) => {
                console.log(res.data);
                setExamQuestion({
                    id: 1,
                    CureAnswer: "",
                    Question: "",
                    Answers: []

                })
            }).catch((err) => console.log(err));


        } else {
            toast.info("Plaese Fill All Input Fields", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // alert("Plaese Fill All Input Fields");
        }

    }


    return (
        <div className="w-100">
            <div className="ms-5 my-3 mx-auto">
                <Link to="/register"><button className="btn btn-success my-2" >Back To Home page</button></Link>
            </div>
            <form className="mx-auto border border-1 p-3" style={{ width: "90%" }} onSubmit={addingExamQuestion}>
                <div className="d-flex flex-row justify-content-start my-5">
                    <input type="text" name="id" value={ExamQuestion.id} className="form-control" style={{ width: "40px" }} onChange={examQuetionInputHandle} /><input type="text" value={ExamQuestion.Question} name="Question" className="form-control" onChange={examQuetionInputHandle} />
                </div>
                <h2>Options</h2>
                <div className="d-flex flex-column">
                    <input type="text" name="Answers0" className="form-control my-1 w-50" value={ExamQuestion.Answers0} placeholder="option1" onChange={examQuetionInputHandle}></input>
                    <input type="text" name="Answers1" className="form-control my-1 w-50" value={ExamQuestion.Answers1} placeholder="option1" onChange={examQuetionInputHandle}></input>
                    <input type="text" name="Answers2" className="form-control my-1 w-50" value={ExamQuestion.Answers2} placeholder="option1" onChange={examQuetionInputHandle}></input>
                    <input type="text" name="Answers3" className="form-control my-1 w-50" value={ExamQuestion.Answers3} placeholder="option1" onChange={examQuetionInputHandle}></input>
                    <input type="text" name="Answers4" className="form-control my-1 w-50" value={ExamQuestion.Answers4} placeholder="option1" onChange={examQuetionInputHandle}></input>
                </div>
                <div className="d-flex justify-content-center">
                    <input type="text" className="form-control w-auto my-3" value={ExamQuestion.CureAnswer} name="CureAnswer" placeholder="Correct Answer" onChange={examQuetionInputHandle}></input>
                </div>
                <div className="d-flex justify-content-center">
                    <input type="submit" className="form-control w-auto my-3 btn btn-success" value="Submit Question" placeholder="Correct Answer"></input>
                </div>

            </form>

        </div>
    )
}

export default ExamPaper
