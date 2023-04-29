import React, { useState, useEffect } from 'react';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
      .then(response => response.json())
      .then(data => setQuestions(data.results));
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionIndex]: answerIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let newScore = 0;
    const newCorrectAnswers = [];
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        newScore++;
        newCorrectAnswers.push(index);
      }
    });
    setScore(newScore);
    setShowResults(true);
    setCorrectAnswers(newCorrectAnswers);
    setQuestions(questions)
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
            
          <p>{question.question}</p>
          <ul>
            {question.incorrect_answers.map((answer, answerIndex) => {
              const isSelected = selectedAnswers[questionIndex] === answerIndex;
              const isCorrect = correctAnswers.includes(questionIndex) && question.correct_answer === answer;
              return (
                <li
                  key={answerIndex}
                  className={`incorrect-answer${isSelected ? ' selected correct-answers' : ''}`}
                  style={{ backgroundColor: isSelected ? '#ffcccc' : (isCorrect && showResults) ? '#ccffcc' : 'transparent', cursor: 'pointer' }}
                  onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                >
                  {answer}
                </li>
              )
            })}




            <li
              className={`selected-answers${selectedAnswers[questionIndex] === question.correct_answer ? ' selected' : ''}`}
              style={{ backgroundColor: (selectedAnswers[questionIndex] === question.correct_answer && showResults) ? '#ccffcc' : 'transparent', cursor: 'pointer' }}
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

export default Quiz;
