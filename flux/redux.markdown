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
新しいtodo itemを追加することを表すactionの例を示す。
```js
const ADD_TODO = 'ADD_TODO'
```
```js
{
	type: ADD_TODO,
	text: 'Build my first Redux app'
}
```
actionsはプレーンなJavaScriptオブジェクトであり、必ず``type``プロパティを持つ。typeは基本的に文字列の定数で定義される。アプリが大規模になれば、別のモジュールに入れて管理するのが良い。
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
	type: SET_VISIBILITY_FILTER,
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

副作用（side effect）について：[advanced workthrough](http://rackt.org/redux/docs/advanced/index.html)<br>
<br>
reduxははじめに``undefined``stateとともにreducerを呼び出す。ここでアプリの最初のstateを返すことができる。

```js
import { VisibilityFilters } from './actions'

const initialState = {
	VisibilityFilter: VisibilityFilters.SHOW_ALL,
	todos: []
}

function todoApp(state, action) {
	if (typeof state === 'undefined') {
		return initialState
	}

	// For now, don't handle any actions
	// and just return the state given to us.
	return state
}
```
[ES6 default arguments syntax](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters)を使えば、もっとコンパクトに記述できる。
```js
function todoApp(state = initialState, action) {
	// For now, don't handle any actions
	// and just return the state given to us.
		return state
}
```
次に``SET_VISIBILITY_FILTER``を扱う。state上で``visibilityFilter``を変更する。
```js
function todoApp(state = initialState, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				VisibilityFilter: action.filter
			})
		default:
			return state
	}
}
```
注意すべきは次の２点。
1. **``state``を変更してはならない。**
2. **``default``caseでは前のstateを返す。**

### Handling More Actions
もう２つ、扱うべきactionがある。reducerを``ADD_TODO``を扱うようにしてみよう。
```js
function todoApp(state = initialState, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				VisibilityFilter: action.filter
			})
		case ADD_TODO:
		 	return Object.assign({}, state, {
				todos: [
					...state.todos,
					{
						text: action.text,
						completed: false
					}
				]
			})
			default:
				return state
	}
}
```
```js
case COMPLETE_TODO:
	return Object.assign({}, state, {
		todos: [
			...state.todos.slice(0, action.index),
			Object.assign({}, state.todos[action.index], {
				completed:true
			}),
			...state.todos.slice(action.index + 1)
		]
	})
	```
	配列を変化させることなく、特定のアイテムを更新したいので、アイテム前後をsliceする必要がある。この操作をよく使うなら、[react-addons-update](https://facebook.github.io/react/docs/update.html)や[updeep](https://github.com/substantial/updeep)、あるいは[Immutable](http://facebook.github.io/immutable-js/)といったライブラリを使うと良い。

	### Splitting Reducers
	```js
	function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case COMPLETE_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          Object.assign({}, state.todos[action.index], {
            completed: true
          }),
          ...state.todos.slice(action.index + 1)
        ]
      })
    default:
      return state
  }
}
```
``todos``と``visibilityFilter``は完全に独立して更新されているように見える。stateは時に互いに依存し、複雑になるが、ここでは簡単に更新する``todos``を分離した関数に分けることができる。
```js
function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]
		case COMPLETE_TODO:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed: true
				}),
				...state.slice(action.index + 1)
			]
		default:
			return state
	}
}

function todoApp(state = initialState, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				visibilityFilter: action.filter
			})
		case ADD_TODO:
		case COMPLETE_TODO:
			return Object.assign({}, state, {
				todos: todos(state.todos, action)
			})
		default:
			return state
	}
}
```
**これは*reducer composition*と呼ばれ、Reduxアプリのビルドの基礎パターンになる。**<br>
<br>
さらにreducer compositionを見ていこう。次のように``visibilityFilter``を管理するreducerを引き抜くことができる。
```js
function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}
```
そうすると、メインのreducerをそれぞれのstateを管理するreducersを呼び出す関数として書き換え、それらを１つのオブジェクトにまとめることができる。全体のinitialStateeも知る必要はない。最初に``undefined``を与えられた時、子のreducersがそれぞれのinitial stateを返すためだ。
```js
function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]
		case COMPLETE_TODO:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed: true
				}),
				...state.slice(action.index + 1)
			]
		default:
			return state
	}
}

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}

function todoApp(state = {}, action) {
	return {
		visibilityFilter: visibilityFilter(state.visibilityFilter, action),
		todos: todos(state.todos, action)
	}
}
```
**それぞれのreducersはグローバルなstateの自身の部分を管理している。``state``パラメーターはreducerごとに異なり、管理するstateの部分に対応している。**<br>
<br>
これは既に管理しやすそうだ。アプリが大規模になれば、reducersを別ファイルに分けて、独立性を保ったまま異なるデータドメインを管理させることができる。<br>
<br>
最後に、reduxは``todoApp`` が行っているボイラープレートのロジックを行う``combineReducers()``を呼び出すユーティリティーを備えている。
```js
import { combineReducers } from 'redux'

const todoApp = combineReducers({
	visibilityFilter,
	todos
})

export default todoApp
```
これに全く等しい。
```js
export default function todoApp(state = {}, action) {
	return {
		visibilityFilter: visibilityFilter(state.visibilityFilter, action),
		todos: todos(state.todos, action)
	}
}
```
それぞれに異なったキーを与えることもできる。次の２つの結合されたreducerの記法は全く等しい。
```js
const reducer = combineReducers({
	a: doSomethingWithA,
	b: processB,
	c: c
})
```
```js
function reducer(state, action) {
	return {
		a: doSomethingWithA(state.a, action),
		b: processB(state.b, action),
		c: c(state.c, action)
	}
}
```
``combineReducers()``はキーに対応して選択されたstateの部分を持つreducersを呼び出す関数を作り、再びシングルオブジェクトにそれらの結果をまとめ格納する。[It's not magic](https://github.com/rackt/redux/issues/428#issuecomment-129223274)

### Source Code
``reducers.js``
```js
import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

## Store
前のセクションでは、”何が起こったのか”についての事実を表現するactionとそれらactionsに対応したstateを更新するreducersを定義した。<br>
<br>
**store**はこの２つを合わせるオブジェクトである。storeは次の義務を持つ。

- アプリのstateを保持する
- ``getState()``でのstateへのアクセスを許可する
- ``dispatch(action)``でのstateの更新を許可する
- ``subscribe(listener)``でのlistenerの登録を行う

reduxアプリには１つしかstoreを持つことはできない。ロジックを扱うデータを分割したいなら、storeを複数持つのではなく、reducer compositionを使うようにする。<br>
<br>
reducerがすでにあるなら、storeを作るのは簡単。前のセクションで幾つかのreducersを１つにまとめるために``combineReducers()``使った。ここでそれをimportし、``createStore()``に渡す。
```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```
オプションで``createStore()``の二番目の引数に最初のstateを渡すこともできる。
```js
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

### Dispatching Actions
UIがなくても、今のままでロジックをテストすることができます。
```js
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions'

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(completeTodo(0))
store.dispatch(completeTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// Stop listening to state updates
unsubscribe()
```
storeにおいて、stateがどのように変更されるのかを確認することができる。
![](http://i.imgur.com/zMMtoMz.png)

### Source Code
``index.js``
```js
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```

## Data Flow
Reduxアーキテクチャは、一方方向のみのデータフローを原則とする。<br>
<br>
つまり、アプリケーションのすべてのデータは同じライフサイクルを持つので、アプリのロジックが理解しやすくなる。<br>
<br>
データライフサイクルは次の４つである。

1. **``store.dispatch(action)``を呼び出す。**

actionは何が起こったのかを説明する、プレーンなオブジェクト
```js
{ type; 'LIKE_ARTICLE', articleId: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary'} }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```
ニュースの断片を考えてみる。"Mary liked article 42."や、"Read the Redux docs."がtodosリストに追加された。<br>
<br>
アプリ内のどこからでも``store.dispatch(action)``を呼び出すことができる。

2. **Redux storeは与えたreducer関数を呼び出す。**

storeはreducerに現在のstate treeとactionの２つの引数を渡す。例えば、todoアプリではルートに位置するreducerは次のようなものを受け取る。
```js
// The current application state (list of todos and chosen filter)
let previousState = {
	visibleTodoFilter: 'SHOW_ALL',
	todos: [
		{
			text: 'Read the docs.',
			complete: false
		}
	]
}

// The action being performed (adding a todo)
let action = {
	type: 'ADD_TODO',
	text: 'Understand the flow.'
}

// Your reducer returns the next application state
let nextState = todoApp(previousState, action)
```
reducerはピュア関数であることに注意する。次のstateのみを計算する。それは予測が可能であるべきだ。つまり、同じインプットで何回も呼び出しても、同じアウトプットを返すようにする。APIの呼び出しやルート遷移のような副作用を機能させるべきではない。それらはactionがdispatchされる前に行われるべきだ。

3. **ルートのreducerは複数のreducersのアウトプットを１つのstate treeにまとめることができる。**

ルートreducerはストラクチャは開発車次第。``combineReducers()``を用いて、ルートreducerをstate treeの１つの枝を管理する関数に分割できる。<br>
<br>
どのように``combineReducers()``が作用するのか。todosのリストと現在選択されているフィルターの設定のための２つのreducerがあるとする。
```js
function todos(state = [], action) {
	// Somehow calculate it...
	return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL', action) {
	// Somehow calculate it...
	return nextState
}

let todoApp = combineReducers({
	todos,
	visibleTodoFilter
})
```
``combineReducers``によって返された``todoApp``は２つのreducersを呼び出す。
```js
let nextTodos = todos(state.todos, action)
let nextVisibleTodoFilter = visibilityFilter(state.visibilityFilter, aciton)
```
１つのstate treeに一連の結果をまとめることできる。
```js
return {
	todos: nextTodos,
	visibleTodoFilter: nextVisibleTodoFilter
}
```

4. **storeはroot reducerの返す完全なstate treeを格納する。**
``store.subscribe(listener)``で登録されたどのlistenerも、現在のstateを取得するために``store.getState()``を呼び出すことができる。

## Usage with React
ReactとReduxは何の関係もない。ReduxアプリはReactでもAngularでもEmberでもjQueryでもバニラのJavaScriptでも書くことができる。<br>
<br>
とは言うものの、reduxは[React](http://facebook.github.io/react/)や [Deku](https://github.com/dekujs/deku)といったフレームワークと特に相性が良い。それらはUIをstateの関数として描写し、reduxはactionsの応答としてstateの更新を行うからである。<br>
<br>
### Installing React Redux
```
npm install --save react-redux
```
#### Container and Presentational Components
[separating container and presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

|								| Constainer Components 	| Presentational Components |
|___						|___											|___												|
|Location				|Top level, route handlers|Middle and leaf components	|
|Aware of Redux	|Yes											|No													|
|To read data		|Subscribe to Redux state	|Read data from props			  |
|To change data	|Dispatch Redux actions		|Invoke callbacks from props|

todoアプリではビュー階層のトップに１つcontainer componentを持つ。

#### Designing Component Hierarchy
todoアイテムのリストを見せたい。todoaアイテムはクリック時に完了した印として横線が入る。ユーザーが新しいtodoを追加するフィールドを見せたい。フッタには全て/完了したものだけ/まだ完了していないものだけのtodoを切り替えるスイッチを見せたい。<br>
<br>

- ``AddTodo`` is an input field with a button.
		- ``onAddClick(text: string)`` is a callback to invoke when a button is pressed.
- ``TodoList`` is a list showing visible todos.
		- ``todos: Array`` is an array of todo items with { text, completed } shape.
		- ``onTodoClick(index: number)`` is a callback to invoke when a todo is clicked.
- ``Todo`` is a single todo item.
		- ``text: string`` is the text to show.
		- ``completed: boolean`` is whether todo should appear crossed out.
		- ``onClick()`` is a callback to invoke when a todo is clicked.
- ``Footer`` is a component where we let user change visible todo filter.
		- ``filter: string`` is the current filter: 'SHOW_ALL', 'SHOW_COMPLETED' or 'SHOW_ACTIVE'.
		- ``onFilterChange(nextFilter: string)``: Callback to invoke when user chooses a different filter.

これらは全てpresentational componentsであり、データがどこからくるのかどのように変化させるのかに関与しません。<br>
<br>
###W Presentational Componets

``components/AddTodo.js``
```js
import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddClick(text)
    node.value = ''
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
```

``components/Todo.js``
```js
import React, { Component, PropTypes } from 'react'

export default class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        {this.props.text}
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}
```

``components/TodoList.js``
```js
import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
```

``components/Footer.js``
```js
import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
```
これらが正しく動いているかどうかを確かめるために、ダミーの``App``を書く。
``containers/App.js``
```js
import React, { Component } from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

export default class App extends Component {
  render() {
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            console.log('add todo', text)
          } />
        <TodoList
          todos={
            [
              {
                text: 'Use Redux',
                completed: true
              },
              {
                text: 'Learn to connect it to React',
                completed: false
              }
            ]
          }
          onTodoClick={index =>
            console.log('todo clicked', index)
          } />
        <Footer
          filter='SHOW_ALL'
          onFilterChange={filter =>
            console.log('filter change', filter)
          } />
      </div>
    )
  }
}
```
``<App />``を描画するとこうなる。
![](http://i.imgur.com/lj4QTfD.png)

#### Connectiong to Redux
まずはじめに``Provider``を``react-redux``からインポートする必要がある。そして、描画する前に``<Provider>``でroot componentを囲む。

``index.js``

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp)

let rootElement = document.getElementById('root')
render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
)
```
これでcomponentでstoreのインスタンスが利用可能になる。（内部的にはこれはReactの["context"](http://facebook.github.io/react/docs/context.html)によって行われる。）<br>
<br>
次にReduxと繋ぎたいcomponentsを、``react-redux``からの関数である``connect()``で囲む。トップレベルのcomponentかルートハンドラのみでこれは行う。技術的にはどのcomponentもReduxと``connect()``が可能ではあるが、データフローの追跡を容易にするためにこれを複雑にすべきではない。<br>
<br>
``connect()``でラップされたどのcomponentも、``dispatch``関数をpropsとして受け取り、グローバルstateから必要とするものを選び取る。第一の引数のみを``connect()``に渡すことが最もよくある。これは**selector**と呼ばれる関数で、グローバルなstoreのstateを取り、コンポーネントに必要なpropsを返す。
<br>
[reselect](https://github.com/faassen/reselect)
<br>
``containers/App.js``
```js
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter } = this.props
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
```

## Example: Todo List
[Source Code](http://rackt.org/redux/docs/basics/ExampleTodoList.html)
