import React, { forwardRef, useEffect, useState } from 'react'
import useSelectedTaskContext from '../../hooks/useSelectedTaskContext'
import useBoardContext from '../../hooks/useBoardContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useParams } from 'react-router-dom'

const EditTask = forwardRef(({ userid }, ref) => {

    const { selectedTaskData } = useSelectedTaskContext()

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([])

    const { selectedBoard } = useBoardContext()

    const { updateDocument, response } = useUpdateDocument("boards");


    const { boardid } = useParams()



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
            boardId: selectedBoard.boardId,
            columns: updatedColumns,
            userId: selectedBoard.userId,
        }

        updateDocument(boardid, updatedBoard);
    };


    const handleCheckboxChange = (event, index) => {
        const updatedSubtask = subtasks[index]
        updatedSubtask.completed = event.target.checked
        setSubtasks(subtasks.map((subtask, i) => {
            if (index === i) {
                return updatedSubtask
            } else {
                return subtask
            }
        }))
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
                <span className="closePopup">option</span>
                <form >

                    <div>
                        <input
                            type="text"
                            placeholder='e.g Take coffee break'
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                        />
                    </div>

                    <div>
                        <textarea
                            cols="30"
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='e.g It´s alwais goog to take a break. This 15 minutes break will recharge the batteries a little.'
                        ></textarea>
                    </div>



                    <div className='boardColumns'>
                        <span>Subtasks</span>
                        {
                            subtasks.map((subtask, index) => (
                                <div key={subtask.id}>
                                    <input
                                        checked={subtask.completed}
                                        type="checkbox"
                                        name={subtask.id}
                                        id={subtask.id}
                                        placeholder={subtask.name}
                                        value={subtask.completed}
                                        onChange={(event) => handleCheckboxChange(event, index)}
                                    />
                                    <label htmlFor={subtask.id}>{subtask.name}</label>

                                    <span onClick={() => deleteSubtask(subtask.id)}>delete</span>

                                </div>
                            ))
                        }
                    </div>
                </form>
            </div >
        </div >
    )
})

export default EditTask