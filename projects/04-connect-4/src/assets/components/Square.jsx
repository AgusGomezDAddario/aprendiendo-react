export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : '' }`
  
    const handleClick = () => {
      updateBoard(index) //Se llama a la funcion que actualiza el tablero
    } 
  
    return ( 
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
} //Componente que se va a reutilizar para mostrar cada una de las posiciones del tablero