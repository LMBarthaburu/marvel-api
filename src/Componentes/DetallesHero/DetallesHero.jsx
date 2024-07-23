import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './detallesHero.css'
import characterImg from '../../Recursos/Img/Characters.webp'
import comicsImg from '../../Recursos/Img/Comics.webp'
import eventsImg from '../../Recursos/Img/Events.png'


function DetallesHero() {
  const {tipo} = useParams()
  const [backImg, setbackImg] = useState('')
  const [title, setTitle] = useState('')

  
  const setImg=()=>{
    setTitle(tipo.toUpperCase())
    switch (tipo) {
      case 'comics':
        return setbackImg(comicsImg)
      case 'characters':
        return setbackImg(characterImg)
      case 'events':
        return setbackImg(eventsImg)
      default:
        return null
    }
  }

  useEffect(() => {
    setImg()
  }, [ ])// eslint-disable-line

  

  return (
    <div className='detalles-hero'> 
      <img src={backImg} alt="Hero" className='detalles-hero-img' />
      <h1 className='detalles-hero-title'>{title}</h1>    
    </div>
  )
}

export default DetallesHero