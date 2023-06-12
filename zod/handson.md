# ハンズオンzod

<img src="https://terracetech.jp/wp-content/uploads/2023/06/zod.png" width="600" />


https://github.com/kenmori/zod-hanson-with-vanilajs
(スターお願いします!)


## zodは何をしてくれるのか

### zodドキュメントから

> Zodは、TypeScriptファーストのスキーマ宣言・検証ライブラリです。私は「スキーマ」という言葉を、単純な文字列から複雑なネストしたオブジェクトまで、あらゆるデータ型を広く指すものとして使っています。

> Zodは、可能な限り開発者に優しい設計になっています。その目的は、重複する型宣言をなくすことです。Zodでは、バリデータを一度宣言すれば、Zodが自動的に静的なTypeScriptの型を推論してくれます。より単純な型を複雑なデータ構造に合成することも簡単です。


### ChatGPTに聞く。schemaとは

> Zodライブラリは、JavaScriptのデータバリデーションライブラリです。データバリデーションは、与えられたデータが特定のルールや形式に合致しているかどうかを確認するプロセスです。例えば、ユーザーからの入力データが正しい形式であるかを検証する場合に使用されます。

> Zodライブラリは、データスキーマを定義するための簡潔なAPIを提供しています。スキーマは、データの構造や制約を定義するための設計図のようなものです。Zodスキーマを使用することで、データが特定の形式やルールに準拠しているかどうかを効果的に確認できます。

> Zodスキーマは、プリミティブなデータ型（文字列、数値、ブール値など）から複雑なデータ型（オブジェクト、配列、タプルなど）まで、さまざまなデータ形式をサポートしています。また、必須フィールドや最小/最大値、正規表現パターンなどの制約も定義できます。

> Zodライブラリを使用すると、スキーマを作成し、データをそのスキーマにバリデーションできます。もしデータがスキーマに合致しない場合、エラーメッセージや例外を返すことができます。これにより、不正なデータをフィルタリングしたり、信頼性の高いデータを処理するための堅牢なバリデーションシステムを構築することができます。

> 簡潔に言えば、ZodライブラリはJavaScriptのデータバリデーションのためのツールであり、データが特定の形式やルールに適合しているかどうかを確認するためのスキーマを提供します。これにより、信頼性の高いデータ処理を実現できます。


```js
const mySchema = z.string().email();

// mySchema.parse('fafaf@gmail.com'); // => "ken"
// mySchema.parse(12); // => throws ZodError

const nameElement = document.getElementById('js-name');

nameElement.onblur = (event) => {
  // console.log(typeof event.target.value);
  const result = mySchema.parse(event.target.value);
  // console.log(result, 'result');
};
```

```js
nameElement.onblur = (event) => {
  const result = z
    .string()
    .min(5, { message: '5文字以上でお願い' })
    .max(100)
    .safeParse(event.target.value);
  if (!result.success) {
    nameErrrorsElement.textContent = result.error.issues[0].message;
  } else {
    nameErrrorsElement.textContent = '';
  }
};

formElement.onsubmit = (e) => {
  // form要素に送信先が指定されていない場合、現在のURLに対してフォームの内容を送信するので。
  e.preventDefault();
  const formData = new FormData(formElement);
  console.log(formData.get('name'), 'form!!!!');
};
```


## error handling

https://zod.dev/?id=error-handling
