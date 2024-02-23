import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='fixed w-full h-full bg-black bg-opacity-80'>
        <ClipLoader color='lightblue' size={40} />
    </div>
  )
}

export default Loading
