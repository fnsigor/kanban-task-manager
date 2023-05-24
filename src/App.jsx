import './style/index.scss'
import { useEffect, useState, useRef } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { useAuthentication } from "./hooks/useAuthentication"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AddBoard from './component popovers/AddBoard/AddBoard'

function Root() {

  const [user, setUser] = useState()

  const userInitialValue = {
    boards: [
      {
        name: 'Kanban Task Manager',
        columns: [
          {
            name: 'To do',
            tasks: []
          },
          {
            name: 'Doing',
            tasks: []
          },
          {
            name: 'Done',
            tasks: []
          },
        ]
      },
    ]
  }

  const [DOMPopups, setDOMPopups] = useState([])


  const { auth } = useAuthentication()

 const addBoardPopup = useRef()


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  useEffect(() => {//caso precise, esse estao armazena todos os popups
    setDOMPopups([...DOMPopups, addBoardPopup])
  },[])




  return (

    <AuthProvider value={{ user }}>

      <div id="app">
        <Sidebar addBoardPopup={addBoardPopup} user={user} />
        <div>
          <Navbar/>
          <Outlet />
        </div>

        <AddBoard ref={addBoardPopup}/>

      </div>

    </AuthProvider>
  )
}

export default Root
