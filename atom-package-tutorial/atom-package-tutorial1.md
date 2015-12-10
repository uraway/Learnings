# Atom パッケージの作成
## Package: Word Count
### Package Generator
コマンドパレットで```Generate Package```を叩く。<br>
プロジェクト名を入力してEnter<br>
以下のフォルダ構成で、新規プロジェクトがAtomに立ち上がる。
```
my-package/
  grammars/
  keymaps/
  lib/
  menus/
  spec/
  snippets/
  styles/
  index.coffee
  package.json
```

#### package.json

メインのモジュールへのパスや依存ライブラリなどのパッケージのメタデータが記述されます。

 - ```main```:パッケージのエントリーポイント。何も書かれていないならAtomは```index.coffee```あるいは```index.js```を探します。
 - ```activationCommands```:パッケージのアクティベーショントリガーのコマンド。
 - ```language-package-name:grammar-used```: (e.g) ```language-javascript:grammar-used```

#### ソースコード
  - ```activate(state)```: パッケージのアクティベート時に呼び出される必須メソッド。
  - ```serialize()```:ウィンドウが閉じられる時に呼び出されるオプションメソッド。のちの```activate```メソッドに渡すデータを返すことができる。
  - ```deactivate()```:ウィンドウが閉じられる時に呼び出されるオプションメソット。ファイルの監視や外部リソースの保持のリリースをここで行う。

#### スタイルシート
stylesディレクトリ内に置かれ、CSS・Lessで記述される。標準でカラーやUIが定義された一連のコンポーネント記述されている。

#### キーマップ

``keymaps``ディレクトリに記述される。

```
'atom-workspace':
  'ctrl-alt-o': 'my-package:toggle'
```

この例では、``my-package:toggle``コマンドは```atom-workspace```エレメントの中においてのみ```ctrl-alt-o```を押すと実行される。

#### アプリケーションメニュー
``menus``フォルダに記述
```
'menu': [
  {
    'label': 'Packages'
    'submenu': [
      'label': 'Word Count'
      'submenu': [
        {
          'label': 'Toggle'
          'command': 'wordcount:toggle'
        }
      ]
    ]
  }
]
```
この例では、"Packages"メニュー内の"Word Count"メニューグループ下に"Toggle"メニューアイテムを置いている。

![](https://atom-test.s3-us-west-2.amazonaws.com/docs/images/1a/1aae982ea8e03f0c7c0409bc0b8efd50073687ab/menu.png)

#### コンテクストメニュー
```
'context-menu':
  'atom-text-editor': [
    {
      'label': 'Toggle Word Count'
      'command': 'wordcount:toggle'
    }
  ]
```
この例ではエディタのペイン内で右クリックした時にポップアップするメニューに"Toggle Word Count"メニューオプションを加えている。

![](https://atom-test.s3-us-west-2.amazonaws.com/docs/images/8a/8ab4a57a78e2c2082bb02feaf3e6184e131e39e2/context-menu.png)

次回へ続く...
