
# getelementbyid-vs-queryselector


> Just a note , I dont see it mentioned but they return different types of collections. So there is a functional difference.

> querySelector returns a static node list.
getElementsBy.. returns a dynamic html collection.

> Also getElement is faster it uses a lot less back end parsing.

> so generally if you can use it , use it because its faster, better supported(legacy) and is a dynamic rather than static collection.

- より高速でレガシーに対応するのはdocument.getElemtById

https://beamtic.com/getelementbyid-vs-queryselector

## 見た目の違い

- 明らかにidを選択していることが分かるのは
document.getElementById

- querySelectorは引数に依存する

## ファイル内で一貫することが大事

https://dev.to/eidorianavi/queryselector-vs-getelementbyid-gm1

