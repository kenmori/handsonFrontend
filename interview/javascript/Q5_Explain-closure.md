# JavaScript Interview Questions and Answers

こちらは [Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/) の解答ページです。

## クロージャとは何でしょうか。使い方や使う理由を説明して下さい。

### クロージャとは

クロージャとは、関数の中に設置され、外側の関数内で宣言した変数にアクセスすることの出来る関数です。

その関数を実行することで、通常は関数の外からは参照出来ない、関数内で宣言された変数へのアクセスが可能となります。

### クロージャを利用する場面と理由

クロージャは、変数のデータを更新する際に役立ちます。

例えばある変数に数字を足していきたい場合、変数をグローバルスコープで宣言すると、その変数はすべての場所から変更を加えることが出来てしまいます。

そこで関数内で変数を宣言することで、スコープが閉じられ、関数の外部からは変数の値を更新することが出来なくなります。

したがって変数の値は内部の関数から以外に変更されることはなくなり、関数により更新されたままの値を保持されることが可能となります。

## 参照元

- [Closure in JavaScript](https://www.tutorialsteacher.com/javascript/closure-in-javascript)
