# Googleアナリティクスで自分のアクセスを除外する方法

![](http://seo-scene.com/wp-content/uploads/2014/02/google-analytics.png)

Googleアナリティクスを導入して、ブログのアクセス解析を行っているのですが、今のままでは自分のアクセスが混じっているので、真のデータ解析結果は出ません。自分のアクセスを除外する方法をちょっと調べてみました。

## IPアドレスでフィルタリング

[Googleアナリティクスで自分のアクセスを除外する方法](http://11dax.com/google-analytics-2-460.html)

これだとIPアドレスが動的なら意味ないですね。次行きましょう。

## Google アナリティクス オプトアウト アドオン

ググってみるといい感じのアドオンを見つけました。導入が楽ちん。
[Google アナリティクス オプトアウト アドオン](https://support.google.com/analytics/answer/181881?hl=ja)

当たり前ですが、導入したブラウザのみのアクセスのトラッキングを除外します。また、ウェブサイト上で実行される Google アナリティクス JavaScript（ga.js、analytics.js、dc.js）に対して、情報を Google アナリティクスへ送らないよう指示します。つまり他のサイトのGoogleアナリティクスにも情報が反映されなくなるみたいです。

アドオンが動いていることを確かめるために、別タブで自サイトを開きながらGoogleアナリティクスのサマリーのアクティブユーザー数が０であることを確認しましょう。

でもこれだと自分のスマホからのアクセスのトラッキングは除外できないんですよね。

[http://www.kukkanen.tokyo/entry/hatenacounter:site]

はてなカウンター導入した方がいいのかな。
