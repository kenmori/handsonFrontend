# APIに慣れよう

[postman](https://www.postman.com/)

1.
[download](https://www.postman.com/downloads/)

2.

github
https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md


`https://simple-books-api.glitch.me`

## collectionの作成

## baseUrlの設定


## List of books

save ->

query Parameters
Option

`{{baseUrl}}/books?type=crime`


```
{
    "error": "Invalid value for query parameter 'type'. Must be one of: fiction, non-fiction."
}
```

400

送信したものが正しくない

limit: 25だと
エラー

2を指定


## Path Variables

try
booksid : 1


booksId: 100
Not Found

?がないのは送信されるものではないため
`{{baseUrl}}/books/1`


## submit Post

Duplicateを押すとコピーができる

nameは`Order book`

`/orders`

許可されていないことを確認
注文はプライベートなので認証が必要

Requires auhtentication

先にAPIの認証を受ける必要がある

## Register API

`{{baseUrl}}/api-clients`

GET -> POSTに変更

Body -> row -> json、で作る

```json
{
   "clientName": "Valentin",
   "clientEmail": "kenjimorita@example.com" // your example.email. not real.
}
```

success
201になっていることを確認

```json
{
    "accessToken": "24f9c18a5fcf9087983649ef86456ee91957eb0064d65a21981ede0f9d2a8230"
}
```
リクエストで使用できるパスワード

これをbaseUrlを作ったようにvariableとして登録する
Simple APIの右 -> Edit -> Variables

accessToken。
初期値として誰かに共有したくないので
`CURRENT VALUE`にそれを貼り付ける

-> save

もう一度accessTokenを作ろうとする
`409 conflict`

```json
{
    "error": "API client already registered. Try a different email."
}
```


これをHEADERに追加する
※クエリパラメーターやbodyに含むケースもあるが一般的にはheader

POSTリクエストのところに来て

Authorization -> Bear Token(ビールトークン) -> {{accessToken}}
ここで提案variablesとして登録されていないのでチェック

Headers(8)に現れない場合いhiddenをクリックして表示させてください

Headersで手動で含めることもできるし、Authに含めることもできる。どちらか一方でいい
前者の場合 `Bearer 24f9c18a5fcf9087983649ef86456ee91957eb0064d65a21981ede0f9d2a8230`


SENDを押してみる

```json
{
    "error": "Invalid or missing bookId."
}
```

bodyに

```json
{
  we want book with id 1
}
```

でも失敗。400

API仕様書に戻ってください
リクエストbodyにJSONフォーマットに下記のものを含めるように言われています


JSONのkeyは`二重引用符("")`で囲むある必要がります

送信しているものがJSON形式になっていることを確認しましょう

Body -> row -> Json

```json
{
  "bookId": 1,
  "customerName": "John"
}
```

Send

```json
{"created":true,"orderId":"Ls_NZ1HPyPO8bv3ApSULV"}
```

## Assinment

## test

### randamFullname

名前は適当にする場合
Body -> customerName -> "{{$randamFullName}}"

```json
{
  "bookId": 1,
  "customerName": "{{$randomFullName}}"
}
```

### console

画面左下
Console
clearしてSendを押下

展開

```json
POST https://simple-books-api.glitch.me/orders
201
1138 ms
Network
Request Headers
Authorization: Bearer 24f9c18a5fcf9087983649ef86456ee91957eb0064d65a21981ede0f9d2a8230
Content-Type: application/json
User-Agent: PostmanRuntime/7.28.0
Accept: */*
Postman-Token: e7c262c7-1bc0-4cf7-a5bf-3280694c3870
Host: simple-books-api.glitch.me
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 54
Request Body
```

詳細がわかる
Request Bodyを展開

Request Body
```json
{
  "bookId": 1,
  "customerName": "Bernadette Lowe"
}
```
ここでどんなリクエストbodyで送ったかチェックできる

## Viewing existing order

API仕様書
Get all orders

1. Order bookをコピーして
2. nameを `Get all book orders`
3. Authが必要だと言われているのでAuthrozationを指定
4. POSTをGETに変更
5. body内を削除
6. send

```json
[
    {
        "id": "Ls_NZ1HPyPO8bv3ApSULV",
        "bookId": 1,
        "customerName": "John",
        "createdBy": "07f304a7b1d34e58ba0cdbf167d6f2ee6b10031a784c945aad85c58554a8dba3",
        "quantity": 1,
        "timestamp": 1635901819740
    },
    {
        "id": "M07-c9vESkeVJRHYKPwX3",
        "bookId": 1,
        "customerName": "John",
        "createdBy": "07f304a7b1d34e58ba0cdbf167d6f2ee6b10031a784c945aad85c58554a8dba3",
        "quantity": 1,
        "timestamp": 1635902022960
    },
    {
        "id": "WBOeo9imjLKr4GW8LTedI",
        "bookId": 1,
        "customerName": "Aubrey Renner DVM",
        "createdBy": "07f304a7b1d34e58ba0cdbf167d6f2ee6b10031a784c945aad85c58554a8dba3",
        "quantity": 1,
        "timestamp": 1635902344482
    },
    {
        "id": "wGbZiD_jiubLZ_mQ26rAZ",
        "bookId": 1,
        "customerName": "Bernadette Lowe",
        "createdBy": "07f304a7b1d34e58ba0cdbf167d6f2ee6b10031a784c945aad85c58554a8dba3",
        "quantity": 1,
        "timestamp": 1635902458473
    }
]
```

今までorderしたものが渡ってくる

## Get an order

オーダーした本のうち一つだけ返してもらうAPI

1. 任意のorderIdをコピー
2. `Get all orders`をコピー
3. GET `{{baseUrl}}/orders/:orderId`にする
4. Keyは`orderId`, valueは`1`でコピーしてやつ
5. send

## Update an order

[仕様書](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md#update-an-order)を見て作ってみてください

リクエストメソッドは`PATCH`

PATHはbodyに入れて送信します

```json
{
  "customerName": "John ${{$randomLastName}}"
}
```
LastNameはランダムにする


204が返ってきたらok

試しにアップデートされているか確認してください
名前が変更されていて
idとbookIdは同じままになっている


## Delete an order

[仕様書](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md#delete-an-order)
をみて作ってみてください


Get orderやGet all book ordersで削除されていることを確認


Close　All Tabで全てのTabをクローズする。
その際Saveするか聞いてくるので全部Saveする


以上で基本的な操作は終わりです

---

## API テスト自動化

APIが正しく動作するかを調べるには
全てのエンドポイントでsendを押下して2xxが返ってくることを目視で確認する必要が
ありましたが
それをpostmanにやってもらう
方法を学ぶというのがここのセクションです

### `tests`タブを開きます

API Status -> tests

右ペインに`Status code: Code is 200`がありますので押下

スニペットが挿入されました

sendしてBodyプルダウンから `Test Results`で確認できます

GETのurlを何かに変えてsend、失敗してみてください


### リクエストの中身をテストする場合には

```js

const response = pm.response.json();
console.log(response)
```

Consoleタブで確認


```js
const response = pm.response.json();

pm.test("Status should be OK", () => {
  pm.expect(response.status).to.eql("OK");
})
```

テストがこけることを確認

## 課題

全てのAPIに

```js
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});
```
を追加してください。その際、メソッド毎にStatus Codeは都度変更してください

`Get an book order`テストに失敗したら(404が返ってきたら)

DELETEで削除したためorderがないことが原因ですので
`Get all book orders`で現在のordersから任意のorderIdをコピーして
`Get an book order`のvalueに設定、テストを通してください
(PATCH, DELETEへのテスト追加も同様, 200 -> 204にしたり)

都度エラーをよくみて修正してください



## Postman variable

すでに気づいているように
idをその都度生成してコピーペーストするのは大変です

































ref
サンプルに
- https://reqres.in/


