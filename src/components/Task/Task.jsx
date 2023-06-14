

import useColumnContext from '../../hooks/useColumnContext';
import useSelectedTaskContext from '../../hooks/useSelectedTaskContext'
import { Draggable } from 'react-beautiful-dnd';

export function Task({ task, toggleClass, columnId, index }) {

    const completedSubtasksNumber = task.subtasks.filter(subtask => subtask.completed === true).length

    const { setSelectedTaskData } = useSelectedTaskContext()



    return (
        <Draggable
            draggableId={task.id}
            key={task.id}
            index={index}>
            {(provided) => (
                <li className='taskContainer'
                    onClick={() => {
                        setSelectedTaskData({ ...task, columnId })
                        toggleClass()
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    draggable="true"
                >
                    <h6 className='task-title'>{task.name}</h6>
                    {task.subtasks.length > 0 && (
                        <p>{completedSubtasksNumber} of {task.subtasks.length} subtasks</p>
                    )}
                </li>
            )}
        </Draggable>
    )
}