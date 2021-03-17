import "babel-polyfill"

type User = { id: number; name: string; gender: string; age: number };
type Users = User[];



class Table {
  target: HTMLElement
  table: HTMLElement
  tbody: HTMLElement | null
  users: Users
  currentUsers: Users
  headers: string[]
  constructor(target: HTMLElement, users: Users, headers: string[]) {
    this.target = target;
    this.table = document.createElement("table")
    this.table.setAttribute("id", "table")
    this.tbody = document.createElement("tbody");
    this.tbody.setAttribute("id", "tbody")
    this.users = users;
    this.currentUsers = users;
    this.headers = headers;
    this.createHeaders();
  }

  createHeaders() {
    const thead = document.createElement("thead");
    const headerTr = document.createElement("tr");
    const frag = document.createDocumentFragment();
    for (let header of this.headers) {
      const th = document.createElement("th");
      th.id = `js-${header}`
      th.textContent = header;
      frag.append(th);
    }
    this.table.appendChild(thead).appendChild(headerTr).appendChild(frag);
  }
  updateTable(users: Users){
    const tbody = document.getElementById("tbody")
    const childNodes = tbody?.childNodes ?? []
    childNodes.forEach((node: ChildNode, i: number) => {
      node.childNodes[0].textContent = String(users[i].id)
      node.childNodes[1].textContent = String(users[i].name)
      node.childNodes[2].textContent = String(users[i].gender)
      node.childNodes[3].textContent = String(users[i].age)
    })
  }
  showTable(users: Users) {
    for (let user of users) {
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
      this.tbody?.appendChild(userTr);
      this.table.appendChild(this.tbody ?? document.createElement("span"));
    }
    this.target.appendChild(this.table);
  }
  setUsers(users: Users) {
    this.users = users;
  }
  getUsers() {
    return this.users;
  }
}


class SortTable extends Table {
  headers: string[]
  currentSort: "ASC" | "DESC" | "NORMAL"
  users: Users
  static sortType = {ASC: "ASC", DESC: "DESC", NORMAL: "NORMAL"} as const
  constructor(target: HTMLElement, users: Users, headers: string[]){
    super(target, users, headers);
    this.currentSort = SortTable.sortType.NORMAL
  }
  callback = (event: MouseEvent) => {
    console.log(event.target);
      if(event.target === null)  return
      const targetSort = (event.target as HTMLElement).getAttribute("data-sort") as "id" | "age"
      const sortStatus = (event.target as HTMLElement).getAttribute("data-status") as "ASC" | "DESC" | "NORMAL" | null
      console.log(targetSort, sortStatus);
      if(targetSort === null) return
      let sortedData = this.getUsers();
      switch(sortStatus){
        case "NORMAL":
          (event.target as HTMLElement).setAttribute("data-status", "ASC");
          (event.target as HTMLElement).textContent = `${targetSort}▼`
        case "ASC":
          sortedData = [...this.getUsers()].sort((a, b) => {
          return a[targetSort] - b[targetSort]
        });
        (event.target as HTMLElement).setAttribute("data-status", "DESC");
        (event.target as HTMLElement).textContent = `${targetSort}▲`
        case "DESC":
          sortedData = [...this.getUsers()].sort((a, b) => {
            return b[targetSort] - a[targetSort]
          });
          (event.target as HTMLElement).setAttribute("data-status", "NORMAL");
          (event.target as HTMLElement).textContent = `${targetSort}+`
      }
      super.updateTable(sortedData)
    }
  attachEvent(){
    this.headers.forEach(header => {
      const th = document.getElementById(`js-${header}`)
      th?.addEventListener("click", this.callback)
    })
  }
  createSortView(headers?: string[]) {
    if(!headers) return
    headers.forEach((header) => {
      const sortTarget = document.getElementById(`js-${header}`);
      if(sortTarget) sortTarget.textContent += "+";
      if(sortTarget) sortTarget.setAttribute("data-status", "NORMAL");
      if(sortTarget) sortTarget.setAttribute("data-sort", `${header}`)
    })
  }
}

class PagenationTable extends SortTable {
  static Limit = 5
  target: HTMLElement
  headers: string[]
  users: Users
  constructor(target: HTMLElement, users: Users, headers: string[]){
    super(target, users, headers)
  }
  createPagenationView(){

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
  return res

}
async function controller() {
  const res = await init();
  const sortTableIns = new PagenationTable(document.getElementById("app")!!, res.data, [
    "id",
    "name",
    "gender",
    "age"
  ])
  sortTableIns.showTable(res.data)
  sortTableIns.createSortView(["id", "age"])
  sortTableIns.attachEvent()
  // const pagenation = new Pagenation(tableInstance)
}

controller()
