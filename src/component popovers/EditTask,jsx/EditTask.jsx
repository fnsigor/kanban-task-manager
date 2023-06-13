import React, { forwardRef, useEffect, useState } from 'react'
import useSelectedTaskContext from '../../hooks/useSelectedTaskContext'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'
import * as Checkbox from '@radix-ui/react-checkbox';


const EditTask = forwardRef(({ userid }, ref) => {

    const { selectedTaskData } = useSelectedTaskContext()

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([])


    const { selectedBoard, setSelectedBoard } = useBoardContext()

    useEffect(() => {
        if (selectedTaskData) {
            setTaskName(selectedTaskData.name)
            setDescription(selectedTaskData.description)
            setSubtasks(selectedTaskData.subtasks)
        }

    }, [selectedTaskData])


    const updateTaskSubmit = () => {
        ref.current.classList.toggle('show')

        const updatedTask = {
            name: taskName,
            description: description,
            completed: false,
            subtasks,
            id: selectedTaskData.id,
        }

        const updatedColumns = selectedBoard.columns.map(column => {

            if (column.id == selectedTaskData.columnId) {

                const columnUpdatedTaskList = column.tasks.map(task => {
                    if (task.id === updatedTask.id) {
                        return updatedTask
                    } else {
                        return task
                    }
                })

                return {
                    ...column,
                    tasks: columnUpdatedTaskList
                };
            }

            return column
        })


        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: updatedColumns,
        }

        updateBoard(updatedBoard, setSelectedBoard); //atualiza o estado e o local storage
    };


    const handleCheckboxChange = (event, index) => {

       const updatedSubtask = subtasks[index]
        updatedSubtask.completed = event
        setSubtasks(subtasks.map((subtask, i) => {
            if (index === i) {
                return updatedSubtask
            } else {
                return subtask
            }
        })) 
    }

    const deleteTask = () => {

        let editedColumn = selectedBoard.columns.find(column => column.id == selectedTaskData.columnId)

        editedColumn = {
            id: editedColumn.id,
            tasks: editedColumn.tasks.filter(task => task.id !== selectedTaskData.id),
            name: editedColumn.name
        }

        const updatedColumns = selectedBoard.columns.map(column => {
            if (column.id == editedColumn.id) {
                return editedColumn
            } else {
                return column
            }
        })


        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: updatedColumns,
        }

        updateBoard(updatedBoard, setSelectedBoard);

        ref.current.classList.toggle('show')

    }

    const deleteSubtask = (deletedSubtaskId) => {
        const newSubtasks = subtasks.filter(subtask => subtask.id != deletedSubtaskId)
        setSubtasks(newSubtasks)
    }


    return (
        <div className="shadow" ref={ref} onClick={(e) => {
            if (e.target.classList[0] === 'shadow') {
                updateTaskSubmit()
            }
        }}>

            <div className='popupForm EditTask'>

                <form autoComplete="off">

                    <div>
                        <input
                            type="text"
                            placeholder='e.g Take coffee break'
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                            className='taskName'
                        />
                    </div>

                    <div>
                        <textarea
                            className='taskDescription'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='No description'
                        ></textarea>
                    </div>

                    <div className='subtasksContainer'>
                        <label>Subtasks</label>
                        {
                            subtasks.map((subtask, index) => (
                                <div key={subtask.id} className='subtasksDiv'>
                                    <Checkbox.Root
                                        className="CheckboxRoot"
                                        id={subtask.id}
                                        checked={subtask.completed}
                                        onCheckedChange={(event) => handleCheckboxChange(event, index)}>
                                        <Checkbox.Indicator className="CheckboxIndicator" asChild>
                                        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>


                                    <label htmlFor={subtask.id}>{subtask.name}</label>

                                    <img title='Delete subtask' onClick={() => deleteSubtask(subtask.id)} src="./icon-close.svg" />

                                </div>
                            ))
                        }
                    </div>

                    <button className='redButton large' onClick={deleteTask}>Delete task</button>

                </form>

                <button className="redButton large" onClick={() => {
                    ref.current.classList.toggle('show')
                }}>
                    Close
                </button>
            </div >
        </div >
    )
})

export default EditTask