# Polyfill when prepend cannot be used in IE

```js
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) { // あれば何もしない
      return;
    }
    Object.defineProperty(item, 'prepend', { // itemに対して定義する
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() { // prepend実装
        var argArr = Array.prototype.slice.call(arguments), // 引数を全て取る
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem))); // Nodeだったら追加、そうじゃないなら文字列にして追加
        });

        this.insertBefore(docFrag, this.firstChild); // this.firstChildの前にdocFragを挿入
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
```

[ref](https://stackoverflow.com/a/52072825/5005464)