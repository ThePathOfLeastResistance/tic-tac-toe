import { useState } from "react";

function Square({value, onSquareClick})  {
  return <button className="square" onClick = {onSquareClick}>{value}</button>
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setisXNext] = useState(true);

  let status;

  const winner = calculateWinner(squares)
  if (winner){
    status = "The Winner is " + winner
  } else {
    status = "Next player: " + (isXNext ? "X" : "O")
  }
  function handleClick(i){
    const squareList = squares.slice()
    if (squareList[i-1] || winner){
      return
    }
    if(isXNext){
      squareList[i-1] = "X"
    }
    else{
      squareList[i-1] = "O"
    }
    setisXNext(!isXNext)
    setSquares(squareList)
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} onSquareClick={() => {handleClick(1)}}/>
        <Square value = {squares[1]} onSquareClick={() => {handleClick(2)}}/>
        <Square value = {squares[2]} onSquareClick={() => {handleClick(3)}}/>
      </div>
      <div className="board-row">
        <Square value = {squares[3]} onSquareClick={() => {handleClick(4)}}/>
        <Square value = {squares[4]} onSquareClick={() => {handleClick(5)}}/>
        <Square value = {squares[5]} onSquareClick={() => {handleClick(6)}}/>
      </div>
      <div className="board-row">
        <Square value = {squares[6]} onSquareClick={() => {handleClick(7)}}/>
        <Square value = {squares[7]} onSquareClick={() => {handleClick(8)}}/>
        <Square value = {squares[8]} onSquareClick={() => {handleClick(9)}}/>
      </div>
    </div>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}