import React, { useEffect, useState } from 'react'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'
import { Link, useParams } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


export const MobiLeMenu = ({availableBoards, boardid, addBoardPopup, deleteBoard, selectedBoard }) => {

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild >

                <button className='purpleButton'>Boards</button>

            </DropdownMenu.Trigger >

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='mobileMenuContent' sideOffset={5}>

                    {
                        availableBoards.map((board, index) => (
                            <DropdownMenu.Item key={board.id + 'link'} asChild > 
                                <Link to={`/boards/${board.id}`} className='sidebar-board-title mobileMenuItem'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z" /><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /></svg>
                                    {board.boardName}
                                </Link>
                            </DropdownMenu.Item >

                        ))
                    }

                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                    <DropdownMenu.Item className='mobileMenuItem'>
                        <button className='purpleButton large' onClick={() => addBoardPopup.current.classList.add('show')} >
                            + Create New Board
                        </button>
                    </DropdownMenu.Item >

                    {boardid && (
                        <DropdownMenu.Item className='mobileMenuItem' >
                            <button className='redButton large' onClick={deleteBoard}>Excluir Board Atual <br />
                                ({selectedBoard?.boardName})
                            </button>
                        </DropdownMenu.Item >
                    )}

                </DropdownMenu.Content>
            </DropdownMenu.Portal>

        </DropdownMenu.Root>
    )
}


function Navbar({ setAvailableBoards, availableBoards, addBoardPopup, deleteBoard }) {


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

            <div id='desktopNavbarInput'>
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

            </div>

            <div id="mobileMenu">
                <div>
                    <div className="logo">
                        <Link to="/" className='app-title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M160 56v96a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h40a8 8 0 0 1 8 8Zm64-8h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8Zm0 80h-40a8 8 0 0 0-8 8v40a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-40a8 8 0 0 0-8-8ZM80 48H40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8Zm0 80H40a8 8 0 0 0-8 8v72a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z" /></svg>

                        </Link>
                    </div>
                    <div className='inputContainer'>
                        {
                            (boardid == undefined || boardid === "")
                                ? (<h1 className='board-title'>Kanban Task Manager</h1>)
                                : (<input
                                    className='board-title'
                                    placeholder='Kanban Task Manager'
                                    value={boardName}
                                    onChange={e => setBoardName(e.target.value)}
                                    onBlur={updateBoardName}
                                />
                                )
                        }
                    </div>
                </div>
                <MobiLeMenu
                    boardName={boardName}
                    availableBoards={availableBoards}
                    boardid={boardid}
                    addBoardPopup={addBoardPopup}
                    deleteBoard={deleteBoard}
                    selectedBoard={selectedBoard}
                />
            </div>




        </nav>
    )





}

export default Navbar