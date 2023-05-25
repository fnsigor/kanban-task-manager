import React, { useEffect, useState } from 'react'
import style from './sidebar.module.scss'
import { Link, useNavigate } from 'react-router-dom';

import { db } from "../../firebase config/database";
import { collection, query, orderBy, onSnapshot, where, getDocs } from 'firebase/firestore'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { getUserBoards } from '../../utils/getBoard';



function Sidebar({ addBoardPopup, userid }) {

    const [boards, setBoards] = useState([])


    useEffect(() => {

        if (userid) {
            getUserBoards(userid, setBoards, 'all')
        }

    }, [userid])



    return (
        <aside className={style.content}>

            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M160 56v96a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h40a8 8 0 0 1 8 8Zm64-8h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8Zm0 80h-40a8 8 0 0 0-8 8v40a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-40a8 8 0 0 0-8-8ZM80 48H40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8Zm0 80H40a8 8 0 0 0-8 8v72a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z" /></svg>
                <h2 className='app-title'>kanban</h2>
            </div>

            <p className='sidebar-board-title'>ALL BOARDS {`(${boards.length})`}</p>

            <ul>
                {
                    boards.map((board, index) => (
                        <li
                            className='sidebar-board-title'
                            key={board.boardId}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z" /><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /></svg>
                            <Link to={`/boards/${board.id}`}>{board.boardName}</Link>
                        </li>

                    ))
                }
                <li className='sidebar-board-title' onClick={() => addBoardPopup.current.classList.add('show')} >
                    + Create New Board
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar