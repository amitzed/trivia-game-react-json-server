import React, { useState, useEffect } from 'react';

import './App.css';
import trivia_data from '../apis/trivia_data';

const App = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await trivia_data.get('/trivia-data')
      .catch((err) => {
        console.error('Something Went Wrong');
        console.error(err);
      })

      const dataBank = response.data;
      // Below picks 10 random questions out of 21: Math.random() returns values between 0 and .0999, so subtracting from 0.5 expands that range. After the array of questions is randomly sorted, the slice() method is used to pull only 10 items out of the randomized array (Which is considered one Round of questions)[from the first array index location(0) to the 10th index location(9) - 10 is written in the slice method because this method goes up to the 10th index but does not include it]
      setDetails(dataBank.sort(() => 0.5 - Math.random()).slice(0, 10));

      // console.log(response.data.sort(() => 0.5 - Math.random()).slice(0, 10));
      // console.log(dataBank.length);
    }

    fetchData();
  }, [])

  const [score, setScore] = useState(0);
  const [scoreWindow, setScoreWindow] = useState(false);
  const [focusQuestion, setFocusQuestion] = useState(0);

  const userAnswerSelect = (correct) => {
    if(!correct) {
      // Show Correct answer on submit
      alert(`Sorry, the correct answer is: ${details[focusQuestion].correct_answer}`)
    }

    if(correct) {
      setScore(score + 1);
      // Show Correct answer on submit
      alert(`CORRECT! ${details[focusQuestion].correct_answer} is the right answer!`)
    }

    const next = focusQuestion + 1;
    if(next < details.length) {
      // console.log(next);
      // console.log(details.length);
      setFocusQuestion(next)
    } else {
      setScoreWindow(true)
    }
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  // If statement below is to prevent details below from throwing undefined error when tryiong to show questions individually without using map() method -- such as using {details[focusQuestion].question} OR {details[1].question}
  if (!details.length) {
    return null;
  }

  return (

    <div className="game-container">

      {
        scoreWindow
        ?
        (
          <div className="ui placeholder segment score-page-wrapper">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider">
                <i className="arrow circle right icon"></i>
              </div>
              <div className="middle aligned row">
                <div className="column">
                  <div className="ui icon header">
                    <i className="check circle outline icon"></i>
                    Your Score: {score} out of {details.length} Questions.
                  </div>
                </div>
                <div className="column">
                  <div className="ui icon header">
                    <i className="clipboard list icon"></i>
                    {/* Below toFixed() used to limit to two decimal places */}
                    Percentage: {(score / details.length).toFixed(2) * 100}%
                  </div>
                  <button onClick={refreshPage} className="ui primary button">
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        :
        (
          <div>
            <h2 className="ui icon header">
              <i className="circular magic icon icon-spin"></i>
              <div className="content">
                Quizzard of Oz
                <div className="question-element-wrapper">
                  <div className="question-number">
                    <span>Question {focusQuestion + 1} of {details.length}</span>
                  </div>

                  <div className="question-data">
                    <h4>{details[focusQuestion].question}</h4>
                  </div>
                </div>
              </div>
            </h2>

            <React.Fragment>
              <div className="multiple-choice-options">
                {details[focusQuestion].options.map((option, index) => (
                  <button className="answer-options-btn" onClick={() => userAnswerSelect(option.correct)} key={index}>{option.answer}</button>
                ))}
              </div>
            </React.Fragment>
          </div>
        )
      }

    </div>
  )
}

export default App;
