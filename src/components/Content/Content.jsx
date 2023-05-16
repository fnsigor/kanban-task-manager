import React, { useContext } from 'react'
import { CurrentBoardContext } from '../../context/CurrentBoardContext'
import Column from '../Column/Column'
import style from './content.module.scss'


function Content() {

    const {currentBoard} = useContext(CurrentBoardContext)

    return (
        <ul className={style.columnList}>
            {
                currentBoard.columns.map((column, index) => (
                    <Column name={column.name} tasks={column.tasks} key={'column'+index}/>
                ))
            }
        </ul>
    )
}

export default Content