# DOM property と HTML attributeの違い

## elem.setAttribute("id", "js-hoge") vs elem.id = "js-hoge"の使い分け

### 結論

- 1. DOM propertyとして標準で持っているプロパティなら `elem.id = "js-hoge"`
- 2. `setAttribute`はDOMが持っていないカスタムな属性を付与したい時に使う
- 3. `inputElement`に対して`set/getAttribute`を使うと静的な値しか取れない(現在の値にアクセスしたい場合はプロパティを直接参照したり代入したりする)

`3`のinputElementに関して、例えば

```html
<input id="js-input" type="text" value="defaultValue" />
```

このように書いた場合、ブラウザはDOMオブジェクトを生成する。
そのオブジェクトはプロパティを持っていて、
そのプロパティの一つに`attributes`というのがある

### attributes??

以下はDOMプロパティのattributesにアクセスした様子。コンソールで確認できる

[codeSandbox](https://codesandbox.io/s/dom-property-vs-html-attribute-yoees)

DOMプロパティとattributesに設定されている属性はお互い対になっている`標準の属性`があるが、`非標準`なものも追加できる

### 非標準な属性とは

まず
標準な属性とは`id`や`type`や`value`などであり

`type`は`[(HTMLInputElement)](https://html.spec.whatwg.org/#the-input-element)`では標準だが`[body(HTMLBodyElement)](https://html.spec.whatwg.org/#the-body-element)`では非標準だったりする。

例えば
これは [aタグのHTMLAnchorElement](https://html.spec.whatwg.org/#the-a-element)ですが
ここの`Content attributes:`に

```text
Global attributes
href — Address of the hyperlink
target — Browsing context for hyperlink navigation
download — Whether to download the resource instead of navigating to it, and its filename if so
ping — URLs to ping
rel — Relationship between the location in the document containing the hyperlink and the destination resource
hreflang — Language of the linked resource
type — Hint for the type of the referenced resource
referrerpolicy — Referrer policy for fetches initiated by the element
```

これらの属性がある。

すぐ下のDOM interfaceはこうなっているが

```text
DOM interface:
[Exposed=Window]
interface HTMLAnchorElement : HTMLElement {
  [HTMLConstructor] constructor();

  [CEReactions] attribute DOMString target;
  [CEReactions] attribute DOMString download;
  [CEReactions] attribute USVString ping;
  [CEReactions] attribute DOMString rel;
  [SameObject, PutForwards=value] readonly attribute DOMTokenList relList;
  [CEReactions] attribute DOMString hreflang;
  [CEReactions] attribute DOMString type;

  [CEReactions] attribute DOMString text;

  [CEReactions] attribute DOMString referrerPolicy;

  // also has obsolete members
};
HTMLAnchorElement includes HTMLHyperlinkElementUtils;
```

ここにあるDOMプロパティと前述の属性は対になっていることがわかる

非標準なものは

```html
<a class="news" anchor-name="1" >1</a>
<a class="news" anchor-name="2" >2</a>
```

のようにセットして

```js
const anchors = document.querySelectorAll("[anchor-name]")
for ( let anchor of anchors){
  const number = anchor.getAttribute('anchor-name')
  console.log(number)
}
```

や

```css
.news[anchor-name="1"]: {
  background: red;
}
```

のように独自で付与するもの

このような非標準な属性にアクセスしたい時に`setAttribute`や`getAttribute`を使う

```js
elem.hasAttribute(name) 存在の有無
elem.getAttribute(name) 取得
elem.setAttribute(name, value) 設定
elem.removeAttribute(name) 削除
```

属性は`HTML`で書かれているもの。
プロパティ–は`DOMオブジェクト`の中にあるものです。

### HTMLInputElementに対してset/getAttributeを使った場合

以下、WIP

idはDOMプロパティでありそのプロパティを反映させる属性を持つ
`input.id = "js-hoge"`はプロパティにアクセスして属性に書き込んでいる

一方valueプロパティは属性値へ反映させません
ユーザーがinputのvalueを変更するとプロパティ値が変わりますが属性値は変更されません

ここの挙動がプロパティにアクセスするかgetAttributeで取得した値が変わります
現在の値を取得したい場合、
`input.value`でアクセスし、
初期値にアクセスしたい場合
`input.getAttribute("value")`でアクセスします

input.setAttribute("value", "a")
input.value // "a"

ですぐに同期されるが

input.value = "value"
input.getAttribute("value") // "a"

同期されていません。
これはinputのattributesにアクセスしていて、プロパティにアクセスしていないためです。

期待するようにするには`input.value`で現在のプロパティにアクセスします

[ここでもう少し見やすいDOMプロパティやメソッドが見れます](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)

### 参考

- [Element.setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
- [L Attribute and Property Tables](https://www.w3.org/TR/SVGTiny12/attributeTable.html)
- [what-is-the-difference-between-properties-and-attributes-in-html](https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html)
- [dom-attributes-and-properties](https://ja.javascript.info/dom-attributes-and-properties#ref-1484)