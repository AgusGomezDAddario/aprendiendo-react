import { useEffect, useState} from "react"
import confetti from "canvas-confetti"
import { Square } from "./assets/components/Square.jsx"
import { TURNS, SCORES } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./assets/logic/board.js"
import { WinnerModal } from "./assets/components/WinnerModal.jsx"
import { setGameFromStorage, resetGameFromStorage } from "./assets/logic/storage/index.js"

function App() {
  // Como los state no pueden estar adentro de un if, no se revisa si existe algo ya guardado en el localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStage = window.localStorage.getItem("board")
    return boardFromStage ? JSON.parse(boardFromStage) : Array(16).fill(null)
  }) //Estado que va a contener el tablero del juego

  const [turn, setTurn] = useState(() => {
    const turnFromStage = window.localStorage.getItem("turn")
    return turnFromStage ?? TURNS.rojo
  }) //Estado que va a contener el turno del jugador

  const [winner, setWinner] = useState(null) //null es cuando no hay ganador, false es cuando hay empate

  const [scores, setScores] = useState(SCORES)

  const resetGame = () => {
    setBoard(Array(16).fill(null))
    setTurn(TURNS.rojo)
    setWinner(null)

    resetGameFromStorage()
  }

  useEffect(() => {
    console.log(scores)
    console.log(winner)
    if (winner === null) return
    else if (winner === TURNS.rojo) {
      setScores(prevScores => ({ ...prevScores, red: prevScores.red + 1 }))
    } else if (winner === TURNS.azul) {
      setScores(prevScores => ({ ...prevScores, blue: prevScores.blue + 1 }))
    }
  }, [winner])

  const updateBoard = (index) => {
    // Para evitar sobreescribir una casilla ya ocupada o cuando hay un ganador
    if (board[index] || winner) return

    // Actualizacion del tablero
    const newBoard = [...board] //Se crea una copia del tablero actual, para no modificar el estado directamente
    newBoard[index] = turn //Se actualiza la posicion del tablero con el valor del turno actual
    setBoard(newBoard) //Se actualiza el tablero con la nueva posicion

    // Cambio de turno
    const newTurn = turn === TURNS.rojo ? TURNS.azul : TURNS.rojo
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
      <h1>Connect Four</h1>
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
        <Square isSelected={turn === TURNS.rojo}>
          {TURNS.rojo}
        </Square>

        <Square isSelected={turn === TURNS.azul}>
          {TURNS.azul}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

      <section>
        <h2>Ganadores</h2>
        <h4>El 🔴 ha ganado: {scores.red}</h4>
        <h4>El 🔵 ha ganado: {scores.blue}</h4>
      </section> 

    </main>
  )
}

export default App
