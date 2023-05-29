import React, { useContext } from 'react'

import { EditTaskPopupHTML } from '../context/editTaskHTMLContext'

const useEditTaskHTML = () => {
  return useContext(EditTaskPopupHTML)
}

export default useEditTaskHTML