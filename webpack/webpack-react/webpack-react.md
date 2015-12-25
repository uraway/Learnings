# Webpack + React + ES6
Webpack + React + ES6の最小構成を考えてみる。

## プロジェクトセットアップ
```
$ npm init
```
#### インストール
webpackとreactをまずはインストール。
``dev server``のグローバルインストールには``sudo``コマンドが必要かも。
```
$ npm install --save react
$ npm install --save-dev webpack
$ npm instal webpack-dev-server -g
```
ReactとES6のトランスフォームに必要なものをインストール。
```
$ npm intall --save-dev babel-loader babel-core babel-preset-react babel-preset-es2015
```

依存関係はこんな感じ。<br>
``package.json``
```javascript
  "dependencies": {
    "react": "^0.14.3"
  },
  "devDependencies": {
    "babel-core": "^6.3.26",
    "babel-loader": "^6.2.0",
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "webpack": "^1.12.9"
  }
```
### Reactコンポーネント
ReactとES6を使って、コードを書いていく。<br>
プロジェクトの構成は次の通り。

```
webpack-react
      |___index.html
      |___hello.jsx
      |___world.jsx
      |___main.js
      |___webpack.config.js
      |___package.json
```
２つのコンポーネントを読み込むhtmlファイル。
``index.html``
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello React</title>
  </head>
  <body>
    <div id="hello"></div>
    <div id="world"></div>
  </body>
</html>
```
"Hello"を表示するコンポーネント。
``hello.jsx``
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render() {
    return (
      <h1>Hello</h1>
    )
  }
}

React.render(
  <Hello />,
  document.getElementById('hello')
)
```
"World"を表示するコンポーネント。
``world.jsx``
```javascript
import React from 'react'
import React from 'react-dom'

class World extends React.Component {
  render() {
    return (
      <h1>World</h1>
    )
  }
}

React.render(
  <World />,
  document.getElementById('world')
)
```
### Webpackでバンドルする
``main.js``と``webpack.config.js``をルートディレクトリに追加。
<br>
<br>
先ほど作ったReactコンポーネントを２つともimportしておく。
``main.js``
```javascript
import Hello from './hello.jsx'
import World from './world.jsx'
```

エントリとローダー、プリセットを指定する。
``webpack.config.js``
```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
```
最後に、生成される``bundle.js``を読み込むように``index.html``を編集する。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello React</title>
  </head>
  <body>
    <div id="hello"></div>
    <div id="world"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```
コマンドを叩いてhttp://localhost:8080/webpack-dev-server/を確認しよう。
```
$ webpack-dev-server --progress --colors --hot
```
