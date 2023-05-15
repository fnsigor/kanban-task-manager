
import { useContext, useLayoutEffect, useState } from "react"
import Content from "./components/Content/Content"
import Navbar from "./components/Navbar/Navbar"

import { UserContext } from "./context/UserContext"
import './style/index.scss'
import Sidebar from "./components/Sidebar/Sidebar"

function App() {

  const [user, setUser] = useState({
    boards: [
      {
        boardName: 'primeiro board',
        columns: [
          {
            columnName: 'To do',
            tasks: [
              {
                taskName: 'Criar app',
                subTasks: [
                  {
                    subTaskName: 'definir layout'
                  },
                ]
              },
            ]
          },
          {
            columnName: 'Doing',
            tasks: [
              {
                taskName: 'Definir estrutura dos dados',
                subTasks: []
              },
              {
                taskName: 'fazneod tarefa x',
                subTasks: []
              },
            ]
          },
        ]
      },
      {
        boardName: 'segundo board',
        columns: [
          {
            columnName: 'finanças',
            tasks: [
              {
                taskName: 'Criar app',
                subTasks: [
                  {
                    subTaskName: 'definir layout'
                  },
                ]
              },
            ]
          },
          {
            columnName: 'comercial',
            tasks: [
              {
                taskName: 'Definir estrutura dos dados',
                subTasks: []
              },
              {
                taskName: 'fazneod tarefa x',
                subTasks: []
              },
            ]
          },
          {
            columnName: 'marketing',
            tasks: [
              {
                taskName: 'Definir estrutura dos dados',
                subTasks: []
              },
              {
                taskName: 'fazneod tarefa x',
                subTasks: []
              },
            ]
          },
        ]
      },
    ]
  })




  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div id="app">
        <Sidebar />
        <div>
          <Navbar />
          <Content />
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
