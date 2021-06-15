
import React, { useContext } from 'react'
import AppContext from '../../AppContext';
import BtnNextQue from './BtnNextQue';
import BtnPreveousQue from './BtnPreveousQue';
import ListOfOptions from './ListOfOptions';
import SubmitExam from './SubmitExam';
import logo from './avtaar.jpg'
import BtnClearOptions from './BtnClearOptions'


function Question() {
    const value1 = useContext(AppContext);
    const { state } = value1.state;
    const {selectQueByPanel}=value1.handler
    let ExamTime = state.ExamTime;
    let CurrQueAnswer = state.CurrQueAnswer;
    let MyAnswers = state.MyAnswers;
    return (
        <div className="d-lg-flex flex-row">
        <div style={{flex:'75%'}}>
            <div className="d-flex flex-sm-row justify-content-sm-between">
                <div className="p-2">{`Que No : ${CurrQueAnswer.id ? CurrQueAnswer.id : 0}`}</div>
                <div className="p-2">{`${Number(new Date(ExamTime).getMinutes()) - 30} : ${Number(new Date(ExamTime).getSeconds())}`}</div>
            </div>
            <div className="p-4 h-auto my-1 bg-success text-white" style={{ fontSize: '20px' }}>{` Que ${CurrQueAnswer.id} :  ${CurrQueAnswer.Question}`}
            </div>
            <div className="myOptions">
                <ListOfOptions />
            </div>



            <div className="my-2 w-100 text-center">
                {(Number(CurrQueAnswer.id) === 1) ?
                    (<div className="d-flex justify-content-evenly"><div><BtnClearOptions /></div><div><BtnNextQue /></div></div>)
                    : ((Number(CurrQueAnswer.id) === MyAnswers.length) ? (<div className="d-flex justify-content-evenly"><div><BtnClearOptions /></div><div><BtnPreveousQue /></div>
                        <div><SubmitExam /></div> </div>) : (<div className="d-flex justify-content-evenly"><div><BtnClearOptions /></div><div><BtnPreveousQue /> </div>
                            <div><BtnNextQue /></div> </div>))
                }

            </div>
        </div>
        <div style={{flex:'25%'}} className="bg-aqua d-flex flex-column">
        <div className="my-2">
            <div className="d-flex justify-content-start align-content-center" style={{height:"100px"}}>
                <div className="flex-50"><img src={logo} className="m-1 border border-1 border-black" alt="logoavtar" style={{width:'100px',height:'100px'}} /></div>
                <div className="flex-50 pt-3">Time Left:{`${Number(new Date(ExamTime).getMinutes()) - 30} : ${Number(new Date(ExamTime).getSeconds())}`}</div>
            </div>
        </div>
        <div className="overflow-auto w-100 h-50 d-flex flex-wrap " style={{backgroundColor:'aqua'}}>
            {MyAnswers.map((ele,ind)=>{
                return(
                <input type="button" key={ind} onClick={selectQueByPanel} value={ind+1} className="btn d-flex align-content-center  justify-content-center fs-5 m-2 mx-3  " style={(ele.Option)?{width:"50px",height:'50px',borderRadius:'50%',backgroundColor:'green',border:'5px solid blue',color:'white' }:{width:"50px",height:'50px',borderRadius:'50%',border:'5px solid blue'}} />)
            })}
        </div>
        <div className="d-flex flex-row my-4">
            <div className="w-100" ><span style={{width:"50px",height:'50px',borderRadius:'50%',backgroundColor:'green',border:'5px solid blue',color:'white',fontSize:'30px' }}>0</span>Answered</div>
            <div className="m-2 fs-5 w-100 "><span style={{width:"50px",height:'50px',borderRadius:'50%',border:'5px solid blue'}}>0</span>Not Answered</div>        
        </div>

        </div>
        </div>
    )
}

export default Question;
