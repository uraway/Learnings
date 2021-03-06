## MoodBar: Lightweight Socializationを通してWikipediaの新規ユーザーを獲得する

### ABSTRACT
オンラインコミュニティはソーシャライゼーションを通して、新規ユーザーを獲得し、コミュニティの規範や習慣を教え、彼ら参加を促す。しかし、大規模なコミュニティでは、ソーシャライゼーションは重労働となり、拡大も難しい。本研究では、新規ユーザーが初めてWikipediaを編集する際の、軽量なsocializationツールの影響を計測し、それを示す。Wikipediaは新規ユーザーの獲得に苦労しており、軽量なフィードバックを促し、新規ユーザーに助言を与えるメカニズムによって、ユーザーが長期間コントリビューションするようになることを示した。

## INTRODUCTION
Wikipediaではアクティブな編集者は2007年をピークにコンスタントに減り続けている。この編集者の減少は、メインのプロジェクトに影響する。

新規ユーザーの維持の長期間の動向は、似たような懸念を引き起こしている。長期にわたる新規編集者のコホート分析（10以上のコントリビューションをしたもの）は、10回の編集から1年後、一つ以上編集したものは、2004年のコホートの40%から2009年のコホートの10%まで下がった。この現象はWikipediaのコミュニティには知られており、Wikipediaの"減少"としてメディアに報じられた。

Wikipediaは複雑な社会技術システムなので、様々な要素が新規ユーザーの維持に絡んでいる。特に、長年、高いクオリティ基準を保とうと、"荒らし"と対抗した結果、コミュニティは新規ユーザーにとって冷たいものとなった。彼らは今日では、あまりにも大量の規範とポリシーに協力せねばならない。また、早期にプロジェクトに参画している編集者と同じぐらい誠実なコントリビューションを行うのにもかかわらず、時には不愉快な交流をしなければならない。こうした意図しない結果は、起こらないわけではない。というのも、コントリビューションについての規範やソーシャライゼーション、言語でさえも、オンラインコミュニティを硬化させることがある。十分なサポートがないために、新規ユーザーはこうした暗黙あるいは明確な規範に適応することが困難である。

編集者の減少の解決法としては、新規ユーザーの流入を増加させることが挙げられるが、Wikipediaを含め、異なるソーシャルメディアプラットフォームの注意を引きつけることに関する競争が示すには、このプロセスは一つのコミュニティには制御しきれなくなる。ユーザーがプロジェクトに参加した後、彼らの参画と維持を増加させなければ、解決まではいかない。

ソーシャライゼーション（新しいメンバーが社会規範と慣習を学ぶ期間）の影響はオンラインコミュニティに関する社会心理学文献に関心を引く。典型的な社会化戦略は、歓迎のメッセージや新人が学ぶことができるサンドボックス環境を用意するといったもの。こうした努力は大抵小さなグループ向けのものであり、実行するのに時間が掛かる。シンプルな方法だと、より多くの人に効果はあるだろうが、同時にユーザーの維持については限られたものとなる。

本研究の目標は、シンプルなライトウェイトソーシャライゼーションのプロセスの試みから結果を示し、開かれたコミュニティでの新規ユーザーの長期間の保持に与える影響を理解することである。MoodBarは2011年から2013年に実験的に導入された機能で、新規ユーザーからのフィードバックを引き出すことを目的に設置された。新規ユーザーは、これを使い、初めての編集の際の"mood"をシェアすることができる。Figure 1 &2

Figure 1
![](http://i.imgur.com/urnXFs8.png)
Figure 2
![](http://i.imgur.com/7miMnWx.png)

フィードバックはパブリックなダッシュボードに投稿され、プロジェクトチームが返信することができる。名前の通り、フィードバックはムード（気分）が尺度となっていて、メッセージの性質についてのシンプルな手がかりとなる。ユーザーは編集の際の問題も"sad"や"confused"を通して報告することができ、解決のための手助けを受ける。初めての編集がうまくいったというような、プロジェクト参画への感謝の気持ちを表すこともできる。Table 1はMoodBarを通して投稿されたフィードバックの例である。

Table 1
![](http://i.imgur.com/Ok0ucNq.png)

仮説として、MoodBarのようなライトウェイトソーシャライゼーションは新規ユーザーが長期間のコントリビューションするようになる機会を増加させるのに効果的である。次のような調査項目を設けた。

RQ1. ユーザーは早期の編集経験についてフィードバックを行うのか、のちに行うのか。

RQ2. フィードバックを行うことは、新規ユーザーの短期間における高い生産性と関係があるのか。

RQ3. フィードバックを行い、返信を受け取ることは、新規ユーザーの長期間の維持を助けるのか。

本研究では、真っ先にMoodBarがどのように誰に使われるのか特徴づけた。私たちは、このツールがデザイナーの意図、つまり早期の体験に基づくフィードバックを報告することに関してどのように使われるか分析する。MoodBarを使用し、フィードバックを行った編集者の生産性に着目した。早い段階で、Moodbarの使用者はムードを共有しないユーザーより生産性が高く、フィードバックに対するレスポンスを受け取った方が生産性はより高くなることがわかった。MoodBarの使用は、高いレベルのコントリビューションと強く結びついているようである。

本研究の二つ目の部分では、私たちはWikipediaの新規ユーザーの大規模なサンプルの長期間の維持について分析を行う。リンクを隠してMoodBarからメッセージを投稿できないようにしたユーザーのグループについて分析した。このグループはコントロールグループを務める。MoodBarに定期的にアクセスできるグループ（トリートメントグループ）と長期間の維持を比較した。

登録から180日後トリートメントグループのユーザーはコントロールグループと比べ、ユーザーの維持は小さいが重要な増加を示した。グループ間の維持の重要な違いは、登録から120日後に現れる。二つのグループの違いはMoodBarが利用可能かどうかなので、MoodBarは長期間の維持についてポジティブな影響を与えることが予想される。新規ユーザーはMoodBarを利用できる。従って、MoodBarの効果は小さいが、関連する増加ははるかに高いと予想する。

残りは、次のように構成される。オンラインコミュニティの早期ソーシャライゼーションに関連する業績の振り返る。その次に、本研究に使われた方法論を示す。どのようにMoodBarが作用するのか、本研究のデータがどのように収集されたのか、この研究の残りに使われた方法論を示す。

RELATED WORK
Wikipediaとオープンソースプロジェクトの早期研究では、内的なモチベーションと外的な報酬が参画を左右する。トップコントリビューターは参画に強いモチベーションを持っている。感謝や印、ゲームデザインされたフィードバックといった金銭ではない報酬は、ユーザーの従事の増加を示した。

MOTHODS
MoodBarを使って新規ユーザーはWikipediaの最初の編集についてのフィードバックを行う。'Edit'ボタンを押すと小さな説明が映し出される。

![](http://i.imgur.com/SAaoJkr.png)

MoodBarのリンクを押すとMoodBarが現れ、三つのうちの一つのムードを選び、短めのフィードバックメッセージを投稿できる。フィードバックはパブリックなバッシュボードで閲覧ができる。フィードバックに返信がされると、メッセージは自動的にトークページに公開される。元々の投稿者はそのレスポンスを読むことができ、有用だと思ったら印をつけることができる。


Datasets
本研究に使われたデータは英語版Wikipediaのデータベースから抽出した。初期バージョンは起動しても使い方のヒントはなかったが、第二版で導入された。本研究では第二版のMoodBarを使用する。

![](http://i.imgur.com/2fI5r7d.png)

Observational study
"Historical"サンプルを使う。このサンプルのユーザーに対して二つのメトリックスを用いる。一つは、MoodBarの起動からフィードバック投稿のタイムラグ。ユーザーがフィードバックを行わないなら、将来的にフィードバックが送る可能性があることを示す。アクティブでないユーザーをフィルターするために一つ以上の編集を行ったユーザーに対してこのメトリックスを適応する。

二つ目のメトリックスは短期間の生産性を数値化するために使い、登録してから1,2,5,10,30日後に測ったコントリビューションの累積的数値である。互いに排他的な4つのグループに分ける。フィードバックを行わないユーザー('Reference')、フィードバックしても返信なし('Feedback')、フィードバック、返信を受けたが、印をつけない('Feed.+Resp.')、レスポンスに印をつけるグループ('Feed.+Useful')。レアなケースとして複数のフィードバックを送ることがあるが、初めてのフィードバックのみを使用する。

Natural experiment
トリートメントとコントロールグループを明確にすることで、長期間の維持に関するMoodBarのソーシャライゼーションの効果をテストする。(Table 2, bottom)

## RESULTS

Observational study

MoodBarはフィードバックを行うことに効果的に使われるか。ユーザーが特定のタイムラグにフィードバックを送るまでの可能性を見てみよう。Figure 3は'Historical'サンプルの推定のhazard rateを示す。x軸はMoodBarが起動した時から計算されるタイムラグ。ハザードは数日後に急落する。10日目には初日と比べて14倍低い。これはQ1.を証明する。Moodbarは早期の編集経験を報告するために使用される。実際のレポートを見てみると、'confused'と'happy'を報告するための中央値は30分であるのに対し、'sad'は約2時間かかった。

Uploading...
![](http://i.imgur.com/7HB8Tg8.png)

ふたつ目、MoodBarユーザーの生産性について。MoodBarユーザーは'Reference'グループのユーザーより生産性が高い。'Feed.+Useful'グループはフィードバックを全く行わないグループと比べて9倍生産性が高い。

DISCUSSION
実験で使用したグループ合計で1ヶ月持続するふたつの連続したウィンドウに登録されたユーザーのコホートだった。我々は両方の期間中に登録されたユーザーを制御できないため、方法論はコントロールされたランダムデザインより、natural experimentの方が近い。

グループレベルでのMoodBarの効果は登録ユーザーの全サンプルについて減少し、小さい。これはMoodBarがWikipediaのUIであるという限られた特徴の結果であり、編集者がフィードバックを行う可能性がとても少ない結果を生む。つまり、MoodBarを使う人はほとんどおらず、全体としてグループに与える維持の影響は限られている。

個々人にかぎっては話は変わってくる。ソーシャライゼーションに成功したユーザーはフィードバックを行わなかったユーザーに比べて707%も維持が増加した。フィードバックを行ったが返信をもらえなかったユーザーは、自身の能力とモチベーションから維持を行う。この場合、比較しても143%しか増加は見られない。この理論付けは完全には自己選択バイアスを排除しておらず、個人レベルでの効果は推定でしかない。

最後に、'Historical'サンプルのMoodBarユーザーの異なるサブグループの従事の増加は、MoodBarを使用することの最大の利点は、有用な返信をもらうことにあり、これは単にフィードバックを投稿することからではなく、新規ユーザーは既存のユーザーから積極的な社会交流から利益を得るということ。

CONCLUSION AND FUTURE DIRECTION
簡単なUI操作を通してフィードバックを行うことはユーザーに影響を与える効果的な方法である。早い段階で編集経験に触れ、そうでなければメンタリングと助言を受けることができない。これらのフィードバックメカニズムは、アクティブなユーザーになるための高い生まれつきの傾向を持つユーザーに自己選択される傾向がある。最後に、早期にこのようなフィードバックメカニズムとのインタラクションは重要で長期間のユーザーの維持につながることがわかった。
