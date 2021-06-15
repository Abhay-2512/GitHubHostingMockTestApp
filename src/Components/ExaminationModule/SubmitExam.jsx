import React,{useContext} from 'react'
import AppContext from '../../AppContext';

function SubmitExam() {
    const value=useContext(AppContext);
    const {handleNextQuestion}=value.handler;

    // document.getElementById("btnSubmit").addEventListener("click",()=>{
    //     handleNextQuestion

    // })
    return (
        <div>
        <button type="button" id="btnSubmit" className="btn btn-success btn" onClick={handleNextQuestion}>Submit Examination</button>

        </div>
    )
}

export default SubmitExam
