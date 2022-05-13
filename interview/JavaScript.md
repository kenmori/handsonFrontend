# JavaScript Interview Questions and Answers

こちらは[Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/)のアンサーページです。

## イベントの委任について説明してください。

A. イベントの委任とは、親要素にイベントを与えることによって、その子要素にイベントを伝達させる仕組みのことです。

この仕組みにより、効率よくイベントを設定することが可能になります。

例えば、たくさんの`<li>`に対してイベントを与えたい時、すべての`<li>`にイベントを与えてしまうと、大量のメモリを消費するため JavaScript の動きが重くなってしまいます。
この場合、`<li>`にではなく、親要素である`<ul>`にイベントを与えます。そうすることにより、子要素である`<li>`にもイベントが伝達されるので、すべての`<li>`にイベントを設定するのを避けることが出来ます。

また、イベントの委任は、DOM が読み込まれた時点ではまだ存在していない要素にイベントを与える際にも使用出来ます。例えば、動的に`<li>`を作る際、DOM 読み込み時点では`<li>`は存在していないため、`<li>`にイベントを与えることが出来ません。そこで、親要素である`<ul>`にイベントを設定します。そうすることにより、後に生成される`<li>`にもあらかじめイベントを設定することが出来ます。

## 参照元

- [JavaScript Event Delegation](https://www.javascripttutorial.net/javascript-dom/javascript-event-delegation/)

## JavaScript において、"this"はどのように機能するかを説明してください。

### ES6 において、this の機能が以前と変わった点を一つ挙げて下さい。

A. this は呼び出し元となる関数の種類によって、参照する対象が変化します。

通常の関数内で使用する場合、this はグローバルオブジェクト（ブラウザ上では window オブジェクト）を参照します。
**例**

```
function test () {
  console.log(this); // Window オブジェクト
}
```

上記と同じ条件でも、ストリクトモードを使用する場合、this には undefined が割り当てられます。
**例**

```
"use strict";

function test () {
  console.log(this); // undefined
}
```

オブジェクトのメソッド内で使用する場合、this は現在メソッドを呼び出しているオブジェクトを参照します。
**例**

```
const person = {
  name: "John",
  printName: function() {
    console.log(this);
    console.log(this.name);
  }
}

person.printName();
// {name: 'John', printName: ƒ}
// John
```

.call メソッドや.apply メソッドを使用する場合、関数内の this は指定されたオブジェクトを参照します。
**例**

```
function printName() {
  console.log(this);
  console.log(this.name);
}
const person = {
  name: "John";
}

printName.call(person);
// {name: "John"}
// John
```

コンストラクタ関数内で使用する場合、this は生成されたインスタンスを参照します。
**例**

```
function Person(name) {
  this.name = name;
  this.printName = function() {
    console.log(this);
    console.log(this.name);
  }
}

const john = new Person("John");

john.printName();
// Person {name: 'John', printName: ƒ}
// John
```

イベント内で使用する場合、this はイベントが追加された要素を参照します。
**例**

```
document.querySelector("h1").addEventListener("click", function() {
  console.log(this); // <h1></h1>
});
```

ES6 で新たに追加されたアロー関数を使用する場合、this の参照先は関数内で決められることはありません。アロー関数内の this には、関数の外側（親となる関数）で設定された値が継承されます。

例えば下記のようなオブジェクトにてメソッドを作成した場合、従来の関数では、関数の呼び出し元である person オブジェクトの値が参照されます。
しかしアロー関数においては親となる関数が存在せず、this の参照が設定されていないため、this には自動的にグローバルオブジェクトが設定されてしまいます。

**例**

```
const person = {
  name: "John",

  printName1: function() {
        console.log(this);
        console.log(this.name);
  },

  printName2: () => {
        console.log(this);
        console.log(this.name);
  }

}
person.printName1();
// {name: 'John', printName1: ƒ, printName2: ƒ}
// John

person.printName2();
// Window
// undefined
```

この特徴から、アロー関数はオブジェクトのメソッドとしては向いていませんが、メソッド内でコールバック関数を使用する際に適しています。

例えば下記のようなケースでは、setTimeout のコールバック関数に通常の関数を使用すると、this はその関数内のスコープでの参照の値、つまり Window オブジェクトを参照してしまいます。

しかしアロー関数を使用した場合、this は内側の関数のスコープではなく、親の関数の this を参照するため、アロー関数は person オブジェクト内に生成されているとみなされ、this が person オブジェクトを参照することが可能になります。

```
let persons = {
  name: 'John',

  printName: function() {
    setTimeout(function() {
      console.log(typeof this.name);
    }, 1000)
  },

  printName2: function() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000)
  }
}

persons.printName();
//

persons.printName2();
// John

```

## 参照元

- [Demystifying the JavaScript this Keyword](https://www.javascripttutorial.net/javascript-this/)
- [アロー関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
