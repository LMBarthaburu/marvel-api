import React from 'react'
import 'animate.css'


function BuscadorCard({id, thumbnail, title,name, tipo}) {
  return (
    <a  href={`/${tipo}/${id}`} target='_blank' rel='noreferrer' className='animate__animated animate__fadeIn'>
      <div className="buscador-card">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className='buscador-card-imagen'/>
        <div className="buscador-card-body">
          <h2 className='buscador-card-title'>{title}{name}</h2>
            <button className='buscador-card-button'>Ver más</button>
        </div>
      </div>
    </a>

  )
}

export default BuscadorCard