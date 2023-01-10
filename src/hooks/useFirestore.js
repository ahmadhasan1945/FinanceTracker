import { useState, useEffect, useReducer } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null, 
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, error: null, success: null}
        case 'ADD_DOCUMENT':
            return {isPending: false, document: action.payload, error: null, success: true}
        case 'DELETED_DOCUMENT':
            return {isPending: false, document: null, error: null, success: true}
        case 'ERROR':
            return {isPending: false, document: null, error: action.payload, success: false}
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [state, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    const [noCleanup, setNoCleanup] = useState(false)

    // collection reference (where we assign the const ref to the collection we're using)
    const ref = projectFirestore.collection(collection)

    // only dispatch an action if isCancelled is false.
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch({action})
            setNoCleanup(true)
        }
    }

    // adding documents
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt: createdAt})
            dispatchIfNotCancelled({type: 'ADD_DOCUMENT', payload: addedDocument})
        }
        catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        }
        catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete data.'})
        }
    }

    //cleanup function
    useEffect(()=>{
        if (noCleanup) {
            setIsCancelled(true)
        }
    }, [noCleanup])

    return { addDocument, deleteDocument, state }
}