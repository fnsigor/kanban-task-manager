import React, { forwardRef, useState } from 'react'

const AddBoard = forwardRef(({setAvailableBoards, availableBoards }, ref) => {


    const [formError, setFormError] = useState("");
    const [boardName, setBoardName] = useState('')
    const [columns, setColumns] = useState([
        {
            name: 'To do',
            tasks: [],
            id: 'todo1'
        },
        {
            name: 'Doing',
            tasks: [],
            id: 'doing2'
        },
        {
            name: 'Done',
            tasks: [],
            id: 'done3'
        },
    ])




    const deleteColumnFromBoard = (column) => {
        const newColumns = columns.filter(currentColumn => currentColumn.id != column.id)
        setColumns(newColumns)
    }

    const addColumnToBoard = () => {
        const newColumn = {
            name: 'New Column',
            tasks: [],
            id: 'columnId' + columns.length + Math.random() * (99 - 1) + 1
        }
        setColumns([...columns, newColumn])
    }

    const updateColumnName = (i, event) => {
        let currentColumnState = columns
        currentColumnState[i].name = event.target.value
        setColumns(currentColumnState)
    }

    const CreateBoardSubmit = (e) => {
        e.preventDefault();

        setFormError("");



        if (boardName.trim() === '') { //verifica se tem nome do board
            setFormError('Preencha o nome do quadro')
        }


        //remove colunas sem nome
        columns.forEach(column => {
            if (column.name.trim() === '') {
                setFormError('Existem colunas sem nome')
            }
        })


        if (formError) return


        const newBoard = {
            boardName,
            id: Math.random() * (99 - 1) + 1 + Math.random() * (99 - 1) + 1,
            columns,
        };

        localStorage.setItem(newBoard.id, JSON.stringify(newBoard))

        setAvailableBoards([...availableBoards, newBoard]);

        ref.current.classList.toggle('show')
    };


    return (
        <div className="shadow" ref={ref}>
            <div className='popupForm'>
                <h4>Create New Board</h4>
                <span className="closePopup" onClick={() => ref.current.classList.toggle('show')}>cancelar</span>
                <form onSubmit={CreateBoardSubmit}>

                    <div>
                        <label>Board Name</label>
                        <input type="text" name="" id="" placeholder='board name'
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                    </div>

                    <div className='boardColumns'>
                        {
                            columns.map((column, index) => (
                                <div key={column.name + index}>
                                    <input type="text" name="" id="" defaultValue={column.name} onChange={(event) => updateColumnName(index, event)} />
                                    <span onClick={() => deleteColumnFromBoard(column)}>excluir</span>
                                </div>
                            ))
                        }
                    </div>

                    <button className="whiteButton" type='button' onClick={addColumnToBoard} >
                        Add column
                    </button>

                    <button className="purpleButton">
                        Create new board
                    </button>

                </form>
            </div>
        </div>
    )
})

export default AddBoard