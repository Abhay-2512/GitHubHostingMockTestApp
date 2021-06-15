
import React, { useContext } from 'react'
import AppContext from '../../AppContext';


function ListOfOptions() {
    const value1 = useContext(AppContext);
    const { handleChangeInput } = value1.handler;
    const { state } = value1.state;
    let CurrQueAnswer=state.CurrQueAnswer;
    let myArr = CurrQueAnswer.Answers;
    // let clear=state.Clear;
    // console.log(clear);
    // console.log(typeof myArr);

    return (
        <div className="d-flex flex-column ">
            {myArr.map((item, ind) => {
                return(< React.Fragment key={item.toString()}>
                    {(Number(CurrQueAnswer.Option)===(ind+1))? document.getElementsByClassName("myCheck")[ind].setAttribute("checked",true):null}
                    <div className="d-flex ms-4 my-1 py-1 fs-5" key={item.toString()} >
                        <input className="form-check-input myCheck" key={ind} type="radio" onChange={handleChangeInput} name="Que" value={ind + 1} title={item} />
                        <span className="mx-2" key={ind +1}>{ind + 1}</span>
                        <span className="mx-2" key={item.toString()}>{item}</span>
                    </div></React.Fragment>)
            })}

        </div>
    )
}

export default ListOfOptions
