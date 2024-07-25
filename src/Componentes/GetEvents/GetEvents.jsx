import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import DetallesCard from '../DetallesCard/DetallesCard'
import axios from 'axios'


function GetEvents() {
  const {id, tipo} = useParams()
  const [events, setEvents] = useState([])
  const [loadingEv, setLoadingEv] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)



  const getevent = () => {
    axios.get(`https://gateway.marvel.com/v1/public/${tipo}/${id}/events?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=4&offset=${page*4}`)
    .then(res => {
      if (res.status === 200) {
        setEvents(res.data.data.results)
        setLoadingEv(false)
        const totalResults = res.data.data.total
        setTotalPages(Math.ceil(totalResults / 4))
    }})
      .catch(error => {
        console.log(error)
      })
  }

  const nextPage =()=>{
    if (page + 1 < totalPages) {
      setPage(page + 1)
    }
  }
  const prevPage =()=>{
    if (page > 0) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    setLoadingEv(true)
    getevent()
  }, [page])// eslint-disable-line

  
  return (
    <div className='my-3'>
      <h3 className='mt-3'>Events</h3>
      <div className='contenedor-get'>
        {
        loadingEv?
          <Loading/>
          :                
          events.length>0?
          <div className='detalles-card-contenedor'>
            {
              events.map(event=><DetallesCard id={event.id} key={event.id} thumbnail={event.thumbnail} title={event.title} name={event.name} tipo={'events'}/>)
            }
          </div>
          :
          <p>No Events available.</p>
        }
      </div>
      {
        events.length>0?
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <button  onClick={prevPage}disabled={page === 0} className='buscador-paginacion-boton'>Previous Events </button>
            <p className='m-0 mx-3'>{page + 1} de {totalPages}</p>
            <button onClick={nextPage} disabled={page === totalPages - 1} className='buscador-paginacion-boton'>Next Events</button>
          </div>
          :
          null
 
      }
    </div>
  )
}

export default GetEvents