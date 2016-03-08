# CORSリクエストについてのまとめ

http://www.html5rocks.com/en/tutorials/cors/#disqus_thread
**Author**
Monsur Hossain

### 導入
alice.comにはbob.comがアクセスしたいデータがあるとしよう。このクロスドメインリクエストは従来[same origin policy](https://en.wikipedia.org/wiki/Same_origin_policy) policyによって禁止されている。解決法としては次の3つ。

- [JSONP](http://en.wikipedia.org/wiki/JSONP)
- カスタムプロキシ
- [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors/) (CORS)

JSONPはセキュリティ面に問題があり、カスタムプロキシはセットアップと保守が面倒。ここでは、W3Cの仕様であるCORSを選択する。

CROSリクエストを行うことで、レスポンスに特別なヘッダが付与され、クロスドメインのデータにアクセスすることができるようになる。

## CORSリクエストの作成
以下JavaScriptでクロスドメインリクエストを作成する。

対応しているブラウザは[こちら](http://caniuse.com/#search=cors)
Chrome, Firefox, Opera, Safariはすべて[XMLHttpRequest2 object](http://www.html5rocks.com/en/tutorials/file/xhr2/)を使う。

### イベントハンドラ
XMLHttpRequestには幾つかイベントハンドラが用意されているが、ほとんどの場合`onload`と`onerror`イベントが最低限必要となる。

```javascript
xhr.onload = function() {
 var responseText = xhr.responseText;
 console.log(responseText);
 // process the response.
};

xhr.onerror = function() {
  console.log('There was an error!');
};
```

### withCredential
リクエストにクッキーを付与するため`.withCredentials`プロパティをtrueにする。

```javascript
xhr.withCredentials = true:
```

これが機能するために、サーバーもAccess-Control-Allow-Credentialsレスポンスヘッダを"true"にして、credentialsを可能にする必要がある。

```javascript
Access-Control-Allow-Credentials: true
```

### リクエストの作成
`send()`メソッドを呼び出す。リクエストがbodyを持っているなら、引数に取ることができる。
```javascript
xhr.send();
```

### シンプルリクエスト
JavaScript:
```javascript
var url = 'http://api.alice.com/cors';
var xhr = createCORSRequest('GET', url);
xhr.send();
```
HTTP Request:
```javascript
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
有効なCORSリクエストには[Origin header](http://tools.ietf.org/html/draft-abarth-origin-09)が含まれる。ブラウザによって追加され、ユーザーは操作することはできない。

HTTP Response:
```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

`Access-Control-Allow-Origin` (必須) - オリジンリクエストヘッダか、*をとりあらゆるサイトからのアクセスを許可する。

`Access-Control-Allow-Credentials` (オプション) - クッキーを扱えるようにする。これを`true`にして機能させるには、同時にXMLHttpRequestオブジェクトのwithCredentialsプロパティを`true`にしなければならない。

`Access-Control-Expose-Headers` (オプション) - XMLHttpRequest 2 オブジェクトは以下のレスポンスヘッダの値を返す`getResponseHeaders()`メソッドを持つ。

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

その他のヘッダにクライアントからのアクセスを許可するには、`Access-Control-Expose-Headers`を用いる。

### PUT, DELETE, JSON content
ブラウザはまずpreflightリクエストを行い、サーバーに対し実際のリクエストの許可をもらう。許可が下りて初めて、ブラウザは実際のリクエストを行う。

JavaScript:
```javascript
var url = 'http://api.alice.com/cors';
var xhr = createCORSRequest('PUT', url);
xhr.setRequestHeader(
    'X-Custom-Header', 'value');
xhr.send();
```

Preflight Request:
```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

`Access-Control-Request-Method` - 実際のリクエストのHTTPメソッド。

`Access-Control-Request-Headers` - コンマで区切られた、リクエストに含まれるヘッダのリスト。

HTTPメソッドとヘッダが有効なら、サーバーは次のようなレスポンスを返す。

Preflight Response:
```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
```

`Access-Control-Allow-Origin` (必須) - シンプルレスポンスと同じく、preflightレスポンスもこのヘッダを含む。

`Access-Control-Allow-Methods` (必須) - サポートされるすべてのHTTPメソッド。

`Access-Control-Allow-Headers` (リクエストに`Access-Control-Request-Headers header`が含まれる場合、必須) - サポートされるすべてのリクエストヘッダ。

`Access-Control-Allow-Credentials` (オプション) - シンプルリクエストと同じ。

`Access-Control-Max-Age` (オプション) - リクエストの度にpreflightリクエストを行うと重くなる。preflightレスポンスは、このヘッダに指定された秒数キャッシュされる。

Actual Request:
```javascript
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

Actual Response:
```javascript
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```

サーバーがCORSリクエストを拒否する場合、CORSヘッダを含まないレスポンスが返ってくる。レスポンスにCORSヘッダがないために、ブラウザはリクエストは無効と判断し、実際のリクエストを行わない。

Preflight Request:
```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

Preflight Response:
```javascript
// ERROR - 無効なリクエスト
Content-Type: text/html; charset=utf-8
```

### jQuery
[$.ajax](http://api.jquery.com/jQuery.ajax/)メソッドを用いると、XHRとCORSリクエストの両方を使用することができる。

```javascript
$.ajax({

  //  HTTP メソッド.
  // 'PUT'あるいは'DELETE'で、preflightリクエストをトリガー.
  type: 'GET',

  // リクエストの宛先URL
  url: 'http://updates.html5rocks.com',

  // デフォルトの'application/x-www-form-urlencoded; charset=UTF-8'
  // では、preflightをトリガーしない。
  // application/x-www-form-urlencoded, multipart/form-data, text/plain
  // 以外のタイプを設定すると、preflightをトリガーする。

  xhrFields: {
    // XMLHttpリクエストについての追加の情報
    withCredentials: false
  },

  headers: {

  },

  success: function() {
    // 成功時のレスポンスの扱いを記述
  },

  error: function() {
    // 失敗時のレスポンスエラーの扱いを記述
  }
});
```
