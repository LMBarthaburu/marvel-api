import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './comicsDetalles.css'
import Loading from '../Loading/Loading';
import Breadcump from '../Breadcumb/Breadcump';
import GetEvents from '../GetEvents/GetEvents';
import GetCharacters from '../GetCharacters/GetCharacters';


function ComicsDetalles() {
  const [data, setData] = useState([])
  const {id,tipo} = useParams()
  const [loading, setLoading] = useState(false)

  const getdata = () => {
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`
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
                <p className='m-0'><span className='fw-bold'> Serie: </span> {item.series.name}</p>
                <div className='my-3'>
                  <p className='fw-bold m-0'>Creators:</p>
                  <div>
                    {item.creators.items.map(creator => <p key={creator.name} className='m-0'>{creator.name} - {creator.role}</p>)}
                  </div>
                </div>
                <p className='m-0'><span className='fw-bold'>Format: </span> {item.format}</p>
                <p className='m-0'><span className='fw-bold'>Page count: </span> {item.pageCount}</p>
                {item.creators && item.dates.map(date=><p className='m-0' key={date.type}><span className='fw-bold'>{date.type}: </span> {date.date}</p>)}
              </div>
            </div>
            <GetCharacters/>
            <GetEvents/>
          </div>
        )
      }
    </div>
  )
}

export default ComicsDetalles