# TypeScript 練習問題集(Practice TypeScript and Playground) latest update(2020/4/26)

<img src="https://kenjimorita.jp/wp-content/uploads/2019/02/8a154126e82bbd3957478cedded330b3.png" width="400" />

**TypeScript and Playground練習問題集更新情報**

※2020GW中に問題や答え精査します

```
・問2の問題を修正(2020/4/27)
・説明・例文を追加(2020/4/26)
```

- こちらは [@bukotsunikki](https://twitter.com/bukotsunikki)自身が学習するための問題集です。
- 以前[JavaScript問題集](https://gist.github.com/kenmori/1961ce0140dc3307a0e641c8dde6701d)を作りましたがそれのTypeScript版です。
- [わたしについて](http://kenjimorita.jp/aboutme)  [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/bukotsunikki.svg?style=social&label=Follow%20%40bukotsunikki)](https://twitter.com/bukotsunikki)
- 随時更新して行きますのでスターつけていただけると励みになります。
- 最初から答えが見えているのは都度操作させないためです。

ちょっとやってみましょう

**問0**

こちら

```ts
const greeting = (value) => "hello!" + value
```
関数`greeting` は `"hello!world!"`を返す関数です(文字列を返します)。
引数`value`に型注釈してください

> ここまでが「問題」です。
> 以下「答えの一例」になります。

```ts
const greeting = (value: string) => "hello!" + value
```

では早速始めましょう

---



**問1**

こちら

```ts
interface Foo {
    bar: string;
    baz: number;
}
```

Fooが持つプロパティ全てoptionalにしてください

```ts
type PartialFoo = Partial<Foo>;
```

**問2**

こちら

```ts
type Foo = {
    name?: string;
    age?: number;
}
```

Fooが持つプロパティ全て必須にしてください

```ts
type RequireA = Required<Foo>;
```

**問3**

こちら

```ts
type Foo = {
    name?: string;
    age?: number;
}
```

の`Foo`から`name`だけを取得したtypeを作ってください

```ts
type Picked = Pick<Foo, "name">
```

**問4**

こちら

```ts
type Foo = {
    name?: string;
    age?: number;
}
```

`Foo`から`age`を省略した型を作ってください

```ts
type Omited = Omit<Foo, "age">;

// Omited {
//    name?: string | undefined;
// }
```

**問5**

こちら

```ts
const user = { name: "kenji", age: 98};
```

のuserに推論される型は何ですか。またその理由を教えてください。

```ts
{name: string, age: number}

JavaScriptのオブジェクトはconstであれ(freezeしない限り)書き込みが可能です。
それそれのプロパティ値はあとで書き込めるようにwindeningされ、それぞれのプロパティの型はプリミティブ型になります。
これをそれぞれのプロパティをリテラル型にするには
as constか型注釈をすることです。(下記playground)
```

- [as const](https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBArhApgJxgXhgbxmAhgW0QC4YAiAa0TACsBLUgGhlwHNiYBOADgF9mIYoSFABQQA)
- [型注釈](https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBArhApgJwFwwN5gIYFtHoBEA1omAFYCWhANDNgOYEwCcAHAL4wC8mMO+IqQrU6jZuw4AoIA)

**問6**

`T extends U ? X : Y` はどのような意味になりますか 

```ts
// Conditional types

T extends U ? X : Y;
// TがUに代入可能ならXを、そうではない場合Yを返す
// T型がU型と互換性あるならXを、そうでない場合Yを返す
// T型がU型のサブタイプならXを、そうでない場合Yを返す
// T型がU型の部分型ならXを、そうでない場合Yを返す

// ()=> void extends Functionは互換性がある
// "hello!" extends String

```

**問7**

下記

```ts
interface Part {
  name: string,
  age: number,
  add(): number
}
```

メソッド名だけ取り出した型を作ってください

```ts
interface Part {
  name: string,
  age: number,
  add(): number
}

const obj = {
  name: "kenji",
  age: 99,
  add: () => 1 * 2
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type result = FunctionPropertyNames<Part>

```

[playground](http://www.typescriptlang.org/play/#code/JYOwLgpgTgZghgYwgAgApymZBvAUMg5EOAWwgC5kBnMKUAcwBp9C56KiBXEgI2mcLI4AE2EAKAJSUQ3PlFwBfXLgQB7EDWSqeAK2QBeHCwLEylAEQBrCCB3BzA1u0oBOF44IjhlSQYB8yACMyABUyABMispgAJ4ADigAYpwgCGDA6qhQqgmYMQBypBBUADwAKgGGeIIA2gDSyKDI1jGqMMhlALqUZfWdyBAAHpAgwlTIyanp6sgA-MgN0hAAbtCKNS1tHZ3R8ShQxZwANliGk2kZIFk50LGFZKXomH5AA)

**問8 wip**

neverとはどんな型ですか

```ts
・絶対にreturnされない関数
・常にthrowされる関数

例えば

function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  return fail("Unexhaustive!"); //ここはreturnされないので neverが返っている。boolean型が返る関数なのでError
}

function fail(message: string): never { throw new Error(message); } // 常にthrowされるのでnever型が返る


// 1. 型推論の結果、取り得る型が無い状態になった時の変数・メンバーに付けられる型

const bool = true
if(bool){
    const a = bool; // boolean
} else {
    const b = bool; // never
}

// 2. return文が無く、かつ(無限ループなどで)関数末尾に到達しない関数/アロー関数に対して推論される戻り値の型
```

 **問9**

これは

```ts
(...args: any[]) => any
```

 どういう意味ですか？

 ```ts
// 関数ならなんでもOK
 ```

 Type inference in Conditional types

 **問10**

これは

 ```ts
 type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

 ```

 なにをする型か説明してください(とくに`infer`)

 ```ts
// Tが関数ならその関数の戻り値をRにキャプチャしてそれを返す
```

  **問11**

 非同期の中身を取る型を書いてください

 ```ts
type ResolvedType<T> =
T extends Promise<infer R> ? R :
T extends Observable<infer R> ? R :
T;
```

**問12**

Nullableな型を作ってください

```ts
type PropNullable<T> = {[P in keyof T]: T[P] | null};

interface User {name: string, age: number, money: null}

const obj:PropNullable<User> = {name: "kenji", age: 99, money: null}
```

**問13**

こちら

 ```ts
let createObj = (obj) => {
    let o = {}
    for(const key in obj){
      o[key] = String(obj[key]);
    }
    return o;
}

const anotherFun = createObj;
```

のcreateObj型を定義してください

 ```ts
  let createObj = <T>(obj:T): { [P in keyof T]: string} => {
     let o = {} as {[P in keyof T]: string}
     for(const key in obj){
        o[key] = String(obj[key]);
     }
     return o;
  }

 const anotherFun = createObj;
 ```

 **問14**
 TODO

 ```ts
 neverはunion型の中では消えるを問題にする
 ```

 **問15**
 こちらの

 ```ts
 arr(["a", 1]);
```

どんな要素の配列が渡されてもいいような型を作ってください。

 ```ts
 let arr = <T extends any[]>(...rest: T) => {
    return rest
}

arr(["a", 1]);
```

**問16**

`widening`とはなんですか説明してください。

```ts
型推論によってリテラル型を変数に代入した際にプリミティブ型に拡張されること
例えば、

let a = "a" //string

constでは再代入はできないので`a`型というリテラル型になるが、letは再代入可能なので推論は拡張されプリミティブ型になる

let a: "a" = "a" //"a"

このように型注釈をつけることでa型というリテラル型になる(型注釈はwideningより優先される)
```

**問17**

下記

```ts
let a;

if (Math.random() < 0.5) {
    a = 123;
}

console.log(a); // a は number | undefined 型
```

aがunion型になるのはなぜか

```ts
a宣言時に初期化されていない & 型注釈されていないことでif文がtrueになるまでundefined、その後aを参照すると`number` と `undefined`の可能性があるから。初期化なし、型注釈なしの変数はコンテキストによって型が変わる(アンチパターン)
```

**問18**

`let`で変数初期化時に型注釈としてunion型(`string | null`) にする場合の挙動を説明してください。

```ts
//WIP

let nullOrString: string | null = "string"

console.log(nullOrString.length) //string。union型が失われるが...

nullOrString = null //代入可能 string | nullになっている

nullOrString = "stringAgein"; // 注釈はstring | nullのまま

nullOrString = 123; // Error

```

[playground](https://www.typescriptlang.org/play/index.html#code/DYUwLgBAdgrswHkBOBlMSCWUDmAuCAzulthAD7RzAQC8EAREZjvRAFBsDGA9lAd6AB0wbtgAUseMjTNswkDjAALAJQQA9OqYlAQAwwoGXoGj1QDIMgRk1A8QyAYhkDRDCcEOOkxKmI5aleBvWBjuUCmioD3yoC-AYRupBTOgNYMgFYMgMYMgGYMgCIMNk5U0mEejGEAgtggWPQA3N4QgBc2gBOJgPYM2u4RVIB2DIB+DI2pUq6yHgCMAEwAzMWaEACiSEjcSEA)

**問19**

こちら

```ts
let a = 1
const num = a && "hoge";
```

型推論は何ですか

```ts
0 | "hoge"
```

**問20**

WIP

```ts
型の絞り込み (type narrowing)
```

**問21**

WIP

```ts
「return文はあるけどreturnせずに関数が終了する場合がある」 ->  例: string | undefined
「return文がない」 -> void
```

**問22**
[contextual typeがある状態](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0)というのはどういう状態のことですか

```ts
TypeSciriptは引数の型注釈で型を宣言しなくてはいけない、が、

型推論の時点で期待される型があらかじめわかっている状態(contextual tyipingがある状態)なら書かなくても良い

type Func = (arg: number) => number
const double: Func = function (num) { return num * 2}

numは本来型注釈を書かなくてはいけないが、文脈からdoubleに入る関数はFunc型でなくてはいけないことがわかっている。
これがcontextual typingがある状態

・文脈からわかる型。
・関数の引数や戻り値を文脈から推論させること。
・型推論の時点で期待される型があらかじめ分かっている場合を「contextual typeがある」という

これは以下のときに重要になる
・callback関数を別の変数に割り当てると、contextual typeがなくなる
・型引数を明示しない時、型推論が推論される順番を理解するとき

contextual typingが発生する場面
- 変数の型注釈によって型推論中の式の型があらかじめわかっている場合
- 関数引数のcontextual typing
- 関数の返値のcontextual typ

```

**メモ**

型引数の推論について
実行時に型引数を省略すると
TやRといった型引数も一緒に推論される
この場合引数から推論される

```ts
function apply<T, R>(value: T, func: (arg: T) => R): R {
  return func(value);
}

// res は string 型
const res = apply(100, num => String(num ** 2));
```

- 呼び出し時引数から受け取り側の仮引数の型が決まる
- 引数の型が決まってから関数の型が判明する

引数の型より型変数の推論ができていないといけない
|
型引数の推論と、引数で関数を渡す場合のその引数の型推論はどのような順番で解決されるか

contextual typingが必要な引数だけ後回しにする

`apply(100, num => String(num ** 2))`

1. contextual tyipingが不要な引数を先に型推論。100に対して型推論。numberを得る
2. 得られた情報からTがnumberに推論される
3. contextual typingが必要な引数を型推論する。 num => String(num ** 2)に対して型推論。 (num: number) => stringを得る
このときcontextual tyingは `(arg: T) => R`型だが`T`は判明しているので (arg: number) => R
4. 再び型引数を推論する型引数 `R`が`string`に推論される

型引数`T`と`R`の推論結果が決まるタイミングが異なる

Tの型引数の推論結果はその型引数が使われた時点で確定する

[型推論結果は処理の順番に依存する](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0)

オーバーロードシグネチャ

**問23**

こちらのコード

```ts
type MyObj = {
  name?: string;
}

function foo(obj: MyObj): string {
  return obj.name!.slice(0, 5);
}
```

の `!`の意味、危険性について説明をしてください。

**問24**

こちらの

```ts
function isStringArray(obj: unknown): obj is Array<string> {
  return Array.isArray(obj) && obj.every(value => typeof value === "string");
}

function foo(obj: unknown) {
  if (isStringArray(obj)) {
    obj.push("abcde");
  }
}
```
`obj is Array<string>`の説明をしてください

```ts
このように返り値をobj is Array<string>のように宣言している関数は
真偽値が返らなくてはならず、
isStringArray関数の返値がtrueならobjは`Array<string>型`が返ることを指定しています。
```

**問25**

こちらの

```ts
(num: number) => { // 'num' is declared but never used.
  return "return";
}
```

'num' is declared but never used.をdisableしてください

```ts
(_num: number) => { // ok, _ pre
  return "return";
}
```

**問26**

WIP enumの使い方 1

```ts
enum Weekend {
  Friday = 1,
  Saturday,
  Sunday
}

function getDate(Day: string): Weekend {
    if ( Day === 'TGIF') {
        return Weekend.Friday;
    }
    return Weekend.Saturday
 }
let DayType: Weekend = getDate('TGIF');


// string enum
enum Weekend {
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday ='SUNDAY'
}
const value = someString as Weekend;
if (value === Weekend.Friday || value === Weekend.Sunday){
    console.log('You choose a weekend');
    console.log(value);
}

// enumを使用するのが最適かつ非常に効率的な場所と適切な使用例があります

// 列挙型は、他のTypeScriptデータ型と同じように、配列の初期化内で使用できます。
// これは簡単な例です。

enum NigerianLanguage {
  Igbo,
  Hause,
  Yoruba
}

//can be used in array initialisation
let citizen = {
  Name: 'Ugwunna',
  Age: 75,
  Language: NigerianLanguage.Igbo
}

列挙型は理想的には、週の7日のように、定数と見なすことができる明確な値がある状況で使用されるべきです。
enum Days {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

// 列挙型は、文字列または定数を変数で表す必要がある場所でも使用できます。

// TypeScriptの列挙型は、次の場所では使用しないでください。

// 列挙型メンバーの値を再割り当てまたは変更する予定の場合、enumは型保証されているため、再割り当て時にコンパイルエラーが返されます。
// 動的な値を記録したい場合、enumは有限項目に最も適しており、その背後にある一般的な考え方はユーザー定義の定数システムを作成するのを助けることでした
// 列挙型を変数として使用することはできません。そうするとエラーが返されます
```

**問27**

WIP unknown type

```ts
```

[unknown type](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

**問28**

こちらのエラーをnumberとstringに対応できるように修正してください。

```ts
function eachItem(val: number, i: number) {
    return val.toExponential(3);
}
const arr = [4, "fafa", 6];
arr.map(eachItem);
```

**問29**

こちら

```ts
function fa(callback, e){
  return callback(e);
}

const fun = (e) => 1 * e;
const v = fa(fun, 1);
```

`Parameter 'callback' implicitly has an 'any' type.` と `Parameter 'e' implicitly has an 'any' type.` に対応してください(callbackに型付けしてください)

```ts
interface Fun {(e: number): number;}

function fa(callback:Fun, e: number){
  return callback(e);
}
const fun:Fun = (e) => 1 * e;
const v = fa(fun, 1);
```

**問30**

こちら

```ts
type YukarinoChi = "tokyo";
type OnlySpecificProperty<T> = Pick<T, {[K in keyof T]: T[K] extends YukariNoChi ? K : never}[keyof T]>;
```

の型を説明してください

```ts
// "tokyo"リテラル型を値としてもつプロパティだけを抜き出した型を定義しています

type YukariNoChi = "tokyo"

const obj = {
    name: "kenji",
    age: 99,
    born: "tokyo",
    live: "tokyo"
}
type Obj = {
    name: string,
    age: number,
    born: YukariNoChi,
    live: YukariNoChi
}

const obj2 = {
    born: "tokyo",
    live: "tokyo"
} as const

type OnlySpecificProperty<T> = Pick<T, {[K in keyof T]: T[K] extends YukariNoChi ? K : never}[keyof T]>;


function fun(onlyYukari: OnlySpecificProperty<Obj>){
    return onlyYukari
}
const result = fun(obj2); // Pick<Obj, "born | live">

```

[playground](http://www.typescriptlang.org/play/index.html#code/C4TwDgpgBAmgrgawIYCcCWA5A9gYQBZpQC8UARMFgiFqQFC0DGWAdgM7BRYBGAVsVAG9aUEVGZIAthABcZBBGY80pADTDRSAOYyoATl1rRULlhTNZ5StVXqRAGzQA3HZao1aAX1qhIUAPK8-EJG4lKy7OjMmoYa2rLMcBJcECgxIiZmsvDI6Nj4aGlQDs5ZiKiYuASe9ExsHNw8AExBtsam5mQUbjZGxS5d1p5QSKxQtez0PtB+zHYg2eUAPAAqAHz8AApoDAgrKoIA2gDSUGjMUPLUAGZQywC6ssvHd1AQAB7ACgAmowu5lYQAPxQE7xCDOFAeA6XLA3e6rADc9FoVzgzAYwDQLCgqOYAAoWHM-mhZDMiWV0IsAjxVgBKYKiFAQYBwMycWbzCloarjDhM1hwOwcEi4gm8Rq0hFAA)

**問31**

stringとnullableな配列の型を作ってください

```ts
let arr: (string | null)[] = []
```

[playground](http://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBAhgJwQLgBTQQSzAcxgHxjAFcAbUgSgG0BdGAXhloFgAoNxBAOgAdiIAFqhLkKAbjahIIUgFMupEDlSdxQA)

**問32**

こちらの

```ts

type F = {
    foo: string;
    bar: number;
}
const E:F = { foo: "fafa", bar: "fafa"} //Error
```

定義元のFを直接編集せずに代入できるように型付けしてください

```ts
type F = {
    foo: string;
    bar: number;
}

const E:Record<keyof F, string> = { foo: "fafa", bar: "fafa"}
```

**問33**

`type Exclude<T, U>` の説明をしてください

```ts
ExcludeはTがUに代入可能ならnever、そうでない場合Tを返すconditionalTypeです

use case
type Q = Exclude<string | number, boolean | string | number>
//boolean

type Q = Exclude<string | number | undefined, any>
// never
```

**問34**

こちら

```ts
export defaut function person({ detail } : Person) {
  return <div>{detail.name}</div>
};

interface Person {
    id: number
    detail: Detail
}

person({detail: {name: "fafa"}, id: 1 });
```

はdetailが初期化された時 `undefined`が渡って来てもいいように対応してください

```ts
export defaut function person({ detail = {}} : Person) { // error
  return <div>{detail.name}</div>
};
// このままだと
// Property 'name' is missing in type '{}' but required in type 'Detail'.
// になります

defaultaParameterを設定し、アサーションします

export defaut function person({ detail = {} as Detail} : Person) {
  return <div>{detail.name}</div>
};
```

**問35**

reactでsetStateをする際に

```ts
interface State {
 name: string
 age: number
}

this.setState({name: "kenji"}) // Error
this.setState({name: "kenji", age: this.state.age}); // ok
```

このように特定のState.propertyのみを渡すとエラーになる

全てのpropertyを渡さないでもいいようにしてください。

```ts
interface State {
  name?: string;
  age?: number;
}
```

**問36**

こちらは

```ts
interface User {
  id: string
}
interface AppUser {
  appName: "appName"
  appID: string
}
interface ServiceUser {
  serviceName: 'serviceName'
  serviceID: string
}
const user = {id: "1"}
const appUser = { appName: "appName", appID: "appId"} as const;
const serviceUser = { serviceName: "serviceName", serviceID: "serviceID"} as const


function a(o: ServiceUser | User | AppUser){
  return o
}

const result = a(user)
```

関数 `a` は`ServiceUser` or `User` or `AppUser`を`a` に渡してそれを返す関数です。
期待型は `ServiceUser | User | AppUser` になっています。
これを それぞれ `ServiceUser` は`serviceID`、`User`は`id`、`AppUser`は`appId`を返す関数に直して、 期待型を`string`にしてください

```ts

function a(o: ServiceUser | User | AppUser){
  if("serviceID" in o) return o.serviceID;
  if("appID" in o) return o.appID;
  return o.id;
}

const result = a(serviceUser) // string
```

[playground](https://www.typescriptlang.org/play/#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChkHLAAmAXMumFKAOa4C+uoksiKAggA6cZZ6HI43AHJwAthHIAiIZ1ESp+QrICSAEXKVqIOo2bR4SZAGVoAN2BJeUHEoKYoFpPMnIA5A6cQXbuxXOWEOqaVLQMuAgA9iCUyACuDsgAvDgk0gCMUoxRMWCC3NbJOPly4q4yImVSADQlwchSEE1ZgujIOZQA3BHRsZ6BhSnY-o6BLtL9zlW1k0EaDegtcG0dYLjrMHEgCGDA0YIAFJHkpqNWiQA+aJfIXDwOAJT8hMAwB1Kz6lJEIMiRD8goBAwHEoL9IgA6T5qboCV7vVRqb6gP4AoEgsF-CGI2GEdGg8EQkjdRg9XKAiDoOIAGzyKTgB1m1geQA)

**問37**

WIP 問題文。

上の問題の

```ts
function a(o: ServiceUser | User | AppUser){
  if("serviceID" in o) return o.serviceID;
  if("appID" in o) return o.appID;
  return o.id;
}
```

を
独⾃定義 TypeGuardで型定義してください。(それぞれ `isService`、`isAppUser`、任意で`isUser`関数を作り、ifのコンディション内で実行。返す値がそれぞれのプロパティを持つようにして、型付けされていることを確認してください)

```ts
const isService = (o: any): o is ServiceUser => {
    return o.serviceID === "serviceID";
}
const isAppUser = (o: any): o is AppUser => {
    return o.AppUser === "appUser";
}

type O = ServiceUser | User | AppUser;
function a(o: any){
    if(isService(o)) return o.serviceID;
    if(isAppUser(o)) return o.appID;
    return o.id; // User
}
const result = a(serviceUser)
```

[playground](https://www.typescriptlang.org/play/#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChkHLAAmAXMumFKAOa4C+uoksiKAggA6cZZ6HI43AHJwAthHIAiIZ1ESp+QrICSAEXKVqIOo2bR4SZAGVoAN2BJeUHEoKYoFpPMnIA5A6cQXbuxXOWEOqaVLQMuAgA9iCUyACuDsgAvDgk0gCMUoxRMWCC3NbJOPly4q4yImVSADQlwchSEE1ZgujIOZQA3BHRsZ6BhSnY-o6BLtL9zlW1k0EaDegtcG0dYLjrq0TopqNGKQAUkeRwIACeAJTkkVsmAVaJSQB8tgJQEGBxUCDIkQB0s+pkkkUlIAWopN1sr08sB0FweA9kIdjmdLj8bvDBs9+IQ3h8vj9fpiHsCGrJrBDwrgwKdOCgAPJFHZeQoAHzQiXZxOg3RgcRACDAwGigmRglROIIwBg+1hzMCh3O52QeM+3z+YO6AmlsrhBQciuVqoJf1Uai1uPeasJJEhG2hKog6DiABs8ik4PtZtZzkA)

**問38**

こちら

```ts
const o = { name: "hoge" }
function a(o){
    return o
}

a(o)
a();
```

の defaultValueとany型に対応してください

```ts
const getDefaultProps = () => {
    return {name: "hoge"}
}
const defaultProps = getDefaultProps();
const o = {name: "hoge"}
function a(o = defaultProps){
    return o
}

a(o)
a();
```

[playground](https://www.typescriptlang.org/play/#code/MYewdgzgLgBA5gUygEQQMwIYFcA2UAKATiAA4QwC8MAFAJSUB8MA3gFAwcyFJaFgtgMAWwQAuGACIAFiEQSAvq0WhIsACbpseIqXJVEKTbgLEydANysV0GCEoDhYyTLmK0WMMCgBLcDAzUdlQamMY6ZLRsnFw8fLZKrKwBILRJFkA)

**問39**

こちらは

```ts
type Animal = { name: string, run: boolean }
type Bird = { name: string, fly: boolean }
const animal = { name: "tigger", run: true }
const bird = { name: "condol", fly: true }

type NotHumman = Animal | Bird

const a = (b:NotHumman) => {
    b.run
}
```

なぜコンパイルエラーになるのですか？説明してください

```
WIP
```

**問40**

こちら

```ts
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void,timeout?: number): void;
```

コールバックに渡す引数の数が違うのでオーバーライドしてあります。修正してください

```ts
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;

// コールバックの引数が違うだけでオーバーライドしないようにしましょう。
// コールバックがパラメータを無視することは常に正当です。渡って来なくても無視されるだけです。
```

**問41**

こちら

```ts
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

修正してください。

```ts
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)

// TypeScript は関数呼び出し時に最初にマッチしたオーバーライドを選ぶので、any だと最初に必ずマッチしてしまう
```

**問42**

こちら

```ts
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
```

修正してください

```ts
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}

//　返る型が同じ場合、可能な限りオプショナルを使いましょう。
```

**問43**

こちら

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

// 1
y = x;

// 2
x = y;
```

`1`と`2`はそれぞれエラーになりますかなりませんか

```ts
y = x; // ok!
x = y; // error

//返る型が同じ場合、引数の数は関係ない。代入元が代入先の引数を持っているかどうか。

// example
type F = (name: string, n: number) => void;
let f: F = (value: string) => {
  //実装は使わないでもokだが
  console.log("here");
};
f("how", 2); //渡す際に満たさないといけない,
```

**問44**

こちら

```ts
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });

// 1
x = y;
// 2
y = x;
```

`1`, `2`はそれぞれエラーになるかならないか

```ts
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });

x = y; // OK
y = x; // エラー。xの戻り値には location プロパティがない

// 代入元の返り型は代入先のプロパティを含んでいないといけない
```

**問46**

こちら

```ts
let identity = function<T>(x: T): T {
  // ...
};
let reverse = function<U>(y: U): U {
  // ...
};
identity = reverse;
```

は代入できるか。それぞれ`T`と`U`の型は何か

```ts
 // OK。anyになります。
 (x: any)=>any は (y: any)=>any と互換性がある
 ```

**問47**

こちらは呼び出すことができません。

```ts
type StrFunc = (arg: string) => string;
type NumFunc = (arg: number) => string;

declare const obj: StrFunc | NumFunc;
obj("fa");
```

なぜですか

```ts
objの型はStrFuncかNumFuncの型であり、それぞれの引数の型が違うためどちらの関数が呼び出されてもいいようにどちらの引数にも対応できる型を渡す必要があります
```

**問48**

こちらは

```ts
interface MyObj {
  name: string;
  age: number | undefined;
}

let obj: MyObj = {
  name: "kenji"
};
```

Errorになります。なぜですか。また正しく修正してください

```ts
interface MyObj {
  name: string;
  age?: number | undefined;
}

let obj: MyObj = {
  name: "kenji"
};

// オプショナルを使わない場合はプロパティは存在はして居ないといけません。

let obj: MyObj = {
  name: "kenji",
  age: undefined
};
// なら可能
存在もして居ない場合は`?`を付与すること。
```

**問49**

TypeScriptで`console.log`を呼び出してもコンパイルエラーにならないのはなぜですか?

```ts
//https://docs.solab.jp/typescript/ambient/declaration/

TypeScript では console.log などを呼び出してもコンパイルエラーにはなりません。 
これは、TypeScript コンパイラがデフォルトで lib.d.ts という宣言ソースファイルを利用しており、
lib.d.ts には次のようなアンビエント宣言が記述されているためです。

// lib.d.ts
declare var console: Console;
```

**問50**

こちらは

```ts
interface Foo {
  name: string;
}
let obj: Foo = { name: "kenji", age: 90 };
```

なぜコンパイルエラーなのですか？ `{ name: "kenji", age: 90 };`が代入できるように修正してください

```ts
// オブジェクトリテラル型はFooが知っているプロパティのみ代入可能です。ageは知りません。
// これを回避するためにはオブジェクト型にすることです。

interface Foo {
  name: string;
}
const other = { name: "kenji", age: 90 };
// otherで推論が下記のように変わる
const other: {
  name: string;
  age: number;
}
let obj: Foo = other;

// or

//何が入ってくるかわからない場合
interface Foo {
  name: string;
  [other: string]: any; //here
}

let obj: Foo = { name: "kenji", age: 90 };
```

**問51**

こちらは

```ts

let foo:any = {}
foo["a"] = { message: "some message"};
```

fooにanyを注釈しています。インデックスにstring、 値に代入しようとしている型を指定してください

```ts

let foo:{ [index: string]: { message: string }} = {}
foo["a"] = { message: "some message"};

```

**問52**

こちらは

```ts
const tupleStrNum = ["X", 2];
```

型推論で(string|number)[]になります。

`[string, number]` とするにはどうしたらいいですか

```ts
const tupleStrNum = ["x", 2] as [string, number];
//const tupleStrNum: [string, number] = ["X", 2];
```

**問53**

こちらを

```ts
interface SomeObject {
    firstKey:   string;
    secondKey:  string;
    thirdKey:   { id: { name: string} }
}
```

再帰的に各プロパティをオプショナルにした型を定義してください

```ts
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

const b: RecursivePartial<SomeObject> = {}
b.thirdKey = {}

/// 一部のプロパティをのぞいて再帰的にオプショナルにする型
type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>;

//ok
const a: PartialExcept<SomeObject, "thirdKey"> = {
    firstKey:   "",
    secondKey:  "",
    thirdKey:   { id: { name: {}} }
}
// ok
const b: PartialExcept<SomeObject, "thirdKey"> = {
    thirdKey:   { id: { name: {}} }
}
// error
const c: PartialExcept<SomeObject, "thirdKey"> = {}
```


**問54**

プロパティ`name`の値型が`string | null`、ageの値型が`number | null`の型`User`を定義してください

```ts
const d = {name: "kenji", age: 99}

type E = {name: string, age: number}
type User<T> = {[K in keyof T]: T[K] | null }

const e:User<E> = { name: null, age: null};
```

**問55**

`U`を`extends`している値`T`は`never`を返し、そうでない値型は`T`を返す`Diff`を定義してください

```ts

type Diff<T, U> = T extends U ? never : T;

const t1:Diff<"a" | "b", "b" | "c"> = "a";

```

**問56**

こちらの

```ts
const t3 = {name: "kenji", age: 99} as const
type T3 = keyof typeof t3
```

`T3`の型をおしえてください

```ts
//type T3 = "name" | "age"
```

**問57**

TODO

 ```ts
enum StatusEnum { RootAdmin = "RootAdmin", Admin = "Admin" }
type T2 =  Partial<Record<StatusEnum, number | null>>
const t2:T2 = { RootAdmin: 0 }
```


**問58**

こちらの

```ts
type User = { name: string, age: number}
const f = (a:User) => a
const a:F<User> = f({name: "kenji", age: 9});
```

を参照に、

もし関数型である引数を渡したらその引数が返ってくる型、関数型ではないなら関数が返ってくる`F<User>`を定義してください。

```ts
type F<T> = T extends (a: infer P) => any ? P : T;
type User = { name: string, age: number}
const f = (a:User) =>  a

const a:F<User> = f({name: "kenji", age: 9}); // User
const b:F<string> = "hello" //string
```

[playground](http://www.typescriptlang.org/play/#code/C4TwDgpgBAYgPAFQHxQLxQVCAPYEB2AJgM5QAUAhgFxQCW+AZhAE5QAKAlGihfiFAH52UGggDcAKAmhIUAKrEWaKAG8o+CgFsINYsGb0A5gBooFQzvUBXTQCMWAXykSAxgHt8eqA2WUqCli5UFDMpd09gMyp4AOYUdAYyFQ1tGgAiAGsCACtaNNNzSwBOBw4xKAB6CvlFZlcPL1touD0DfEN4qDSACwgAGz63NMqK1qNnIA)

**問59**

下記のような
```ts
type User = { name: string, age: number }
```
User型がある。こちらのvalueのUnion型を取得する型を定義してください。 `string | number`

```ts

type User = { name: string, age: number }
type Value<T> = T[keyof T]
type ValueType = Value<User> // string | number

// 別解
type Value<T> = { [K in keyof T]: T[K] }[keyof T]
type ValueResult = Value<User> // string | number

```

[playground](https://www.typescriptlang.org/play/?ssl=23&ssc=33&pln=18&pc=1#code/LAKFBcE8AcFMAICqBnWAneBeeBveA7AQwFtYAueZcNAS3wHMAaeQ+8ggV2ICN14BfUKAD0w+ACIipcfAA+E1rHFCQUOPADSsSCj7YA1toD2AMySoMK0ZWp16czj3Qq1CAGqEANh1gAeACoAfFi48ADaGvB08IaQpvD+ALoU-hGJAmGx8UkuMO5ePgBKsMgcnuAhHt5+umiBuepVPgDyJgHB2KlZZjlgqnnwTbCtxaXllQXDbbX1fSpAA)



**問60**

こちらの型

```ts
type User = { name: string, age: number, id: number }
```

の値の型がnumberのものだけを抽出した型を作ってください。 期待する結果 `{age: number, id: number}`


```ts
type User = { name: string, age: number, id: number }

type Value<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T]

type NumberType = Pick<User, Value<User>>
```

[playground](https://www.typescriptlang.org/play/#code/C4TwDgpgBAqgzhATlAvFA3lAdgQwLYQBcUcwiAllgOYA0UOVR2ArngEZJ3kAmxWrHZAF8AsAChxoSFABqOADbMIAHgAqAPlQYoAbQDSUSlADWEEAHsAZlFUBdYqv22oEAB7AIWbnBbskUAH4oAz4IADd-IR1TC2s7cUlwaAA5ASRVJK0ABXIAY2NleE5ZBSVChER1dSA)

**問61**

下のようなコードがあります
```ts
const isNarrowScreen = () => false
export function wideNarrow(wide: number | string | undefined, 
    narrow:number|string|undefined){
    return isNarrowScreen() ? narrow : wide;
}

const a = wideNarrow(0, 8)
const extendedAreaHeight = 26;
const b = a + extendedAreaHeight // Operator '+' cannot be applied to types 'string | number' and 'number'.

```
上の場合unionTypeなため`+`で加算しようとするところでエラーになります。こちらを渡ってきた型を推論するようにしてください

```ts
const isNarrowScreen = () => false
export function wideNarrow<T>(wide: T, 
    narrow:T){
    return isNarrowScreen() ? narrow : wide;
}

const a = wideNarrow(0, 8)
const extendedAreaHeight = 26;
const b = a + extendedAreaHeight
console.log(b)

```

[playground](https://www.typescriptlang.org/play/#code/MYewdgzgLgBAlhAcgQwE6pAdwMrFQU3zBgF4YAKASlID4YAzZAGwnwFgAofADwAcRUsegFcwwKHHAxMcACb4U6LAB4AKjXIz5ALhiqANDE4wTMMGgyZtqygG9jpglGGpiCRZdwEiVGAH4zCywYXS18AG5OAF9OTlBIWGRSaTkFIMxyAAZDAA5KOPBoGB4oInlZAEECZAAJfDgAcwALWDIAJgA2SI54ooAjZKSAamLuUrByqvxa+uaoAsgQJnwAOiYQBvI+-I4gA)


**問62**

下記のこちら

```
function test3(values) {
    const result = {}
    for (const key in values) {
        result[key] = values[key].toUpperCase()
    }
    return result
}

test3({name: "kenji", address: "meguro"})
```

を型付けしてください

```
function test3<K extends string>(values: Record<K, string>): Record<K, string> {
    const result: Partial<Record<K, string>> = {}
    for (const key in values) {
        result[key] = values[key].toUpperCase()
    }
    return result as Record<K, string>
}

const a = test3({name: "kenji", address: "meguro"})

```


[playground](https://www.typescriptlang.org/play/?ssl=9&ssc=52&pln=1&pc=1#code/GYVwdgxgLglg9mABFApgZygZgDwGlEoAeqYAJmohgE4xgDmAfABQBuAhgDYjoBciASighwqpPABpKUGvQYBKPoOGiJUmY0QBvALAAoRAcTCwGRFXQgOUPgAU2VWJ2xKRY3JOq1GDRAF4tAL56hojAIohMxqYA1igAnoi0iOxc6HJawSGG5miWUADasXEAun7JnNxohfHFAHRQcACqAA7NKFQAwmxoKExymQZB+tkoUCBUSDl5iN0CQq6qnrJ6Q3pRUDNlqBiYTJpgbAC2KHwARLFgAFYwp5JspKQ5aGfHdONwpwFyQA)




**WIP**

[playgrond](https://www.typescriptlang.org/play/index.html#code/JYOwLgpgTgZghgYwgAgMoHsC2EDyAjAKwgTGQG8BYAKGVuRmCgGcwBpCATwC46WpQA5gG5qdZE2LoQAE3bdafQSJp0wAC0azOPWmWTBpPPSDjYjAX3PJz1G1WrUwHAA4oASsQCuzYADcIAApwUGDAcAA2ADwAKgB8yAC85KJ0ANoB+iDIANac6DDI0QC6APw8HgjeTH6BwaERMelFscrmyk6uyEEhYeEAogAeSM5gMQA0yKzIEAOQMkw5eQVxicgVVTXd9VErAGRdwAjZ45MtDlQIUizIcDxbvYPDoxjY+EQkEwBE6ppyn-FJSgqWgMZhsbR0T6fMYpBSSGRyHRQmHA5A-KBaeS6fSGcjIExmciWay2c6XEDXPDlLw+fz3BovXCEYhgAFE6h4AB06MxqzIdkcLhQABEIBBnPSdmygWJ0plFhx8oVSjxReLJY0As1WspqOTrghVWKJXVepFGW8WdLYWiNBjEeQDEZ8aYIBZLKT7FQgA)



```ts
https://tech-1natsu.hatenablog.com/entry/2019/02/09/014218
```

**参照**

- [https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0)
- [https://www.pg-fl.jp/program/ts/kw-ref/never.htm](https://www.pg-fl.jp/program/ts/kw-ref/never.htm)
- [https://qiita.com/Quramy/items/b45711789605ef9f96de](https://qiita.com/Quramy/items/b45711789605ef9f96de)
- [https://qiita.com/uhyo/items/aae57ba0734e36ee846a](https://qiita.com/uhyo/items/aae57ba0734e36ee846a)
- [https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/](https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/)
- [https://mariusschulz.com/blog/the-unknown-type-in-typescript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [TypeScript3.4 型の強化書](https://booth.pm/ja/items/1317204)

- [use Partial in nested property with typescript](https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript)

