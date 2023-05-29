import React, { useContext } from 'react'
import { SelectedTaskContext } from '../context/selectedTaskContext'

const useSelectedTaskContext = () => {
  return useContext(SelectedTaskContext)
}

export default useSelectedTaskContext