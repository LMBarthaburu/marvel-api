import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import DetallesCard from '../DetallesCard/DetallesCard';
import Breadcump from '../Breadcumb/Breadcump';


function PersonajesDetalles() {
  const [data, setData] = useState([])
  const {id, tipo} = useParams()
  const [loading, setLoading] = useState(false)
  const [comics, setComics] = useState([])
  const [events, setEvents] = useState([])
  const [loadingCom, setLoadingCom] = useState(false)
  const [loadingEv, setLoadingEv] = useState(false)




  const getdata = () => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        setData(res.data.data.results)
        console.log(res.data.data.results)
        setLoading(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }
  const getComics = () => {
    axios.get(`https://gateway.marvel.com/v1/public/characters/${id}/comics?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=10&offset=0`)
    .then(res => {
      if (res.status === 200) {
        setComics(res.data.data.results)
        setLoadingCom(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }
  const getevent = () => {
    axios.get(`https://gateway.marvel.com/v1/public/characters/${id}/events?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=10&offset=0`)
    .then(res => {
      if (res.status === 200) {
        setEvents(res.data.data.results)
        setLoadingEv(false)
        console.log(res.data.data.results)
    }})
      .catch(error => {
        console.log(error)
      })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  useEffect(() => {
    setLoading(true)
    setLoadingCom(true)
    setLoadingEv(true)
    getdata()
    getevent()
    getComics()
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
            <h1 className='fw-bold'>{item.name}</h1>
            <div className='d-md-flex'>
              <div className='comic-detalle-img'>
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-100'/>
              </div>
              <div className='comic-detalle-texto'>
                {
                  item.description===''?
                  <p>No description available.</p>
                  :
                  <>
                    <h6 className='fw-bold'>Description:</h6>
                    <p className='m-0'>{item.description}</p>
                  </>
                }
                <div className='my-3'>
                  {item.urls.map(url =><>
                    <a key={url.type} className='m-0 text-white' href={url.url} target='_blanck'> {capitalizeFirstLetter(url.type)} </a>
                    <br />
                  </>)} 
                </div>
              </div>
            </div>
            <div className='my-3'>
              {
                loadingCom?
                <Loading/>
                :
                comics.length>0?
                <div>
                  <h3>Comics (appearances: {item.comics.available} comics)</h3>
                  <div className='detalles-card-contenedor'>
                    {
                      comics.map(comic=><DetallesCard id={comic.id} key={comic.id} thumbnail={comic.thumbnail} title={comic.title} name={comic.name} tipo={'comics'}/>
                      )
                    }
                  </div>
                </div>
                :
                <p>No Comics available.</p>
              }
            </div>
            <div  className='my-3'>
              {
                loadingEv?
                  <Loading/>
                  :                
                  events.length>0?
                  <div>
                    <h3>Events (appearances: {item.events.available} events)</h3>
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

export default PersonajesDetalles