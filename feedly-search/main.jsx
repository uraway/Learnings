import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FeedlySearch extends React.Component {
  constructor() {
    super();
    this.state = ({
      inputValue: '',
    });
    this.clicked = this.clicked.bind(this);
  }
  chaneged(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  clicked() {
    axios({
      url: 'http://hatenablog.com/oembed?url=' + this.state.inputValue,
      method: 'GET',
      auth: {
        username: 'uraway',
        password: 'tp65cffdkz',
      },
    })
      .then(function(response){
        console.log(response);
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.log('Error', response.message);
        } else {
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      });
  }
  render() {
    return (
      <div>
        <input onChange={this.chaneged} value={this.state.inputValue} ></input>
        <button onClick={this.clicked}>Search</button>
      </div>
    );
  }
}
ReactDOM.render(
  <FeedlySearch targetURL="https://blog.hatena.ne.jp/uraway/uraway.hatenablog.com" />,
  document.getElementById('content')
);
