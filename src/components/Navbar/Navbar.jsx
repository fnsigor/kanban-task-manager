import React, { useEffect, useState } from 'react'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'
import { useParams } from 'react-router-dom'

function Navbar({ setAvailableBoards, availableBoards }) {


    const { selectedBoard, setSelectedBoard } = useBoardContext()

    const [boardName, setBoardName] = useState("")

    const { boardid } = useParams()

    useEffect(() => {

        if (selectedBoard) {
            setBoardName(selectedBoard.boardName)
        }

    }, [selectedBoard])


    function updateBoardName() {
        const updatedBoard = { ...selectedBoard, boardName }
        updateBoard(updatedBoard, setSelectedBoard)

        const updatedAvailableBoards = availableBoards.map(board => {
            if (board.id == updatedBoard.id) {
                return updatedBoard
            } else {
                return board
            }
        })


        setAvailableBoards(updatedAvailableBoards)
    }


    return (
        <nav id='navbar'>

            {
                (boardid == undefined || boardid === "")
                    ? (<h1 className='board-title'>Kanban Task Manager</h1>)
                    : (<input
                        className='board-title'
                        placeholder='Kanban Task Manager'
                        value={boardName}
                        onChange={e => setBoardName(e.target.value)}
                        onBlur={updateBoardName} />
                    )
            }


        </nav>
    )





}

export default Navbar