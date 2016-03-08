
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jQuery'

class FeedTitle extends React.Component {
  constructor() {
    super();
    this.state = ({
      results: []
    });
  }


  componentDidMount() {
    $.ajax({
        url: this.props.url,
        data: {
            q: "select * from data.headers where url = '" + this.props.target + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
            format: "json",
            env: "http://datatables.org/alltables.env"
        },
        type: 'GET',
        dataType: 'json',
        success: function(res) {
          console.log(res.query.results);
          for (var i in res.query.results) {
            console.log(res.query.results[i].title);
          }
          console.log("response");
          this.setState({results: res.results});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(this.props.target, status, err.toString());
        }.bind(this)
      });
  }

  render() {
    return(
      <ol>
        {this.state.results.map(function(index) {
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
  <FeedTitle url="http://query.yahooapis.com/v1/public/yql?callback=?"  target="http://cloud.feedly.com/v3/search/feeds?q=http://uraway.hatenablog.com/feed" />,
  document.getElementById('content')
);
