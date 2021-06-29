# Tree

`[{value: "", text: "",   children?: Item[]}]`
このような型を作りたい

`Item`は同じ `{value: "", text: "",   children?: Item[]}`とする

以下はその詳細です。

```json
[
 {
  "text": "部署A",
  "value": "1",
  "id": "1",
  "parentId": "root",
  "children": [
   {
    "text": "開発部",
    "value": "2",
    "id": "2",
    "parentId": "1",
    "children": [
     {
      "text": "Aプロジェクト",
      "value": "3",
      "id": "3",
      "parentId": "2",
      "children": [
       {
        "text": "Aチーム",
        "value": "4",
        "id": "4",
        "parentId": "3",
        "children": []
       }
      ]
     },
     {
      "text": "Bプロジェクト",
      "value": "5",
      "id": "5",
      "parentId": "2",
      "children": []
     }
    ]
   },
   {
    "text": "開発2課",
    "value": "6",
    "id": "6",
    "parentId": "1",
    "children": []
   },
   {
    "text": "開発3課",
    "value": "7",
    "id": "7",
    "parentId": "1",
    "children": []
   }
  ]
 },
 {
  "text": "営業部",
  "value": "8",
  "id": "8",
  "parentId": "root",
  "children": [
   {
    "text": "営業1課",
    "value": "9",
    "id": "9",
    "parentId": "8",
    "children": []
   },
   {
    "text": "営業2課",
    "value": "10",
    "id": "10",
    "parentId": "8",
    "children": []
   },
   {
    "text": "営業3課",
    "value": "11",
    "id": "11",
    "parentId": "8",
    "children": []
   }
  ]
 },
 {
  "text": "人事部",
  "value": "12",
  "id": "12",
  "parentId": "root",
  "children": [
   {
    "text": "人事1課",
    "value": "13",
    "id": "13",
    "parentId": "12",
    "children": []
   },
   {
    "text": "人事2課",
    "value": "14",
    "id": "14",
    "parentId": "12",
    "children": []
   },
   {
    "text": "人事3課",
    "value": "15",
    "id": "15",
    "parentId": "12",
    "children": []
   }
  ]
 },
 {
  "text": "森田部",
  "value": "17",
  "id": "17",
  "parentId": "root",
  "children": [
   {
    "text": "人事1課",
    "value": "18",
    "id": "18",
    "parentId": "17",
    "children": []
   }
  ]
 }
]
```

下記`lists`を元に作ってみる

例えば、`部署A>開発部>Aプロジェクト`は一番親が`部署A`でその子供が`開発部`で`開発部`の子供が`Aプロジェクト`という意味です

```js
const lists = [
    {
        "text": "部署A",
        "value": "1"
    },
    {
        "text": "部署A>開発部",
        "value": "2"
    },
    {
        "text": "部署A>開発部>Aプロジェクト",
        "value": "3"
    },
    {
        "text": "部署A>開発部>Aプロジェクト>Aチーム",
        "value": "4"
    },
    {
        "text": "部署A>開発部>Bプロジェクト",
        "value": "5"
    },
    {
        "text": "部署A>開発2課",
        "value": "6"
    },
    {
        "text": "部署A>開発3課",
        "value": "7"
    },
    {
        "text": "営業部",
        "value": "8"
    },
    {
        "text": "営業部>営業1課",
        "value": "9"
    },
    {
        "text": "営業部>営業2課",
        "value": "10"
    },
    {
        "text": "営業部>営業3課",
        "value": "11"
    },
    {
        "text": "人事部",
        "value": "12"
    },
    {
        "text": "人事部>人事1課",
        "value": "13"
    },
    {
        "text": "人事部>人事2課",
        "value": "14"
    },
    {
        "text": "人事部>人事3課",
        "value": "15"
    },
    {
        "text": "森田部",
        "value": "17"
    },
    {
        "text": "森田部>人事1課",
        "value": "18"
    }
]
```

## 実装

```js
  function mapWithText(lists) {
    return lists.reduce((acc, cur, i) => {
        const last = lists[i].text.split('>')
        const text = last.splice(last.length - 1)[0]
        return { ...acc, [text]: { ...cur, index: i, text: text } }
    }, {})
  }

  const withText = mapWithText(lists)

  const mapWithParent = arr => {
      const temp = []
      for (let i = 0; i < arr.length; i++) {
          const last = arr[i].text.split('>')
          const element = {
              text: last.splice(last.length - 1)[0],
              value: arr[i].value,
              id: arr[i].value,
              parentId:
                  withText[last.splice(last.length - 1)[0]]?.value || "root"
          }
          temp.push(element)
      }
      return temp
  }

  const withParents = mapWithParent(lists)
  const withChild = withParents.reduce((acc, cur, i) => {
      const last = lists[i].text.split('>')
      const text = last.splice(last.length - 1)[0]
          return {
              ...acc,
              [cur.parentId ?? "root"]: [...(acc[cur.parentId ?? "root"] || []),  { ...cur, text }]
          }
  }, {})


function createListWithChildren(lists){
    if((lists?.length || 0) === 0) return []
    const result = lists.reduce((acc, cur) => {
        return [...acc, {...cur, children: createListWithChildren(withChild[cur.value]) || []}]
    }, [])
    return result
  }
  console.log(createListWithChildren(withChild["root"]))
```
