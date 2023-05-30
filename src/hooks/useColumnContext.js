import React, { useContext } from 'react'

import { SelectedColumnContext } from '../context/selectedColumnContext'

const useColumnContext = () => {
  return useContext(SelectedColumnContext)
}

export default useColumnContext