import React, { useContext } from 'react'

import { SelectedBoardContext } from '../context/selectedBoardContext'

const useBoardContext = () => {
  return useContext(SelectedBoardContext)
}

export default useBoardContext