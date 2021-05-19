
# Denoを使い倒す

メモ
mongo: terracetech
deno: omajime

## Document

[https://deno.land/](https://deno.land/)


### install

- `brew install deno`

### ターミナル

- `deno`

- ターミナル上でJavaScriptを実行できる

- やめる場合は`ctrl + d`

- `deno --help`で見れる

### deno実行フォルダを作る

`deno/sample.ts`

```ts
const a: string = "a"

console.log(a)
```

### 実行

denoファイルがあるカレントディレクトリで

`deno run app.ts`

aが表示される

```ts
const a: number = "a"

console.log(a)
```

denoを通してTSをコンパイルしているのでerrorになる

### ブラウザに表示させる

`server.ts`を作る

[standard Lib](https://deno.land/std@0.96.0)

の[http](https://deno.land/std@0.96.0/http)

README.mdにあるところをコピペ

```ts
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

- importされたものはハードディスクにキャッシュされる
- STD_VERSIONは[Denoのバージョン](https://deno.land/std@0.96.0)。これは`0.96.0`。置き換える


`deno run --allow-net server.ts`

`http://localhost:8000/`

## RestAPIを作る

`mkdir app`

`cd app`

`touch index.ts`

Third Party Modules
[https://deno.land/x](https://deno.land/x)

`oak`と検索

[https://deno.land/x/oak@v7.4.1](https://deno.land/x/oak@v7.4.1)

httpサーバーのexampleを参考にする

`index.ts`に

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port = 8001
console.log(`server running on port ${port}`)
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port });
```

`deno run --allow-net index.ts`


###

app以下に

- `db`
- `services`
- `repogitories`
- `controllers`

[https://deno.land/x](https://deno.land/x)
`mongo`

[https://deno.land/x/mongo@v0.22.0](https://deno.land/x/mongo@v0.22.0)


exampleの6行目まで

```ts
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();
await client.connect("mongodb://localhost:27017");

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const db = client.database("test");
const users = db.collection<UserSchema>("users");
```

