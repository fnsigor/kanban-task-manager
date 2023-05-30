import React, { useContext, useRef } from 'react'

import style from './column.module.scss'
import { Task } from '../Task/Task'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'
import useColumnContext from '../../hooks/useColumnContext'
import { DOMElementsContext } from '../../context/DOMElementsContext'

function Column({ name, tasks, columnId }) {

  const { editTaskElement } = useEditTaskHTML()

  const { setSelectedColumn } = useColumnContext()

  const btAddTask = useRef()


  const toggleClass = () => {
    editTaskElement.current.classList.toggle('show')
  }

  const { DOMElements: addTaskPopup } = useContext(DOMElementsContext)


  return (
    <li className={style.columnContainer}>
      <h4 className='column-title' >{name}</h4>

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