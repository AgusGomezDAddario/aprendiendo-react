import './Footer.css'
import { useCart } from '../hooks/useCart'
// import { useFilters } from '../hooks/useFilters'

export function Footer () {
  // const {filters} = useFilters() Esto en el caso de que quisiera mostrar los filtros actuales
  const {cart} = useCart()

  return (
    <footer className='footer'>
    
        {/* <h3>Filtros activados</h3>
        <ul>
          <li>Categoría: {filters.category}</li>
          <li>Precio Mínimo: {filters.minPrice}</li>
        </ul> */}

        {
          JSON.stringify(cart, null, 2)
        }
        <h4>Prueba técnica de React ⚛️</h4>
        <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  )
}