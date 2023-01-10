import { createContext, useEffect, useReducer } from "react"
import { projectAuth } from "../firebase/config"

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: action.payload}
        case 'AUTH_IS_READY':
            return{...state, user: action.payload, auth_is_ready: true}
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        auth_is_ready: false
    })
    // we use auth_is_ready to make sure that our user stays logged in even when refreshing the page.
    // we use 'unsub' to make sure this function is only used once and it doesn't repeat itself.
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user)=> {
            dispatch({type:'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, [])

    // 'children' refers to whatever that AuthContext Provider is wrapped around which is the entire App in this case.
    // we pass the state and dispatch in the AuthContext Provoder so that they would be accessible to every component in the App
    return (
        <AuthContext.Provider value={{...state, dispatch}}> 
            {children}
        </AuthContext.Provider>
    )
}