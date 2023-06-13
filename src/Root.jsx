
import { useEffect, useState, useRef } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"

import { Outlet, useNavigate, useParams } from 'react-router-dom'

import AddBoard from './component popovers/AddBoard/AddBoard'
import AddTask from './component popovers/AddTask/AddTask'
import EditTask from './component popovers/EditTask,jsx/EditTask'
import { EditTaskPopupHTMLProvider } from './context/editTaskHTMLContext'
import { SelectedTaskProvider } from './context/selectedTaskContext'
import { SelectedBoardProvider } from './context/selectedBoardContext'
import { SelectedColumnProvider } from './context/selectedColumnContext'
import { DOMElementsProvider } from './context/DOMElementsContext'
import { DNDTargetProvider } from './context/DNDTargetContext'
import { NewTaskNameProvider } from './context/newTaskName'

function Root() {


	const addBoardPopup = useRef()
	const addTaskPopup = useRef()
	const editTaskPopup = useRef()

	const navigate = useNavigate()

	const [availableBoards, setAvailableBoards] = useState([])

	useEffect(() => {
		const allStorageBoards = Object.keys(localStorage).map(boardid => {
			const boardJSON = localStorage.getItem(boardid)
			return JSON.parse(boardJSON)
		})

		setAvailableBoards(allStorageBoards)
	}, [])


	const deleteBoard = (boardid, selectedBoard, setSelectedBoard) => {

		const allStorageBoards = Object.keys(localStorage).map(boardid => {
			const boardJSON = localStorage.getItem(boardid)
			return JSON.parse(boardJSON)
		})

		const updatedBoards = allStorageBoards

		const removedItemIndex = updatedBoards.findIndex(board => board.id == boardid)

		updatedBoards.splice(removedItemIndex, 1)

		localStorage.removeItem(selectedBoard.id)
		setAvailableBoards(updatedBoards)


		navigate('/')
		setSelectedBoard(null)

	}


	return (



		<div id="app">
			<SelectedBoardProvider>
				<SelectedColumnProvider>
					<EditTaskPopupHTMLProvider editTaskPopup={editTaskPopup}>

						<SelectedTaskProvider>

							<DOMElementsProvider addTaskPopup={addTaskPopup}>

								<NewTaskNameProvider>

									<Sidebar
										addBoardPopup={addBoardPopup}
										availableBoards={availableBoards}
										setAvailableBoards={setAvailableBoards}
										deleteBoard={deleteBoard}
									/>

									<div className="currentPageAndNavbarContainer">
										<Navbar
											addTaskPopup={addTaskPopup}
											availableBoards={availableBoards}
											setAvailableBoards={setAvailableBoards}
											addBoardPopup={addBoardPopup}
											deleteBoard={deleteBoard}
										/>
										<DNDTargetProvider>
											<Outlet context={[availableBoards]} />
										</DNDTargetProvider>
									</div>

									<AddTask
										ref={addTaskPopup}
									/>
									<AddBoard
										ref={addBoardPopup}
										setAvailableBoards={setAvailableBoards}
										availableBoards={availableBoards}
									/>
									<EditTask
										ref={editTaskPopup}
									/>

								</NewTaskNameProvider>

							</DOMElementsProvider>

						</SelectedTaskProvider>

					</EditTaskPopupHTMLProvider>
				</SelectedColumnProvider>

			</SelectedBoardProvider>
		</div>


	)
}

export default Root
