import React from 'react'
import { useHistory } from 'react-router-dom'

const goBack = () => {
  let history = useHistory()

  return (
    <div className="text-center mt-4 text-gray-500">
      <button onClick={() => history.goBack()}>Go back</button>
    </div>
  )
}

export default goBack
