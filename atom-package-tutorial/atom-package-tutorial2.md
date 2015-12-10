続き。
#### 生成されたコードを理解する

``lib``ディレクトリにはロジックを扱うメインの``wordcount.coffee``ファイルと、UIエレメントを扱うビュー（View）クラスの``wordcount-view.coffee``ファイルがある。<br>
後者のファイルをまずは見てみよう。

```coffeescript
module.exports =
class WordcountView
  constructor: (serializedState) ->
    # Create root element
    @element = document.createElement('div')
    @element.classList.add('wordcount')

    # Create message element
    message = document.createElement('div')
    message.textContent = "The Wordcount package is Alive! It's ALIVE!"
    message.classList.add('message')
    @element.appendChild(message)

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()

  getElement: ->
    @element
```
基本的にここで行われていることとしては、Viewクラスが生成された時、シンプルな``div``エレメントが作られ、``wordcount``クラスがそのエレメントに加えられる。そして、"Wordcount package is Alive"テクストがそこに加えられる。``div``を返す``getElement``メソッドもある。``serialize``と``destroy``メソッドは何も行わず、ここでは気にする必要はない。
<br>
<br>
ベーシックなブラウザDOMメソッドを簡単にではあるが使っていることに注意。（ie, ``createElement()``, ``appendChild``）
<br>
次にメインのファイルを見てみよう。
```coffeescript
WordcountView = require './wordcount-view'
{CompositeDisposable} = require 'atom'

module.exports = Wordcount =
  wordcountView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @wordcountView = new WordcountView(state.wordcountViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @wordcountView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace',
      'wordcount:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @wordcountView.destroy()

  serialize: ->
    wordcountViewState: @wordcountView.serialize()

  toggle: ->
    console.log 'Wordcount was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
```
まず最初に、4つのメソッドを定義していることがわかる。必須なのは``activate``メソッドだけだ。``deactivate``と``serialize``メソッドはAtomによって実行されるが、任意のメソッドである。``toggle``メソッドはAtomが実行するメソッドではないため、どこかで呼び出しをしなければならないが、すでに``package.json``ファイルの``activationCommands``セクションで行っている。
<br>
``activate``コマンドはいくつかのことを行っている。ひとつはAtom起動時に自動的に呼び出されるのではなく、``package.json``ファイルで定義された``activationCommands``のひとつが実行された時に初めて呼び出される。つまり``activate``は最初に``toggle``コマンドが実行された時に呼び出される。
<br>
このメソッドはふたつのことを行う。ひとつはViewクラスのインスタンスを生成し、生成したエレメントを非表示のモーダルパネルに加える。
```coffeescript
@wordcountView = new WordcountView(state.wordcountViewState)
@modalPanel = atom.workspace.addModalPanel(
                  item: @wordcountView.getElement(),
                  visible: false
              )
```
もうひとつは、CompositeDisposableクラスのインスタンスを作る。それによって、このプラグインによって呼び出されるコマンド全てを登録し、他のプラグインがこれらのイベントに登録することが可能になる。
```coffeescript
#つまり、Atomがプラグインのコマンド全てをこのクラスのインスタンスとして管理しているということ？（調査中）
# Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
@subscriptions = new CompositeDisposable

# Register command that toggles this view
@subscriptions.add atom.commands.add 'atom-workspace', 'wordcount:toggle': => @toggle()
```
``toggle``メソッドはシンプルに``activate``メソッドで作られたモーダルパネルの表示/非表示を切り変える。
```coffeescript
toggle: ->
  console.log 'Wordcount was toggled!'

  if @modalPanel.isVisible()
    @modalPanel.hide()
  else
    @modalPanel.show()
```

#### このパッケージのフロー
 - Atomが起動する
 - Atomがpackage.jsonを読む
 - Atomがkeymaps, menus, mainfileを読む
 - ユーザーがパッケージのコマンドを実行する
 - Atomがactivateメソッドを実行する
    - divを作るWordCount viewを生成
    - divを非表示のモーダルに渡す
 - Atomがパッケージのコマンドを処理する
    - モーダルが非表示なら表示する
 - ユーザーがパッケージのコマンドを再度実行する
 - Atomがパッケージのコマンドを処理する
    - モーダルが表示なら非表示にする
 - Atomをシャットダウンする
    - serializeメソッド？

続く...
