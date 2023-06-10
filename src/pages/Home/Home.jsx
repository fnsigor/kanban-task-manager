import React from 'react'
import style from './home.module.scss'
import { Link, useOutletContext } from 'react-router-dom';


function BoardCard({ board }) {
  return (
    <li className={style.boardCard}>
      <Link to={`/boards/${board.id}`}> {board.boardName}</Link>
    </li>
  )
}


function Home() {

  const [availableBoards] = useOutletContext();

  return (
    <div className={style.homeContent}>

      <h1>Available boards:</h1>

      {(availableBoards.length > 0)

        ? (
          <ul>
            {availableBoards.map(board => <BoardCard board={board} key={board.id} />)}
          </ul>
        )
        : (<p>There´s no created boards</p>)

      }

    </div>
  )
}

export default Home