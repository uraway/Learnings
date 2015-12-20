# [Redux](http://rackt.org/redux/index.html)/ˈriːdʌks/<br>
以下全訳ではなく、要約です。自分なりにReduxについて分かりやすい言葉でまとめておきます。適当な日本語訳がない場合や、日本語に訳すとわかりにくくなると判断した語はそのまま使っています。誤訳・分かりにくいところがありましたらコメントでフィードバックをください。<br>
<!-- 発音まとめ -->
<br>
<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Motivation](#motivation)
- [Three Principles](#three-principles)
	- [Single Source Of Truth (SSOT)](#single-source-of-truth-(ssot))
	- [State is read-only](#state-is-read-only)
	- [Changes are made with pure functions](#changes-are-made-with-pure-functions)
- [Prior Art](#prior-art)
- [Ecosystem](#ecosystem)
	- [Tutorials and Articles](#tutorials-and-articles)
- [Actions](#actions)
	- [Action Creators](#action-creators)
	- [Source Code](#source-code)

<!-- /TOC -->

## Motivation
JavaScriptのシングルページアプリケーションではサーバーレスポンスやキャッシュしたデータ、あるいはサーバーにまだ渡していないローカルに作られたデータそれぞれのstateを管理するが、これはとても複雑だ。たとえば、モデルが別のモデルを更新することができるなら、ビューはその別のモデルを更新できるモデルを更新できるし、今度はそのモデルは別のビューを更新するかもしれない。stateがいつ、どうして、どのようにして更新されるのかコントロールを失ってしまっては、自分のアプリの中で何が起こっているのか、もはや理解することができない。<br>
<br>
開発者は最適なアップデート、サーバーサイド・レンダリング、ルーティング前のデータフェッチ等、フロントエンド開発において一般的になるこれら新しい技術を扱うことを求められている。私たちは、今まで出会ったこともない複雑さに直面しているのだ。では、どうする？[諦める？](http://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html)その答えは、ノーだ。<br>
<br>この複雑さは、変化(mutation)と非同期性(asynchronicity)を混交することにある。これは[メントスとコーラ](https://en.wikipedia.org/wiki/Diet_Coke_and_Mentos_eruption)のようなもので、それぞれは素晴らしいものなのだが、混ぜると、ごちゃついてしまう。Reactのようなライブラリは非同期性とDOM操作を取り除くことで、ビューレイヤーにおけるこの問題の解決を狙う。しかし、データのstate管理は開発者に任される。そこにReduxが入り込む。<br>
![MentosAndCoke](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Diet_Coke_Mentos.jpg/800px-Diet_Coke_Mentos.jpg)<br>
<br>
[Flux](http://facebook.github.io/flux/)、[CQRS](http://martinfowler.com/bliki/CQRS.html)、[Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html)を踏まえ、Reduxはどのように、あるいは、いつ、更新が起こるかに対し、特定の制限を課すことで、stateの変化に予測をつけようとしている。この制限はReduxの３つの原則に反映されている。
<br>
<br>
## Three Principles
### Single Source Of Truth (SSOT)
**アプリケーション全体の[state](http://rackt.org/redux/docs/Glossary.html#state)は一つの[store](http://rackt.org/redux/docs/Glossary.html#store)の中のオブジェクトツリーに保存される。**
### State is read-only
**stateを変更する唯一の方法は[action](http://rackt.org/redux/docs/Glossary.html#action)のemit**
### Changes are made with pure functions
**stateツリーがどのようにactionによって変形するのか[reducers](http://rackt.org/redux/docs/Glossary.html#reducer)を使い指定する**

## Prior Art
###### [Flux](https://facebook.github.io/flux/)

Fluxのように、Reduxはモデルの更新ロジックを特定のレイヤーにおくことを規定している。つまりFluxのstoreであり、reduxのreducersである。ソースコードが直接データの変更を叩く代わりに、FluxとReduxはともに、actionと呼ばれるプレーンオブジェクトに、変更を記述する。<br>
<br>
Fluxとは異なり、ReduxはDispatcherの概念を持たない。これはFluxがevent emittersの代わりにピュア関数を用いるためであり、ピュア関数のおかげでFluxアーキテクチャを引き継ぎつつも、より簡単な記述が可能になる。<br>
<br>
もう一つ重要なFluxとの違いは、Reduxはデータを開発者が変更しないと想定していることだ。stateに対し、プレーンなオブジェクトや配列を用いるのはいい。しかし、reducers内において、stateを変更することは推奨されない。ES7の[object spread syntax](https://github.com/sebmarkbage/ecmascript-rest-spread)と[Babel](http://babeljs.io/)を用いて、新しいオブジェクトで返すべきだ。<br>
<br>
技術的には、データを変更する"ピュアでない"reducersを書くことは可能ではあるが、time travel、record/replay、hot reloadingといった開発上の特徴は機能しなくなってしまう。<br>
<br>
###### [Elm](http://elm-lang.org/)
###### [Immutable](http://facebook.github.io/immutable-js/)
###### [Baobab](https://github.com/Yomguithereal/baobab)
###### [Rx](https://github.com/Reactive-Extensions/RxJS)

## Ecosystem
### Tutorials and Articles

- [Redux Tutorial](https://github.com/happypoulp/redux-tutorial) — Learn how to use Redux step by step
- [What the Flux?! Let’s Redux.](https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux) — An intro to Redux
- [A cartoon intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) — A visual explanation of Redux data flow
- [Understanding Redux](http://www.youhavetolearncomputers.com/blog/2015/9/15/a-conceptual-overview-of-redux-or-how-i-fell-in-love-with-a-javascript-state-container) — Learn the basic concepts of Redux
- [Handcrafting an Isomorphic Redux Application (With Love)](https://medium.com/@bananaoomarang/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4) — A guide to creating a universal app with data fetching and routing
- [Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) — A comprehensive guide to test-first development with Redux, React, and Immutable
- [Understanding Redux Middleware](https://medium.com/@meagle/understanding-87566abcfb7a#.l033pyr02) — In-depth guide to implementing Redux middleware
- [A Simple Way to Route with Redux](http://jlongster.com/A-Simple-Way-to-Route-with-Redux) — An introduction to Redux Simple Router

<!-- 2 -->

## Actions
**Actions**はアプリからstoreにデータを送る情報のペイロード。storeに対する唯一のソースだ。<br>
<br>
新しいtodo itemを追加することを表すactionの例をここに示す。
```js
const ADD_TODO = 'ADD_TODO'
```
```js
{
	type: ADD_TODO,
	text: 'Build my first Redux app'
}
```
actionsはプレーンなJavaScriptオブジェクトであり、必ず``type``プロパティを持つ。typeは基本的に文字列の定数で定義される。アプリが大規模になれば、別のモジューに入れて管理するのが良い。
```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```
完了したtodoにチェックをつけるactionを追加する。配列にtodoを格納しているので、indexで特定のtodoを参照する。
```js
{
	type: COMPLETE_TODO,
	index: 5
}
```
最後に現在表示されているtodoの変更に対するaction typeを追加する。
```js
{
	type: SET_VISIBLITY_FILTER,
	filter: SHOW_COMPLETED
}
```

### Action Creators
**action creators**は読んで字のごとくactionを作る関数である。<br>
<br>
Fluxではこのようにaction creatorsはdispatchのトリガーを担う。
```js
function addTodoWithDispatch(text) {
	const action = {
		type: ADD_TODO,
		text
	}
	dispatch(action)
}
```
対照的にReduxのaction creatorsはシンプルにactionを返す。
```js
function addTodo(text) {
	return {
		type: ADD_TODO,
		text
	}
}
```
あるいは自動でdispatchを行う**bound action creators**を作る。
```js
const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch(completeTodo(index))
```
そうすると、直接呼び出すことができる。
```js
boundAddTodo(text)
boundCompleteTodo(index)
```
``dispatch()``関数はstoreから``store.dispatch()``として直接アクセスできるが、[react-redux](http://github.com/gaearon/react-redux) の``connect()``を使ってアクセスすることの方がありそうだ。たくさんのaction creatorsを自動的にまとめて``dispatch()``関数にまとめるために``bindActionCreators()``を使うこともできる。

### Source Code
``actions.js``
```js
/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```

## Reducers
Actionsは何かが起こった事実を描写するが、その反応としてどのようにアプリケーションのstateが変化するのかを特定しない。その仕事はreducersが担う。

### Designing the State Shape
Reduxでは、stateは全てシングルオブジェクトに格納される。コードを書く前に、その形状を考えてみる。オブジェクトとしてのstateの最小の表現はなんだろうか。<br>
<br>
todoアプリでは、次の２つを格納する。

 - The currently selected visibility filter
 - The actual list of todos

```js
{
	VisibilityFilters: 'SHOW_ALL',
	todos: [
		{
			text: 'Consider using Redux',
			completed: true
		},
		{
			text: 'Keep all state in a single tree',
			completed: false
		}
	]
}
```
### Handling actionTypes
stateオブジェクトを決めた次は、reducerを書く。reducerは前のstateとactionを取り、次のstateを返す、ピュア関数。
```js
(previousState, action) => newState
```
``Array.prototype.reduce(reducer, ?initialValue)``に渡す関数のタイプなのでreducerと呼ばれる。reducerがピュアであることはとても重要だ。そのためには、次のことをreducer内で行ってはならない。

- 引数の変更
- APIの呼び出しやルーティングの遷移といった副作用
- ピュアでない関数の呼び出し（e.g.``Date.now``あるいは```Math.random()```)
