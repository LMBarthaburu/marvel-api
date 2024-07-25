import React from 'react'
import Deadpool from '../Recursos/Img/404.webp'
import DeadpoolMov from '../Recursos/Img/404.png'
import 'animate.css'


function Error() {
  return (
    <div className='error'>
      <h2 className='error-text'>ERROR 404</h2>
      <img src={Deadpool} alt="Error Page" className='error-img animate__animated animate__fadeIn animate__delay-1s'/>
      <img src={DeadpoolMov} alt="Error Page" className='error-img-mov animate__animated animate__fadeIn animate__delay-1s'/>
    </div>
  )
}

export default Error