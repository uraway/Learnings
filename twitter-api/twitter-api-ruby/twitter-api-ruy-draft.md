# XMLとは？　JSONとは？

どちらもデータを記述するためのフォーマット言語です。そのメリット/デメリットを簡単にまとめてみました。

### XML
XML (E**x**tensible **M**arkup **L**anguage)はHTMLによく似た形式の言語です。HTMLと違う点は、自分でタグ名をつけることができる点です。例をみてみましょう。
```xml
<pets>
  <pet>
    <name>Jeffrey</name>
    <species>Giraffe</species>
  </pet>
  <pet>
    <name>Gustav</name>
    <species>Dog</species>
  </pet>
  <pet>
    <name>Gregory</name>
    <species>Duck</species>
  </pet>
</pets>
```
##### XMLのメリット

-　マークアップ言語であること（データの内容と同時に、タグとして特定の記号を利用して付加情報が記述されている）
- 名前空間に対する独自のサポート(同名のタグであっても個別のURIで識別することができる)
- 詳しくは[XML Schema (W3C)](https://en.wikipedia.org/wiki/XML_Schema_(W3C))を参照

##### XMLのデメリット

- JSONに比べて冗長な記述。同じデータの記述でも、JSONよりデータサイズが大きくなる。

### JSON
JSOM (**Java**S**cript **O**bject **N**otation)はデータ形式がJavaSctiptオブジェクトに似ている言語です。こちらも例を見てみましょう。

```json
{"pets":{"name":"Jeffrey","species":"Giraffe"}}
```

##### JSONのメリット

- 簡明な文法
- JavaScriptと相性が良い
- 詳しくは[JSON Schema](http://json-schema.org/)を参照

##### JSONのデメリット

- 文法が簡明すぎて大きなデータを扱いにくい


### まとめ
JSONはXMLの後発データフォーマットなので、基本的にはより扱いやすくなっているみたいですね。さらにその前のデータフォーマットであるCSVからすると、どちらもシンタックスの自由度はありませんが、だからこそ誰もがその文法に従って扱うことのできるデータフォーマットになっています。
