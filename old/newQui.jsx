import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import blobs from './assets/blob 5.png'
import Question from "./Question"
import shuffle from "lodash.shuffle";
function App() {

  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false)
  
  const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";
 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API_URL);
      const data = await response.json();
      const questions = data.results.map((question) => ({
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer],
      }));
      setQuestions(questions);
    }

    fetchData();
  }, []);

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prevAnswer => ({
      ...prevAnswer, [questionIndex]:answerIndex
      }))
  }
  const handleSubmitQuiz = () => {
    let newScore = 0;
    
    const newCorrectAnswers = [];
    const wrongSelection = []
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        newScore++;
        newCorrectAnswers.push(index);
      }else if(selectedAnswers[index] !== question.correct_answer){
        wrongSelection.push(index)
      }
    });
    setScore(newScore);
    setShowResults(true);
    setCorrectAnswers(newCorrectAnswers);
    setQuestions(questions)
    setWrongAnswers(wrongSelection)
  }
  

  return (
    <div className='cards'>
      {questions.map((question, questionIndex) => (
        <div className='card' key={questionIndex}>
         
          <h2 className="q--heading">{question.question}</h2>
          <ul>
            {question.answers.map((answer, answerIndex) => {
              const isSelected = selectedAnswers[questionIndex] === answerIndex;
              const isCorrect = correctAnswers.includes(questionIndex) && question.correct_answer === answer;
              const isWrong = wrongAnswers.includes(questionIndex) && question.correct_answer !== answer;
           
              return (
                <li
                  key={answerIndex}
                  className={`incorrect-answer${isSelected ? ' selected correct-answers' : ''}`}
                  style={{ backgroundColor: isSelected ? '#D6DBF5' : (isCorrect ) ? '#ccffcc' : 'transparent', cursor: 'pointer' }}
                  onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                >
                  {answer}
                </li>
              )
            })}
            {console.log(selectedAnswers)}



            <li
              className={`selected-answers${selectedAnswers[questionIndex] === question.correct_answer ? ' selected' : ''}`}
              style={{ backgroundColor: (selectedAnswers[questionIndex] === question.correct_answer && showResults) ? '#94D7A2' : 'transparent', cursor: 'pointer' }}
              // onClick={() => handleAnswerSelect(questionIndex, question.incorrect_answers)}
              onClick={() => handleAnswerSelect(questionIndex, question.correct_answer)}
            >
              
              {question.correct_answer}
            </li>
          </ul>
        </div>
      ))}
      <button onClick={handleSubmitQuiz}>Submit</button>
      
      {showResults && (
        <div>
          <p>Your score: {score} / {questions.length}</p>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              <p>Your answer: {selectedAnswers[index] === undefined ? 'No answer selected' : question.incorrect_answers.concat(question.correct_answer)[selectedAnswers[index]]}</p>
              {correctAnswers.includes(index) ? (
                <p style={{ color: 'green' }}>Correct answer: {question.correct_answer}</p>
              ) : (
                <p style={{ color: 'red' }}>Correct answer: {showResults && question.correct_answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
