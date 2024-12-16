import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const TicTacToe = ({ user }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Handle user logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate("/login");
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Navigate to ColorDiceGame
  const handleNextGame = () => {
    try {
      navigate("/colordicegame");
    } catch (error) {
      console.error('Navigation failed', error);
    }
  };

  // Calculate winner
  const calculateWinner = (board) => {
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
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Handle click on each square
  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = "X"; // User always plays X
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXNext(false); // Switch to AI's turn
    }
  };

  // Minimax algorithm for AI move
  const minimax = (board, depth, isMaximizing) => {
    const winner = calculateWinner(board);
    if (winner === "O") return 1; // AI wins
    if (winner === "X") return -1; // Player wins
    if (board.every(square => square !== null)) return 0; // Draw

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O"; // AI's move
          const score = minimax(board, depth + 1, false);
          board[i] = null; // Undo the move
          best = Math.max(best, score);
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X"; // Player's move
          const score = minimax(board, depth + 1, true);
          board[i] = null; // Undo the move
          best = Math.min(best, score);
        }
      }
      return best;
    }
  };

  // AI makes a move
  const aiMove = () => {
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O"; // AI's move
        const moveValue = minimax(board, 0, false);
        board[i] = null; // Undo the move

        if (moveValue > bestValue) {
          bestMove = i;
          bestValue = moveValue;
        }
      }
    }

    const newBoard = board.slice();
    newBoard[bestMove] = "O"; // Place AI's move
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXNext(true); // Switch back to user's turn
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Render each square (button)
  const renderSquare = (index) => {
    return (
      <button key={index} className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  // AI makes a move after user plays
  useEffect(() => {
    if (!isXNext && !winner) {
      setTimeout(() => {
        aiMove();
      }, 500); // Delay to simulate thinking time
    }
  }, [isXNext, winner, board]);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className="text-white font-weight-bold">Play Zone</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              href="/" 
              className="btn btn-light text-primary fw-bold px-3 rounded-pill"
              style={{
                backgroundColor: "#ffffff", 
                color: "#0d6efd", 
                textTransform: "uppercase",
                marginRight: "10px",
              }}
            >
              Home
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title={user ? user.username : 'Logout'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="#login" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="board">
          {board.map((_, index) => renderSquare(index))}
        </div>
        {winner ? (
          <p className="winner-message">Winner: {winner}</p>
        ) : (
          <p className="turn-message">Next Turn: {isXNext ? "X" : "O"}</p>
        )}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="next-button" onClick={handleNextGame}>
          Next Game
        </button>
      </div>
    </>
  );
};

export default TicTacToe;
