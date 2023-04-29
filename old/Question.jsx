

export default function Question(props) {
    // console.log(props.question)
    // console.log(props.answers)
    // console.log(props.id)
    // const styles = {
    //     backgroundColor: props.isHeld ? "#59E391" : "white"
    // }
    return (
       <div className="question-wrapper">
            <div className="card">
                <h2 className="q--heading">
                {props.question}
                {props.id}
                </h2>
                <div className="q--answers">
                    {props.answers.map((answer,index )=>{
                          return <p id={answer} onClick={props.getAnswers} className="answer selected-answers"> {answer} </p>
                    })}
                    {/* <p className="answer selected-answers"> {props.answers[0]} </p>
                    <p className="answer ">{props.answers[1]}</p>
                    <p className="answer ">{props.answers[2]}</p>
                    <p className="answer">{props.answers[3]}</p> */}
                </div>
            </div>
            <hr/>
            
            
            
       </div>
        
    )
}
