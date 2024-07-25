import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import Breadcump from '../Breadcumb/Breadcump';
import GetCharacters from '../GetCharacters/GetCharacters';
import GetComics from '../GetComics/GetComics';


function EventosDetalles() {
  const [data, setData] = useState([])
  const {id,tipo} = useParams()
  const [loading, setLoading] = useState(false)

  const getdata = () => {
    const url = `https://gateway.marvel.com/v1/public/events/${id}?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        setData(res.data.data.results)
        setLoading(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    setLoading(true)
    getdata()
  }, [])// eslint-disable-line

  return (
    <div className='container my-3'>
      <Breadcump tipo={tipo}/>
      {
        loading?
        <Loading/>
        :
        data.map(item=>
          <div className='' key={item.id}>
            <h1 className='fw-bold'>{item.title}</h1>
            <div className='d-md-flex'>
              <div className='comic-detalle-img'>
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-100'/>
              </div>
              <div className='comic-detalle-texto'>
                <h6 className='fw-bold'>Description:</h6>
                <p className='m-0'>{item.description}</p>
                <p className='m-0'><span className='fw-bold'> Date: </span>From: {item.start} to: {item.end}</p>
                <p className='m-0'><span className='fw-bold'> Previous event: </span>{item.previous.name}</p>
                <p className='m-0'><span className='fw-bold'> Next event: </span>{item.next.name}</p>
              </div>
            </div>
            <GetCharacters/>
            <GetComics/>
          </div>
        )
      }
    </div>
  )
}

export default EventosDetalles