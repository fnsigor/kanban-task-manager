import { createContext, useEffect, useState } from "react";

export const DOMElementsContext = createContext();

export const DOMElementsProvider = ({addTaskPopup, children}) => {

    const [DOMElements, SetDOMElements] = useState(addTaskPopup)

    return (
        <DOMElementsContext.Provider value={{DOMElements, SetDOMElements}}>
            {children}
        </DOMElementsContext.Provider>
    )

}



