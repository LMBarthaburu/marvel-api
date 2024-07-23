import React from 'react'

function Breadcump({tipo}) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/" className=' text-white'>Home</a></li>
        <li className="breadcrumb-item active  text-white" aria-current="page">{tipo}</li>
      </ol>
    </nav>
  )
}

export default Breadcump