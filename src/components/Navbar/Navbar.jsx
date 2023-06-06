import React, { useRef } from 'react'
import useBoardContext from '../../hooks/useBoardContext'


function Navbar({ availableBoards }) {


    const { selectedBoard } = useBoardContext()


    if (availableBoards.length === 0 || selectedBoard === null) {
        return (
            <nav id='navbar'>

                <h1 className='board-title'>Kanban Task Manager</h1>

            </nav>
        )
    }


    return (
        <nav id='navbar'>

            <h1 className='board-title'>{selectedBoard?.boardName}</h1>

        </nav>
    )





}

export default Navbar