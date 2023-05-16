import { useContext, useLayoutEffect, useState } from "react"
import Content from "./components/Content/Content"
import Navbar from "./components/Navbar/Navbar"

import { UserContext } from "./context/UserContext"
import './style/index.scss'
import Sidebar from "./components/Sidebar/Sidebar"
import { CurrentBoardContext } from "./context/CurrentBoardContext"

function App() {

  const [user, setUser] = useState({
    boards: [
      {
        name: 'primeiro board',
        columns: [
          {
            name: 'To do',
            tasks: [
              {
                name: 'Criar app',
                description:'criar um app mto foda',
                completed:false,
                subtasks: [
                  {
                    name: 'definir layout',
                    description: 'construção de layout no figma',
                    completed:false,
                  },
                  {
                    name: 'outra subtask',
                    description: 'construção de layout no figma',
                    completed:true,
                  },
                ]
              },
              {
                name: 'Tarefa pra finalizr',
                description:'teste tarefa finalizar description',
                completed:false,
                subtasks: [
                  {
                    name: 'teste',
                    description: '',
                    completed:false,
                  },
                ]
              },
            ]
          },
          {
            name: 'Doing',
            tasks: [
              {
                name: 'Definir estrutura dos dados',
                subtasks: []
              },
              {
                name: 'fazneod tarefa x',
                subtasks: [
                  {
                    name: 'teste',
                    description: '',
                    completed:false,
                  },
                  {
                    name: 'teste',
                    description: '',
                    completed:false,
                  },
                  {
                    name: 'teste',
                    description: '',
                    completed:false,
                  },
                  {
                    name: 'teste',
                    description: '',
                    completed:false,
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        name: 'compras',
        columns: [
          {
            name: 'frutas',
            tasks: [
              {
                name: 'maça',
                subtasks: [
                  {
                    name: 'definir layout'
                  },
                ]
              },
              {
                name: 'banana',
                subtasks: [
                
                ]
              },
              {
                name: 'pera',
                subtasks: [
                
                ]
              },
            ]
          },
          {
            name: 'carnes',
            tasks: [
              {
                name: 'carne moida',
                subtasks: []
              },
              {
                name: 'picanha',
                subtasks: []
              },
            ]
          },
          {
            name: 'verduras',
            tasks: [
              {
                name: 'beterraba',
                subtasks: []
              },
              {
                name: 'cenoura',
                subtasks: []
              },
            ]
          },
        ]
      },
    ]
  })

  const [currentBoard, setCurrentBoard] = useState(user.boards[0])



  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CurrentBoardContext.Provider value={{currentBoard, setCurrentBoard}}>
        <div id="app">
          <Sidebar />
          <div>
            <Navbar />
            <Content />
          </div>
        </div>
      </CurrentBoardContext.Provider>
    </UserContext.Provider>
  )
}

export default App
