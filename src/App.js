import React, {useEffect, useState} from 'react'
import Tmdb from './Tmdb'
import './App.css'

// Componentes 

//Header
import FeaturedMovie from './components/FeaturedMovie.js'

//List
import MovieRow from './components/MovieRow'

export default  () =>{

  // Salvando lista para ser exibida
  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)



  useEffect(() =>{
    const loadAll = async () =>{
      
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      // Pegando o filme em destaque
      let originals = list.filter(i=> i.slug === 'originals')
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[ramdomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
      
    }
    loadAll()
  }, [])

  return  (
    <div className="page">
      {featureData &&
        <FeaturedMovie item={featureData}/>
      }
      
      <section className="lists">
        {movieList.map((item, key)=>(
         <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      </div> 
  )
}