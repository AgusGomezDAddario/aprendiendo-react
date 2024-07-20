import { Square } from "../components/Square.jsx"

export function WinnerModal ({winner, resetGame}) {
    if (winner === null) return null

    const winnerText = winner === false
        ? 'Empate'
        : `Ganador: ${winner}`

    return (
        <section className = "winner" >
        <div className="text">
            <h2>
                {winnerText}
            </h2>


            {winner === false
                ? <div></div>
                : <header className="win"><Square>{winner}</Square></header>
            }

            <footer>
                <button onClick={resetGame}>
                    Empezar de nuevo
                </button>
            </footer>

        </div>
        </section >
    )
}

