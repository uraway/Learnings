# Webpack入門編
## Webpackとは？
![http://webpack.github.io/docs/](http://webpack.github.io/assets/what-is-webpack.png)

フロントエンドにおける依存関係を管理し、まとめて使えるようにしてくれるスグレモノ。[Browserify](http://browserify.org/)より多機能だが、その分学習コストも高い。

## インストール
プロジェクトにインストールする
```
$ npm install webpack --save-dev
```

### デベロッパーツール
```
$ npm install webpack-dev-server --save-dev
```

### チュートリアル
#### コンパイルする
まずは空のディレクトリを用意して、そこにファイルを追加する<br>
``entry.js``を追加
```javascript
document.write("It works.");
```
``index.html``を追加
```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```
webpackコマンドでファイルをコンパイルしバンドルする。
```
$ webpack ./entry.js bundle.js
```
ブラウザで``index.html``を開く。
```
$ open index.html
```
``It works``と表示されるはず。<br>
``bundle.js``を見てみる。
```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	document.write("Webpack works.");


/***/ }
/******/ ]);
```
``browserify``より読みやすい。

#### ファイルの追加
``content.js``を追加
```js
module.exports = "It works from content.js.";
```
``entry.js``を更新
```javascript
+ document.write(require("./content.js"));
```
コンパイルし直す。
```
$ webpack ./entry.js bundle.js
```
ブラウザを更新して``It works from content.js``の表示を確認する。

#### ローダー
cssファイルをアプリケーションに追加しよう。<br>
<br>
webpackはJavaScriptのみを扱うので、``css-loader``と``style-loader``をインストールする。
```
$ npm install css-loader styles-loader
```
ローカルにインストール後、プロジェクトに``node_modules``フォルダがつくられる。

``style.css``の追加
```css
body {
  background: yellow;
}
```
``entry.js``の更新
```javascript
require("!style!css!./style.css");
document.write(require("./content.js"));
```
リコンパイルしてブラウザを更新すると背景色が黄色になっているはず。

#### ローダーのバインド
ファイルの拡張子をローダーにまとめることができる。<br>
``entry.js``の更新
```js
require("./style.css");
document.write(require("./content.js"));
```
```
$ webpack ./entry.js bundle.js --module-bind 'css=style!css'
```
（注：ダブルクオート`""`ではなく、シングルクオート`''`でないと正しくコンパイルされない。[bash: !css: event not found](https://github.com/webpack/webpack/issues/1453)）<br>
ブラウザをリロードすると同じ結果を得られる。

#### コンフィグ
``webpack.config.js``の追加
```js
module.exports = {
  entry: "./entry.js",
  output: {
    path: _dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
```
コマンドを叩いてコンパイルする。
```
webpack
```
カレントディレクトリの``webpack.config.js``が読み込まれ、実行される。
#### 監視モード
```
$ webpack --progress --colors --watch
```
変更を監視して、必要があればコンパイルし直す。``progress``オプションをつけるとプログレスバーが表示される。

#### デベロップメントサーバー
```
$ npm install webpack-dev-server -g
$ webpack-dev-server --progress --colors
```
ローカルサーバーが立ち上がり、http://localhost:8080/webpack-dev-server/ にブラウザでアクセスすることができる。変更を監視し、webpackがリコンパイルした時に、自動的にブラウザを更新してくれる。
