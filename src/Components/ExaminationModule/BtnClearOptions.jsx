import React,{useContext} from 'react'
import AppContext from '../../AppContext';

function BtnClearOptions() {
    const value=useContext(AppContext);
    const {handleClearOptions}=value.handler;
    return (
        <div>
        <button type="button" className="btn btn-success btn" onClick={handleClearOptions}>Clear Option</button>

        </div>
    )
}

export default BtnClearOptions
