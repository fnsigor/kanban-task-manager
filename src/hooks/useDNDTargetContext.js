import React, { useContext } from 'react'

import { DNDTargetContext } from '../context/DNDTargetContext'

export const useDNDTargetContext = () => {
  return useContext(DNDTargetContext)
}