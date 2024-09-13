import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// Define a type for the game state
interface GameState {
  board: (string | null)[]; // Array of 'X', 'O', or null (empty square)
  isXTurn: boolean; // Track which player's turn it is
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    // Connect to Socket.IO server
    const socketIo = io();

    socketIo.on("connect", () => {
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    // Listen for "move" event from the server to update the game state
    socketIo.on("move", (newGameState: GameState) => {
      setGameState(newGameState); // Update game state with new data from server
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect(); // Clean up when component unmounts
    };
  }, []);

  // Function to emit a move event to the server
  const sendMove = (newGameState: GameState) => {
    if (socket) {
      socket.emit("move", newGameState); // Send the updated game state to the server
    }
  };

  return { isConnected, gameState, sendMove };
};
