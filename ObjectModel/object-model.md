# フロントエンド開発入門編

[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=en#document-object-model-dom:title]

こちらのサイトをまとめてみました。リンク先の画像、ソースコードを使用しています。

## オブジェクトモデルの構築

ウェブページをレンダリング（描画）する前に、ブラウザはDOMとCSSOMの構築を行います。ではそのDOM、CSSOMとはなんでしょうか？
## Contents

<!-- TOC depthFrom:3 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Document Object Model (DOM)](#document-object-model-(dom))
- [CSS Object Model (CSSOM)](#css-object-model-(cssom))

<!-- /TOC -->

## TL;DR

Bytes → characters → tokens → nodes → object model.

HTMLマークアップはDocument Object Model (DOM)に、CSSマークアップはCSS Object Model (CSSOM)に変換されます。

DOMとCSSOMは独立したデータ構造です。

Chrome DevTools TimelimeによってDOMとCSSOMの構造と処理コストを見ることができます。

### Document Object Model (DOM)
```html
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html>
```
シンプルなケースで考えてみましょう。ブラウザがこのページを処理するのに必要なことはなんでしょうか。
![processing data](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png)

まず、ブラウザはHTMLの生のバイト(Bytes)を読み取って特定のエンコーディング(UTF-8等)に沿ってキャラクター(characters)に変換します。ブラウザはさらにキャラクターの文字列を`<html>` `<body>`といったトークン(tokens)に変換します。これらのトークンはノード(Nodes)と呼ばれるオブジェクトに変換されます。最後にノードは互いの相関関係を定義され、データストラクチャツリーに組み込まれます。これが、**DOM**と呼ばれる構造です。
<br>

ブラウザがHTMLマークアップをプロセスするときには必ずこれらの手順を踏みます。つまり、次の４つの手順です。

1. 生のバイトをキャラクターに変換する
2. キャラクターのトークンを特定する
3. トークンをノードに変換する
4. DOMツリーを構築する
<br>
<br>

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-timeline.png)

Chrome Dev Toolsを開くと、このプロセスにかかった時間を見ることができます。上の例では、HTMLバイトのチャンク（かたまり）をDOMツリーに変換するのに5msかかっています。もちろん、ページが大きくなればなるほど、この処理にかかる時間も長くなります。

さて、DOMツリーの準備ができました。しかし、ページを描画するのにDOMだけで十分でしょうか？DOMツリーはドキュメントマークアップのプロパティや相関関係を教えてくれますが、それらのエレメントが描画された時、どのように見えるのかはわかりません。

### CSS Object Model (CSSOM)
ブラウザは、DOMの構築とともに``<head>``セクションの中の外部CSSスタイルシートを参照するリンクを読み込みます。

```css
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }
```

もちろんHTMLマークアップのインラインとして直接記述することもできますが、HTMLとCSSの独立させておくことで、コンテンツとデザインを分けて考えることができます。こうすることで、デザイナーはCSS、開発者はHTMLに集中することができるのです。

HTMLと同じように、CSSもブラウザが読み取れる形にコンバートしてあげる必要があります。

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-construction.png)

CSSのバイトはキャラクター、トークン、ノードへと変換され、そして最後にツリーストラクチャに関連付けられます。これが、CSS Object Model (CSSOM)と呼ばれるものです。

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png)

なぜ、CSSOMはこうしたツリー構造を持つのでしょうか。ブラウザはノードに適用することができる最も全体的なルールの描画をまず行います。つまり、ノードが``body``エレメントの子なら、すべての``body``スタイルが適応されます。それから、ブラウザはより細かいルールを適応します。すなわち、この情報の上からの連続的な伝達を"cascade down"と呼びます。

具体的に見ていきましょう。上記のCSSOMツリーでは、``body``エレメント内の*span*タグに囲まれたテクストは、フォントサイズが16pxで赤色です。フォントサイズに関する定義は``body``から``span``へと連続的に伝達されています。しかし、spanタグがpタグの子ならば、コンテンツは表示されません。

ブラウザは、"user agent styles"と呼ばれるデフォルトのスタイルセットを持ちます。スタイルを設定しない時はこれが適応されますし、開発者はこのデフォルトセットの上にスタイルを記述していくことになります。

CSSの処理にはどのくらいの時間がかかるのでしょうか。それはDevToolsの"Recalculate Style"イベントに記録されています。DOMの分析と違って、タイムラインには"Parse CSS"エントリがありません。代わりに、CSSOMツリーの構造と解析、それにこのイベント下の再帰的な計算結果を表示します。

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-timeline.png)

例のスタイルシートは処理に0.6msほどかかり、8つのエレメントにスタイルを反映しています。
