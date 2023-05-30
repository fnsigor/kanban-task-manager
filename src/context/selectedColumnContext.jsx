import { createContext, useEffect, useState } from "react";

export const SelectedColumnContext = createContext();

export const SelectedColumnProvider = ({children}) => {

    const [selectedColumn, setSelectedColumn] = useState(null)

    return (
        <SelectedColumnContext.Provider value={{selectedColumn, setSelectedColumn}}>
            {children}
        </SelectedColumnContext.Provider>
    )

}



