# __proto__ と prototype。違い等を解説


## 結論
・`__proto__`は全てのオブジェクトが持つ、内部プロパティ。そのオブジェクト自体の`prototype`への参照を持つ。メソッドを解決させるためにチェインされている実際のオブジェクト
・`prototype`は`Function`オブジェクトが持つプロパティ。コンストラクタ関数が持つオブジェクト。(関数なら全てが持っているプロパティ)

## 代入される動き

・`prototype`は`new`で初期化された時、そのコンストラクタ関数が持つ`prototype`をインスタンスの`__proto__.`上に代入します(→なのでインスタンスが直接持つのは`__proto__`であって、protypeを持ちません。`__proto__.prototype`とすることで参照されます)

よって、
new というのは

```js
function Hoge(){}//コンストラクタ
var hoge = new Hoge()
hoge.__proto__ = Hoge.prototype;
```

こうしているということです。

実際に試してみます

```js
hoge.__proto__ === Hoge.prototype
//true
```

別の説明。

```js
//コンストラクタ
function Point(x, y) {
    this.x = x;
    this.y = y;
}

//初期化
var myPoint = new Point();

//以下は全てtrue
myPoint.__proto__ == Point.prototype
myPoint.__proto__.__proto__ == Object.prototype
myPoint instanceof Point;
myPoint instanceof Object;
```

ここで
`new`すると同時に
`Point.prototype`上のものが
インスタンスである
`myPoint.__proto__`に保存され、以降、参照できることに注意してください。


## prototype と \_\_proto\_\_ の違い。もっと

・`prototype`・・・`Function`オブジェクトだけがもつプロパティ。参照先はオブジェクト。

・`__proto__`・・・全てのオブジェクトが持つ内部プロパティ。プロトタイプチェーン。暗黙の参照(自身のプロパティになければこの`__proto__`先を辿ること)を実現する内部で実装されているプロパティ。

`new`して生成されたインスタンスの`__proto__`にコンストラクタの`prototype`オブジェクトが代入される

```js

function F(){
  this.name = '';//1
}
F.prototype.y = function(){} //2

let f = new F(); //f.__proto__ = F.prototype //

f.__proto__ === F.prototype

//true


F自体の__proto__には空の関数が入っている
F.__proto__
//function () { [native code] }


//yが自身のpropertyかどうかチェック
F.hasOwnProperty('y')
//false
F.prototype.hasOwnProperty('y') //2でprototypeに代入しているため
//true

//newした結果、インスタンスfは自身の参照リンクを辿った先のprototypeオブジェクトが持つyを見ることができる
f.y === f.__proto__.y
//true

f.hasOwnProperty('y') //f自身はyを持たない
//false
f.hasOwnProperty('name') //自身にnameをもつ //2
//true


//Array
var arry = [];
arry.__proto__ === Array.prototype
//true
arry.__proto__ === [].__proto__
//true
arry.hasOwnProperty('pop') //参照リンク先のオブジェクトprototypeが持つメソッド
//false


//more
//こちらのコンストラクタが実行された際に何が起きているか
function A (name){
 this.name = name;
}

//Aのプロパティにprototypeが追加される
//prototypeプロパティはオブジェクトで、以下の2つのプロパティをもつ

//constructor
//__proto__


A.prototype
//constructor:function a(name)
//__proto__:Object

constructorは何もないがそれ自体内部に__proto__を持ち、その参照先はJavaScriptのルートオブジェクトであるObject。

//Aをnewした時に何が起きるか

let b = new A('JavaScript');
//4つのことが起こる
//1.新しい空のオブジェクト{}が生成される
//2.b上に__proto__が作られ、それはA.prototypeを参照するようになる。なのでb.__proto__ === A.prototype

-//3.上記1で生成されたオブジェクトをthisコンテキストとして、A.prototype.constructorを実行します。したがってnameプロパティは新しく作成されたオブジェクトに追加されます。-
//4.作成されたオブジェクトを返します。let bは新しいオブジェクトが割り当てられます。

//もしA.prototype.car = 'BMW'として、b.carとすると" BMW"をアウトプットします
//JavaScriptはb上のプロパティcarを探し、見つからなければ上記2で作成されたb.__proto__(A.prototype)を参照し、A.prototypeにあるcarプロパティ値を返すためです。

```

付録

```js
prototype

・基底クラスが持つ
    Array.prototype
    Function.prototype
    Object.prototype
など
・リテラルで生成したFunctionが持つ
var hoge = function(){}
hoge.prototype
//object {}

・リテラルで生成したObjectは持たない
var a = {}
a.prototype
//undefined

・インスタンスは直接prototypeを持たない
var array = new Array(2)
array.prototype //undefined

__.proto__上に持つ
array.__proto__ === Array.prototype への参照を持つ



__proto__
Object.prototypetが持つアクセサプロパティ

・リテラルで生成したObjectが持つ
var a = {}
a.__proto__
・この__proto__の参照先はObject.prototype

・リテラルで生成したオブジェクトの__proto__は常に基底クラスのprototypeを参照している

    var a = []
    a.__proto__ === Array.prototype //true

function Hoge(){};
var hoge = new Hoge()
hoge.prototype //undefined
hoge.__proto__.constructor === Hoge //true
hoge.__proto__ === Hoge.prototype //true



constructor
function Hoge(){};
Hoge.prototype.constructor //Hoge
Hoge.__proto__.constructor == Hoge.prototype.constructor //false
(Hoge.__proto__は=== Funtion.protypeだから)
```

## 参照

[https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

[https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/proto](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

[https://gist.github.com/kenmori/4422f224800a4a10534a8f3c271bd3ac.js](https://gist.github.com/kenmori/4422f224800a4a10534a8f3c271bd3ac.js)
