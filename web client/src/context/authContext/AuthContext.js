import { createContext } from "react";

const AuthContext = createContext({
    user : null,
    error : '',
})

export default AuthContext;