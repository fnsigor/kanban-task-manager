import React, { useContext, useEffect, useState } from 'react'
import style from './CurrentBoard.module.scss'
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';

import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../firebase config/database";

function CurrentBoard() {

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { boardid } = useParams()


    const [selectedBoard, setSelectedBoard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    async function loadDocument() {

        setLoading(true)


        try {
            
            const docRef = doc(db, 'boards', boardid)

            const docSnap = await getDoc(docRef)

            setSelectedBoard(docSnap.data())

            setLoading(false)


        } catch (error) {

            console.log(error)
            setError(error.message)


            setLoading(false)
        }



    }

    useEffect(() => {
        if (!user) {
            setLoading(true)
        } 

        loadDocument()

       


    }, [boardid, selectedBoard])








    return (
        <ul className={style.columnList}>

            {selectedBoard
                ? (
                    selectedBoard.columns.map((column, index) => (<Column name={column.name} tasks={column.tasks} key={'column' + index} />))
                )
                : (<p>loading data</p>)
            }

            <li className={style.newColumnLi}>
                <button

                >+ new column</button>
            </li>
        </ul>
    )
}

export default CurrentBoard