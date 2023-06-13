import React, { forwardRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useColumnContext from '../../hooks/useColumnContext';
import { updateBoard } from '../../utils/updateBoard';
import useBoardContext from '../../hooks/useBoardContext';
import { useNewTaskName } from '../../hooks/useNewTaskName';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import * as Select from '@radix-ui/react-select';


const AddTask = forwardRef(({ visible }, ref) => {


    const { newTaskName, setNewTaskName } = useNewTaskName('')
    const [taskTitle, setTaskTitle] = useState('newTaskName')
    const [description, setDescription] = useState('')
    const { selectedColumn, setSelectedColumn } = useColumnContext()
    const { setSelectedBoard } = useBoardContext()
    const { boardid } = useParams()


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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        criteriaMode: "all"
    });

    const resetForm = () => {
        setDescription("")
        setTaskTitle("")
        setSubtasks(subTasksDefaultValue)
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
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[i] = {
            ...updatedSubtasks[i],
            name: event.target.value
        };
        setSubtasks(updatedSubtasks)
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
                <form autoComplete="off" onSubmit={handleSubmit(() => createTaskSubmit())}>

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
                                <div key={subtask.name + 'a' + index}>
                                    <div className='inputAndDeleteDiv'>
                                        <input
                                            type="text"
                                            placeholder={subtask.name}
                                            value={subtask.name}
                                            autoFocus
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

                        {/* {availableColumns && (
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
                        )} */}
                        <Select.Root>
                            <Select.Trigger className="SelectTrigger" aria-label="Food">
                                <Select.Value placeholder='chose ' />
                                <Select.Icon className="SelectIcon">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal>
                                <Select.Content className="SelectContent">

                                    <Select.ScrollUpButton className="SelectScrollButton">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </Select.ScrollUpButton>

                                    <Select.Viewport className="SelectViewport">
                                        <Select.Group>
                                            {availableColumns.map((column, i) => (
                                                <Select.Item key={column.id} value={column.id}>
                                                    {column.name}
                                                </Select.Item>
                                            ))}
                                        </Select.Group>
                                    </Select.Viewport>
  
                                    <Select.ScrollDownButton className="SelectScrollButton">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </Select.ScrollDownButton>

                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>


                    </div>


                    <button className="purpleButton large">
                        Create task
                    </button>

                    <button className="redButton large" onClick={() => {
                        ref.current.classList.toggle('show')
                        resetForm()
                    }}>
                        Close
                    </button>


                </form>
            </div >
        </div >
    )
})

export default AddTask