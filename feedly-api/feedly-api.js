
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jQuery'

class FeedTitle extends React.Component {
  constructor() {
    super();
    this.state = ({
      entry: []
    });
  }


  componentDidMount() {
    $.ajax({
        url: this.props.url,
        data: {
            q: "select title from feed where url = '" + this.props.target + "'",
            format: "json"
        },
        type: 'GET',
        dataType: 'json',
        success: function(res) {
          for (var i in res.query.results.entry) {
            console.log(res.query.results.entry[i].title);
          }
          this.setState({entry: res.query.results.entry});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(this.props.target, status, err.toString());
        }.bind(this)
      });
  }

  render() {
    return(
      <ol>
        {this.state.entry.map(function(index) {
          return <TitleList key={index.title} index={index} />;
        })}
      </ol>
    );
  }
}

class TitleList extends React.Component {
  render() {
    return (
      <li>{this.props.index.title}</li>
    );
  }
}

ReactDOM.render (
  <FeedTitle url="http://query.yahooapis.com/v1/public/yql?callback=?"  target="http://uraway.hatenablog.com/feed" />,
  document.getElementById('content')
);
