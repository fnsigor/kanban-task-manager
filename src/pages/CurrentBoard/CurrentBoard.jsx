import React, { useEffect, useRef, useState } from 'react'
import style from './CurrentBoard.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';
import { getUserBoards } from '../../utils/getBoard';
import useBoardContext from '../../hooks/useBoardContext';
import { updateBoard } from '../../utils/updateBoard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CurrentBoard() {

    const { boardid } = useParams()
    const [columnName, setColumnName] = useState('');
    const btAddColumn = useRef()
    const { selectedBoard, setSelectedBoard } = useBoardContext()


    useEffect(() => { //pra pegar o board selecionado na sidebar
        getUserBoards(setSelectedBoard, 'one', boardid)
    }, [boardid])


    useEffect(() => { //sempre que atualizar o estado do board,manda a nova versão dele pro localStorage

    }, [])


    const createColumnSubmit = (e) => {

        e.preventDefault();

        let newColumns = selectedBoard.columns



        newColumns.push({
            name: columnName,
            tasks: [],
            id: (Math.random() * (99 - 1) + 1) + 'column' + (Math.random() * (99 - 1) + 1)
        })

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: newColumns
        }

        updateBoard(updatedBoard, setSelectedBoard);

        setColumnName('')

    }


    function handleOnDragEnd(result) {

        if (!result.destination) return;


        const selectedItem = selectedBoard.columns.find(column => column.id === result.source.droppableId).tasks[result.source.index]
        
        const updatedColumns = selectedBoard.columns.map(column => {
            if (column.id === result.source.droppableId) {
                column.tasks.splice(result.source.index, 1)
            }

            return column
        })

        updatedColumns.map(column => {
            if (column.id === result.destination.droppableId) {
                column.tasks.splice(result.destination.index, 0, selectedItem)
            }

            return column
        })

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: updatedColumns
        }

        updateBoard(updatedBoard, setSelectedBoard);

    }



    return (

        <DragDropContext onDragEnd={handleOnDragEnd}>

            <ul className={style.columnList}>

                {selectedBoard
                    ? (
                        selectedBoard.columns.map((column, index) => (<Column name={column.name} columnindex={index} tasks={column.tasks} key={column.id} columnId={column.id} />))
                    )
                    : (<p>loading data</p>)
                }

                <li className={style.newColumnLi}>
                    <form className={style.newColumnLi} onSubmit={createColumnSubmit}>
                        <input
                            type="text"
                            placeholder="+ Adicionar outra coluna"
                            className='task-title'
                            onFocus={() => btAddColumn.current.style.display = 'initial'}
                            onBlur={() => setTimeout(() => { btAddColumn.current.style.display = 'none' }, 100)}
                            onChange={(e) => setColumnName(e.target.value)}
                            value={columnName}
                        />
                        <button ref={btAddColumn} >Criar coluna</button>
                    </form>
                </li>
            </ul>
        </DragDropContext>
    )
}

export default CurrentBoard