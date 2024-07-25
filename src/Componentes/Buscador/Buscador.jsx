import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './buscador.css'
import BuscadorCard from '../BuscadorCard/BuscadorCard';
import Loading from '../Loading/Loading';
import characterImg from '../../Recursos/Img/Characters.webp'
import comicsImg from '../../Recursos/Img/Comics.webp'
import eventsImg from '../../Recursos/Img/Events.png'


function Buscador() {
  const [comics, setComics] = useState([])
  const [name, setName] = useState('')
  const [criterio, setCriterio] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [selectorActivo, setSelectorActivo] = useState(null)
  const [tipo, setTipo] = useState('')
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(3)
  const [loading, setLoading] = useState(false)


  const getdata = (newPage) => {
    const url =`https://gateway.marvel.com/v1/public/${criterio}${name}&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=${limit}&offset=${newPage * limit}`
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        setComics(res.data.data.results)
        const totalResults = res.data.data.total
        setTotalPages(Math.ceil(totalResults / limit))
        setPage(newPage)
        setError(true)
        }
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getdata(page)
  }, [limit])// eslint-disable-line

  const nextPage = () => {
    if (page + 1 < totalPages) {
      getdata(page + 1)
    }
    setLoading(true)
    const buscadorElement = document.getElementById('buscador')
    if (buscadorElement) {
      buscadorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prevPage = () => {
    if (page > 0) {
      getdata(page - 1)
    }
    setLoading(true)
    const buscadorElement = document.getElementById('buscador')
    if (buscadorElement) {
      buscadorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const setcriterio = (criterio, index, tipos) => {
    setSelectorActivo(index)
    setCriterio(criterio)
    setTipo(tipos)
  };

  const handleLimit=(e)=>{
    setLimit(e.target.value)
    setPage(0)
    setLoading(true)
  }

  return (
    <div className='container'>
      <div>
        <h2 className='selector-title mb-3 mb-md-5'>CHOOSE ONE</h2>
        <div className='selector-contenedor'>
          <div className={`selector ${selectorActivo === 0 ? 'selector-active' : ''}`} onClick={() => setcriterio('characters?nameStartsWith=', 0, 'characters')}>
            <img src={characterImg} className='selector-imagen' alt="" />
            <p className='selector-title'>CHA<br/>RAC<br/>TERS</p>
          </div>
          <div className={`selector ${selectorActivo === 1 ? 'selector-active' : ''}`} onClick={() => setcriterio('comics?titleStartsWith=', 1, 'comics')}>
            <img src={comicsImg} className='selector-imagen' alt="" />
            <p className='selector-title'>CO<br/>MI<br/>CS</p>
          </div>
          <div className={`selector ${selectorActivo === 2 ? 'selector-active' : ''}`} onClick={() => setcriterio('events?nameStartsWith=', 2, 'events')}>
            <img src={eventsImg} className='selector-imagen' alt="" />
            <p className='selector-title'>EV<br/>EN<br/>TS</p>
          </div>
        </div>
        <form className='buscador' id='buscador' onSubmit={(e) => {e.preventDefault(); setLoading(true); getdata(0)}}>
          <input className='buscador-input' type="text" placeholder='Name or title' onChange={handleChange} value={name} required/>
          <button className='buscador-boton' disabled={criterio.length===0 || loading} type='submit'>Buscar</button>
        </form>
      </div>
        <div className='card-contenedor'>
          {loading ? 
            (
              <Loading/>
            ) 
            : 
            (
            criterio.length > 0 && error && comics.length === 0? (
              <div className='text-center'>
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/47f55915057131.5628c778bf082.png" alt="Error" className='w-50' />
                <p className='text-white fw-bold'>No se encontraron resultados</p>
              </div>
            ) : (
              <div>
                <div className='buscador-card-contenedor' >       
                  {comics.map(comic => (
                    <BuscadorCard id={comic.id} key={comic.id} thumbnail={comic.thumbnail} title={comic.title} name={comic.name} tipo={tipo}/>
                  ))}
                </div>
                {comics.length > 0 && (
                <div className='text-center my-3'>
                  <div className='buscador-paginacion'>
                    <button className='buscador-paginacion-boton' onClick={prevPage} disabled={page === 0}>Previous Page</button>
                    <p className='m-0 mx-3'>{page + 1} de {totalPages}</p>
                    <button className='buscador-paginacion-boton' onClick={nextPage} disabled={page === totalPages - 1}>Next Page</button>
                  </div>
                  <label htmlFor="paginas" className='fw-bold text-white'>Show:</label>
                  <select name="paginas" id="paginas" value={limit} onChange={handleLimit} className='buscador-paginacion-limite'>
                    <option value={3}>3</option>
                    <option value={9}>9</option>
                    <option value={15}>15</option>
                    <option value={21}>21</option>
                    <option value={30}>30</option>
                  </select>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Buscador