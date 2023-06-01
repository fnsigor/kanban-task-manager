import React, { useContext, useRef, useState, useEffect } from 'react'

import style from './column.module.scss'
import { Task } from '../Task/Task'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'
import useColumnContext from '../../hooks/useColumnContext'
import { DOMElementsContext } from '../../context/DOMElementsContext'
import useBoardContext from '../../hooks/useBoardContext'
import { updateBoard } from '../../utils/updateBoard'
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Column({ name, tasks, columnId }) {

  const { editTaskElement } = useEditTaskHTML()

  const { selectedColumn, setSelectedColumn } = useColumnContext()

  const { selectedBoard, setSelectedBoard } = useBoardContext()

  const btAddTask = useRef()

  const [newColumnName, setNewColumnName] = useState(name)

  const { DOMElements: addTaskPopup } = useContext(DOMElementsContext)

  const toggleClass = () => {
    editTaskElement.current.classList.toggle('show')
  }



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


  const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);
    if (!enabled) {
      return null;
    }
    return <Droppable {...props}>{children}</Droppable>;
  };



  return (
    <li className={style.columnContainer}>
      <input className='column-title'
        type='text'
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        onBlur={updateColumnName}
      />

      <StrictModeDroppable droppableId={columnId}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task task={task} key={'task' + index} toggleClass={toggleClass} columnId={columnId} index={index} />
            ))}

            {provided.placeholder}

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
        )}
      </StrictModeDroppable>
    </li>
  )
}

export default Column