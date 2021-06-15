import React, { useContext } from 'react'
import AppContext from '../AppContext';
import domToPdf from 'dom-to-pdf';

// import ReactToPdf from 'react-to-pdf';



function MyExamPrint() {
    const QuizData = useContext(AppContext)
    const myref = React.createRef();
    const { state } = QuizData.state;
    let MyAnswers=state.MyAnswers;

    const genertePdf = () => {

        const element = document.getElementById("demo");
        const Options = { filename: 'abhaybokade.pdf' }
        domToPdf(element, Options, () => {
            return alert("hi");
        })

    }


    return (
        <div>
            <h1 className="text-center">Exam End Thank You!</h1>
            <div ref={myref} id="demo">
                {MyAnswers.map((Que) => {
                    return (

                        <div className="border border-1 my-1 bg-gray" key={Que.toString()}>
                            <div className="d-flex flex-sm-row justify-content-sm-between">
                                <div className="p-2"><b>{`Que No : ${Que.id}`}</b></div>
                                <div className="p-2">{new Date().toLocaleTimeString()}</div>
                            </div>
                            <div className="p-4 h-auto my-1 bg-success text-white" style={{ fontSize: '20px' }}>{` Que ${Que.id} :  ${Que.Question}`}
                            </div>

                            <ul className="d-flex flex-column justify-content-center">
                                {Que.Answers.map((item, ind) => {
                                    return (<li className="d-flex my-1 py-1" style={{ fontSize: '20px' }}><span className="mx-2">{ind + 1}</span><span className="mx-2">{item}</span></li>);
                                })}
                                {(Que.Option === undefined) ?
                                    (<li className="d-flex justify-content-start" style={{ fontSize: '20px', color: 'blue' }}><span className="mx-2">Candidate Answer :</span><span className="mx-2">{`Option : Not Answered `}</span></li>) :
                                    (<li className="d-flex justify-content-start " style={{ fontSize: '20px', color: 'blue' }}><span className="mx-2">Candidate Answer :</span><span className="mx-2">{`Option : ${Que.Option}  => ${Que.OptionText}`}</span></li>)}

                            </ul>
                        </div>
                    )
                })}

                <div className=" text-center w-100 mx-auto">
                    <button className="btn btn-success btn-sm my-2" onClick={genertePdf}>Download</button>
                    {/* <ReactToPdf targetRef={myref} filename="abhay.pdf">
            {({toPdf})=>(
                <button className="w-100 h-100" onClick={toPdf}>Download</button>
            )}
            </ReactToPdf> */}

                </div>
            </div>
        </div>

    );
}

export default MyExamPrint;
