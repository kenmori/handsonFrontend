## 登場する概念

### Components

- ReactElementを返す

```js
// component
const App = () => <div>a</div>
```

### ReactElement

```js
// ReactElemnt
<App />
```

BabelがReact.createElementに変換する


```js
const el = <div>hello world!</div>
```

### JSX

- JavaScriptの拡張構文

```js
// JSX.Element(Element)を返す関数
const App = () => <div>hello</div> // () => JSX.Element
```


### ReactNode


### ReactChild


###

- [refを使った以前のpropsの値を参照、変わっていたら更新する方法]
(https://stackoverflow.com/questions/55228102/react-hook-useeffect-dependency-array)

- [setStateを入れる理由](https://stackoverflow.com/questions/59709304/setstate-in-reacts-useeffect-dependecy-array)

- [依存配列にオブジェクトを渡した場合必ず以前と違うので実行される。それを回避する処理の話](https://betterprogramming.pub/stop-lying-to-react-about-missing-dependencies-10612e9aeeda)

- [依存配列にシャローな値を含めるが、長すぎるのでuseMemoでマップしてオブジェクトとして生成して更新させない](https://dev.to/ms_yogii/useeffect-dependency-array-and-object-comparison-45el)

- [VDOMの説明](https://dev.to/siddharthshyniben/let-s-build-a-vdom-56pa)

