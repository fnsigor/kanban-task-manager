import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";




const AddBoard = forwardRef(({ setAvailableBoards, availableBoards }, ref) => {

    const [boardName, setBoardName] = useState('New board')
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
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        criteriaMode: "all"
    });




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

    const updateColumnName = (index, event) => {
        let currentColumnState = columns
        currentColumnState[index].name = event.target.value
        setColumns(currentColumnState)
    }

    const createBoardSubmit = (e) => {

        const newBoard = {
            boardName,
            id: Math.random() * (99 - 1) + 1 + Math.random() * (99 - 1) + 1,
            columns,
        };

        localStorage.setItem(newBoard.id, JSON.stringify(newBoard))

        setAvailableBoards([...availableBoards, newBoard]);

        ref.current.classList.toggle('show')

        resetForm()

    };

    const inputsContainer = useRef()

    const resetForm = () => {
        setBoardName('New board')

        setColumns([
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

        inputsContainer.current.lastElementChild.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.value = "To do"
        inputsContainer.current.lastElementChild.previousElementSibling.firstElementChild.firstElementChild.value = "Doing"
        inputsContainer.current.lastElementChild.firstElementChild.firstElementChild.value = "Done"
    }



    return (
        <div className="shadow" ref={ref} onClick={(e) => {
            if (e.target.classList[0] === 'shadow') {
                ref.current.classList.toggle('show')
                resetForm()
            }
        }} >
            <div className='popupForm'>
                <h4>Create New Board</h4>
                <form onSubmit={handleSubmit(() => createBoardSubmit())}>

                    <div>
                        <label htmlFor="boardname">Board Name</label>
                        <input
                            type="text"
                            name="boardname"
                            id="boardname"
                            placeholder='board name'
                            value={boardName}
                            {...register("boardname", {
                                onChange: e => setBoardName(e.target.value),
                                required: "Required input.",
                                maxLength: {
                                    value: 30,
                                    message: "Maximum 30 characters."
                                }
                            })}
                        />

                        <ErrorMessage
                            errors={errors}
                            name="boardname"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className='errorMessage' key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </div>

                    <div ref={inputsContainer}>
                        <label>Board Columns</label>
                        {
                            columns.map((column, index) => (
                                <div key={column.id} className='boardColumns' >
                                    <div className='inputAndDeleteDiv' >
                                        <input
                                            type="text"
                                            defaultValue={column.name}
                                            {...register(`columnname-${column.id}`, {
                                                onChange: e => updateColumnName(index, e),
                                                required: "Required input.",
                                                maxLength: {
                                                    value: 15,
                                                    message: "Maximum 15 characters."
                                                }
                                            })}
                                        />

                                        <img title='Remove board' onClick={() => deleteColumnFromBoard(column)} src="./icon-close.svg" />
                                    </div>

                                    <ErrorMessage
                                        errors={errors}
                                        name={`columnname-${column.id}`}
                                        render={({ messages }) => {
                                            return messages
                                                ? Object.entries(messages).map(([type, message]) => (
                                                    <p className='errorMessage' key={type}>{message}</p>
                                                ))
                                                : null;
                                        }}
                                    />
                                </div>
                            ))
                        }


                    </div>

                    <button className="whiteButton large" type='button' onClick={addColumnToBoard} >
                        Add column
                    </button>

                    <button className="purpleButton large">
                        Create new board
                    </button>
                </form>

                <button className="redButton large" onClick={() => {
                    ref.current.classList.toggle('show')
                    resetForm()
                }}>
                    Close
                </button>
            </div>
        </div>
    )
})

export default AddBoard