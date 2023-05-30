import './style/index.scss'
import { useEffect, useState, useRef } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"

import { Outlet } from 'react-router-dom'

import AddBoard from './component popovers/AddBoard/AddBoard'
import AddTask from './component popovers/AddTask/AddTask'
import EditTask from './component popovers/EditTask,jsx/EditTask'
import { EditTaskPopupHTMLProvider } from './context/editTaskHTMLContext'
import { SelectedTaskProvider } from './context/selectedTaskContext'
import { SelectedBoardProvider } from './context/selectedBoardContext'
import { SelectedColumnProvider } from './context/selectedColumnContext'
import { DOMElementsProvider } from './context/DOMElementsContext'

function Root() {


	const addBoardPopup = useRef()
	const addTaskPopup = useRef()
	const editTaskPopup = useRef()

	const [availableBoards, setAvailableBoards] = useState([])

	useEffect(() => {
		const allStorageBoards = Object.keys(localStorage).map(boardid => {
			const boardJSON = localStorage.getItem(boardid)
			return JSON.parse(boardJSON)
		})

		setAvailableBoards(allStorageBoards)
	}, [])


	return (



		<div id="app">
			<SelectedBoardProvider>
				<SelectedColumnProvider>
					<EditTaskPopupHTMLProvider editTaskPopup={editTaskPopup}>

						<SelectedTaskProvider>

							<DOMElementsProvider addTaskPopup={addTaskPopup}>

								<Sidebar addBoardPopup={addBoardPopup} availableBoards={availableBoards} />
								<div>
									<Navbar addTaskPopup={addTaskPopup} />
									<Outlet />
								</div>

								<AddTask ref={addTaskPopup} />
								<AddBoard ref={addBoardPopup} setAvailableBoards={setAvailableBoards} availableBoards={availableBoards} />
								<EditTask ref={editTaskPopup} />

							</DOMElementsProvider>

						</SelectedTaskProvider>

					</EditTaskPopupHTMLProvider>
				</SelectedColumnProvider>

			</SelectedBoardProvider>
		</div>


	)
}

export default Root
