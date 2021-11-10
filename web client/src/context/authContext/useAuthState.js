import { useContext } from "react"
import AuthContext from "./AuthContext"

const useAuthState = () => {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null }
}

export default useAuthState;