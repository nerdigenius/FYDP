import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  // Check if wallet address is present in localStorage on component mount
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setIsConnected(true);
    }
  }, []);

  const handleToggleConnection = async () => {
    if (!isConnected) {
      try {
        // Request MetaMask's permission to connect
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
        // Check if the user approved the connection
        if (accounts.length > 0) {
          const walletAddress = accounts[0];
    
          // Store wallet address in localStorage
          localStorage.setItem('walletAddress', walletAddress);
    
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Connection failed:', error);
        window.alert('Connection failed: ' + error.message);
      }
    } else {
      try {
        // Clear the current account selection
        window.ethereum.selectedAddress = null;
    
        // Remove wallet address from localStorage
        localStorage.removeItem('walletAddress');
    
        setIsConnected(false);
      } catch (error) {
        console.error('Disconnection failed:', error);
        window.alert('Disconnection failed: ' + error.message);
      }
    }
  };
  
  

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axios.post('http://localhost:8000/auth/logout');

      localStorage.removeItem('token');
      localStorage.removeItem('walletAddress');
      navigate('/'); // Assuming you have defined a history object for navigation
    } catch (error) {
      console.error('Logout failed:', error);
      window.alert(error);
    }
  };

  return (
    <div className="Navbar">
      <section>
        <div className="container ">
          <div className="menubar">
            <p className="logo ui-btn" id="logo">
              <span>DeVote</span>
            </p>
            <ul>
              <li>
                <button
                  className={`connect-button ${isConnected ? 'disconnect' : 'connect'}`}
                  onClick={handleToggleConnection}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </li>
              <li>
                <a href="/personal">Personal Info</a>
              </li>
              <li>
                <a href="/elections">Elections</a>
              </li>
              <li>
                <button className="logout">
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0-32 14.3-32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0-32 14.3-32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="text" onClick={handleLogout}>
                    Logout
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};