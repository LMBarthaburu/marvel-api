import React from 'react'
import './hero.css'
import HeroImg from '../../Recursos/Img/The_Marvel_Universe.webp'
import 'animate.css'

function Hero() {
  return (
    <div className='hero'>
      <div className='hero-fondo'></div>
      <img src={HeroImg} alt="" className='hero-img animate__animated animate__fadeIn animate__delay-1s' />
    </div>
  )
}

export default Hero