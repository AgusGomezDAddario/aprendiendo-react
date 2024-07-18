import './App.css'
import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 }) // Es una buena practica inicializar el estado con un valor el tipo de dato a usar

  useEffect(() => {
    console.log('effect', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event // Posicion del puntero en la pantalla
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove) // Se limpia el efecto cuando cambia el valor de la dependencia o cuando se renderiza el componente
    }

  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled]) 

  // [] -> Se ejecuta solo una vez cuando se monta el componente
  // [enabled] -> Se ejecuta cuando se monta el componente y cuando cambia el valor de la dependencia
  // Undefined -> Se ejecuta cuando se renderiza el componente

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

function App() {
  const [mounted, setMounted] = useState(true)

  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
