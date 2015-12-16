## 実装する
[markdown-toc](https://github.com/nok/markdown-toc)が便利なのだが、更新が滞っているみたいなので、新機能の追加、バグを修正して、新しく[markdown-toc-plus](https://github.com/uraway/markdown-toc-plus)として実装してみた。<br>
マークダウンファイルのヘッダー(#)をtable of contentsとしてまとめあげてくれます。<br>
<br>

``CHANGELOG.md``を見てもらうとわかりやすい。
```md
## markdown-toc-plus v0.1.2
* Insert a line after TOC so that "<!-- /TOC --> " correctly works

## markdown-toc-plus v0.1.0
* add a new feature to manage depth (depthTo, depthFrom)

## markdown-toc-plus v0.0.1
* Fork from markdown-toc(https://github.com/nok/markdown-toc)

## markdown-toc v0.2.3
* Adapt Atom 1.0.0 API
* Add ordered list feature by https://github.com/spjoe
```
## specsを書いてみる

コマンドが正しく動くかぐらいしかテストできてないので、追加していく予定<br>
``spec/markdown-toc-plus-spec.coffee``
```js
describe "the markdown-toc-plus", ->
  [workspaceElement] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)

    waitsForPromise ->
      atom.workspace.open('test.md')


  describe "when the markdown-toc-plus is toggled", ->
    it "is ready for creating a table of contents", ->
      runs -> atom.commands.dispatch workspaceElement, 'markdown-toc-plus:toggle'

      editor = atom.workspace.getActiveTextEditor()
      expect(editor.getPath()).toContain 'test.md'

...
```
![](http://cdn-ak.f.st-hatena.com/images/fotolife/u/uraway/20151216/20151216133056.png)

## 公開する
公開の手順、アップデートの手順は[こちら](http://uraway.hatenablog.com/entry/2015/12/10/Atom%E3%81%AE%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E3%82%8B%EF%BC%88%EF%BC%92%EF%BC%89_1)。

[markdown-toc-plus-spec](https://atom.io/packages/markdown-toc-plus)<br>
README.mdにgifつけると面白そうなのであとでやっておこう。

追記：![](http://www.gfycat.com/NextEntireDragonfly)
