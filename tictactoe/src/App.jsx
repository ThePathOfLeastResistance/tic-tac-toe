import { useState } from "react";

function Square({value, onSquareClick})  {
  return <button className="square" onClick = {onSquareClick}>{value}</button>
}

export default function Game() {
  const [isXNext, setisXNext] = useState(true);
  const [history, changeHistory] = useState([Array(9).fill(null)]);
  const [currentMove, changeCurrentMove] = useState(0);
  const currentSquares = history[currentMove]

  function jumpTo (i){
    changeCurrentMove(i)
    setisXNext(i % 2 === 0)
  }

  const moves = history.map((squares, index)=>{
    let description;
    if(index === 0){
      description = "Go to game start"
    } else {
      description = "Go to move #" + index
    }
    return (
      <li  key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  })

  function onPlay(newsquares){
    setisXNext(!isXNext)
    const nextHistory = [...history.slice(0, currentMove + 1), newsquares];
    changeHistory(nextHistory)
    changeCurrentMove(nextHistory.length - 1)
    console.log(nextHistory)
  }
  console.log(currentMove)
  console.log(currentSquares)
  console.log("to the board")
  return (
    <div className="game">
      <div className="game-board">
       <Board isXNext={isXNext} history={history} squares={currentSquares} onPlay={onPlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div >
    </div>
  )
}

function Board({isXNext,squares, onPlay}) {
 
 function handleClick(i){ 
      const nextSquare = squares.slice()  
      if (squares[i-1] || calculateWinner(squares)){
        return
      }
      if(isXNext){
        nextSquare[i-1] = "X"
      }
      else{
        nextSquare[i-1] = "O"
      }
      
      onPlay(nextSquare)
    }
  
  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

 
  return (
    <div>
      <div className ="status">{status}</div>
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
    console.log(squares)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}