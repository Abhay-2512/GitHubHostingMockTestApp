import React,{useContext} from 'react'
import AppContext from '../../AppContext';


function BtnPreveousQue() {
    const value=useContext(AppContext);
    const {handlePrevQuestion}=value.handler;
    return (
        <div>
        <button type="button" className="btn btn-success btn" onClick={handlePrevQuestion}>Prev Question</button>
            
        </div>
    )
}

export default BtnPreveousQue
