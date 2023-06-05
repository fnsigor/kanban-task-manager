import useBoardContext from "../../hooks/useBoardContext";
import { updateBoard } from "../../utils/updateBoard";
import React, { useEffect, useRef, useState } from 'react'



export function CreateColumnInput() {

    const [innerInputValue, setInnerInputValue] = useState('')
    const btAddColumn = useRef()
    const { selectedBoard, setSelectedBoard } = useBoardContext()
    
    const createColumnSubmit = (e) => {

        e.preventDefault();

        let newColumns = selectedBoard.columns

        newColumns.push({
            name: innerInputValue,
            tasks: [],
            id: (Math.random() * (99 - 1) + 1) + 'column' + (Math.random() * (99 - 1) + 1)
        })

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: newColumns
        }

        updateBoard(updatedBoard, setSelectedBoard);
    }

    return (
        <li className='createColumnInput'>
            <form onSubmit={createColumnSubmit}>
                <input
                    value={innerInputValue}
                    onChange={e => setInnerInputValue(e.target.value)}
                    type="text"
                    placeholder="+ Adicionar outra coluna"
                    className='task-title'
                    onFocus={() => btAddColumn.current.style.display = 'initial'}
                    onBlur={() => setTimeout(() => { btAddColumn.current.style.display = 'none' }, 100)}
                />
                <button
                    ref={btAddColumn}
                    disabled={innerInputValue.length < 1}
                    className="purpleButton large">Create column</button>
            </form>
        </li>

    )
}