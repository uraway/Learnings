# YQLがすごい

前記事では、クロスドメインリクエストについて学びました。しかし、普通にCORSを行っても、No 'Access-Control-Allow-Origin' header is present on the requested resourceと返されるAPIがあります。セキュリティの問題からAPIが許可していないためです。

クライアントの操作のみで簡単に取得できないかな〜と探していると、こんなプラグインがありました。

[jquery.xdomainajax](https://github.com/padolsey-archive/jquery.fn/blob/master/cross-domain-ajax/jquery.xdomainajax.js)

これを用いると、クロスドメインのGETリクエストが可能になるみたいです。仕組みはどうなっているのかというと、[YQL](https://developer.yahoo.com/yql/)のAPIを使用しています。

## YQL consoleを使用してfeedデータを確認する

まずは[YQL console](https://developer.yahoo.com/yql/console/)を開いて、data>feedからfeed取得のシンタックスを確認。SQLを学習したことがあるなら躓くことはなさそうですね。

<!-- 過去記事 about SQL -->

![](http://i.imgur.com/b8Ou0NT.png)

YOUR YQL STATEMENTのフィールドにYQLを入力します。urlの値を取得先のfeed URLに変更。全部(*)取得する必要もないので、titleのみ取得にして、testボタンを押すと、結果がずらっと並びます。

## jQuery.ajaxとYQLを合わせてみる

Tree Viewを見ながら、パーサしてみましょう。jQueryと組み合わせると次のようなリクエストが記述できます。

```javascript
$.ajax({
    // Set YQL URL
    url: "http://query.yahooapis.com/v1/public/yql?callback=?",
    data: {
        // YQL statement
        q: "select title from feed where url = 'http://uraway.hatenablog.com/feed'",
        // XML or JSON
        format: "json"
    },
    type: 'GET',
    dataType: 'json',
    success: function(res) {
      for (var i in res.query.results.entry) {
        console.log(res.query.results.entry[i].title);
      }
    },
    error: function(xhr, status, err) {
      console.log(status, err.toString());
    }
  });
}
```

## React + ajax

上記のリクエストをReactのコンポーネントに入れてみた。とりあえずはタイトルを表示するだけですが。

<iframe height='257' scrolling='no' src='//codepen.io/uraway/embed/PZWVGm/?height=257&theme-id=20820&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/uraway/pen/PZWVGm/'>Feed</a> by uraway (<a href='http://codepen.io/uraway'>@uraway</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

参考: [dynamic-children](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)

JSONデータもYQLを通せば取得できるはず。後でやっとこう。

![](http://i.imgur.com/1LfrpXl.png)
