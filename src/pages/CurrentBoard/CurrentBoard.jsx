import React, { useContext, useEffect } from 'react'
import style from './CurrentBoard.module.scss'
import { useAuthValue } from '../../context/AuthContext';
import Register from '../register/register';

function CurrentBoard() {


    const { user } = useAuthValue();

    useEffect(() => {
        if (!user) {
            return <Register/>
        }
    }, [])
    

    return (
        <ul className={style.columnList}>
            {/* {
                currentBoard.columns.map((column, index) => (
                    <Column name={column.name} tasks={column.tasks} key={'column' + index} />
                ))
            } */}
            <li className={style.newColumnLi}>
                <button
                
                >+ new column</button>
            </li>
        </ul>
    )
}

export default CurrentBoard