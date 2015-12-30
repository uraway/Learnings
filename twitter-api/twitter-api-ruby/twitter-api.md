# Twitter API with Ruby

## HTTP

**HTTP**(**H**yper**T**ext **T**ransfer **P**rotocol)とは、サーバーとクライアントのやり取りの手順

## クライアント/サーバー

```
Client --- Server --- Client
         /   |   \
        /    |    \
       /     |     \
  Client  Client  Client
```

インターネット上には、様々なリソースを要求するクライアントとそれらのリソースを持つサーバーと呼ばれるコンピューターがあります。クライアントがHTTP requestを送った時、それに応じてサーバーはHTTP responseを送り返します。

## No REST for the Wicked
サーバー/クライアントの関係は、**REST**(**Re**presentational **S**tate **T**ransfer)と呼ばれる規則を前提条件にします。

## A RESTful API
API(**A**plication **P**rpgramming **I**nterface)は外部のプログラムがアプリケーションの情報等を利用する手順や方法を定めたものです。

例えばTwitterのデータを読み込み、解析するプログラムを書きたいなら、認証やURL、クラス、メソッドの処理を定めたTwitter APIを使う必要があります。

APIやWebサーバーがRESTfulであるために、次の手順を踏まなければなりません。

1. クライアントをサーバーから分離する。
2. ステートレスにする。 （リクエストに対するレスポンスに必要な情報のすべては、各リクエストにおいて利用可能。サーバーを介してリクエストからリクエストにデータやステートを渡さない。）
3. 規定されたHTTPとHTTPメソッドを用いる。

## Making a Request
## The Four Verbs

1. GET: ソースから情報を取り出す
2. POST: 新しい情報をソースに送る
3. PUT: ソースの情報を更新する
4. DELETE: ソースの情報を削除する

## Anatomy of a Request
HTTPリクエストは次の３つの部分から成ります。

1. request line: サーバーにリクエストの種類とどんなリクエストを探しているかを伝える。
2. header: サーバーに追加の情報を伝える。
3. body: データを伝える。

## Authentication & API Keys

多くのAPIはアクセスするためのAPI Keyが必要になります。

**OAuth**と呼ばれる認証プロトコルを用いるAPIもあります。アプリケーションの自分のアカウントのパーミッションを求めるページにリダイレクトされたことがあるなら、おそらくOAuthを使ったことがあるはずです。

API Keyはたいてい次のような長いアルファベットの文字列です。

```
api_key = "ASDF4afdvadAWf3ADsAEW3fv"
```

## HTTP Status Codes

サーバーに対するリクエストを送ったら、今度はサーバーからクライアントに対して　**response**が返ってきます。

サーバーからのレスポンスは３桁の数字で表され、1,2,3,4,5から始まり、それぞれ異なった意味があります。

1xx: リクエストに対しサーバーが動いています

2xx: リクエストに対し正しいレスポンスを送ります

3xx: レスポンスをする前に他の仕事をします（リダイレクト等）

4xx: クライアントのリクエストに間違いがあります

5xx: サーバー側に問題があるため、リクエストを処理できません

## Anatomy of a Response

HTTPレスポンスの構造はHTTPリクエストを反映しています。

response line: ３桁の数字(HTTP status code)を含むレスポンスライン

header: サーバーとレスポンスについての追加の情報

body: レスポンスのテクストを含む

## Verifying Credentials

Twitter APIへのリクエストにはconsumer keyとaccess tokenによる認証が必要です。 まずは https://apps.twitter.com/ で自分のアプリケーションの登録を行いましょう。

登録したら、アプリケーションのKeys and Access Tokensタブを選択し、"Create my acceess token"をクリックしてアクセストークンを取得します。

consumer key, consumer secret, access token, access secretをコピペしましょう。

```ruby
```ruby
require 'rubygems'
require 'oauth'

# Change the following values to those provided on dev.twitter.com
# The consumer key identifies the application making the request.
# The access token identifies the user making the request.
consumer_key = OAuth::Consumer.new(
    "YOUR_CONSUMER_KEY",
    "YOUR_CONSUMER_SECRET")
access_token = OAuth::Token.new(
    "YOUR_ACCESS_TOKEN",
    "YOUR_ACCESS_SECRET")

# All requests will be sent to this server.
baseurl = "https://api.twitter.com"

# The verify credentials endpoint returns a 200 status if
# the request is signed correctly.
address = URI("#{baseurl}/1.1/account/verify_credentials.json")

# Set up Net::HTTP to use SSL, which is required by Twitter.
http = Net::HTTP.new address.host, address.port
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER

# Build the request and authorize it with OAuth.
request = Net::HTTP::Get.new address.request_uri
request.oauth! http, consumer_key, access_token

# Issue the request and return the response.
http.start
response = http.request request
puts "The response status was #{response.code}"
```

## Parsing a User Object

レスポンスとしてJSONデータが返されます。これを解析します。

```ruby
require 'rubygems'
require 'oauth'
require 'json'

# Parse a response from the API and return a user object.
def parse_user_response(response)
  user = nil

  # Check for a successful request
  if response.code == '200'
    # Parse the response body, which is in JSON format.
    # ADD CODE TO PARSE THE RESPONSE BODY HERE
    user = JSON.parse(response.body)

    # Pretty-print the user object to see what data is available.
    puts "Hello, #{user["screen_name"]}!"
  else
    # There was an error issuing the request.
    puts "Expected a response of 200 but got #{response.code} instead"
  end

  user
end

# All requests will be sent to this server.
baseurl = "https://api.twitter.com"

# Verify credentials returns the current user in the body of the response.
address = URI("#{baseurl}/1.1/account/verify_credentials.json")

# Set up HTTP.
http             = Net::HTTP.new address.host, address.port
http.use_ssl     = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER

consumer_key ||= OAuth::Consumer.new "", ""
access_token ||= OAuth::Token.new "", ""

# Issue the request.
request = Net::HTTP::Get.new address.request_uri
request.oauth! http, consumer_key, access_token
http.start
response = http.request(request)
user = parse_user_response(response)
```

## Reading a Tweet
`/1.1/statuses/show.json`: IDを振ったツイートを返す

GETリクストに対し、key/valueのハッシュをパラメーターとして送り、`URL.encode_www_form`にエンコードしましょう。

## Reading a Timeline
エンドポイント（つまりパス）: '/1.1/statuses/user_timeline.json'

```ruby
require 'rubygems'
require 'oauth'
require 'json'

# Now you will fetch /1.1/statuses/show.json, which
# takes an 'id' parameter and returns the
# representation of a single Tweet.
baseurl = "https://api.twitter.com"
path    = "/1.1/statuses/show.json"
query   = URI.encode_www_form("id" => "266270116780576768")
address = URI("#{baseurl}#{path}?#{query}")
request = Net::HTTP::Get.new address.request_uri

# Print data about a Tweet
def print_tweet(tweet)
  # ADD CODE TO PRINT THE TWEET IN "<screen name> - <text>" FORMAT
    puts "Raffi Krikorian - " + tweet["text"]


 puts tweet["user"]["name"]+' - '+ tweet["text"]
end

# Set up HTTP.
http             = Net::HTTP.new address.host, address.port
http.use_ssl     = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER

consumer_key ||= OAuth::Consumer.new "", ""
access_token ||= OAuth::Token.new "", ""

# Issue the request.
request.oauth! http, consumer_key, access_token
http.start
response = http.request request

# Parse and print the Tweet if the response code was 200
tweet = nil
if response.code == '200' then
  tweet = JSON.parse(response.body)
  print_tweet(tweet)
end
```

## Sending a Tweet

Twitterアプリは異なるアクセスレベルを持ちます。上記の例は"read"パーミッションで可能ですが、Tweetを書き込むには"read and write"パーミッションが必要です。

アプリの[詳細設定](https://apps.twitter.com/)から、パーミションを変更することができます。
