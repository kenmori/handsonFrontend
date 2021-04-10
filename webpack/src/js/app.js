import * as modulesA from "./findUser"
import * as modulesB from "./getUser"

const users = modulesB.getUser()
console.log("わいoooooo");
const result = modulesA.findUser("a", users)

console.log(users)
