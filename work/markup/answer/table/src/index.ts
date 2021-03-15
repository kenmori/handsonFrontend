import "babel-polyfill"

type User = { id: number; name: string; gender: string; age: number };
type Users = User[];

class Table {
  target: HTMLElement
  table: HTMLElement
  users: Users
  currentUsers: Users
  headers: string[]
  constructor(target: HTMLElement, users: Users, headers: string[]) {
    this.target = target;
    this.table = document.createElement("table");
    this.users = users;
    this.currentUsers = users;
    this.headers = headers;
    this.createHeaders();
    this.showTable(this.users);
  }
  createSortView() {
    const idEle = document.getElementById("js-sort-id");
    if(idEle) idEle.textContent = "▼";
  }
  createHeaders() {
    const thead = document.createElement("thead");
    const headerTr = document.createElement("tr");
    const frag = document.createDocumentFragment();
    for (let header of this.headers) {
      const th = document.createElement("th");
      th.id = `js-sort-${header}`;
      th.textContent = header;
      frag.append(th);
    }
    this.table.appendChild(thead).appendChild(headerTr).appendChild(frag);
  }
  showTable(users: Users) {
    const tbody = document.createElement("tbody");
    for (let user of users) {
      console.log(user);
      const frag = document.createDocumentFragment();
      const userTr = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdName = document.createElement("td");
      const tdAge = document.createElement("td");
      const tdGender = document.createElement("td");
      tdId.textContent = `${user["id"]}`;
      tdName.textContent = user["name"];
      tdGender.textContent = user["gender"];
      tdAge.textContent = `${user["age"]}`;
      frag.appendChild(tdId);
      frag.appendChild(tdName);
      frag.appendChild(tdGender);
      frag.appendChild(tdAge);
      userTr.appendChild(frag);
      tbody.appendChild(userTr);
      this.table.appendChild(tbody);
    }
    this.target.appendChild(this.table);
  }
  set data(users: Users) {
    this.users = users;
  }
  get data() {
    return this.users;
  }
}

async function request(path: string) {
  const data = await fetch(path);
  const json = await data.json();
  return json;
}
async function init() {
  const res = await request(
    "https://jsondata.okiba.me/v1/json/OSJpx210315100914"
  );
  new Table(document.getElementById("app")!!, res.data, [
    "id",
    "name",
    "gender",
    "age"
  ]);
}
init();
