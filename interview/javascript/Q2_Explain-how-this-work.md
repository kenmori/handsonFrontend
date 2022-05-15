# JavaScript Interview Questions and Answers

こちらは [Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/) の解答ページです。

## JavaScript において、"this"はどのように機能するかを説明してください。また ES6 において、this の機能が以前と変わった点を一つ挙げて下さい。

A. this の主な使用用途は、オブジェクト内のプロパティにアクセスすることです。this は呼び出し元となる関数の種類によって、参照する対象が変化します。

呼び出し元の関数のパターンとして、下記のものが挙げられます。

- 通常の関数
- オブジェクトのメソッド
- コンストラクタ関数
- 間接的に呼び出される関数
- アロー関数

#### 通常の関数内で使用する this

この場合、this はグローバルオブジェクト（ブラウザ上では window オブジェクト）を参照します。同じ条件でも、ストリクトモードを使用した場合、this には undefined が割り当てられます。

#### オブジェクトのメソッド内で使用する this

この場合、this は現在メソッドを呼び出しているオブジェクトを参照します。

#### コンストラクタ関数内で使用する this

この場合、this は生成されたインスタンスを参照します。

#### 間接的に呼び出される関数内で使用する this

.call メソッドや.apply メソッドを使用する場合、関数内の this は指定されたオブジェクトを参照します。

#### アロー関数内で使用する this

ES6 において this の機能が以前と変わった点についてです。

アロー関数を使用する場合、this の参照先は関数内で決められることはありません。アロー関数内の this には、関数の外側（親となる関数）で設定された値が継承されます。この特徴から、アロー関数はオブジェクトのメソッドとしては向いていません。

アロー関数内で this の使用が適しているのは、メソッド内でコールバック関数を使用する際などです。

例えばオブジェクトのメソッドにて setTimeout を使用した場合、コールバック関数に通常の関数を使用すると、this はその関数内のスコープでの参照の値、つまり Window オブジェクトを参照してしまいます。

しかしアロー関数を使用した場合、this は自身の関数のスコープではなく、親の関数の this を参照します。結果、アロー関数は person オブジェクト内に生成されているとみなされ、this が person オブジェクトを参照することが可能になります。

## 参照元

- [Demystifying the JavaScript this Keyword](https://www.javascripttutorial.net/javascript-this/)
- [アロー関数式](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
