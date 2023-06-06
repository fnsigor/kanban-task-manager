import React, { useContext, useRef, useState, useEffect } from 'react'
import { Task } from '../Task/Task'
import useEditTaskHTML from '../../hooks/useEditTaskHTML'
import useColumnContext from '../../hooks/useColumnContext'
import { DOMElementsContext } from '../../context/DOMElementsContext'
import useBoardContext from '../../hooks/useBoardContext'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNewTaskName } from '../../hooks/useNewTaskName'
import { useParams } from 'react-router-dom'
import { updateBoard } from '../../utils/updateBoard'

function Column({ name, tasks, columnId, columnindex }) {

	const { editTaskElement } = useEditTaskHTML()
	const { selectedColumn, setSelectedColumn } = useColumnContext()
	const { selectedBoard, setSelectedBoard } = useBoardContext()
	const { DOMElements: addTaskPopup } = useContext(DOMElementsContext)
	const { setNewTaskName } = useNewTaskName()
	const btAddTask = useRef()
	const taskNameInput = useRef()

	const columnNameInput = useRef()



	const toggleClass = () => {
		editTaskElement.current.classList.toggle('show')
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


	const showCreateTaskPopup = () => {
		setNewTaskName(taskNameInput.current.value)
		addTaskPopup.current.classList.toggle('show')
		setSelectedColumn(columnId)
	}


	function ColumnTitle() {

		const [innerInputValue, setInnerInputValue] = useState(name)

		function handleInputChange(columnName) {

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
				onChange={(e) => handleInputChange(e.target.value)}
				ref={columnNameInput}
			/>
		)
	}


	function CreateTaskInput() {


		const [innerInputValue, setInnerInputValue] = useState("")

		return (
			<li className='addTaskLi'>
				<input
					value={innerInputValue}
					onChange={e => setInnerInputValue(e.target.value)}
					ref={taskNameInput}
					type="text"
					placeholder="+ Add New Task"
					onFocus={() => btAddTask.current.style.display = 'initial'}
					onBlur={() => {
						setTimeout(() => {
							btAddTask.current.style.display = 'none'
							setInnerInputValue("")
						}, 100)
					}}
				/>
				<button
					disabled={innerInputValue.length < 1}
					className='purpleButton large'
					ref={btAddTask}
					onClick={() => {
						showCreateTaskPopup()
						setNewTaskName(innerInputValue)
					}}
				>
					Criar tarefa
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


					<StrictModeDroppable droppableId={columnId} type='listContent'>
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef} className='taskList'>
								{tasks.map((task, index) => (
									<Task task={task} key={task.id} toggleClass={toggleClass} columnId={columnId} index={index} />
								))}

								{provided.placeholder}

								<CreateTaskInput />


								<button className='redButton large' onClick={deleteColumn}>
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