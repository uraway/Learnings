## Building JSON API
React + Rails APIで作られたアプリ

[Isomorphic comments](http://isomorphic-comments.alexfedoseev.com/)

アプリの構成
 - [Rails API](https://github.com/alexfedoseev/isomorphic-comments-api)
 - [Node.js / React app](https://github.com/alexfedoseev/isomorphic-comments-app)

isomorphic/universal Flux app + Rails API のための**Yeoman generator**
[generator-flux-on-rails](https://github.com/alexfedoseev/generator-flux-on-rails)

## RESTful API
RESTful API
- API とは**A**pplication **P**rogram **I**nterfaceの略
- APIはビューレイヤーではない。インターフェイスを持たず、ユーザーが直接操作することはない。
- APIはステートレス。APIはリクエストの前にクライアントのデータを取得することはなく、リクエストを処理し、レスポンスを送り返した後は、クライアントに関するデータを残さない。
- APIはデータをサーブし保管し処理し認証するビジネスロジック。

RESTful APIとのインタラクション
- HTTPメソッド
- ハイパーリンク
