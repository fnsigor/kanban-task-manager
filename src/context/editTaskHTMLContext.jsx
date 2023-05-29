import { createContext, useEffect, useState } from "react";

export const EditTaskPopupHTML = createContext();

export const EditTaskPopupHTMLProvider = ({editTaskPopup ,children}) => {

    const [editTaskElement, setEditTaskElement] = useState(editTaskPopup)

    return (
        <EditTaskPopupHTML.Provider value={{editTaskElement, setEditTaskElement}}>
            {children}
        </EditTaskPopupHTML.Provider>
    )

}



