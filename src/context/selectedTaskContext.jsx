import { createContext, useEffect, useState } from "react";

export const SelectedTaskContext = createContext();

export const SelectedTaskProvider = ({editTaskPopup ,children}) => {

    const [selectedTaskData, setSelectedTaskData] = useState(null)

    return (
        <SelectedTaskContext.Provider value={{selectedTaskData, setSelectedTaskData}}>
            {children}
        </SelectedTaskContext.Provider>
    )

}



