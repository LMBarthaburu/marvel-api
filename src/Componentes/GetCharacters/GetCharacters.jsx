import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import DetallesCard from '../DetallesCard/DetallesCard'
import axios from 'axios'

function GetCharacters() {
  const {id,tipo} = useParams()
  const [characters, setCharacters] = useState([])
  const [loadingChar, setLoadingChar] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)


  const getcharacters = () => {
    axios.get(`https://gateway.marvel.com/v1/public/${tipo}/${id}/characters?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=4&offset=${page*4}`)
    .then(res => {
      if (res.status === 200) {
        setCharacters(res.data.data.results)
        setLoadingChar(false)
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
    setLoadingChar(true)
    getcharacters()
  }, [page])// eslint-disable-line

  return (
    <div className='my-3'>
      <h3>Characters</h3>
      <div className='contenedor-get'>
        {
          loadingChar?
          <Loading/>
          :
          characters.length>0?
          <div className='detalles-card-contenedor'>
            {
              characters.map(character=><DetallesCard id={character.id} key={character.id} thumbnail={character.thumbnail} title={character.title} name={character.name} tipo={'characters'}/>)
            }
          </div>
          :
          <p>No Characters available.</p>
        }
      </div>
      {
        characters.length>0?
          <div className='buscador-paginacion mt-3 text-center'>
            <button  onClick={prevPage}disabled={page === 0} className='buscador-paginacion-boton'>Previous </button>
            <p className='m-0 mx-3'>{page + 1} de {totalPages}</p>
            <button onClick={nextPage} disabled={page === totalPages - 1} className='buscador-paginacion-boton'>Next</button>
          </div>
          :
          null
      }
    </div>
  )
}

export default GetCharacters