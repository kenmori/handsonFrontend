[https://tech.aptpod.co.jp/entry/2020/06/26/090000](https://tech.aptpod.co.jp/entry/2020/06/26/090000)


セレクター関数のインスタンスが新しくなるインラインの場合再計算が毎回走る

```js
 const hoge = useSelector(state => state.hogehoge) // 新しいインスタンスを返している
 //hogehogeは更新がなくてもレンダリングされる
 ```



 reselectを用いると、メモ化されるため値の更新が無い限りオブジェクトでもインスタンスは変更されず、先程のshallowEqualがなくても再レンダリングが抑制されます。


- useSelectorは厳格な === チェック
- 新しいimmutableな値が返されると参照が変わりuseSelectorは実行される
  - 細かくuseSelectorを呼びプリミティブな値を返すのがいい
  - それができない場合

```js
  import { shallowEqual, useSelector } from 'react-redux'

const someResult = useSelector(some, shallowEqual)
// 異なるオブジェクトでも値が同じならok
```

浅いオブジェクト比較なのでプロパティキーが同じ場合はレンダリングされない

[deepEqual](https://stackoverflow.com/a/62214881/5005464)
この場合 正規化すれば比較が容易なのでそれでこの大仰なコストを払わないでいいか検討する必要もある


- createSelectorはメモ化された関数



- メモ化とは、同じ引数を使用して関数を複数回呼び出すと、その関数は1回だけ実行されることを意味します

[](https://stackoverflow.com/questions/58587126/can-someone-explain-how-input-functions-are-used-in-functions-in-reselect-librar)



defaultMemolize ・・・createSelectorCreatorの第一引数でcreateSelectorの最後に渡すlastResultFunctionを引数にとり前回の結果か新たに計算した結果を返す。最終的なstate結果

equalFunction ・・・・createSelectorCreatorの第二引数。option。
createSelectorCreatorの中でdefaultMemolizeの第二引数以降に渡される。
その中でlastResultが一致するかの比較関数。

customSelector・・・createSelectorCreatorで返される関数。最後に指定されるresultFunctionがdefaultMemolizeの第一引数に渡され
すでに渡されているequalFunctionがfalseなら `lastResult = func.apply(null, arguments)` としてlastResultFunction再計算

customSelectorがそれぞれの状態取得関数をとりresultFunctionがmemolizeされた値か作られた値を返す

説明できるようになった

