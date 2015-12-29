# JavaScriptでインタラクティビティを追加する
JavaScriptを使うことでコンテンツ、スタイリング、ユーザーの操作に対する挙動といった、ページのほとんどすべての部分を調整することができる。しかし、JavaScriptはDOMの構築をブロックし、ページをレンダリングするときに遅延することにもなります。最適なパフォーマンスにするために、JavaScriptを非同期にし、クリティカルレンダリングパスから不必要なJavaScriptを取り除きましょう。

## TL;DR

JavaScriptはDOMとCSSOMのクエリと変更を行うことができる。

JavaScriptの実行はCSSOMをブロックする。

JavaScriptは明示的に非同期を宣言しない限り、DOMを構築をブロックする。

JavaScriptはブラウザ上で実行される動的な言語で、ページの挙動についてほとんどどの部分でも変更することを可能にします。DOMツリーからエレメントを追加したり除去したりすることで、ページのコンテンツを変更したり、各エレメントのCSSOMのプロパティを変更したり、ユーザーの入力を処理したりすることができます。実践的に理解するために、"Hello World"サンプルに簡単なインラインスクリプトを加えてみましょう。

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
    <script>
      var span = document.getElementsByTagName('span')[0];
      span.textContent = 'interactive'; // change DOM text content
      span.style.display = 'inline';  // change CSSOM property
      // create a new element, style it, and append it to the DOM
      var loadTime = document.createElement('div');
      loadTime.textContent = 'You loaded this page on: ' + new Date();
      loadTime.style.color = 'blue';
      document.body.appendChild(loadTime);
    </script>
  </body>
</html>
```

- JavaScriptによってDOMを操作しspanノードへの隠れた参照を引き出すことができます。レンダーツリーの中で、このノードは非表示ですが、そうだとしてもDOMの中には存在しています。参照を取得したら、（textContent経由で）そのテクストを変更し、さらに計算済みの表示スタイルのプロパティを"none"から"inline"にオーバーライドすることができます。すべての記述と作業が完了すると、ページに"**Hello interactive students**"と表示されます。

- 　JavaScriptによって、DOMに対してエレメントの作成、スタイリング、追加や削除をすることができます。技術的には、ページ全体を大きなひとつのJavaScriptファイルにして、ひとつひとつ要素の作成とスタイリングができますが、HTMLとCSSと一緒に使ったほうが、はるかに簡単に実践できます。JavaScript関数の二番目の部分では、新しいdivエレメントを作成し、テクストコンテンツを設定し、スタイリングし、bodyに追加しています。

![](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/device-js-small.png)

これを用いることで、既存のDOMノードのコンテンツとCSSスタイルを変更し、まったく新しいノードをドキュメントに追加しました。私たちのページがデザイン賞をいただくことはないでしょうが、JavaScriptが私たちに提供する力と柔軟性を示しています。

しかしながら、パフォーマンス面に大きな注意が必要です。JavaScriptには大きな力がありますが、ページがどのようにいつレンダリングされるのかについて大きな制限をかけます。

最初に、上記の例ではインラインスクリプトはページの下部にあることに注意しましょう。というのも、自身でやってみるべきなのですが、このスクリプトを*span*エレメントの上部に移動すると、スクリプトは作動せず、ドキュメントの中に*span*エレメントへの参照が見つからないというエラーになります。つまり、*getElementByTagName('span')*が*null*を返します。これは重要な特徴を示しています。このスクリプトはドキュメントの挿入されたまさにその位置で実行されているということです。HTMLパーサーがscriptタグを見つけた時、DOMの構築処理を停止し、JavaScriptエンジンにコントロールを渡します。JavaScriptエンジンが実行を終えた時、ブラウザは中断されたところからDOMの構築を再開します。

つまり、まだ処理されていないので、スクリプトブロックはページの後半でエレメントを見つけ出すことはできません。言い換えれば、**インラインスクリプトの実行はDOMの構築をブロックし、最初のレンダリングを遅延させます。**

ページにスクリプトを導入することのまた別の小さな特徴としては、DOMだけでなく、CSSOMプロパティも、読み込みと変更が可能になるということです。実際、それはまさしく、spanエレメントの表示プロパティをnoneからinlineに変更した時、サンプルページでしようとしていたことです。結果はどうでしょうか。競合状態が生まれました。

スクリプトを実行しようとした時、ブラウザがCSSOMのダウンロードと構築を終えていなかったなら、どうなるでしょうか。答えは簡単で、パフォーマンスに悪い影響があります。**CSSOMのダウンロードと構築が完了するまで、ブラウザはスクリプトの実行を遅らせ、待っている間は、DOMの構築もブロックされます。**

端的に言えば、JavaScriptはDOM、CSSOM、JavaScriptの間に多くの新しい依存関係を生み、ブラウザが画面上のページを処理しレンダリングする速度に重大な遅延を引き起こすことがあります。

1. ドキュメントにおけるスクリプトの位置は重要です。
2. DOMの構築は、scriptタグがスクリプトに遭遇すると、スクリプトの実行を終了するまで、停止します
3. JavaScriptはDOMとCSSOMのクエリと変更を可能にします。
4. JavaScriptの実行は、CSSOMの準備ができるまで、遅延されます。

"クリティカルレンダリングパスの最適化"というのは、大部分において、HTML、CSS、JavaScriptの依存図を把握し、最適化することを言います。

## パーサーブロッキング vs. 非同期JavaScript

デフォルトでは、JavaScriptの実行は"パーサーブロッキング"です。ブラウザはドキュメントの中のスクリプトに遭遇すると、DOMの構築を中断し、JavaScriptランタイムに制御権を渡し、DOM構築に進む前にスクリプトを実行させます。すでに私たちは前のサンプルでのインラインスクリプトの実践的な例を見てきました。特別な注意を払い、スクリプトの実行を遅らせるための追加のスクリプトを書かなければ、インラインスクリプトは、常にパーサーブロッキングとなります。

scriptタグを通して組み入れられたスクリプトはどうでしょうか。前のサンプルを使って、コードを別のファイルに抽出してみましょう。

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script External</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
    <script src="app.js"></script>
  </body>
</html>
```

app.js

```javascript
var span = document.getElementsByTagName('span')[0];
span.textContent = 'interactive'; // change DOM text content
span.style.display = 'inline';  // change CSSOM property
// create a new element, style it, and append it to the DOM
var loadTime = document.createElement('div');
loadTime.textContent = 'You loaded this page on: ' + new Date();
loadTime.style.color = 'blue';
document.body.appendChild(loadTime);
```

インラインスクリプトの代わりにscriptタグを使用した場合、実行順序に違いはあるでしょうか。もちろん答えはノーです。全く同じ動作になります。どちらのケースでも、ブラウザは処理を停止してスクリプトを実行した後で、ドキュメントの残りの部分を処理します。しかしながら、**外部JavaScriptファイルのケースでは、ブラウザは一時停止して、ディスクやキャッシュ、リモートサーバーからフェッチされるのを待つ必要があり、それがクリティカルレンダリングパスに10~1000msの遅延を追加します。**

ただ、いいことに、回避策があります。デフォルトでは、JavaScriptはパーサーブロッキングで、ブラウザは、スクリプトがページ上で何をしようとしているのか知りません。従って、最悪のケースを想定し、パーサーをブロックします。しかしながら、もしブラウザに合図を送り、ドキュメント内で参照されているまさにその位置でスクリプトを実行する必要はないと伝えることができたなら、どうなるでしょうか。こうすることにより、ブラウザにDOM構築を続行させ、準備が整った時（例えばファイルがキャッシュやリモートサーバーからフェッチした時）スクリプトを実行させることができます。

では、どのようにこのトリックを実現するのでしょうか。それは非常に簡単です。スクリプトを*async*としてマークすれば良いのです。

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path: Script Async</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
    <script src="app.js" async></script>
  </body>
</html>
```
asyncキーワードをスクリプトタグに追加することで、ブラウザは、スクリプトが実行可能になるまで待つ間、DOMの構築をブロックしません。これは、パフォーマンスの大きな向上になります。

Authors
**Ilya Grigorik**
Ilya is a Developer Advocate and Web Perf Guru
