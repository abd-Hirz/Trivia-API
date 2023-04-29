import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import blobs from './assets/blob 5.png'
import Question from "./Question"
import {nanoid} from "nanoid"
console.log(nanoid())

function App() {

  const [question, setQuestion] = useState([])
  

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      let allQuestions = data.results
      allQuestions = allQuestions.map(task =>{
        const id= nanoid()
        return {...task, isHeld: false, id: id}
      })
      setQuestion(allQuestions);
    })
  },[])
  console.log(question)
  
  function getAnswers(value){
   console.log(value)
  
  }

  const myQuestions= question.map((items, index) =>  {
      return( 
        <Question
            getAnswers = {() => getAnswers(index.incorrect_answers.indexOf(incorrect_answers))}
            key={index}
            id={items.id}
            question={items.question} 
            isHeld={items.isHeld}
            answers={items.incorrect_answers}
        /> 
        )
  })






  return (
    <main>
      {myQuestions}
     <button className='btn'>Check answers</button>
    </main>
  )
}

export default App
