import React, { forwardRef, useEffect, useState } from 'react'
import useSelectedTaskContext from '../../hooks/useSelectedTaskContext'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import useColumnContext from '../../hooks/useColumnContext';
import { EditTaskPopupHTMLProvider } from '../../context/editTaskHTMLContext';
import { useParams } from 'react-router-dom';

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className='SelectItem'{...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Select.ItemIndicator>
        </Select.Item>
    );
});



const EditTask = forwardRef(({ userid }, ref) => {

    const { boardid } = useParams()

    const { selectedTaskData } = useSelectedTaskContext()

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([])
    const [availableColumns, setAvailableColumns] = useState([])
    const { selectedBoard, setSelectedBoard } = useBoardContext()


    const [selectedColumnId, setselectedColumnId] = useState([]) //tem um context pra isso mas nao tem necessidade de usar

    useEffect(() => {
        setAvailableColumns(selectedBoard?.columns ?? [])
    }, [selectedBoard])


    useEffect(() => {


        if (selectedTaskData) {
            setTaskName(selectedTaskData.name)
            setDescription(selectedTaskData.description)
            setSubtasks(selectedTaskData.subtasks)
            setselectedColumnId(selectedTaskData.columnId)
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

        let updatedTaskIndex = 0
        let sourceColumnIndex = 0


        let updatedColumns = selectedBoard.columns.map((column, index) => {

            if (column.id == selectedTaskData.columnId) {

                const columnUpdatedTaskList = column.tasks.map((task, i) => {
                    if (task.id === updatedTask.id) {
                        updatedTaskIndex = i
                        sourceColumnIndex = index
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


        const sourceColumnId = selectedTaskData.columnId
        const destinationColumnId = selectedColumnId


        if (sourceColumnId !== destinationColumnId) {
            verifyColumnUpdate()

        }

        function verifyColumnUpdate() {

            const sourceColumn = updatedColumns[sourceColumnIndex]
            sourceColumn.tasks.splice(updatedTaskIndex, 1)

            const destinationColumn = updatedColumns.find(column => column.id === destinationColumnId)
            destinationColumn.tasks.push(updatedTask)


            updatedColumns.map(column => {

                if (column.id === sourceColumnId) {
                    return sourceColumn
                }

                if (column.id === destinationColumnId) {
                    return destinationColumn
                }

                return column
            })


        }




        const updatedBoard = {
            boardName: selectedBoard.boardName,
            id: selectedBoard.id,
            columns: updatedColumns,
        }

        updateBoard(updatedBoard, setSelectedBoard)
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


                    <div>
                        <label htmlFor="">Current Column</label>

                        {availableColumns && (
                            <Select.Root onValueChange={e => setselectedColumnId(e)} value={selectedColumnId}>
                                <Select.Trigger className="SelectTrigger" aria-label="Columns">
                                    <Select.Value />
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

                                            {availableColumns.map((column, i) => (
                                               
                                                    (<SelectItem key={column.id} value={column.id}>
                                                        {column.name}
                                                    </SelectItem>)
                                            ))}


                                        </Select.Viewport>

                                        <Select.ScrollDownButton className="SelectScrollButton">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </Select.ScrollDownButton>

                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        )}
                    </div>


                    <button className='redButton large' onClick={deleteTask}>Delete task</button>

                </form>

                <button className="whiteButton large" onClick={() => {
                    ref.current.classList.toggle('show')
                }}>
                    Close
                </button>
            </div >
        </div >
    )
})

export default EditTask