続き...

#### Counting the Words

では、実際にコードを修正して、ワードカウントを表示する小さなモーダルボックスを作っていく。
<br><br>
ダイアログが切り替えられた時、モーダルを表示する直前に文字数をカウントするように、``toggle``コマンドにコードを加える。

```coffeescript
toggle: ->
  if @modalPanel.isVisible()
    @modalPanel.hide()
  else
    #エディタの定義：アクティブなエディタ
    editor = atom.workspace.getActiveTextEditor()
    #wordsの定義：エディタのテクストを取得し、ホワイトスペースで分割、その配列の長さ
    words = editor.getText().split(/\s+/).length
    #View上でsetCountを呼び出し、ワード数を表示
    @wordcountView.setCount(words)
    @modalPanel.show()
```
追加した３行を見てみる。はじめに、``atom.workspace.getActiveTextEditor()``を呼び出すことで、現在のエディタオブジェクトのインスタンスを取得している。
<br><br>
次にその新しいエディタオブジェクト上で``getText()``を呼び出し、正規表現を使いホワイトスペースで分割、その配列の長さを取得することでワードカウントを取得する。
<br><br>
最後にview上で``setCount()``メソッドを呼び出し、モーダルを再度表示することでワードカウントを表示する。。``wordcount-view.coffee``ファイルの最後に次のコードを追加して、このメソッドを定義する。
```coffeescript
setCount: (count) ->
  displayText = "There are #{count} words."
  @element.children[0].textContent = displayText
```
渡されたカウント数を引数に取り、文字列の中に置き、それをviewが扱うエレメントに渡している。

![](https://atom-test.s3-us-west-2.amazonaws.com/docs/images/e9/e9704ae348ec5a065b914e2c5cefc660f6f40d3f/wordcount.png)

#### デバッグ
コードの中に幾つか``console.log``がある。AtomにはChromiumが使われており、ウェブデベロップメントと同じデバッグツールを使うことができる。
<br><br>
``alt-cmd-I``を打つ、あるいは``View > Developer > Toggle Developer Tools``を選ぶとデベロッパーコンソールが開く。

![](https://atom-test.s3-us-west-2.amazonaws.com/docs/images/92/92f3d40644136d0bfca45a9a8040312c29cb8520/dev-tools.png)

#### テスト
specディレクトリにテストが置かれる。[Jasmine](http://jasmine.github.io/)によって実行される。

##### テストの実行
``cmd-alt-ctrl-p``あるいはDeveloper > Run Package Specsから実行する。

![](https://atom-test.s3-us-west-2.amazonaws.com/docs/images/1c/1cd51b037419daa80e573ed6e522f8e26701df11/spec-suite.png)

コマンドラインから``apm test``コマンドを使うことでも実行できる。

#### 公開
##### パッケージの準備
 - package.jsonファイルの``name``,``description``,``repository``フィールドは埋めたか？
 - package.jsonファイルの``version``フィールドは``0.0.0``か？
 - package.jsonファイルの``engine``フィールドは``"engines": {"atom": ">=0.50.0"}``のようになっているか？
 - ``README.md``はルートにあるか？
 - パッケージはGitHubのリポジトリとして存在するか？

##### パッケージの公開
同名のパッケージがないか調べる。``https://atom.io/packages/my-package``にアクセスすることができれば、同名のパッケージが存在するので、名前を変える必要がある。
<br><br>
次のコマンドでパッケージが公開される
```
cd ~/github/my-package
apm publish minor
```
また、バージョンの更新もできる
```
atom publish <version-type>
```
``<version-type>``には``major``,``minor``,``patch``が引数として取られる。
``major``はデフォルトの変更や特徴の削除など、後方互換性のない場合。``minor``は機能の追加や既存のコードの改良などの場合。``patch``はバグ修正の場合に用いられる。
<br><br>
パッケージの公開が成功すれば、atom.io上にパッケージページが公開され、誰でもインストールすることが可能になる。
