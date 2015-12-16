参考：http://jasmine.github.io/1.3/introduction.html

# specs
Atomでは[Jasmise](http://jasmine.github.io/1.3/introduction.html)をspecフレームワークとして使っています。必須ではありませんが、新機能にはspecをつけるべきでしょう。Atomのテストに関するフライトマニュアルを訳しながら、実際にspecを書いてみます。

## 新しくspecを作る
コアパッケージのspecがそれぞれ[Atom specs](https://github.com/atom/atom/blob/master/spec/async-spec-helpers.coffee)と[package specs(markdown-preview)](https://github.com/atom/markdown-preview/tree/master/spec)のようにGitHubにあるので大変参考になります。

### specファイルを作る
``spec``ディレクトリに``sample-spec.coffee``のように、末尾が``-spec``のファイルを作ります。

#### describe メソッド
``describe``メソッドは記述と関数を引数に取ります。もし記述が行動を説明するものなら``when``から始まり、ユニット（ひとまとまりの）テストならメソッド名から始まります。
```js
describe "when a test is written", ->
  # contents
```
```js
describe "Editor::moveUp", ->
  # contents
```

#### it メソッド
``it``メソッドも記述と関数を引数に取ります。記述フローを``it``メソッドで作りましょう。例えば、``this should work``の記述は``it this should work``となりうまく読めませんが、``should work``の記述は``it should work``となるので良さそうです。
```js
describe "when a test is written", ->
  it "has some expectations that should pass", ->
    # Expectations
```

#### Expectations
[Jasmine documentation about Expectations](http://jasmine.github.io/1.3/introduction.html#section-Expectations)

シンプルな例
```js
describe "when a test is written", ->
  it "has some expectations that should pass", ->
    expect("apples").toEqual("apples")
    expect("oranges").not.toEqual("apples")
```

### 非同期のspec
#### Promises
これを使うとAtomでは楽。Atomの``waitsForPromise``関数を使うことができます。
```js
describe "when we open a file", ->
  it "should be opend in an editor", ->
    waitsForPromise ->
      atom.workspace.open('c.coffee').then (editor) ->
        expect(editor.getPath()).toContain 'c.coffee'
```
このメソッドは``describe`` ``it`` ``beforeEach`` ``afterEach``関数で使うことができます。
```js
describe "when we open a file", ->
  beforeEach ->
    waitsForPromise ->
      atom.workspace.open 'c.coffee'

    it "should be opened in an editor", ->
      expect(atom.workspace.getActiveTextEditor().getPath()).toCtoContain 'c.coffee'
```
複数のpromisesを待つ必要があるならそれぞれに新しい``waitsForPromise``関数を使います。
```js
describe "waiting for the package to load", ->

  beforeEach ->
    waitsForPromise ->
      atom.workspace.open('sample.js')
    waitsForPromise ->
      atom.packages.activatePackage('tabs')
    waitsForPromise ->
      atom.packages.activatePackage('tree-view')

  it "should have waited long enough", ->
    expect(atom.packages.isPackageActive('tabs')).toBe true
    exoect(atom.packages.isPackageActive('tree-view')).toBe true
```

#### 非同期のコールバック関数
specは非同期関数に``waitsFor``と``runs``関数を使うことができます。
```js
describe "fs.readdir(path, cb)", ->
  it "is async", ->
    spy = jasmine.createSpy('fs.readdirSpy')

    fs.readdir('/tmp/example', spy)
    waitsFor ->
      spy.callCount > 0
    runs ->
      exp = [null, ['example.coffee']]
      expect(spy.mostRecentCall.args).toEqual exp
      exoect(spy).toHaveBeenCalledWith(null, ['example.coffee'])
```
[Jasmine documentation about asynchronous tests](http://jasmine.github.io/1.3/introduction.html#section-Asynchronous_Support)

### specの実行
``window:run-package-specs``:specディレクトリにあるすべてのspecを実行<br>
``window:run-all-specs``:Atomコアのspecと、すべての初期パッケージspecを実行<br>
<br>
制限されたspecのサブセットを実行するには``fdescribe``か``fit``メソッドを使います。ひとつあるいは幾つかのspecにフォーカスすることが可能です。
```js
describe "when a test is written", ->
  fit "has some expectations that should pass", ->
    expect("apples").toEqual("apples")
    expect("oranges").not.toEqual("apples")
```

#### CI環境での実行
[Travis CI For Your Packages](http://blog.atom.io/2014/04/25/ci-for-your-packages.html)<br>
[AppVeyor CI For Your Packages](http://blog.atom.io/2014/07/28/windows-ci-for-your-packages.html)
