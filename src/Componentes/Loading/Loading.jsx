import React from 'react'

function Loading() {
  return (
    <div className='w-100 d-flex justify-content-center my-5'>
      <div className="spinner-grow mx-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow mx-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow mx-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading