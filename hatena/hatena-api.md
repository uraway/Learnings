## サーバーとクライアントの通信手段

インターネット上には様々なリソースを要求するクライアントと、それらのリソースを持つサーバーと呼ばれるコンピューターがあります。

これらのサーバーとクライアントが通信する手順をHTTP(HyperText Transfer Protocol)と呼びます。

基本的にはクライアントがHTTP requestを送った時に、それに応じてサーバーが情報をresponseとして送り返します。

## API
API (**A**pplication **P**rogramming **I**nterface)は外部プログラムがTwitterやはてなブログといったアプリケーションの情報を利用する手順や方法を定めたものです。

例えばTwitterのデータを解析するプログラムには、認証方法やURL、クラス、メソッドを定めたTwitter APIを使う必要があります。

### HTTPリクエストには次の４つのメソッドを用いることができます。

1. GET: ソースから情報を取り出す
2. POST: 新しい情報を送る
3. PUT: ソースの情報を更新する
4. DELETE: ソースの情報を削除する

### 認証とAPIキー

多くのAPIでは、アクセスするためにAPIキーが必要になります。

[OAuth](http://oauth.net/2/)と呼ばれる認証プロトコルを用いるAPIもあります。Twitter、Facebookなどのアプリケーションの自分のアカウントのパーミッションを求めるページにリダイレクトされたことがあるなら、おそらくOAuthを使ったことがあるはずです。

APIキーはたいてい次のような長いアルファベットの文字列です。
```
api_key = "FtnaERvahafd1asdf9RaczdaeEWAR99aewEAWB42DFA"
```

### HTTPステータスコード
サーバーに対するリクエストを送ったら、サーバーからクライアントに対してレスポンスが返ってきます。

そのレスポンスは３桁の数字で表され、１、２、３、４、５から始まり、それぞれ異なった意味があります。

- 1xx: リクエストに対し、サーバーが動いています。
- 2xx: リクエストに対し、サーバーは正しいレスポンスを送ります。
- 3xx: レスポンスを送る前に他のことをしています。（リダイレクト等）
- 4xx: リクエストに間違いがあります。
- 5xx: サーバー側に問題があるため、リクエストを処理できません。

### はてなブログAPIを使った例
[はてなブログAPI](http://developer.hatena.ne.jp/ja/documents/blog/apis/atom)を使った例を見ていきましょう。

HTTP の GET/POST/PUT/DELETE を特定の URI に対してリクエストし、そのリクエストに規定の XML 文書を加えて送信することでインタフェースが用意している操作を行うことができます。

本APIにおけるURIの書式は以下のようになります。
`https://blog.hatena.ne.jp/{はてなID}/{ブログID}/atom/entry/{entry_id}`

従ってこのブログのURIは次のようになります。
`https://blog.hatena.ne.jp/uraway/uraway.hatenablog.com/atom/entry/{entry_id}`

はてなブログAPIへのリクエストにはAPIキーが必要です。設定＞詳細設定＞AtomPubからエンドポイントとAPIキーを確認できます。

`hatena.js`
```javascript
var https = require('https');

var HATENAID = ''
var BLOGID = ''
var APIKEY = ''

var options = {
  hostname: 'blog.hatena.ne.jp',
  path: HATENAID + '/' + BLOGID + 'atom/entry',
  auth: HATENAID + ':' + APIKEY,
  method: 'GET'
};
var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
```
