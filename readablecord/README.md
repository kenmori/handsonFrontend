
# refactoring

Low coupling(疎結合)とHigh cohesion(高凝集)


## 凝集度

下記、下に行くほど凝集度が高い(良い)
どのくらい純粋かの尺度
- モジュールの独立性が高い。修正しやすい。ソースを理解しやすい。単一責任原則



### 偶発的凝集
実施することはない

### 論理的凝集

**フラグによる処理の切り替え**

論理的凝集度から時間的凝集度にする
重複した共通部分を再利用したくなり一緒に書きたいが、それは詳細な実装を書きすぎているため
-> 再利用できる形にするのではなく機能的凝集で関数化する
-> 機能的な関数に切り出す
-> 多くの場合論理的凝集を回避した方がいい
-> 単一のユースケースだけに責任を持つ(単一責任)
-> 機能を時間軸のどこに配置するかだけを責務とする
実施しがちだが極力実施しない

機能追加は正しく動いているソースを修正することになりやすい -> オープン・クローズドの原則(Open-Close Principle)
- privateなメソッドで種別がon・offだけなら効果的な場合もある -> DRY (Don't Repeat Yourself)


### 時間的凝集
#### ある時にまとめて実行する処理をまとめている
初期処理とかエラー処理とかまとめたようなイメージ
- 同じような機能を色々なところで作らないですむ
- 近い箇所で実行するソースがまとまっているとソースを理解しやすい

- 機能やデータにおいて関連がない
- 実行順序に意味はない
- 時間的凝集の中では機能的凝集の関数を実行すること。useEffectは時間的凝集を機能的凝集に切り出すことができる
- たまたま同じ時間に実行するだけ。初期化処理など
- 悪くはないが改善ポイントはある
状況に応じて実施すべき

### 手順的
#### 複数の機能を実施する順番を取りまとめるが共通したデータを扱っていない

時間的凝集より、「順番」という概念を気にしている
GoFのfacadeパターンが近い
複雑な手続きを一箇所に集める

特定の時間でかつ、実行順序に意味がある。複数の処理がまとまっている
状況に応じて実施すべき

### 通信的
#### 関連あるデータを使って、いくつかの機能を実行するモジュール

順序にあまり意味がない
特定の時間でかつ、同じ値を引数にしている
凝集度は高め

### 逐次的(連絡的凝集)
#### 関連あるデータを使って、かつ、実行する機能の順番に意味がある(通信的凝集かつ手順的凝集)
特定の時間でかつ、実行順序に意味がある。戻り値を引数にする
状況に応じて実施すべき
かなり高い

### 機能的凝集
#### 1つの関連の強い機能をまとめたモジュール

**単一機能**
理想的


## 結合度

- モジュールとモジュールがどのくらい強く結びついているか
- 疎結合 -> モジュールの結合度が低い
- どのくらい独立しているかの尺度
- パラメータと戻り値の項目が少なくなれば結合度が低くなる

### 内容結合(結合度高い)

- あるモジュールが別のモジュールの内部動作によって変化したり依存したりする


### 共通結合

- グローバル変数による受け渡し
- 改修しにくい。正しく設計したシングルトンパターンオブジェクトでは使われる
- 属性を持たないロジックだけのシングルトンは共有結合とは関係ない

### 外部結合

- 必要なデータだけを外部宣言し、他のモジュールから参照を許可し共有する
- 共通結合とほとんど同じ。改修しにくい

実施すべきではない

### 制御結合

- 関数パラメータにより指示を出す
- 論理的凝集度がこれに相当する
- if文いっぱい
実施しがち極力実施すべきではない
- あるモジュールに何をすべきか情報を渡すこと
- 別のモジュールの流れを制御する
- 論理的凝集が発生する

### スタンプ結合

- 相手モジュールで、構造体データ(レコード)の一部を使用する場合でも、構造体データ全てを引数として相手モジュールに渡す
- DTOをそのまま引数で渡すような場合
- 引数を渡した先で書き換えられる危険があることに留意
- 関数パラメータによる値の受け渡し
- クラスやオブジェクトを受け渡している
- 結合度は高い

### データ結合

- 関数パラメータによる値の受け渡し
- 理想的

### メッセージ結合(結合度低い)

- 相手モジュールをブラックボックスとして扱う
- 値私なら呼び出し側で引数が変わる心配はない
- 関数パラメータによる値の受け渡し
理想的

## オブジェクト指向

### 凝集度を高くし、結合度を低くする設計手法。


データと処理をひとまとまりにすること

- データ・・・意味のあるデータの集まり。機能的凝集。高い凝集度
- 処理。メッセージとかメソッド、サービス

- メッセージの強調(連続)で機能を実現

- オブジェクトからオブジェクトへメッセージが送られ(スタンプ結合)
- 全体の機能が実現する
- 低い結合度

ref

- [良いコードとは何か - エンジニア新卒研修 スライド公開](https://note.com/cyberz_cto/n/n26f535d6c575)
- [オブジェクト指向のその前に-凝集度と結合度/Coheision-Coupling,](https://speakerdeck.com/sonatard/coheision-coupling)
- [モジュールの凝集度・結合度・インタフェース](https://www.slideshare.net/yangiYa/ss-13828944)

