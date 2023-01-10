import { useAuthContext } from "./useAuthContext"
import { projectAuth } from "../firebase/config"
import { useEffect, useState } from "react"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [noCleanup, setNoCleanup] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsPending(true)

        // try to sign the user out
        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch a login action
            dispatch({type: 'LOGIN', payload: response.user})

            // A state update to check if the process is cancelled (to see if user clicked off the current page/process)
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
                setNoCleanup(true)
            }
        } 
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
                setNoCleanup(true)
            }
        }
    }

    // we use 'useEffect' to create a cleanup function so the state won't be updated.
    useEffect(()=> {
        if (noCleanup) {
            return () => setIsCancelled(true)
        }
    },[noCleanup])


    return { login, isPending, error, isCancelled }
}