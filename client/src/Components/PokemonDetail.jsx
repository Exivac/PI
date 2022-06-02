import '../ComponentsStyles/PokemonDetail.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { foundPokemonReset, getSinglePokemon } from '../redux/pokemons'

export default function PokemonDetail(){
    const {name} = useParams()
    const dispatch = useDispatch()
    
    const {foundPokemon, status} = useSelector(state => state.pokemons)

    useEffect(() => {
      console.log('mount')
      dispatch(getSinglePokemon(name))
      
      return () => {
        dispatch(foundPokemonReset())
        console.log('demount')
      }
    }, [ name, dispatch ])
    
    const Tipos = foundPokemon.tipos ? foundPokemon.tipos.map(el=> el.slice(0,1).toUpperCase() + el.slice(1)).join(', ') : <></>

    const PokeDetail =
    <>
      <div className='PokeInfo'>
      <h1>{foundPokemon.nombre? foundPokemon.nombre.slice(0,1).toUpperCase() + foundPokemon.nombre.slice(1):<></>}#{foundPokemon.ID}
      </h1>
      <img className='PokeImg'
      src={foundPokemon.img}
      alt="https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png"/>
      <br />
      <h4>Altura: {foundPokemon.altura} <br /> Peso: {foundPokemon.peso}</h4>
      <h4>Tipos: {Tipos}</h4>
      </div>

      <div className='StatSheet'>
        <ul>
          <li>Vida: {foundPokemon.vida}</li>
          <li>Ataque: {foundPokemon.ataque}</li>
          <li>Defensa: {foundPokemon.defensa}</li>
          <li>Velocidad: {foundPokemon.velocidad}</li>
        </ul>
      </div>
    </>

    const Fail = <h1>Pokemon no encontrado</h1>
    

    return (
      <div className='PokemonDetail'>
        { status === 'loading' ? <h1>Loading...</h1> : 
          status === 'success' ? foundPokemon.status === 404 ? Fail :
          PokeDetail
          : <h1>Uncaught Exception</h1>
        }
        
      </div>
    )
  }