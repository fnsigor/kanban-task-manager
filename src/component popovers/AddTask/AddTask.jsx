import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import useColumnContext from '../../hooks/useColumnContext';
import { updateBoard } from '../../utils/updateBoard';
import useBoardContext from '../../hooks/useBoardContext';
import { useNewTaskName } from '../../hooks/useNewTaskName';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";


const AddTask = forwardRef(({visible}, ref) => {


    const subTasksDefaultValue = [
        {
            name: 'e.g Make coffee',
            completed: false,
            id: 'subtask1'
        },
        {
            name: 'e.g Drink coffee & smile',
            completed: false,
            id: 'subtask2'
        },
    ]

    const [subtasks, setSubtasks] = useState(subTasksDefaultValue)

    const [description, setDescription] = useState('')
    const { selectedColumn, setSelectedColumn } = useColumnContext()
    const { setSelectedBoard } = useBoardContext()
    const { boardid } = useParams()
    const { newTaskName, setNewTaskName } = useNewTaskName('')

    const [taskTitle, setTaskTitle] = useState(newTaskName)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        criteriaMode: "all"
    });

    const resetForm = () => {

        setNewTaskName("")
        setDescription("")
        setTaskTitle("")
        setSubtasks(subTasksDefaultValue)

        console.log('reset no form')

    }


    const createTaskSubmit = (e) => {

        const storageJSON = localStorage.getItem(boardid)

        const selectedBoard = JSON.parse(storageJSON)

        setSelectedBoard(selectedBoard)

        const namedSubtasksOnly = subtasks.filter(subtask => subtask.name.trim() !== "")

        const newTask = {
            name: taskTitle,
            description,
            subtasks: namedSubtasksOnly,
            id: Math.random() * (99 - 1) + 1 + 'task' + Math.random() * (99 - 1) + 1,
        }

        const updatedColumns = selectedBoard.columns.map(column => {

            if (column.id == selectedColumn) {
                return {
                    ...column,
                    tasks: [...column.tasks, newTask]
                };
            }

            return column
        })

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: updatedColumns,
        }

        updateBoard(updatedBoard, setSelectedBoard);

        resetForm()

        ref.current.classList.toggle('show')
    };


    const handleSubtaskNameChange = (event, i) => {
        const currentSubtasksState = subtasks
        currentSubtasksState[i].name = event.target.value
        setSubtasks(currentSubtasksState)
    }

    const deleteSubtask = (deletedSubtaskId) => {
        const newSubtasks = subtasks.filter(subtask => subtask.id != deletedSubtaskId)
        setSubtasks(newSubtasks)
    }

    const createSubtask = () => {
        const newSubtask = {
            name: 'New Subtask',
            completed: false,
            id: ('subTaskId' + subtasks.length) + Math.random() * (99 - 1) + 1
        }
        setSubtasks([...subtasks, newSubtask])
    }


    const [availableColumns, setAvailableColumns] = useState([])


    useEffect(() => {
        setTaskTitle(newTaskName)

        const storageJSON = localStorage.getItem(boardid)

        const selectedBoard = JSON.parse(storageJSON)

        setAvailableColumns(selectedBoard?.columns) //a atualização desse estado ocorre quando clicamos no botao de adicionar tarefa
    }, [newTaskName])



    return (
        <div className="shadow" ref={ref} onClick={(e) => {
            if (e.target.classList[0] === 'shadow') {
                ref.current.classList.toggle('show')
                resetForm()
            }
        }} >
            <div className='popupForm'>
                <h4>Add New Task</h4>
                <form onSubmit={handleSubmit(() => createTaskSubmit())}>

                    <div>
                        <label htmlFor='taskname'>Title</label>
                        <input
                            id="taskname"
                            name="taskname"
                            type="text"
                            placeholder='Task Title'
                            value={taskTitle}
                            {...register("taskname", {
                                onChange: e => setTaskTitle(e.target.value),
                                required: "Required input.",
                                maxLength: {
                                    value: 50,
                                    message: "Maximum 50 characters."
                                }
                            })}
                        />

                        <ErrorMessage
                            errors={errors}
                            name="taskname"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className='errorMessage' key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id='description'
                            name='description'
                            value={description}
                            placeholder='e.g It´s alwais goog to take a break. This 15 minutes break will recharge the batteries a little.'
                            {...register("description", {
                                onChange: e => setDescription(e.target.value),
                                maxLength: {
                                    value: 700,
                                    message: "Maximum 700 characters."
                                }
                            })}
                        ></textarea>

                        <ErrorMessage
                            errors={errors}
                            name="description"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className='errorMessage' key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </div>



                    <div className='inputAndDeleteContainer'>
                        <label>Subtasks</label>
                        {
                            subtasks.map((subtask, index) => (
                                <div key={subtask.name + index}>
                                    <div className='inputAndDeleteDiv'>
                                        <input
                                            type="text"
                                            placeholder={subtask.name}
                                            defaultValue={subtask.name}
                                            {...register(`subtaskname${subtask.id}`, {
                                                onChange: e => handleSubtaskNameChange(e, index),
                                                maxLength: {
                                                    value: 100,
                                                    message: "Maximum 100 characters."
                                                }
                                            })}
                                        />

                                        <img title='Delete subtask' onClick={() => deleteSubtask(subtask.id)} src="./icon-close.svg" />
                                    </div>

                                    <ErrorMessage
                                        errors={errors}
                                        name={`subtaskname${subtask.id}`}
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


                    <button className="whiteButton large" type='button' onClick={createSubtask} >
                        + Add New Subtask
                    </button>

                    <div className=''>
                        <label htmlFor="board">Select column</label>

                        {availableColumns && (
                            <select
                                required
                                name="board"
                                id="board"
                                onChange={e => setSelectedColumn(e.target.value)}
                                defaultValue='select a column'
                            >

                                {availableColumns.map((column, i) => (
                                    column.id == selectedColumn
                                        ? (<option key={column.id} value={column.id} selected>
                                            {column.name}
                                        </option>)

                                        : (<option key={column.id} value={column.id}>
                                            {column.name}
                                        </option>)
                                ))}

                            </select>
                        )}
                        <span className="focus"></span>


                    </div>


                    <button className="purpleButton large">
                        Create task
                    </button>


                </form>
            </div >
        </div >
    )
})

export default AddTask