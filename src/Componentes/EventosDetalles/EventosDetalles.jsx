import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import DetallesCard from '../DetallesCard/DetallesCard';
import Breadcump from '../Breadcumb/Breadcump';


function EventosDetalles() {
  const [data, setData] = useState([])
  const {id,tipo} = useParams()
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const [comics, setComics] = useState([])
  const [loadingChar, setLoadingChar] = useState(false)
  const [loadingCom, setloadingCom] = useState(false)




  const getdata = () => {
    const url = `https://gateway.marvel.com/v1/public/events/${id}?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a`
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        setData(res.data.data.results)
        setLoading(false)
        console.log(res.data.data.results)
    }})
      .catch(error => {
        console.log(error)
      })
  }
  const getcharacters = () => {
    axios.get(`http://gateway.marvel.com/v1/public/events/${id}/characters?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=10&offset=0`)
    .then(res => {
      if (res.status === 200) {
        setCharacters(res.data.data.results)
        setLoadingChar(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }
  const getComics = () => {
    axios.get(`http://gateway.marvel.com/v1/public/events/${id}/comics?&ts=1&apikey=f86c189361b957045fc522a14ad03e35&hash=100259c8708cdbc9495814193c19152a&limit=10&offset=0`)
    .then(res => {
      if (res.status === 200) {
        setComics(res.data.data.results)
        setloadingCom(false)
    }})
      .catch(error => {
        console.log(error)
      })
  }


  useEffect(() => {
    setLoading(true)
    setLoadingChar(true)
    setloadingCom(true)
    getdata()
    getComics()
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
                <p className='m-0'><span className='fw-bold'> Date: </span>From: {item.start} to: {item.end}</p>
                <p className='m-0'><span className='fw-bold'> Previous event: </span>{item.previous.name}</p>
                <p className='m-0'><span className='fw-bold'> Next event: </span>{item.next.name}</p>
                {/* <div className='my-3'>
                  <p className='fw-bold m-0'>Creators:</p>
                  <div>
                    {item.creators.items.map(creator => <p key={creator.name} className='m-0'>{creator.name} - {creator.role}</p>)}
                  </div>
                </div> */}
              </div>
            </div>
            <div className='my-3'>
              {
                loadingChar?
                <Loading/>
                :
                characters.length>0?
                <div>
                  <h3>Characters ({item.characters.available} characters)</h3>
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
                loadingCom?
                  <Loading/>
                  :                
                  comics.length>0?
                  <div>
                    <h3>Comics ({item.comics.available} comics)</h3>
                    <div className='detalles-card-contenedor'>
                      {
                        comics.map(comic=><DetallesCard id={comic.id} key={comic.id} thumbnail={comic.thumbnail} title={comic.title} name={comic.name} tipo={'comics'}/>)
                      }
                    </div>
                  </div>
                  :
                  <p>No Comics available.</p>
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default EventosDetalles