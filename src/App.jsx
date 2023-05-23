import './style/index.scss'
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { useAuthentication } from "./hooks/useAuthentication"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

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


  const { auth } = useAuthentication()


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])




  return (

    <AuthProvider value={{ user }}>

      <div id="app">
        <Sidebar />
        <div>
          <Navbar />
          <Outlet />
        </div>
      </div>

    </AuthProvider>
  )
}

export default Root
