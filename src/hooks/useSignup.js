import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [noCleanup, setNoCleanup] = useState(false)
    const { dispatch } = useAuthContext()

    // we use async in the function in order to use the 'await' 
    const signup = async (email, password, displayName) => {
        setIsPending(true)

        try {
            // signup user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(response)

            // if there is the reponse const is empty/ has an error
            if (!response) {
                throw new Error('could not complete sign up')
            }

            // add display name to user
            await response.user.updateProfile({displayName: displayName})
            
            // dispatch login action
            dispatch({type: 'LOGIN', payload: response.user})

            // A state update to check if the process is cancelled (to see if user clicked off the current page/process).
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
                setNoCleanup(true)
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
                setNoCleanup(true)
            }
        }
    }

    useEffect(()=>{
        if (noCleanup) {
            return () => setIsCancelled(true)
        }
    }, [noCleanup])

    return { error, isPending, signup }
}