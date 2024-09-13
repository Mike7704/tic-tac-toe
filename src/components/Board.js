"use client";
import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket"; // Import the updated useSocket hook
import Tile from "@/components/Tile";

export default function Board() {
  const { gameState, sendMove, isConnected } = useSocket(); // Use the socket hook
  const [localBoard, setLocalBoard] = useState(Array(9).fill(null)); // Local board state

  useEffect(() => {
    if (gameState) {
      setLocalBoard(gameState.board); // Update the board whenever gameState changes
    }
  }, [gameState]);

  const handleClick = (index) => {
    // Check if tile filled or game won
    if (localBoard[index] || calculateWinner(localBoard)) {
      return;
    }

    // Create a copy of the board and update it
    const newBoard = [...localBoard];
    newBoard[index] = gameState?.isXTurn ? "X" : "O";

    // Emit the new game state to the server
    sendMove({ board: newBoard, isXTurn: !gameState?.isXTurn });

    // Update the local board state
    setLocalBoard(newBoard);
  };

  const renderTile = (i) => {
    return <Tile value={localBoard[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(localBoard);
  let status = winner ? `Winner: ${winner}` : `Next player: ${gameState?.isXTurn ? "X" : "O"}`;

  return (
    <div className="flex flex-col text-center">
      <h2>{status}</h2>
      <div className="flex justify-center">
        {renderTile(0)}
        {renderTile(1)}
        {renderTile(2)}
      </div>
      <div className="flex justify-center">
        {renderTile(3)}
        {renderTile(4)}
        {renderTile(5)}
      </div>
      <div className="flex justify-center">
        {renderTile(6)}
        {renderTile(7)}
        {renderTile(8)}
      </div>
      <p>{isConnected ? "Connected" : "Not connected"}</p>
    </div>
  );
}

// Check for winner
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
