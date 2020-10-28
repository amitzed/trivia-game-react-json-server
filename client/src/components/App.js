import React, { Component } from 'react';

import trivia_data from '../apis/trivia_data';

class App extends Component {
  state = {
    details: []
  }

  componentDidMount() {
    trivia_data.get('/trivia-data')
    .then((res) => {
      const details = res.data;

      this.setState({
        details
      })
      console.log(this.state.details);
    })
    .catch((err) => {
      console.error('Something Went Wrong');
      console.error(err);
    })
  }

  render() {
    const { details } = this.state;

    return (
      <div>
        {details.map((detail) => (
          <div key={detail.id}>
            <h2>{detail.question}</h2>
            <h4>ID: {detail.id}</h4>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
