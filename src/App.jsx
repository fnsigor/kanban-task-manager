import './style/index.scss'
import { useEffect, useState, useRef } from "react"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { useAuthentication } from "./hooks/useAuthentication"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AddBoard from './component popovers/AddBoard/AddBoard'
import { db } from "./firebase config/database";
import { collection, query, orderBy, onSnapshot, where, getDocs } from 'firebase/firestore'

function Root() {

  const [user, setUser] = useState()

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
  }, [])




  return (

    <AuthProvider value={{ user }}>

      <div id="app">
        <Sidebar addBoardPopup={addBoardPopup} userid={user?.uid} />
        <div>
          <Navbar />
          <Outlet />
        </div>

        <AddBoard ref={addBoardPopup} />

      </div>

    </AuthProvider>
  )
}

export default Root
