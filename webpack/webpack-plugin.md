#　いつまでimport Reactしているつもり？ Webpack-ProviderPlugin

1日に何回import宣言を書いていますか？

```javascript
import React from 'react'
import ReactDOM 'react-dom'
import $ from 'jquery'
```

ファイルごとにいちいちimportするのはめんどくさいですよね。書き忘れるとエラーも起こすし。

そこで活躍するのがWebpackのProviderPluginです。使い方は次のように、インスタンス内に変数に対応するモジュールを定義します。

```javascript
new webpack.ProvidePlugin({
  'React':      'react',
  'ReactDOM':   'react-dom',
  '$':          'jquery',
  'jQuery':     'jquery'
})
```

`webpack.consfig.js`はこんな感じになります。
```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React':      'react',
      'ReactDOM':   'react-dom',
      '$':          'jquery',
      'jQuery':     'jquery'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'jsx?harmony'],
      include: path.join(__dirname, 'src')
    }]
  },
}
```
参考: [Never `import React from ‘react’` again, thanks to Webpack’s ProvidePlugin](https://medium.com/@thejenniekim/never-import-react-from-react-again-thanks-to-webpack-s-provideplugin-69e7feb69e#.vbrfpx5nr)
