import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './comicsDetalles.css'
import Loading from '../Loading/Loading';
import DetallesCard from '../DetallesCard/DetallesCard';
import Breadcump from '../Breadcumb/Breadcump';


function ComicsDetalles() {
  const [data, setData] = useState([])
  const {id,tipo} = useParams()
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const [events, setEvents] = useState([])
  const [loadingChar, setLoadingChar] = useState(false)
  const [loadingEv, setLoadingEv] = useState(false)




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
  const getcharacters = () => {
    axios.get(`http://gateway.marvel.com/v1/public/comics/${id}/characters?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`)
    .then(res => {
      if (res.status === 200) {
        setCharacters(res.data.data.results)
        setLoadingChar(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }
  const getevent = () => {
    axios.get(`http://gateway.marvel.com/v1/public/comics/${id}/events?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`)
    .then(res => {
      if (res.status === 200) {
        setEvents(res.data.data.results)
        setLoadingEv(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }


  useEffect(() => {
    setLoading(true)
    setLoadingChar(true)
    setLoadingEv(true)
    getdata()
    getevent()
    getcharacters()
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
            <div className='my-3'>
              {
                loadingChar?
                <Loading/>
                :
                characters.length>0?
                <div>
                  <h3>Characters</h3>
                  <div className='detalles-card-contenedor'>
                    {
                      characters.map(character=><DetallesCard id={character.id} key={character.id} thumbnail={character.thumbnail} title={character.title} name={character.name} tipo={'characters'}/>
                      )
                    }
                  </div>
                </div>
                :
                <p>No Characters available.</p>
              }
            </div>
            <div  className='my-3'>
              {
                loadingEv?
                  <Loading/>
                  :                
                  events.length>0?
                  <div>
                    <h3>Events</h3>
                    <div className='detalles-card-contenedor'>
                      {
                        events.map(event=><DetallesCard id={event.id} key={event.id} thumbnail={event.thumbnail} title={event.title} name={event.name} tipo={'events'}/>)
                      }
                    </div>
                  </div>
                  :
                  <p>No Events available.</p>
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ComicsDetalles