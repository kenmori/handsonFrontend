# JavaScript Interview Questions and Answers

こちらは [Front-end-Developer-Interview-Questions](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/javascript-questions/) の解答ページです。

## プロトタイプ継承はどのように機能するか説明して下さい。

プロトタイプ継承とは、オブジェクトが自身の Prototype プロパティを通じて、他のオブジェクトのプロパティにアクセスできる仕組みのことです。

プロトタイプ継承の仕組みがあることによって、オブジェクトに同じプロパティを何度も作る必要がなくなるため、JavaScript のパフォーマンス速度を向上させることが出来ます。

オブジェクトがある特定のプロパティにアクセスしようとする時、もし自身のオブジェクト内にそのプロパティが見つけられなかった場合、Prototype の中に該当するプロパティがないかを探します。（この Prototype は、オブジェクトが作られた段階で自動で与えられます。）

もしその Prototype の中でも見つからなかった場合、その Prototype の Prototype の中に該当のプロパティがないか、プロトタイプチェーンを辿って探します。この動きは、最終的に Object.prototype が null になるまで続きます。

オブジェクトが.hasOwnProperty() などのメソッドにアクセスできるのも、このプロトタイプチェーンの流れがあるおかげです。

## 参照元

- [Prototypal Inheritance in JavaScript](https://dmitripavlutin.com/javascript-prototypal-inheritance/)
- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
