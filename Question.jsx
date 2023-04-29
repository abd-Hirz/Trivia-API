

export default function Question(props) {
    
    return (
        <div className='cards'>
        {props.questions.map((question, questionIndex) => (
          <div className='card' key={questionIndex}>
            <h2 className="q--heading" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            <ul>
              {question.answers.map((answer, answerIndex) => {
                const isSelected = props.selectedAnswers[questionIndex] === answer;
                const isCorrect = props.allCorrectAnswersQuestions.includes(answer) && question.correct_answer === answer;
                const isWrong = props.wrongAnswers.includes(answer) && question.correct_answer !== answer;
                const styles={
                   backgroundColor: isCorrect ? '#ccffcc' : isWrong ? '#F8BCBC' :isSelected  ? '#D6DBF5' : 'transparent', cursor: 'pointer' 
                }
                return (
                  <li
                    key={answerIndex}
                    className={`incorrect-answer ${isSelected ? ' selected correct-answers' : isCorrect?'correct-answers':''}`}
                    style={styles}
                    onClick={() => props.handleAnswerSelect(questionIndex, answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  >
                   
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <div className='submit-results-container'>
          {props.showResults && <h3>Your score: {props.score} / {props.questions.length} correct answers</h3>}
          <button className={`btn ${!props.showResults?"new-question": ''} `} onClick={props.handleRefresh}>New Question</button>
          {props.questions && <button className={`btn ${props.showResults?"new-question": ''} `} onClick={props.handleSubmitQuiz}>Submit Answers</button>}
              
        </div>
      </div>
    )
}
