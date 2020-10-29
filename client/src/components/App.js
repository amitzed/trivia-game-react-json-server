import React, { useState, useEffect } from 'react';

import trivia_data from '../apis/trivia_data';

//     // Below picks 10 random questions out of 21
//     // console.log(this.state.dataBank.sort(() => 0.5 - Math.random()).slice(0, 10));

const App = () => {
  const [details, setDetails] = useState([]);

  // state = {
  //   dataBank: []
  // }

  useEffect(() => {
    const fetchData = async () => {
      const response = await trivia_data.get('/trivia-data')

      setDetails(response.data);
    }

    fetchData();
  }, [])

  // componentDidMount() {
  //   trivia_data.get('/trivia-data')
  //   .then((res) => {
  //     const dataBank = res.data;
  //
  //     this.setState({
  //       dataBank
  //     })
  //     // console.log(this.state.dataBank);
  //     // Below picks 10 random questions out of 21
  //     // console.log(this.state.dataBank.sort(() => 0.5 - Math.random()).slice(0, 10));
  //
  //   })
  //   .catch((err) => {
  //     console.error('Something Went Wrong');
  //     console.error(err);
  //   })
  // }

  // render() {
    // const { dataBank } = this.state;

    return (
      <div>

        {details.map(detail => (
          <div key={detail.id}>
            <div>
              <h4>Question #</h4>
            </div>

            <div>
              <h4>{detail.question}</h4>
            </div>

            <div>
              <button>{detail.answers[0]}</button>
              <button>{detail.answers[1]}</button>
              <button>{detail.answers[2]}</button>
              <button>{detail.answers[3]}</button>
            </div>
          </div>
        ))}

        {/* {dataBank.map((bank) => (
          <div key={bank.id}>

            <div>
              <h4>Question #</h4>
            </div>

            <div>
              <h4>{bank.question}</h4>
            </div>

            <div>
              <button>{bank.answers[0]}</button>
              <button>{bank.answers[1]}</button>
              <button>{bank.answers[2]}</button>
              <button>{bank.answers[3]}</button>
            </div>

          </div>
        ))} */}
      </div>
    )
  // }
}

export default App;
