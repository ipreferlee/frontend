import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'; 
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button
import './ColorDiceGame.css';

const ColorDiceGame = ({ user }) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null); // Store the color selected by the user
  const [diceResults, setDiceResults] = useState([null, null, null]); // Store the results of the 3 dice rolls
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // To store the message for the modal

  const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];

  // Roll 3 dice and pick random colors
  const rollDice = () => {
    const rolledColors = Array.from({ length: 3 }, () => colors[Math.floor(Math.random() * colors.length)]);
    setDiceResults(rolledColors);

    // Check if user wins (if any of the dice matches the selected color)
    const win = rolledColors.includes(selectedColor);

    // Set modal message based on win/lose
    if (win) {
      setModalMessage(`You WIN! You selected ${selectedColor} and it was rolled!`);
    } else {
      setModalMessage(`You LOST! You selected ${selectedColor} but it wasn't rolled. Try again!`);
    }

    // Show the modal
    setShowModal(true);
  };

  // Handle logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate("/login");
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  // Handle "Go Back" button
  const handleGoBack = () => {
    navigate("/tictactoe"); // Navigate to the TicTacToe page
  };

  return (
    <>
      {/* Navbar */}
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
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Color Dice Game */}
      <div className="color-dice-game">
        <h1>Color Dice Game</h1>

        {/* Color Choice Buttons */}
        <div className="color-choices">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-btn ${color.toLowerCase()} ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Roll Dice Button */}
        <button className="roll-dice-btn" onClick={rollDice} disabled={!selectedColor}>
          Roll Dice
        </button>

        {/* Dice Result Boxes */}
        <div className="dice-container">
          {diceResults.map((color, index) => (
            <div 
              key={index} 
              className={`color-box ${color ? color.toLowerCase() : ''}`}
              style={{ backgroundColor: color ? color.toLowerCase() : '#f0f0f0' }} // Fallback color when no dice result
            >
              {color || 'Rolling...'}
            </div>
          ))}
        </div>

        {/* Information on the Dice Result */}
        <p>{selectedColor ? `You selected: ${selectedColor}` : 'Select a color to start!'}</p>

        {/* Go Back Button */}
        <button className="go-back-btn" onClick={handleGoBack}>
          Go Back to TicTacToe
        </button>
      </div>

      {/* Modal for Win/Loss */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ColorDiceGame;
