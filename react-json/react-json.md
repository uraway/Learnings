# JSONをReactでリスト表示する
## 単一コンポーネント
`this.setState`メソッドでstateとして取得
```javascript
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
        console.log(this.props.targetURL, status, err.toString());
      }.bind(this)
    });
}
```

その初期stateは配列にしておく
```javascript
class FeedTitle extends React.Component {
  constructor() {
    super();
    this.state = ({
      entry: []
    });
  }
```

mapメソッドを使ってstateをリスト表示。その際、ユニークなkeyを渡す。
```javascript

  render() {
    return(
      <ol>
       {this.state.entry.map(function(index) {
         return <li key={index.title}>{index.title}</li>;
       })}
      </ol>
    );
  }
}

ReactDOM.render (
  <FeedlTitle url="http://query.yahooapis.com/v1/public/yql?callback=?"  target="http://uraway.hatenablog.com/feed" />,
document.getElementById('content')
);
```

ソースコード
```javascript
class FeedlTitle extends React.Component {
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
          console.log(this.props.targetURL, status, err.toString());
        }.bind(this)
      });
  }

  render() {
    return(
      <ol>
       {this.state.entry.map(function(index) {
         return <li key={index.title}>{index.title}</li>;
       })}
      </ol>
    );
  }
}

ReactDOM.render (
  <FeedlTitle url="http://query.yahooapis.com/v1/public/yql?callback=?"  target="http://uraway.hatenablog.com/feed" />,
document.getElementById('content')
);
```

## 複数コンポーネント

コンポーネントを複数作る時、keyは内包されたHTMLではなく、コンポーネントに直接渡すことに注意する。
```javascript
class FeedTitle extends React.Component {

~~~~~~

  render() {
    return(
      <ul>
        {this.state.entry.map(function(index) {
          return <TitleList key={index.title} index={index} />;
        })}
      </ul>
    );
  }
}

class TitleList extends React.Component {
  render() {
    <ol>{this.props.index.title}</ol>;
  }
}
```

keyについてはこちら[Keyd Fragments](http://facebook.github.io/react/docs/create-fragment.html)を読むともっと面白い。
