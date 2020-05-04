<!--more-->

<h3>【Reactのstateとpropsの違いが知りたい！(変更・更新の仕方等デモあり)】過去のReact初心者の自分にpropsとstateの違いを説明する</h3>

[caption id="attachment_21407" align="alignnone" width="1000"]<img src="https://kenjimorita.jp/wp-content/uploads/2020/03/react.png" alt="" width="300"  class="size-full wp-image-21407" /> 水色[/caption]

[わたしについて](https://kenjimorita.jp/aboutme "わたしについて")

##### この記事は2016年に投稿した記事で、今では古い書き方になっているかもしれませんが、考え方は一緒です。(2020/4/30)

---



ややわかり始めたReact、1年前に<a href="https://qiita.com/M-ISO/items/6c8b97a9447ccfe9a1f6">こういう記事</a>かいて、今結構検索でヒットするみたいなので
、過去の自分にちょっと説明したらこんな感じかなと思って書きます。

ここの記事では<a href="https://jsfiddle.net/kenjimorita/85wn7x57/">この</a>コードをできるだけ簡単に説明しています。説明と照らし合わせて確認していただけたら幸いです。(PCでご覧になると表示がわかりやすいです)
<h4>propsとstateの簡単な説明</h4>
<!--more-->

下記コードをみてください。

```javascript
<ParentComponent />
```

こういうコンポーネントがあって、
ParentComponentはこういうDOMを返すとします。

```javascript
<div>
<h1>親です</h1>
<ChildComponent />
</div>

```



「返す」というのは、Reactではコンポーネント単位でrenderメソッドというものを必ず実装しなくてはならず、そのメソッドはDOMを返さなくてはなりません。
まだちょっとよく馴染みがない方は、
この<ParentComponent>という「コンポーネント」は「一つのまとまったコードを描画するようにコーディングする」と思っていただけたら理解早いかもしれません。
この<ParentComponent>という「コンポーネント」は「一つのまとまったコードを描画するようにコーディングする」と思っていただけたら理解早いかもしれません。
なので今回は上記のように返すとします。

この親がrenderメソッドで返すChildComponentコンポーネントは


```javascript
<div>
<h2>題名</h2>
 わたしの未来
</div>

```

というDOMを返すようにします。

なので最終的なの描画は


```javascript
<!--ここからParentComponentが返すDOM -->
<div>
 <h1>親です</h1>
  <!--ここChildComponentが返すDOM -->
 <div>
  <h2>題名</h2>
  わたしの未来
  <!--ここまでChildComponentが返すDOM -->
  </div>
</div>
<!--ここまでParentComponentが返すDOM -->

```

こうなります(実際のというのはやや語弊がありますが、説明のため端的にいっています。)
この「わたし」のところを可変にしたいとします。(状態を管理するといいます)
その場合親のrenderメソッド内でpropsとして渡す(今回は親がstateとして管理する場合を説明)

```javascript
<div>
 <h1>親です</h1>
  <ChildComponent name={this.state.name}/>
</div>
</div>
```

こう。(親から子供に値をわたすイメージです。)
で子供側では

```javascript
<div>
  <h2>題名</h2>
  {this.props.name}の未来
</div>
```

このように参照する。(親から値を受け取るイメージです。)

これが何をしているのか最初のうちはわからなかった。
これは「name属性として子供のコンポーネントに親で管理している`this.state.name`値を渡しています。」
name属性というのは任意の名前でつけます。
なんでもいいです。
この
`name={this.state.name}`
の`name`が属性
`this.state.name`が状態です
`name`属性は子供から参照する際の
`this.props.name`
の
`name`部分にあたります。
例えばこれが
`menber={this.state.name}`
とされていたら
子供では
`this.props.menber`として`this.state.name`値を受け取れるということです。

で、今回の場合
`this.state.name`に初期値として「わたし」を設定します。(後述///code1をみてください。このようにします)


なぜ「親から値を渡して子供は受け取る」とかそんなことしているか？？

親で値を管理すると
その値が変わると子供にその変更が伝わり、
その子供の子供に変更が伝わりと再レンダリングされます。
少し乱暴に言うと親の`state`値が変わった子供のDOMしか再描画されないので、パフォーマンスよく描画できます。
また`component`が状態を管理し、値は親から子供への一方通行で渡されるので分かりやすいんですね。

さらに可搬性が良くなります。部品部品で取り扱いやすくなります。

`this.state.name`。
これを「値を管理している」といいます。
可変にしたいプロパティを指定します

一方`this.props.name`。これは不変な値です。参照のみでここに値を直接変更してはいけません。
```js
this.props.name = "morita";
```
これは代入しちゃっています。
`props`は親から値を受け取るか、初期値として設定するかですので、これをrenderメソッド内でしてはいけません。
propsはread only。読み取り専用です。こうしたい場合はstateに変更します。

ついでにいうと
```js
this.state.name = "morita";
```
これもアンチパターンです。
stateの更新はsetStateでします。
```js
setState({name : name + "さん"});
```
こういうのはありです。
あとsetStateをrenderメソッド内で呼んではいけません

話を戻して、、

`this.state.name`は状態が変わる値です。
例えば、下は子供Componentが

```js
render(){
 return(
  <div>
   <h2>題名</h2>
   {this.props.name}の未来
  </div>
  )
}
```

renderメソッド内で親が渡している値`this.props.[親の属性値]`(親でいうthis.state.name)の状態を参照しています

当然親の`this.state.name`値が変わると参照している子供の値も変わるので状態が変わる度にレンダリングされます。
(ライフサイクルメソッド内の`componentwillreceiveprops`で描画をコントロールできますが。。それはまた)

これで親の状態が変わったらnameも変わる簡単なコンポーネントのできあがりですね。

親の方では

　
```js
//code1
this.state = {
 name: 'わたし'
}
```

をdefaultとしたり
defaultはpropsとして自分自身の値を参照すればこのような書き方になりますよ

```js
this.stata = {
 name : this.props.name
}
ChildComponent.defaultProps = {
 name : 'わたし'
}
```

babelをstage-0とすれば

```js
static name = 'わたし'
```

こういう風にかけたり、

もしくは
親の

```js
<ParentComponent name={'わたし'}>
```

とすれば初期設定できます

このようにして、UserActionがあったら
そのメソッド内で下の用に呼び出します。
例えばこうです

```js
onClick = ()=>{
 const name = 'あなた';
 this.setState({
  name: name
 });
}
```

このstateを管理している親のメンバメソッドでsetStateを呼び出すことでそれ以下のコンポーネントは再レンダリングされるので
このインスタンス

```js
<ChildComponent name={this.state.name}/>
```

これが子供でよみこまれる時には
name={"あなた"}
が渡っています。

子供のrender時のここが変わる

```js
<div>
 <h2>題名</h2>
 あなたの未来
</div>
```

こうなります。
これの何が嬉しいかは
これが下のようにリストとして表示したい場合、同じDOMを書くのはだるいので
コンポーネントを複数書く。
でもその中でレンダリングするDOMは固有のものにしたい。なんて時は

```js
//ParentComponent内のrenderメソッド内で
<div>
 <h1>親です</h1>
 <ChildComponent num={1} name={this.state.name} />
</div>
<div>
 <h1>親です</h1>
 <ChildComponent num={2} name={this.state.name} />
</div>
```

子供にpropsとして`num`を渡すことで`ChildComponent`内のrenderメソッド内で`props.this.num`が1の時で挙動を変えれたりするんですね。

例　親から渡ってきた`num`が1だったら`className`を変えたりする

```js
//ChildComponent内で
render(){
  const color = this.props.num === 1 ? 'red' : 'blue';
  return (
   <div className={color}>
    子供のDOM
   </div>
  )
}
```

//例 親から渡ってきたnumが1だったらさらにComponentを返す

```js
//ChildComponent内で
render(){
 const DOM = this.props.num === 1 && <GroundChildComponent />;
 return (
  <div>{DOM}</div>
  )
}
```

とか
子供の中で返すDOMやスタイルを変更したりする

ふう。

どうでしたでしょうか。。
Reactのpropsとstateがいまいち腑に落ちない方へ助けになれたら幸いです。

こちらに今回の<a href="https://jsfiddle.net/kenjimorita/jwm6k66c/422/">demo</a>をはっ付けておきます(PCから見るとちゃんと描画されるみたい。。)

playground
<a href="https://github.com/kenmori/React-ES6-Flux-Playground">https://github.com/kenmori/React-ES6-Flux-Playground/tree/master/playground</a>

今回のコード全部

<script src="https://gist.github.com/kenmori/acf54c6e0ebba1a55ad9a0f8a33c9aa0.js"></script>

[template id="17374"]