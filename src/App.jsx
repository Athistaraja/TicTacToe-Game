import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });

  const winningLine = calculateWinner(board);
  const winner = winningLine ? board[winningLine[0]] : null;
  const isDraw = !winner && board.every((cell) => cell !== null);

  const status = winner
    ? `🎉 Winner: ${winner}`
    : isDraw
    ? "Match Draw! 🤝"
    : `Next player: ${isXNext ? "X" : "O"}`;

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    } else if (isDraw) {
      setScore((prevScore) => ({
        ...prevScore,
        Draw: prevScore.Draw + 1,
      }));
    }
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-gradient text-white" style={{ background: ' #1e1e2f' }}>
      <h1 className="mb-4 text-white fw-bold">Tic Tac Toe</h1>
      <div className="d-flex justify-content-around w-50 my-3 p-3 bg-dark rounded shadow-lg flex-wrap">
        <div className="text-warning">
          <h3>X: {score.X}</h3>
        </div>
        <div className="text-primary">
          <h3>O: {score.O}</h3>
        </div>
        <div className="text-secondary">
          <h3>Draw: {score.Draw}</h3>
        </div>
      </div>
      <div 
        className="position-relative d-grid gap-3 p-3 rounded border border-info" 
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', width: '320px', height: '320px', boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            className={`btn ${cell ? (cell === 'X' ? 'btn-danger' : 'btn-primary') : 'btn-outline-light'} d-flex align-items-center justify-content-center shadow position-relative`}
            style={{ 
              width: '80px', 
              height: '80px', 
              fontSize: '2rem', 
              borderRadius: '12px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.2s ease-in-out'
            }}
            onClick={() => handleClick(index)}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            {cell}
          </button>
        ))}
        {winner && (
          <div 
            className="position-absolute bg-white rounded" 
            style={{ ...getStrikeStyle(winningLine), boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }}
          ></div>
        )}
      </div>
      <div className="my-4 fs-4 bg-info p-3 rounded shadow-lg text-dark" style={{ animation: 'fadeIn 0.5s' }}>
        {status}
      </div>
      
      <button
        className="btn btn-outline-warning btn-lg shadow mt-3"
        onClick={resetGame}
        style={{ boxShadow: '0 0 15px rgba(255, 193, 7, 0.8)' }}
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

function calculateWinner(board) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

function getStrikeStyle(line) {
  if (!line) return {};

  const strikeStyles = {
    horizontal: { top: `${line[0] / 3 * 100 + 55}px`, left: '15px', width: '90%', height: '6px', animation: 'strike 3s ease-in-out' },
    vertical: { top: '15px', left: `${(line[0] % 3) * 100 + 55}px`, width: '6px', height: '90%', animation: 'strike 3s ease-in-out' },
    diagonal1: { top: '10px', left: '13px', width: '130%', height: '6px', transform: 'rotate(45deg)', transformOrigin: 'top left', animation: 'strike 2s ease-in-out' },
    diagonal2: { top: '10px', right: '13px', width: '130%', height: '6px', transform: 'rotate(-45deg)', transformOrigin: 'top right', animation: 'strike 2s ease-in-out' },
  };

  if (line.join() === "0,1,2" || line.join() === "3,4,5" || line.join() === "6,7,8") return strikeStyles.horizontal;
  if (line.join() === "0,3,6" || line.join() === "1,4,7" || line.join() === "2,5,8") return strikeStyles.vertical;
  if (line.join() === "0,4,8") return strikeStyles.diagonal1;
  if (line.join() === "2,4,6") return strikeStyles.diagonal2;

  return {};
}

export default TicTacToe;
