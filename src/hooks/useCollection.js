import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState('')
    const [error, setError] = useState('')
    // if we don't use 'useRef' then an infinite loop will happen in useEffect
    //
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(()=> {
        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy) // this method requires two argument ['the field you're ordering by', desc or ascending]
        }

        const unsub = ref.onSnapshot((snapshot)=> {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch data')
        })

        // unsub 

        return () => unsub()
    },[collection, query, orderBy])

    return { documents, error }
}