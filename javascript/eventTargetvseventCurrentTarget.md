# eventTarget vs eventCurrentTarget

you asheme to attach some li event

but

```html
  <ul>
    <li class="js-accordion"></li>
    <li class="js-accordion"></li>
    <li class="js-accordion"></li>
    <!-- .... li..li...li..li-->
  </ul>
```

```js
const accordions = document.querySelectorAll(".js-accordion");
const target = document.getElementById("js-target")
accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    if(target.addList("some")){

    }
  })
});
```

but

```html
  <ul id="js-accordions">
    <li data-id="1"></li>
    <li data-id="2"></li>
    <li data-id="3"></li>
  </ul>
```

```js
const accordion = document.getElementById("js-accordion");
const target = document.getElementById("js-target")
  accordion.addEventListener("click", (event) => {
    console.log(event.target.dataset)
    if(target.addList("some")){
    }
});
```

## event.currentTarget

`イベントハンドラを登録した要素`


## event.target

`イベントが起こった要素`