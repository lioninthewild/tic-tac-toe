import { useState } from "react";
import { Square } from "./Square";

export default function Board() {
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function updateSquare(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setxIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => updateSquare(0)} />
        <Square value={squares[1]} onSquareClick={() => updateSquare(1)} />
        <Square value={squares[2]} onSquareClick={() => updateSquare(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => updateSquare(3)} />
        <Square value={squares[4]} onSquareClick={() => updateSquare(4)} />
        <Square value={squares[5]} onSquareClick={() => updateSquare(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => updateSquare(6)} />
        <Square value={squares[7]} onSquareClick={() => updateSquare(7)} />
        <Square value={squares[8]} onSquareClick={() => updateSquare(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
