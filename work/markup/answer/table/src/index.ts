import "babel-polyfill"

type User = { id: number; name: string; gender: string; age: number };
type Users = User[];

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

class Table {
  target: HTMLElement
  table: HTMLElement
  tbody: HTMLElement | null
  users: Users
  currentUsers: Users
  headers: string[]
  headerTr: DocumentFragment
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
    thead.setAttribute("id", "js-thead")
    const headerTr = document.createElement("tr");
    headerTr.setAttribute("id", "js-headers")
    const frag = document.createDocumentFragment();
    for (let header of this.headers) {
      const th = document.createElement("th");
      th.id = `js-${header}`
      th.textContent = header;
      frag.append(th);
    }
    this.setHeader(headerTr.appendChild(frag))
    this.table.appendChild(thead).appendChild(headerTr)
  }
  setHeader(headerTr: DocumentFragment){
    this.headerTr = headerTr
  }
  getHeader(){
    return this.headerTr
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
  users: Users
  static sortType = {ASC: "ASC", DESC: "DESC", NORMAL: "NORMAL"} as const
  constructor(target: HTMLElement, users: Users, headers: string[]){
    super(target, users, headers);
  }
  callback = (event: MouseEvent) => {
    console.log(event.target);
      if(event.target === null)  return
      const targetSort = (event.target as HTMLElement).getAttribute("data-sort") as "id" | "age"
      const sortStatus = (event.target as HTMLElement).getAttribute("data-status") as "ASC" | "DESC" | "NORMAL" | null
      if(targetSort === null) return
      let sortedData = this.getUsers();
      const taregt = (event.target as HTMLElement)
      switch(sortStatus){
        case "NORMAL":
          taregt.setAttribute("data-status", "ASC");
          taregt.classList.replace("normal", "asc")
          this.updateTable(sortedData);
          this.updateHeaders();
          break;
        case "ASC":
          sortedData = [...this.getUsers()].sort((a, b) => {
          return a[targetSort] - b[targetSort]
        });
          taregt.setAttribute("data-status", "DESC");
          taregt.classList.replace("asc", "desc")
          this.updateTable(sortedData)
          break;
        case "DESC":
          sortedData = [...this.getUsers()].sort((a, b) => {
            return b[targetSort] - a[targetSort]
          });
          taregt.setAttribute("data-status", "NORMAL");
          taregt.classList.replace("desc", "normal")
          this.updateTable(sortedData)
          break;
      }
    }
  attachEvent(){
    this.headers.forEach(header => {
      const th = document.getElementById(`js-${header}`)
      th?.addEventListener("click", this.callback)
    })
  }
  updateHeaders(){
    const tr = document.getElementById("js-headers");
    const fragment = document.createDocumentFragment()
    tr.childNodes.forEach((e) => {
      console.log(e, "e");
      fragment.appendChild(e)
    })
    tr?.appendChild(fragment)
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
    this.setUsers(users)
  }

  createSortView(headers?: string[]) {
    if(!headers) return
    headers.forEach((header) => {
      const sortTarget = document.getElementById(`js-${header}`);
      if(sortTarget) sortTarget.classList.add("normal")
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
