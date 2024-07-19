import { createContext, useContext, useState } from "react"
import { createUser } from "./db"

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const handleUser = (rawUser: any) => {
    if(rawUser) {
      const user = formatUser(rawUser)

      createUser(user.uid, user)
    }
  }
}

const formatUser = (user: any) =>  {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  }
}