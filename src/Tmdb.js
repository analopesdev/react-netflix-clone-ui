const API_KEY = 'e89b8af00bc1480cb73e3c6e3d4b8ec7'
const API_BASE = 'https://api.themoviedb.org/3'
const API_LANGUAGE= 'language=pt-BR&api_key='

/* 
- Originais da netflix,
- Recomendados (trending),
- Em alta (top rated)
- Ação
- Comédia
- Romance
- Documentarios
*/

// Buscando dados da API
const basicFetch = async (endpoint) =>{
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json();
  return json
}

export default{
  getHomeList: async() =>{
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomentados para Vocês',
        items: await basicFetch(`/trending/all/week?&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'top rated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items:await basicFetch(`/discover/movie?with_genres=27&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&${API_LANGUAGE}${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentario',
        items: await basicFetch(`/discover/movie?with_genres=99&${API_LANGUAGE}${API_KEY}`)
      }
    ]
  },

  // Pegar as informações de um filmes especifico
  getMovieInfo: async(movieId, type) =>{
    let info ={};

    if(movieId){
      switch(type){
        case 'movie': 
          info = await basicFetch(`/movie/${movieId}?${API_LANGUAGE}${API_KEY}`)
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?${API_LANGUAGE}${API_KEY}`)
        break;
        default:
          info = null;
          break;
      }
    }
    return info;
  }
}