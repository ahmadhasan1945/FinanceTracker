import { useAuthContext } from "./useAuthContext"
import { projectAuth } from "../firebase/config"
import { useEffect, useState } from "react"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setIsPending(true)

        // try to sign the user out
        try {
            await projectAuth.signOut()

            // dispatch a logout action
            dispatch({type: 'LOGOUT', payload: null})

            // A state update to check if the process is cancelled (to see if user clicked off the current page/process)
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } 
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // we use 'useEffect' to create a cleanup function so the state won't be updated..
    useEffect(()=> {
        return () => setIsCancelled(true)
    },[])


    return { logout, isPending, error }
}