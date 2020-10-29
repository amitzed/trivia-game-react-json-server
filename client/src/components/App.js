import React, { useState, useEffect } from 'react';

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
      // console.log(details.options.correct);

      // console.log(response.data.sort(() => 0.5 - Math.random()).slice(0, 10));
      // console.log(dataBank.length);
    }

    fetchData();
  }, [])

  const [score, setScore] = useState(0);
  const [focusQuestion, setFocusQuestion] = useState(0);

  const userAnswerSelect = (correct) => {
    if(correct) {
      setScore(score + 1)
    }
  }

  return (

    <div>

      <h2 className="ui icon header">
        <i className="circular magic icon"></i>
        <div className="content">
          Quizzard of Oz
          <div className="sub header">Enter some extra text here</div>
        </div>
      </h2>

      <div>
        Questions {score} out of {details.length}
      </div>

      {details.map(detail => (
        <div key={detail.id}>
          <div>
            <h4>Question #</h4>
          </div>

          <div>
            <h4>{detail.question}</h4>
          </div>

          {detail.options.map((option, index) => (
            <div key={index}>
              <button>{option.answer}</button>
                <span>
                  {option.correct
                  ?
                  <span>True</span>
                  :
                  <span>False</span>
                  }
                </span>
            </div>
          ))}

        </div>
      ))}

    </div>
  )
}

export default App;
