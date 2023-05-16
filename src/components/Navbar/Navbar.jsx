import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { CurrentBoardContext } from '../../context/CurrentBoardContext'
import style from './navbar.module.scss'

function Navbar() {

    const { currentBoard } = useContext(CurrentBoardContext)



    return (
        <nav className={style.content}>

            <h1 className='board-title'>{currentBoard.name}</h1>

            <button className='bt-add-task'>
                + Add New Task
            </button>


        </nav>
    )
}

export default Navbar