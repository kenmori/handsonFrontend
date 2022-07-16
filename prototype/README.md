
# プロトタイプ継承はどのように機能するか

前提で、
JavaScriptにはオブジェクトはいつくかあります。
Object, Array, Functionなどです。
`Array`と`Function`は`Object`を継承し、
Objectは大元になります

プロトタイプの継承はそれらのオブジェクトがインスタンス化されたときにインスタンス内部プロパティである`__proto__`に対してインスタンス化の元であるオブジェクトの`prototype`オブジェクト(オブジェクト自身が持つプロパティ)への参照(アクセスポインタ)が設定されます。
つまり継承されます。

ここで、それがどのように機能するかですが、
特定のインスタンスのプロパティにアクセスした際に、インスタンスオブジェクト自身にそのプロパティがなければ、`__proto__`を通じて継承元の`prototype`中を探し、
そこにもなければ、
さらに`__proto__`を辿り、最後のObject.prototypeになければどこにも定義されていないという`undefined`を返します。

言い換えると、配列のインスタンスは親であるArrayオブジェクトにそのプロパティを探し、なければ、さらに親のObjectオブジェクトの中を探しに行きます。


※今回はprototypeと__proto__に焦点を当てるため、ECMAScript2015以降のことは後ほど触れます

※これらの概念は知っていて損はない程度であり実際の実務でprototype継承を使って拡張など何かすることは稀で、ECMAScript2015以降(Object.create,class等)の書き方で書いてください


**事前準備**

developertool -> source -> +New snippet -> write snippet name



**オブジェクトの作り方**

オブジェクトってなんですか。JavaScriptには
- `Object`
- `Array`
- `Function`
- `String`
等があります

**継承というのはなんですか**

- 親から子供への伝えること


オブジェクトを作るときこうすると思います

```js
// Object
const a = { name: "a" }
a
// aは{name: "a"}で作らレました
```

これはつまり、

`const a = new Object({name: "a"})`

と同じです。

リテラル記法の場合、
`JavaScript`は内部で`Object`を`new`で呼び出して生成しています

**newてなんですか**

`new`はそのオブジェクトが持つコンストラクター(初期化した際に実行される関数。別名クラス)を呼び出します。

1. 空の新しいオブジェクトを作る
2. thisをその新しいオブジェクトに参照させる
3. コンストラクターを呼び出し、新しいオブジェクト(インスタンス)を返す

newした時に{}が作られ、{}にnameが割り当てられ、返されるイメージ

`constructor(コンストラクター)`とは

> クラスのオブジェクトインスタンスを作成および初期化する特別な関数です

[ref](https://rollbar.com/blog/javascript-constructors/#:~:text=A%20constructor%20is%20a%20special,for%20any%20existing%20object%20properties.)

自前でのコンストラクターはこう書きます

```js
function Parent(name, age){
  // let this = {}
  this.name = name
  this.age = age
  // return this
}
```
実際には

```js
function parent(name ,age){
  return {
    name,
    age
  }
}
```

これ(ファクトリー関数)と違いはありませんが、どちらが使われるかは議論があるところです。

- 新しいオブジェクトを常に返すのでメモリを占有する
- メソッドを個別に変更したくなったら Object.prototypeに追加しなくてはならない(既存の返すメソッドに変更すると影響がある。windowにも{}にも)

※newを使わない、コンストラクタではない関数でオブジェクトを返す関数はファクトリー関数

[ref](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)

**コンストラクタ関数の利点**

- 多くの書籍はこちらを伝えている
- 使いやすさでclassベースなプログラミングからきた人に親しいがある
- 速度が速い場合がある

**ファクトリー関数の利点**

- シンプル
- factoryからclassへの移行は簡単だがその逆は大変
- newを強制しない
- 値の変更ができて知らずにメソッドを使ってしまうケースがあるが、クロージャでアクセスできないようにする(データプライバシー)
- 関数を生成するオブジェクトの数だけ書くことになるが、クロージャを使えば解決できる(重複するロジックをなくせる)
- object.create(coolPrototype, child)で安全に継承できる(継承)

です。

// 3
コンストラクターを自前で書く場合、一般的に名前の最初は大文字にします
(Pascal Notation, 通常のはCamel Notation)


`Object`を作るときに内部で
その自身が持っている`constructor`関数が呼び出されて、初期化処理されます

**どんな初期化処理ですか?**

そのオブジェクトが持つプロパティ、メソッドを
thisに詰め込み、新しいオブジェクト(インスタンス)を返すというものです

```js
function Parent(name, age){
  this.name = name
  this.age = age
}
```

やっていることは、呼び出すときにparameterから受け取ったname,とageを
自信のプロパティとして代入しているというものです

```js
function Parent(name, age){
  // let this = {}
  this.name = name
  this.age = age
  // return this
}

const parent = new Parent("age", 30)
console.log(parent)
```

こちらを実行してみてください


```js
Parent {name: 'age', age: 30}
age: 30
name: "age"
[[Prototype]]: Object // ※1
  constructor: ƒ Parent(name, age)
  arguments: null
  caller: null
  length: 2
  name: "Parent"
  prototype: {constructor: ƒ}
  [[FunctionLocation]]: prototype:1
  [[Prototype]]: ƒ ()
  [[Scopes]]: Scopes[2]
  [[Prototype]]: Object
```

こういうのが出てきたと思います

何を伝えているかというと
`this`に入れた値がそのオブジェクト自身、
この場合`parent`(Parentのインスタンス)が持っていて、
`prototype`は`Object`を指しています(※1)


**prototype`ってなんですか**
`prototype`とはそのオブジェクトが持つプロパティやメソッドが
`new`されたときに
インスタンスの`__proto__`プロパティにインスタンスを作った親、この場合`Parent`の持っている参照が入ります。(参照とはメモリに対してのアドレスのことです。)

なので
上の状態をざっくり書くなら

```js
{
  name: "a",
  age: 30,
  __proto__: Parent.prototype
}
```

というイメージです

この
`Parent.prototype`は

```js
Parent.prototype = {
  constructor: ƒ Parent(name, age)
  arguments: null
  caller: null
  length: 2
  name: "Parent"
  prototype: {constructor: ƒ}
}
```


つまり、`parent`は`parent`自体が`name`と`age`をもち、

```js
{
  name: "a",
  age: 30,
  __proto__: Parent.prototype
}
```

それ以外は`Parent`が持っっているものを参照できる状態にあります

では、
`Parent.prototype`の中身を見てみましょう
さらに`prototype`を持っていることにきづきます

これは`Parent`が定義されたときに、すでにさらにその親Objectの参照を持っていることを示しています


```js
function Parent(name, age){
    this.name = name
    this.age = age
}

// const parent = new Parent("age", 30)
// parent


console.log(Parent.prototype.__proto__)
```

結果。

つまり、
この`Object`のもつものがすでに継承されているので、
当然、`parent`もその親の親が持つものから参照し使えるのです

では

`parent.borthDay`

`parent`から`borthDay`というのを参照してみてください

```js
console.log(parent.birthDay)
// undefined
```

 実行時に、
 `parent`から`birthDay`を探しますが、当然自身のプロパティに
 `name`と`age`はないので、さらに`__proto__`の先に探しに行きます
 `__proto__`の先はParentコンストラクタですが、
 そこにあるのは

 ```js
 Parent.prototype = {
  constructor: ƒ Parent(name, age)
  arguments: null
  caller: null
  length: 2
  name: "Parent"
  prototype: {constructor: ƒ}
}
```
これなので、そこにもbirthDayがありません、

そこにないのでさらに__proto__をたどります

そこにあるのはObject.prototypeです

```js
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
__proto__: (...)
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```

ここにも当然birthDayというプロパティはないので、さらにたどります

`__proto__`

`Object`は大元のオブジェクトで、それがもつ`__proto__`は`null`です

よって、birthDayようなプロパティは親を辿っても見つからなかったので
JavaScriptは未定義オブジェクトのundefinedを返します

この動きを表現すると

```js
parent.__proto__.__proto__.__proto__
```

になります
つまり継承分ごとに__proto__があります

これが主な`prototype`継承の仕組みです

先ほどはParentからparentを作って説明しましたが

今度は`Array`でやってみます

```js
const array = new Array()
// or
const array = []
```

は
Arrayオブジェクトが持つメソッドやプロパティをarrayに継承しました。
理解のしやすさのためにarrayを子供、Arrayを親と思っていいです。
([]はnew Array()を簡単に書いたものですので、array = []もまた親から生まれたと思ってください)

そこにないものはObjectオブジェクトを辿りに行きます

ここでarrayの中身を再度確認してみましょう。

自身のプロパティとしてもつというのはhasOwnPropertyで検証できます

試しに

```js
array.hasOwnProperty("map")
// false
array.__proto__.hasOwnProperty("map")
// true
```
を実行してください

これはつまり、
`array.map()`
を使う場合

普段よく使う、mapは
arrayインスタンスは自身が持つメソッドを参照している訳ではなく、
array自身にはないので、`__proto__`を使って親をたどり、親のArrayオブジェクトが持つmapメソッドを実行しているということです

array.hasOwnProperty("length")
// true
これはarray自身が持つプロパティということですね

先ほどのarrayの中身ですがよく見ると
array.[[prototype]]があります
これは
array.__proto__の表現ですが、
これの先がさらにObjectになっているかと思います
つまり
array.__proto__.__proto__ = Object.prototype
です
検証してみましょう

array.__proto__.__proto__ === Object.prototype
// true

Object.prototypeの先はnullですね

Object.prototype.__proto__ === null
// true

つまり、
arrayの親はArrayであり、Arrayの親はObjectでありObjectの親はない(Nullオブジェクト)ことを示しています

ちなみにnullはオブジェクトです
typeof null

// 'object'


では
objectはどうでしょうか

```js
const object = new Object()
or
const object = {}
```

同じように検証してみてください。答えは、Objectの親はいないのでnullです

```
Object -> Parent -> parent
Object -> Array -> array
Object -> object
```

このような継承関係であることがわかりました。

これで最初の文章の全容が理解できたかと思います。


ではこれの何が面白いのでしょうか

function Parent(name, age){
  this.name = name
  this.age = age
}

この例に戻ります
これはお伝えしたように
特定のオブジェクトを作り出せるコンストラクターです

const parent = new Parent("a", 30)

newするとその関数が実行され、
thisにそのオブジェクト自信のプロパティを設定できます。それを参照するときに__proto__を辿らないのです

parent.hasOwnProperty("age")
// true

ちなみに
hasOwnProperty
は誰が持っているのでしょうか

```js
parent.hasOwnProperty("hasOwnProperty")
// false
parent.__proto__.hasOwnProperty("hasOwnProperty")
// false
parent.__proto__.__proto__.hasOwnProperty("hasOwnProperty")
// true
```

です
stringはどうでしょうか

```js
"fafa".hasOwnProperty("hasOwnProperty")
"fafa".__proto__.hasOwnProperty("hasOwnProperty")
"fafa".__proto__.__proto__.hasOwnProperty("hasOwnProperty")
// true
```

"fafa"はnew String()から作られて、Objectを継承しているから

つまりObjectが持つメソッドは全てのインスタンスが辿ることができて使えるということです


戻ると、

parentインスタンスは
それ自身にはnameとageを持っていますが
これをさらに子供に継承したい場合どうしますか



// koko

方法はいろいろありますが、ここではprototypeで考えます

```js
function Child(name, age){
 this.name = name
 this.age = age
}
Child.prototype = Parent.prototype
// Child.prototype = parent

```

中身を見てみてください


```js
child.hasOwnProperty("name")
true
child.age
0
parent.age
30
```

これでは何もできないですが


ここに

```js
Parent.prototype.sayName = function (){
 return `hello!! my name is ${this.name}`
}
```

Parentに自分の名前を言うメソッドを追加しましょう

このthisはオブジェクトを指すので関数が呼ばれたオブジェクトになります

```js
console.log(child.sayName())
// hello!! my name is b

console.log(parent.sayName())
// hello!! my name is a
```

つまり、親に一度定義すればそれを継承した子供は
__proto__を辿ってみつけて実行できると言うことです

これは
array.mapに似ています

そこでthis.nameと言う共通のプロパティを実行時のオブジェクトにみつけて
それぞれ共通のメソッドを持ちながら自身のプロパティを参照できることを示しています

このことから、
共通のプロパティやメソッドは親のコンストラクタで定義して
、個別のそれらはその子供たちが定義すればよく、このことがオブジェクト指向で書くことができると言われる所以です

ちなみに

次にChild独自に持つメソッドを定義してみましょう

```js
function Child(name, age, isCute){
 this.name = name
 this.age = age
 this.isCute = isCute
}
Child.prototype.sayCute = function(){
 return this.isCute ? "yes cute" : "no cute"
}
```

これは
- Childコンストラクターを作る際に可愛いかどうかの真偽値を渡して、自身のプロパティに追加
- インスタンスがsayCuteと言うメソッドを持ち、this.isCuteにアクセスできて特定のテキストを返すメソッドを追加しています。

当然、作るときは

```js
const parent = new Parent("a", 30)
const child = new Child("b", 0, true)
```

として、

```js
child.sayCute()
```

呼んでみてください
// 'yes cute'

でも当然、parentは自身のメソッドとその親にsayCuteメソッドは持っていないので

parent.sayCute()
// prototype:44 Uncaught TypeError: parent.sayCute is not a function

つまり、
子供からは呼べて、親からは呼べないメソッドなのですね


このようにして

```js
const child2 = new Child("c", 0, true)
const child3 = new Child("d", 0, false)

child2.sayCute()
// 'yes cute'
child3.sayCute()
// 'no cute'
```

それぞれ独自のデータを持ったインスタンスを作ることで、
共通なものは親から引き継がれたプロパティやメソッドを継承して使い(__proto__を辿って使い)、自身のそれらはインスタンス独自の値を設定できることができます。

このprototypeなのですが、動きとしてはこのような動きをしますが
最近では使いません。
なぜこれを説明したかというと普段書いているオブジェクト内部の動きを理解するためです
最近では別の書き方をします
例えば、

parent.__proto__
として辿りましたが、
このようなコードは書かないし、またIEで__proto_＿はないので

/////// 時間があれば///////

## Class



それがprototype継承を書きやすくした

## Class

先ほどのParentコンストラクタはこのようにかけます

class ParentA{
  constructor(name, age){
    this.name = name
    this.age = age
  }
}

class構文はconstructor関数を持ちます。
それは先ほど書いた関数と名前以外、同じだと気づくと思います

const parentA = new ParentA("a", 30)

console.log(parentA)

実際にどうでしょうか

画像

ParentA {name: 'a', age: 30}
age: 30
name: "a"
  [[Prototype]]: Object
  constructor: class ParentA
  length: 2
  name: "ParentA"
  prototype: {constructor: ƒ}
  arguments: (...)
  caller: (...)

つまり、自身のプロパティにageとnameを持ち、[[prototype]](__proto__)はObjectを指しています。

parentA.__proto__
  {constructor: ƒ}
  constructor: class ParentA
  [[Prototype]]: Object
はconstructしか差していないオブジェクト(class自身で)
その__proto__はObjectを指しています

parentA.__proto__(class).__proto__(Object)

と言う継承関係です

と言うことで、classで定義したメソッドは使えますし、その先のObjectのメソッドも使えます


せっかくなので
新しい書き方で見てみましょう

あるインスタンスの__proto__を参照する場合、

```js
// console.log(parentA.__proto__)

console.log(Object.getPrototypeOf(parentA))
```


また、


画像 7


Classでの継承関係

上記の継承の方法をClass構文でやりましょう

```js
class ChildA extends ParentA {
 constructor(name, age, isCute){
  super()
  this.name = name;
  this.age = age
  this.isCute = isCute
 }
 sayCute(){
  return this.isCute ? "yes cute" : "no cute"
 }
}

const child = new ChildA("b", 0, true)
child.sayCute()
// yes cute

child.age
// 0
child.name
// "b"
```

先ほどとの違いは `extends` と `super()`です

`extends`は親としたいclassを指定します

superは子供のクラス(派生クラス)から親のクラス(ベースクラス)のプロパティやメソッドを呼び出します
今回の場合constructor内でsuperを呼び出しています
これはParentAのconstructorを呼び出しています。

このように

```js
class ChildA extends ParentA {
 constructor(name, age, isCute){
  this.name = name; // prototype:60 Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

  super()
  this.age = age
  this.isCute = isCute
 }
 sayCute(){
  return this.isCute ? "yes cute" : "no cute"
 }
}
```
superより前にthisを書くことはできません


親のメソッドを参照したい場合、superから参照できます

```js
class ChildA extends ParentA {
 constructor(myouji, name, age, isCute){
  super(myouji)
  this.name = name
  this.age = age
  this.isCute = isCute
 }

 class ParentA{
  constructor(myouji = "", name, age){
    this.myouji = myouji
    this.name = name
    this.age = age
  }
 getMyouji(){
  console.log("parent")
  return this.myouji
 }
}


 sayParentMyouji(){
  console.log("child")
  return super.getMyouji()
 }
 sayCute(){
  return this.isCute ? "yes cute" : "no cute"
 }
}
```

/////////////WIP///////////////////////////////////////



////
普段使っている関数は

function parent(n, a){
  return {name: n, age: a}
}
というものですが、
これは実行されたら



a instanceof Object
// true



インスタンスってなんですか
元のオブジェクトから派生したもの。元のオブジェクトから作られたもの




newが何をしているか、

aえ


a.__proto__ // Objectのprototypeが参照される

a.__proto__ === Object.prototype // true

// Array
const arr = ["a"]
arr.__proto__ === Array.prototype

arr.__proto__.__proto__ === Object.prototype // true
// つまり、arrはインスタンスにした際に Objectを継承したArrayのprototypeが参照されている
Array.prototype // いろいろなメソッドが用意されていることがわかる

// 試しに、Arrayオブジェクトにadd関数を作ってみてください

Array.prototype.add = function (){console.log("add")}


const arrWithAdd = [] // インスタンス化

arrWithAdd.add() // 実行
// 1

// これはArrayというJavaScriptのオブジェクトに対してユーザー定義したメソッドを付け加えたことになります
// 以降インスタンス化した際に使えます

prototypeと__proto__の違いはなんでしょうか

`__proto__`はprototypeへの参照。入っている内部プロパティで
インスタンス化したら勝手に作られます
prototypeはObjectに直接含まれるObject自身の情報でした。

ここで特筆すべきは、
prototypeは
関数宣言するとそこに含まれていることがわかります。

試しに
function f(){}
で
f.prototype
をコンソールログしてみてください

これは、
インスタンス化したら__proto__に参照されるのでした

インスタンス化はどのようにやるのでしょうか

配列の場合
const a = []
const a = new Array()
オブジェクトの場合
const o = {}
これは
const o = new Object()
と同じです

関数の場合は
const f = new Person()
です

慣例で、関数コンストラクタは最初大文字でき書きます。

これは何が嬉しいのでしょうか




https://dmitripavlutin.com/javascript-prototypal-inheritance/

https://developer.mozilla.org/ja/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes#:~:text=When%20you%20create%20an%20object,property%20and%20assigns%20it%20as

[Constructor function vs Factory functions](https://stackoverflow.com/questions/8698726/constructor-function-vs-factory-functions)
