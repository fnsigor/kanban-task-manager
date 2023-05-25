import React, { useContext, useEffect, useState } from 'react'
import style from './CurrentBoard.module.scss'
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';

import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../firebase config/database";
import { getUserBoards } from '../../utils/getBoard';

function CurrentBoard() {

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { boardid } = useParams()


    const [selectedBoard, setSelectedBoard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    

    useEffect(() => {
        if (!user) {
            setLoading(true)
        } 
        
        getUserBoards(null, setSelectedBoard, 'one', boardid)
       
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