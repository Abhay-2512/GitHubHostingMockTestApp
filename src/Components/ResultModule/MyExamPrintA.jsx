import React from 'react'
// import AppContext from '../AppContext';
import domToPdf from 'dom-to-pdf';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
function MyExamPrint({ values }) {

    // const QuizData = useContext(AppContext)
    const myref = React.createRef();
    let MyAnswers = values.CandidateAnswerKey;
    // const { MyAnswers } = QuizData.state;
    // const { RegisterPageFromLog } = QuizData.handler;

    const genertePdf = () => {

        const element = document.getElementById("demo");
        const Options = { filename: 'abhaybokade.pdf' }
        domToPdf(element, Options, () => {
            return alert("hi");
        })

    }
    return (
        <div>
        <ScrollToTop smooth={true} top={100} style={{backgroundColor:"blue",fontWeight:"bold",borderRadius:"50%"}} color="white" />
            {/* <h1 className="text-center">Exam End Thank You!</h1> */}
            <div ref={myref} id="demo">
                <div className="d-flex justify-content-between">
                    <h3 className="p-1 ">{`Candidate ID :  ${values.CandidateName}`}</h3>
                    <p className="p-1 ">{new Date().toLocaleTimeString()}</p>
                </div>

                {MyAnswers.map((Que, ind) => {
                    return (
                        <div key={ind}>
                            <div className="d-flex justify-content-sm-between fs-5">
                                <div className="p-1 fs-6"><b>{`Que No : (${Que.id} of ${MyAnswers.length})`}</b></div>
                            </div>
                            <div className="d-flex p-3 my-1 bg-success text-white fs-4">{` Que ${Que.id} :  ${Que.Question}`}
                            </div>

                            <div>
                                {Que.Answers.map((item, ind) => {
                                    return (
                                        <div className="d-flex ms-3 fs-6" key={ind + 1}>
                                            <input className="form-check-input" type="radio" name="option" />
                                            <span className="mx-2">{ind + 1}</span>
                                            <span className="mx-2">{item}</span>
                                        </div>);
                                })}
                                {(Que.Option === undefined) ?
                                    (<div className="ms-3 d-flex text-primary fs-6">
                                        <span className="mx-2">Candidate Answer :</span>
                                        <span className="mx-2">{`Option : Not Answered `}</span>
                                    </div>) :
                                    (<div className="ms-3 d-flex text-primary fs-6">
                                        <span className="mx-2">Candidate Answer :</span>
                                        <span className="mx-2">{`Option : ${Que.Option}  => ${Que.OptionText}`}</span>
                                    </div>)}
                                {/* <div className="d-grid gap-3 d-md-flex ms-2 my-3">
                                    <button className="btn btn-success" type="button">Save and Next Question</button>
                                    <button className="btn btn-success" type="button">Previous Question</button>
                                </div> */}
                            </div>
                        </div>
                    )
                })}
                <div className="d-flex justify-content-evenly">
                    <button className="btn btn-success btn-sm my-2" onClick={genertePdf} >Download</button>
                    <Link to="/register" className="float-end"><button className="btn btn-success btn-sm my-2"  >Home Page</button></Link>
                </div>
            </div>
        </div>

    );
}

export default MyExamPrint;

