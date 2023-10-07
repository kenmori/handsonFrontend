# mockapiでレスポンスデータをゴニョゴニョしてみる

フロントエンドはバックエンドから返ってくる

- https://mockapi.io/projects

## Projectを作る

Project name `TodoApp`

API Prefix: `/api/v1`

## create

## example

https://github.com/mockapi-io/docs/wiki/Quick-start-guide#projects

## NewResource

-> `Resource name`

- tasks

## schemaを定義する


## ダミーデータをあらかじめ作っておく

あらかじめこってあるやつがこちら

https://mockapi.io/clone/6521367fa4199548356cece9


## 呼び出してみる



```js
[{"createdAt":"2023-10-06T23:27:40.171Z","title":"title 1","completed":false,"id":"1"},{"createdAt":"2023-10-07T08:38:01.227Z","title":"title 2","completed":true,"id":"2"},{"createdAt":"2023-10-07T10:26:44.815Z","title":"title 3","completed":false,"id":"3"},{"createdAt":"2023-10-06T18:30:39.460Z","title":"title 4","completed":false,"id":"4"},{"createdAt":"2023-10-06T23:26:05.319Z","title":"title 5","completed":false,"id":"5"}]
```



## ブラウザに表示させてみる

なんでも良いですが、こちらの`sample-front-lesson`をfork

- https://github.com/kenmori/sample-front-lesson

もしくは`stackblitz`ですぐに始められます

- https://stackblitz.com/~/github.com/kenmori/sample-front-lesson


## 課題

レスポンスを扱いやすいように型変換してみましょう

```js
// {
//     ids: string[]
//     entities:
//      {"1": {
//        completed: false,
//        createdAt:  "2023-10-06T23:27:40.171Z",
//        id:  "1",
//        title: "title 1"
//        },
//     "2": {}
//     }
// }
```

このような形にする

```ts
type Task = {
  id: string,
  completed: boolean,
  createdAt: string,
  title: string
}

type ID = string

type TasksEntities = Record<ID, Task>

type Tasks = {
  ids: ID[]
  entities: TasksEntities
}
```

### html

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="./style.css" type="text/css">
        <title>TODO example TerraceTechフロントエンドエンジニア養成所</title>
    </head>
    <body>
        <h1>ToDo</h1>
        <div>
            <ul id="js-lists"></ul>
        </div>
        <script type="module" src="./index.js"></script>
    </body>
</html>
```

### js

```js
const lists = document.getElementById("js-lists")

console.log(lists)

const res = await fetch("https://6521367fa4199548356cece8.mockapi.io/api/v1/tasks")

const tasks = await res.json()

console.log(tasks)

// {
//     ids: string[]
//     entities:
//      {"1": {
//        completed: false,
//        createdAt:  "2023-10-06T23:27:40.171Z",
//        id:  "1",
//        title: "title 1"
//        },
//     "2": {}
//     }
// }
```

### POSTをしてみる

WIP
