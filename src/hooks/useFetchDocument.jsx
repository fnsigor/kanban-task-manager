import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { db } from "../firebase config/database";


export const useFetchDocument = (docCollection, id) => {


    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {
            if (cancelled) return

            setLoading(true)


            try {
                const docRef = await doc(db, docCollection, id)

                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())

                console.log(document)
                
                setLoading(false)


            } catch (error) {

                console.log(error)
                setError(error.message)


                setLoading(false)
            }



        }

        loadDocument()

    }, [docCollection, id, cancelled]);


    useEffect(() => {
        setCancelled(true);
    }, []);


    return { document, loading, error };
}
