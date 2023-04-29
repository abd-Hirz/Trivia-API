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
  const [allCorrectAnswersQuestions, setallCorrectAnswersQuestions] = useState([])
  
  const handleRefresh = () => {
    window.location.reload();
  }
  const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy";
 
  useEffect(() => {
    async function fetchData() {
      
      const response = await fetch(API_URL);
      const data = await response.json();
      const questions = data.results.map((question) => ({
        ...question,
        answers: shuffle([...question.incorrect_answers, question.correct_answer]),
      }));
      setQuestions(questions);
      setScore(0);
      setShowResults(false);
      setCorrectAnswers([]);
      setWrongAnswers([])
      setallCorrectAnswersQuestions([])
    }
    fetchData();
  }, [API_URL]);



  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prevAnswer => ({
      ...prevAnswer, [questionIndex]:answer
      }))
  }
  const handleSubmitQuiz = () => {
    let newScore = 0;
    
    const newCorrectAnswers = [];
    const wrongSelection = []
    const allCorrectAnswers = []
    questions.forEach((question, index) => {
      allCorrectAnswers.push(question.correct_answer)
      if (selectedAnswers[index] === question.correct_answer) {
        newScore++;
        newCorrectAnswers.push(selectedAnswers[index]);
      }else if(selectedAnswers[index] !== question.correct_answer){
        wrongSelection.push(selectedAnswers[index])
      }
    });
    
    setScore(newScore);
    setShowResults(true);
    setCorrectAnswers(newCorrectAnswers);
    setQuestions(questions)
    setWrongAnswers(wrongSelection)
    setallCorrectAnswersQuestions(allCorrectAnswers)
  }

  return (
    <div>
      <h1>Trivia API Questions</h1>
      < Question
        questions={questions}
        allCorrectAnswersQuestions={allCorrectAnswersQuestions}
        wrongAnswers = {wrongAnswers}
        handleAnswerSelect={handleAnswerSelect}
        selectedAnswers={selectedAnswers}
        handleRefresh = {handleRefresh}
        handleSubmitQuiz = {handleSubmitQuiz}
        score={score}
        showResults={showResults}
      />
      <p className='footer'>Done by Abdullah Al-Hirz</p>
    </div>

    
   
  );
}

export default App
