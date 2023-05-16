import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { CurrentBoardContext } from "../context/CurrentBoardContext"

// export function useChangeBoard(selectedBoard) {

//     const { boards: availableBoards } = useContext(UserContext)

//     const {currentBoard, setCurrentBoard} = useContext(CurrentBoardContext)

//     const board = availableBoards.filter(board => board.name === selectedBoard)

//     setCurrentBoard(board[0])

//     return {currentBoard}
// }