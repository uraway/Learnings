## ローカル開発中のパッケージをインストールする

- ``atom -d``

dev modeでAtomが起動し、``~/.atom/dev/packages/``にあるパッケージが優先的に読み込まれるので、同名のパッケージがある時に便利。

- ``apm link your-package``

パッケージを``/.atom/packages/``に入れる。普通にAtomを起動すれば、そのパッケージが使える状態になっているはず。``-d``オプションをつけると`` /.atom/dev/packages/``入れることができる。
<br>
これを踏まえて、すでにインストール済みのパッケージを開発したいなら、フォーク、クローン後に
```
apm link your-developing-package
atom -d　your-developing-package
```
で良さそう。<br>
もちろん``your-developing-package``のルートディレクトリなら
```
apm link
atom . -d
```
でいけるはず。
