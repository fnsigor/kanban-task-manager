import style from './task.module.scss'

export function Task({ task }) {

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