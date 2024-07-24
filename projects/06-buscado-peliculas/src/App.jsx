import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movie.jsx'
import { useRef } from 'react' // Permite almacenar valores que persisten entre renderizados

function App() {

  const {movies: mappedMovies} = useMovies()
  const inputRef = useRef() // Almacena el valor del input

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = inputRef.current.value
    console.log(value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input ref={inputRef} placeholder='Avengers, Star Wars, The Matrix ...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies}/>
      </main>
    </div>
  )
}

export default App
