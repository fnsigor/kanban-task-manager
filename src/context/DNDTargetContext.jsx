import { createContext, useEffect, useState } from "react";
import React from 'react'

export const DNDTargetContext = createContext();

export const DNDTargetProvider = ({children}) => {

    const [isTaskDNDTarget, setIsTaskDNDTarget] = useState(false)

    return (
        <DNDTargetContext.Provider value={{isTaskDNDTarget, setIsTaskDNDTarget}}>
            {children}
        </DNDTargetContext.Provider>
    )

}
