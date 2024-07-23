import React from 'react'
import 'animate.css'
import './detallesCard.css'


function DetallesCard({id, thumbnail, title,name, tipo}) {
  return (
    <a  href={`/${tipo}/${id}`} target='_blank' rel='noreferrer' className='animate__animated animate__fadeIn'>
      <div className="detalle-card">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} className='detalle-card-imagen'/>
        <div className="detalle-card-body">
          <h4 className='detalle-card-title'>{title}{name}</h4>
            <button className='detalle-card-button'>Ver más</button>
        </div>
      </div>
    </a>

  )
}

export default DetallesCard