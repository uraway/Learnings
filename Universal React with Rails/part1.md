下記の記事の翻訳です。翻訳記事内の翻訳文以外のコンテンツ、ソースコード、画像の著作権は原作者にあります。

[https://medium.com/@alexfedoseev/isomorphic-react-with-rails-part-i-440754e82a59#.qmlzbf4on:title]

Author<br>
**Alex Fedoseev**<br>
reactive goofy on rails<br>


# Planning the application

この記事では、ReactライブラリとバックエンドとしてのRuby on RailsをベースにしたUniversal("[Isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)")なJavaScriptアプリケーションの構築を目指します。

### The plan
![](http://i.imgur.com/pfufbcQ.png)

**JSON API**となる**Rails**がデータを扱い、サーバーとクライアントと同じJavaScriptコードベースを用いる**React**が**インターフェイス部分**を扱います。注意することは、モバイルアプリとしても、APIとしてRailsを使うこともできます。

進みましょう。ユーザーが**http://my-app.com**を叩いた時、リクエストはExpress + Node.jsのサーバーに送られます。最初のhtmlをレンダリングし、レスポンスを送るためにそのデータを必要とします。なので、httpリクエスト経由でRails APIからフェッチします。データを取得した時、Reactはビュー部分をレンダリングし、Expressはフローを制御するクライアントのJSアプリにhtmlを送ります。ユーザーがサイトのリンクを踏んだ時、アプリはajaxの呼び出しを行い、データをフェッチしてクライアントのビューを更新します。

フロントエンド アプリはメインドメイン（**http://my-app.com**）上に配置されています。しかし、APIに対するオプションがあることに注意しましょう。

- **my-app.com:3000**

  同じドメインの異なるポートです。同じサーバーに２つのアプリを保持することになります。

- **api.my-app.com**

  もうひとつのオプションをお勧めします。サブドメイン（あるいは異なるドメイン）に対して配置します。コードベースを触ることなく、将来的にアプリをスケールすることが可能になります。

次に、ajaxリクエスト経由でAPIからデータを取得する方法について決める必要があります。

### Option 1.Ajax CORS requests

![](http://i.imgur.com/TqobHTu.png)

[same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)のために、あるロケーションからあるロケーションへのajaxリクエストを行うことができません。（ターゲットリソースが同じドメインであっても、違うポートであれば不可能です。）こういったリクエストを可能にするために、 **Cross-Origin Resource Sharing (CORS)** メカニズムを適用する必要があります。

この場合、Railsサイドに特別なhttpヘッダーをセットする必要があるでしょう。

**application_controller.rb**は次のようになります。

```ruby
class ApplicationController < ActionController::API

  before_action :set_origin
  before_action :set_headers

  private

    def set_origin
      @origin = request.headers['HTTP_ORIGIN']
    end

    def set_headers
      if @origin
        allowed = ['lvh.me', 'localhost', 'my-app.com']
        allowed.each do |host|
          if @origin.match /^https?:\/\/#{Regexp.escape(host)}/i
            headers['Access-Control-Allow-Origin'] = @origin
            break
          end
        end
        # or '*' for public access
        # headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Content-Type'
      end
    end

end
```

CORS（特にパブリックアクセス）を可能にすることは、潜在的に**CSRF セキュリティ ホール**を開けてしまうということを心に留めておきましょう。CSRFアタックについての対策として、[こちら](https://github.com/pillarjs/understanding-csrf)を読みましょう。

### Option 2. Proxy ajax calls through front-end server

![](http://i.imgur.com/sqx7KKN.png)

CORSを可能にする代わりに、**nginx**フロントエンド サーバーを通して、リクエストをプロキシすることができます。あらゆるコールは同じドメイン(**my-app.com**)へと送られます。Nginxはふたつの方向に分裂します。

（訳者メモ　proxy: To function as a server for a client device, but pass on the requests to another server for service.）

- my-app.com/*
 ほとんどすべてのリクエストはNode.jsアプリへと渡されます。

- my-app.com/api/*
 `/api`へのコールを除いて、Rails APIへとプロキシされる。

この方法はより安全で、外から見てシステム全体は強固に見えます。なのでこの方法を用いますが、ローカルマシンに追加のセットアップが必要になります。

#### Local setup

**nginx**のインストール

```
$ brew intall nginx
```

**nginx.conf**の編集

```
$ sudo nano /usr/local/etc/nginx/nginx.conf
```

configの**http**ブロックを拡大

```
http {
  upstream app_proxy {
    server lvh.me:3500;
  }
  upstream api_proxy {
    server api.lvh.me:3000;
  }
  server {
    listen 80;
    server_name lvh.me;
    location / {
      proxy_set_header Host $http_host;
      proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass http://app_proxy;
      proxy_redirect off;
    }
    location /api {
      proxy_set_header Host api.lvh.me;
      proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass http://api_proxy/;
      proxy_redirect off;
    }
  }
  server {
    listen 80;
    server_name api.lvh.me;
    location / {
      proxy_set_header Host $http_host;
      proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_pass http://api_proxy;
      proxy_redirect off;
    }
  }
}
```

最後に**nginx**を実行

```
$ sudo nginx
```

実行後、ブラウザで http://lvh.me を訪れることができます。nginxはエラーメッセージを返すでしょう。しかし、Node.jsアプリは未だ動いていないので、大丈夫です。

**nginx**を今は止めておきましょう。
```
$ sudo nginx -s stop
```

#### Host

不必要な往復を避ける為、ホストファイルに**lvh.me**を追加しましょう。
```
$ sudo nano /private/etc/hosts
```

さらに追加。

```
fe80::1%lo0   lvh.me
fe80::1%lo0   api.lvh.me
127.0.0.1     lvh.me
127.0.0.1     api.lvh.me
```

#### 結論

ここまで、アプリの構築についてのプランを立てました。次はアプリケーションのデータを処理するRails APIのセットアップを行います。
