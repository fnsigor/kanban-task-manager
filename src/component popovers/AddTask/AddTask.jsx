import React, { forwardRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUserBoards } from '../../utils/getBoard';
import useColumnContext from '../../hooks/useColumnContext';
import { updateBoard } from '../../utils/updateBoard';
import useBoardContext from '../../hooks/useBoardContext';


const AddTask = forwardRef((props, ref) => {

    const [subtasks, setSubtasks] = useState([
        {
            name: 'e.g Make coffee',
            completed: false,
            id: 'subtask1'
        },
        {
            name: 'e.g Drink coffee & smile',
            tasks: [],
            id: 'subtask2'
        },
    ])

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')


    const { selectedColumn } = useColumnContext()

    const {selectedBoard, setSelectedBoard} = useBoardContext()


    const { boardid } = useParams()


    const createTaskSubmit = (e) => {

        e.preventDefault();
        
        const storageJSON = localStorage.getItem(boardid)

        const selectedBoard = JSON.parse(storageJSON)

    

        const newTask = {
            name: taskName,
            description,
            completed: false,
            subtasks,
            id: Math.random() * (99 - 1) + 1 + 'task' + Math.random() * (99 - 1) + 1,
        }

    

       // console.log('coluna selecionada:', selectedColumn)

        

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

      updateBoard(updatedBoard, setSelectedBoard); //atualiza o estado e o local storage


        ref.current.classList.toggle('show')

       // alert('Tarefa adicionada com sucesso')
    };


    const handleSubtaskNameChange = (event, i) => {
        let currentSubtasksState = subtasks
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

    return (
        <div className="shadow" ref={ref} >
            <div className='popupForm'>
                <h4>Add new Task</h4>
                <span className="closePopup" onClick={() => ref.current.classList.toggle('show')}>cancelar</span>
                <form onSubmit={createTaskSubmit}>

                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder='e.g Take coffee break'
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            cols="30"
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='e.g It´s alwais goog to take a break. This 15 minutes break will recharge the batteries a little.'
                        ></textarea>
                    </div>



                    <div className='boardColumns'>
                        <label>Subtasks</label>
                        {
                            subtasks.map((subtask, index) => (
                                <div key={subtask.name + index}>
                                    <input type="text"
                                        placeholder={subtask.name}
                                        defaultValue={subtask.name}
                                        onChange={(event) => handleSubtaskNameChange(event, index)} />

                                    <span onClick={() => deleteSubtask(subtask.id)}>delete</span>
                                </div>
                            ))
                        }
                    </div>


                    <button className="whiteButton" type='button' onClick={createSubtask} >
                        + Add New Subtask
                    </button>

                    {/* <div>
                        <label htmlFor="board">Select column</label>

                        {selectedBoard && (
                            <select
                                required
                                name="board"
                                id="board"
                                onChange={e => setSelectedColumn(e.target.value)}
                                defaultValue='select a column'
                            >
                                <option key='select a column' value='select a column' disabled>
                                    select a column
                                </option>

                                {selectedBoard.columns.map((column, i) => (
                                    <option key={column.id} value={column.id}>
                                        {column.name}
                                    </option>
                                ))}

                            </select>
                        )}


                    </div> */}


                    <button className="purpleButton">
                        Create task
                    </button>


                </form>
            </div >
        </div >
    )
})

export default AddTask