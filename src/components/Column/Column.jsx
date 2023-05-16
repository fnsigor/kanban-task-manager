import React, { useContext } from 'react'
import { CurrentBoardContext } from '../../context/CurrentBoardContext'
import style from './column.module.scss'


function Task({ task }) {

  const completedSubtasksNumber = task.subtasks.filter(subtask => subtask.completed === true).length

  return (
    <li className={style.taskContainer}>
      <h6 className='task-title'>{task.name}</h6>
      {task.subtasks.length > 0 && (
        <p>{completedSubtasksNumber} of {task.subtasks.length} subtasks</p>
      )}
    </li>
  )
}



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