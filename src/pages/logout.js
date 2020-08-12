import React from "react"
import { logout} from "./utils/auth"

const Logout = () => {
  
    logout()()

  return <p>Loading...</p>
}

export default Logout