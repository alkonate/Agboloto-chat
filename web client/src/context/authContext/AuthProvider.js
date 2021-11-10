import { onAuthStateChanged } from 'firebase/auth'
import { useCallback, useEffect, useState } from "react"
import { auth } from "../../services/firebase"
import AuthContext from "./AuthContext"

const AuthProvider = (props) => {
    const [user, setUser] = useState(null)
    const [initialFirebaseprocessing, setIntialFirebaseprocessing] = useState(true);
    const [error, setError] = useState(null)

    const authStatehandler = useCallback(
        (user) => {
            setUser(user);
            if (initialFirebaseprocessing) setIntialFirebaseprocessing(false)
        },
        [initialFirebaseprocessing],
    )

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, authStatehandler, setError)
      return () => unsubscribe()
    }, [authStatehandler])

    return <AuthContext.Provider value={{ initialFirebaseprocessing,user, error }} {...props} />
}

export default AuthProvider