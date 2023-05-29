import './style/index.scss'
import { useEffect, useState, useRef } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { useAuthentication } from "./hooks/useAuthentication"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AddBoard from './component popovers/AddBoard/AddBoard'
import AddTask from './component popovers/AddTask/AddTask'
import EditTask from './component popovers/EditTask,jsx/EditTask'
import { EditTaskPopupHTMLProvider } from './context/editTaskHTMLContext'
import { SelectedTaskProvider } from './context/selectedTaskContext'
import { SelectedBoardProvider } from './context/selectedBoardContext'

function Root() {

  const [user, setUser] = useState()


  const { auth } = useAuthentication()

  const addBoardPopup = useRef()
  const addTaskPopup = useRef()
  const editTaskPopup = useRef()


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])




  return (

    <AuthProvider value={{ user }}>

      <div id="app">
        <SelectedBoardProvider>
          <EditTaskPopupHTMLProvider editTaskPopup={editTaskPopup}>
            <SelectedTaskProvider>
              <Sidebar addBoardPopup={addBoardPopup} userid={user?.uid} />
              <div>
                <Navbar addTaskPopup={addTaskPopup} />
                <Outlet />
              </div>

              <AddTask ref={addTaskPopup} userid={user?.uid} />
              <AddBoard ref={addBoardPopup} />
              <EditTask ref={editTaskPopup} />
              
            </SelectedTaskProvider>
          </EditTaskPopupHTMLProvider>
        </SelectedBoardProvider>
      </div>

    </AuthProvider>
  )
}

export default Root
