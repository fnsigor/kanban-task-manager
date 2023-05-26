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
import AddColumn from './component popovers/AddColumn/AddNewColumn'

function Root() {

  const [user, setUser] = useState()


  const { auth } = useAuthentication()

  const addBoardPopup = useRef()
  const addTaskPopup = useRef()
  const addColumnPopup = useRef()


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])




  return (

    <AuthProvider value={{ user }}>

      <div id="app">
        <Sidebar addBoardPopup={addBoardPopup} userid={user?.uid} />
        <div>
          <Navbar addTaskPopup={addTaskPopup} />
          <Outlet />
        </div>

        <AddTask ref={addTaskPopup} userid={user?.uid} />
        <AddBoard ref={addBoardPopup} />
        <AddColumn ref={addColumnPopup} />

      </div>

    </AuthProvider>
  )
}

export default Root
