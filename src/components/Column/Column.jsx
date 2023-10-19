import React, { useContext, useRef, useState, useEffect, useMemo } from 'react'
import { Task } from '../Task/Task'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'
import useColumnContext from '../../hooks/useColumnContext'
import { DOMElementsContext } from '../../context/DOMElementsContext'
import useBoardContext from '../../hooks/useBoardContext'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNewTaskName } from '../../hooks/useNewTaskName'
import { updateBoard } from '../../utils/updateBoard'
import { useParams } from 'react-router-dom'

function Column({ name, tasks, columnId, columnindex }) {

	const { editTaskElement } = useEditTaskHTML()
	const { selectedColumn, setSelectedColumn } = useColumnContext()
	const { selectedBoard, setSelectedBoard } = useBoardContext()
	const { DOMElements: addTaskPopup } = useContext(DOMElementsContext)
	const { setNewTaskName } = useNewTaskName()

	const { boardid } = useParams()

	const toggleClass = () => {
		editTaskElement.current.classList.toggle('show')
	}


	const StrictModeDroppable = useMemo(() => ({ children, ...props }) => {
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
	}, [boardid])


	function ColumnTitle() {

		const [innerInputValue, setInnerInputValue] = useState(name ?? "")

		useEffect(() => {
			const storageJSON = localStorage.getItem(boardid)

			const selectedBoard = JSON.parse(storageJSON)

			setInnerInputValue(selectedBoard.columns[columnindex].name)

		}, [])//as funções que usam contextapi estão re renderizando o componente e alterando o valor do estado innerInputValue

		function updateColumnNameAtStorage(columnName) {

			setInnerInputValue(columnName)

			const updatedColumns = selectedBoard.columns

			updatedColumns.splice(columnindex, 1, {
				name: columnName,
				tasks: selectedBoard.columns[columnindex].tasks,
				id: selectedBoard.columns[columnindex].id
			})

			const updatedBoard = {
				boardName: selectedBoard.boardName,
				id: selectedBoard.id,
				columns: updatedColumns
			}

			localStorage.setItem(selectedBoard.id, JSON.stringify(updatedBoard))
		}


		return (
			<input className='column-title'
				type='text'
				value={innerInputValue}
				onChange={(e) => updateColumnNameAtStorage(e.target.value)}
			/>
		)
	}


	function CreateTaskInput() {

		const [taskNameInputValue, setTaskNameInputValue] = useState("")

		return (
			<li className='addTaskLi'>
				<input
					value={taskNameInputValue}
					onChange={e => setTaskNameInputValue(e.target.value)}
					type="text"
					placeholder="+ Add New Task"
				/>
				<button
					hidden={taskNameInputValue.length < 1}
					className='purpleButton large'
					onClick={() => {
						setSelectedColumn(columnId)
						setNewTaskName(taskNameInputValue)
						addTaskPopup.current.classList.toggle('show')
					}}
				>
					Create Task
				</button>

			</li>
		)
	}

	const deleteColumn = () => {
		const updatedColumns = selectedBoard.columns

		updatedColumns.splice(columnindex, 1)

		const updatedBoard = {
			boardName: selectedBoard.boardName,
			id: selectedBoard.id,
			columns: updatedColumns
		}

		updateBoard(updatedBoard, setSelectedBoard)
	}

	return (

		<Draggable draggableId={columnId + 'draggableColumn'} key={columnId} index={columnindex}>
			{(provided) => (
				<li className='taskColumn' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>

					<ColumnTitle />


					<StrictModeDroppable droppableId={columnId} type='columnDND'>
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef} className='taskList'>
								{tasks.map((task, index) => (
									<Task 
									task={task}
									 key={task.id + 'task'}  
									 toggleClass={toggleClass} 
									 columnId={columnId}
									  index={index}
									  columnindex={columnindex} />
								))}

								{provided.placeholder}

								<CreateTaskInput />


								<button className='redButton large reverse' onClick={deleteColumn}>
									Delete Column
								</button>

							</ul>
						)}
					</StrictModeDroppable>
				</li>

			)}
		</Draggable>
	)
}

export default Column