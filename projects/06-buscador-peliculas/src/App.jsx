import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies.jsx'
import { useCallback, useEffect, useRef, useState } from 'react' // Permite almacenar valores que persisten entre renderizados
import debounce from 'just-debounce-it'

function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null) 
  const isFirstInput = useRef(true) // Saber si se usa el input por primera vez

  useEffect(() => {
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if(search === ''){
      setError('Debes ingresar un valor')
      return
    }
    setError(null)
  }, [search])

  return {search, updateSearch, error}
}

function App () {
  const [sort, setSort] = useState(false) 
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => 
    getMovies({ search }
    ), 300)
    , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault() // Para evitar el comportamiento por defecto del formulario
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix ...' />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red', display: 'flex', flexDirection: 'column', alignItems:'center'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}

export default App
