import React, { useContext, useRef, useState } from 'react'

import style from './column.module.scss'
import { Task } from '../Task/Task'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'
import useColumnContext from '../../hooks/useColumnContext'
import { DOMElementsContext } from '../../context/DOMElementsContext'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'

function Column({ name, tasks, columnId }) {

  const { editTaskElement } = useEditTaskHTML()

  const { selectedColumn, setSelectedColumn } = useColumnContext()

  const { selectedBoard, setSelectedBoard } = useBoardContext()

  const btAddTask = useRef()

  const [newColumnName, setNewColumnName] = useState(name)


  const toggleClass = () => {
    editTaskElement.current.classList.toggle('show')
  }

  const { DOMElements: addTaskPopup } = useContext(DOMElementsContext)


  const updateColumnName = (e) => {
    //clonar coluna
    const renamedColumn = selectedBoard.columns.find(column => column.id == columnId)

    renamedColumn.name = newColumnName

    const updatedColumns = selectedBoard.columns.map(column => {
      if (column.id == columnId) {
        return renamedColumn
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

  }



  return (
    <li className={style.columnContainer}>
      <input className='column-title'
        type='text'
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        onBlur={updateColumnName}
      />

      <ul>
        {tasks.map((task, index) => (
          <Task task={task} key={'task' + index} toggleClass={toggleClass} columnId={columnId} />
        ))}

        <li className='addTaskLi'>
          <div>
            <input
              type="text"
              placeholder="+ Add New Task"
              onFocus={() => btAddTask.current.style.display = 'initial'}
              onBlur={() => setTimeout(() => { btAddTask.current.style.display = 'none' }, 100)}
            />
            <button
              ref={btAddTask}
              onClick={(e) => {
                addTaskPopup.current.classList.toggle('show')
                setSelectedColumn(columnId)
              }} >
              Criar tarefa
            </button>
          </div>
        </li>
      </ul>
    </li>
  )
}

export default Column