# JavaScript Interview Questions and Answers

こちらは [Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/) の解答ページです。

## null と undefined、undeclared の違いを答えて下さい。どのようにしてこれらの状態であるかを確認しますか？

### null

変数に空の値を与えたい場合や、あえて値がないことを設定する際に使用します。JavaScript が自動的に変数に対して null という値を設定することはありません。

### undefined

変数は宣言されていますが、何も値が設定されていない状態です。その様な場合、JavaScript は自動的に、変数に undefined という値を設定します。

### undeclared

使用する時点で、var や let、const を使って初期化、または宣言がされていない状態の変数です。

### undefined や null であるかを確認する方法

変数が undefined や null であるかを確認する際には、厳密等価演算子を使用するのが適しています。

例えば a という変数が undefined か null かは、下記のように確認することが出来ます。

```
let a;
console.log(a === undefined) // true
console.log(a === null) // false
```

この時、等価演算子を使用するのは適していません。
型の強制により、undefined と null は等しいものと判断されてしまい、正確な比較が出来ないからです。

また、typeof メソッドを使用して調べることも適していません。
undefined は undefined だと判定されますが、null は object であると判定されてしまうためです。

## 参照元

- [JavaScript Interviews: What’s the Difference Between a Variable That’s null, undefined, or undeclared?](https://betterprogramming.pub/javascript-interviews-whats-the-difference-between-a-variable-that-s-null-undefined-or-cb1c8f41e6c3)
- [JavaScript の undefined と null の違いと判定方法を解説！](https://qumeru.com/magazine/105)
