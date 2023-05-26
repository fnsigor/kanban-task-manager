import React, { forwardRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { getUserBoards } from '../../utils/getBoard';


const AddTask = forwardRef(({ userid }, ref) => {

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
    const [selectedBoard, setSelectedBoard] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState('')

    const { updateDocument, response } = useUpdateDocument("boards");

    const { boardid } = useParams()


    useEffect(() => {

        if (userid) {
            getUserBoards(userid, setSelectedBoard, 'one', boardid)
        }

    }, [userid, boardid])


    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            name: taskName,
            completed: false,
            subtasks,
            id: Math.random() * (99 - 1) + 1 + 'task' + Math.random() * (99 - 1) + 1,
        }

        console.log('task criada:', newTask)

        console.log('coluna selecionada:', selectedColumn)

        const updatedColumns = selectedBoard.columns.map(column => {

            if (column.id == selectedColumn) {
                return {
                    ...column,
                    tasks: [...column.tasks, newTask]
                };
            }

            return column
        })

        console.log('colunas atualizadas:', updatedColumns)

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            boardId: selectedBoard.boardId,
            columns: updatedColumns,
            userId: selectedBoard.userId,
        }

        updateDocument(boardid, updatedBoard);

        ref.current.classList.toggle('show')

        alert('Tarefa adicionada com sucesso')
    };

    return (
        <div className="shadow" ref={ref} >
            <div className='popupForm'>
                <h4>Add new Task</h4>
                <span className="closePopup" onClick={() => ref.current.classList.toggle('show')}>cancelar</span>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Title</label>
                        <input type="text" name="" id="" placeholder='e.g Take coffee break'
                            onChange={(e) => setTaskName(e.target.value)} value={taskName}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea cols="30" rows="10"
                            placeholder='e.g It´s alwais goog to take a break. This 15 minutes break will recharge the batteries a little.'
                        ></textarea>
                    </div>



                    <div className='boardColumns'>
                        <label>Subtasks</label>
                        {
                            subtasks.map((subtask, index) => (
                                <div key={subtask.name + index}>
                                    <input type="text" name="" id="" placeholder={subtask.name} defaultValue={subtask.name} onChange={(e) => {
                                        let currentSubtasksState = subtasks
                                        currentSubtasksState[index].name = e.target.value
                                        setSubtasks(currentSubtasksState)
                                    }} />

                                    <span onClick={() => {
                                        const newSubtasks = subtasks.filter(currentSubtask => currentSubtask.id != subtask.id)
                                        setSubtasks(newSubtasks)
                                    }}>delete</span>
                                </div>
                            ))
                        }
                    </div>


                    <button className="whiteButton" type='button' onClick={() => {
                        const newSubtask = {
                            name: 'New Subtask',
                            completed: false,
                            id: ('subTaskId' + subtasks.length) + Math.random() * (99 - 1) + 1
                        }
                        setSubtasks([...subtasks, newSubtask])
                    }} >
                        + Add New Subtask
                    </button>

                    <div>
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


                    </div>


                    <button className="purpleButton">
                        Create task
                    </button>


                </form>
            </div >
        </div >
    )
})

export default AddTask