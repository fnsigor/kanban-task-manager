import React from 'react'

import style from './column.module.scss'
import { Task } from '../Task/Task'


function Column({ name, tasks }) {

  return (
    <li className={style.columnContainer}>
      <h4 className='column-title'>{name}</h4>

      <ul>
        {tasks.map((task, index, array) => (
         <Task task={task} key={'task'+index}/>
        ))}
      </ul>
    </li>
  )
}

export default Column