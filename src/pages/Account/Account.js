import React, { useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState'

const account = () => {
  const [state, dispatch] = useContext(GlobalContext)
  console.log(state, 'acc')
  return (
    <div>
      <p>Name:</p>
    </div>
  )
}

export default account
