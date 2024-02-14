import { useState } from "react";
import "./assets/Game.css";

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  winningLine: null,
  isDraw: false,
};

const Game = () => {
  const [gameState, setGameState] = useState(initialState);

  const handleClick = (index) => {
    if (gameState.squares[index] || gameState.winner || gameState.isDraw) {
      return;
    }

    const squares = [...gameState.squares];
    squares[index] = gameState.xIsNext ? "X" : "O";

    const winner = calculateWinner(squares);
    const winningLine = winner ? getWinningLine(squares) : null;
    const isDraw = !winner && squares.every((square) => square !== null);

    setGameState({
      squares: squares,
      xIsNext: !gameState.xIsNext,
      winner: winner,
      winningLine: winningLine,
      isDraw: isDraw,
    });
  };
  const renderSquare = (index) => {
    const isWinningSquare = gameState.winningLine && gameState.winningLine.includes(index);
    const isDraw = gameState.isDraw && gameState.squares[index];
    const playerClass = gameState.squares[index] === 'X' ? 'player-x' : 'player-o';
  
    return (
      <button
        className={`square ${isWinningSquare ? 'winning' : ''} ${isDraw ? 'draw' : ''} ${playerClass}`}
        onClick={() => handleClick(index)}
        disabled={gameState.squares[index] || gameState.winner || gameState.isDraw}
      >
        {gameState.squares[index]}
      </button>
    );
  };
  

  const resetGame = () => {
    setGameState(initialState);
  };

  let status;
  if (gameState.winner) {
    status = "Winner: " + gameState.winner;
  } else if (gameState.isDraw) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (gameState.xIsNext ? "X" : "O");
  }

  return (
    <div className={`game ${gameState.isDraw ? "draw" : ""}`}>
      <h2 className="status">{status}</h2>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
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
};

const getWinningLine = (squares) => {
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
      return lines[i];
    }
  }

  return null;
};

export default Game;
