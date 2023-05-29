import { createContext, useEffect, useState } from "react";

export const SelectedBoardContext = createContext();

export const SelectedBoardProvider = ({children}) => {

    const [selectedBoard, setSelectedBoard] = useState(null)

    return (
        <SelectedBoardContext.Provider value={{selectedBoard, setSelectedBoard}}>
            {children}
        </SelectedBoardContext.Provider>
    )

}



