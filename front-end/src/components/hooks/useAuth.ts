import { useState } from "react"

const useLoggedInUser = () => {
  const [userName, setUserName] = useState<string | null>(null)

  if (localStorage.getItem("userName")) {
    setUserName(localStorage.getItem("userName"))
  }

  return userName

}


export { useLoggedInUser }
