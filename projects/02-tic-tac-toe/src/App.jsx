import { useState} from "react"
import confetti from "canvas-confetti"
import { Square } from "./assets/components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./assets/logic/board.js"
import { WinnerModal } from "./assets/components/WinnerModal.jsx"
import { setGameFromStorage, resetGameFromStorage } from "./assets/logic/storage/index.js"

function App() {
  // Como los state no pueden estar adentro de un if, no se revisa si existe algo ya guardado en el localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStage = window.localStorage.getItem("board")
    return boardFromStage ? JSON.parse(boardFromStage) : Array(9).fill(null)
  }) //Estado que va a contener el tablero del juego

  const [turn, setTurn] = useState(() => {
    const turnFromStage = window.localStorage.getItem("turn")
    return turnFromStage ?? TURNS.X
  }) //Estado que va a contener el turno del jugador

  const [winner, setWinner] = useState(null) //null es cuando no hay ganador, false es cuando hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameFromStorage()
  }

  const updateBoard = (index) => {
    // Para evitar sobreescribir una casilla ya ocupada o cuando hay un ganador
    if (board[index] || winner) return

    // Actualizacion del tablero
    const newBoard = [...board] //Se crea una copia del tablero actual, para no modificar el estado directamente
    newBoard[index] = turn //Se actualiza la posicion del tablero con el valor del turno actual
    setBoard(newBoard) //Se actualiza el tablero con la nueva posicion

    // Cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) //Se cambia el turno actual por el nuevo turno

    // Persistencia de la partida
    setGameFromStorage({ board: newBoard, turn: newTurn })

    // Revision de ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar otra vez</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          }
          )
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
