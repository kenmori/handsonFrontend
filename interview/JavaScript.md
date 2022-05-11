# interView JavaScript

こちらは[Front-end-Developer-Interview-Questions/](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/)のアンサーページです。

## イベントの委任について説明してください。

A. イベントの委任とは、親要素にイベントを与えることによって、その子要素にイベントを伝達させる仕組みのことです。

この仕組みにより、効率よくイベントを設定することが可能になります。

例えば、たくさんの`<li>`に対してイベントを与えたい時、すべての`<li>`にイベントを与えてしまうと、大量のメモリを消費するため JavaScript の動きが重くなってしまいます。
この場合、`<li>`にではなく、親要素である`<ul>`にイベントを与えます。そうすることにより、子要素である`<li>`にもイベントが伝達されるので、すべての`<li>`にイベントを設定するのを避けることが出来ます。

また、イベントの委任は、DOM が読み込まれた時点ではまだ存在していない要素にイベントを与える際にも使用出来ます。例えば、動的に`<li>`を作る際、DOM 読み込み時点では`<li>`は存在していないため、`<li>`にイベントを与えることが出来ません。そこで、親要素である`<ul>`にイベントを設定します。そうすることにより、後に生成される`<li>`にもあらかじめイベントを設定することが出来ます。

## 参照元

- [JavaScript Event Delegation（英語サイト）](https://www.javascripttutorial.net/javascript-dom/javascript-event-delegation/)
