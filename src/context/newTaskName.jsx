import { createContext, useState } from "react";

export const NewTaskNameContext = createContext();

export const NewTaskNameProvider = ({children}) => {

    const [newTaskName, setNewTaskName] = useState("")

    return (
        <NewTaskNameContext.Provider value={{newTaskName, setNewTaskName}}>
            {children}
        </NewTaskNameContext.Provider>
    )
}



