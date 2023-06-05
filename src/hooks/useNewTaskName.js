import React, { useContext } from 'react'

import { NewTaskNameContext } from '../context/newTaskName'

export const useNewTaskName = () => {
  return useContext(NewTaskNameContext)
}