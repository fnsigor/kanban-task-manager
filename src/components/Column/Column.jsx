import React from 'react'

import style from './column.module.scss'
import { Task } from '../Task/Task'
import { useContext, useEffect } from 'react'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'

function Column({ name, tasks, columnId }) {

  const {editTaskElement, setEditTaskElement} = useEditTaskHTML()

  const toggleClass = () => {
    editTaskElement.current.classList.toggle('show')
  }

  return (
    <li className={style.columnContainer}>
      <h4 className='column-title'>{name}</h4>

      <ul>
        {tasks.map((task, index, array) => (
         <Task task={task} key={'task'+index} toggleClass={toggleClass} columnId={columnId} />
        ))}
      </ul>
    </li>
  )
}

export default Column