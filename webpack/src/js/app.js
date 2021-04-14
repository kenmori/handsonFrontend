import * as modulesA from "./findUser"
import * as modulesB from "./getUser"

const users = modulesB.getUser()

const result = modulesA.findUser("a", users)

console.log(result.name)
