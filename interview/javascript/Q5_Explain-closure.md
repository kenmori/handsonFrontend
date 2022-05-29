# JavaScript Interview Questions and Answers

こちらは [Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/) の解答ページです。

## クロージャとは何か説明して下さい。また、使い方や使う理由を説明して下さい。

### クロージャとは

クロージャとは、関数の中に設置された関数が、外側のスコープにある変数への参照を保持することができるという特質のことです。

その関数を実行することで、通常は関数の外からは参照出来ない、関数内で宣言された変数へのアクセスが可能となります。

これは、JavaScript の静的スコープとメモリの仕組みによって成り立ちます。

静的スコープという性質で、どの変数を参照するかは関数が定義された時から静的に決まっており、それが参照され続けているため変数のデータを保持することができます。

### クロージャを利用する場面と理由

クロージャは、外から参照できない変数を定義したり、グローバル変数を減らす手段として役立ちます。

例えばある変数に数字を足していきたい場合、変数をグローバルスコープで宣言すると、その変数はすべての場所から変更を加えることが出来てしまいます。

そこでクロージャを使うことで、関数内で変数を宣言することでスコープが閉じられ、関数の外部からは変数の値を更新することが出来なくなります。

したがって変数の値は内部の関数から以外に変更されることはなくなり、関数により更新されたままの値を保持されることが可能となります。

## 参照元

- [クロージャー](https://jsprimer.net/basic/function-scope/#closure)
- [Closure in JavaScript](https://www.tutorialsteacher.com/javascript/closure-in-javascript)
