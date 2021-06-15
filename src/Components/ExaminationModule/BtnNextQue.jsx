import React,{useContext} from 'react'
import AppContext from '../../AppContext';

function BtnNextQue() {
    const value=useContext(AppContext);
    const {handleNextQuestion}=value.handler;
    return (
        <div>
        <button type="button" className="btn btn-success btn" onClick={handleNextQuestion}>Save & Next</button>

        </div>
    )
}

export default BtnNextQue
