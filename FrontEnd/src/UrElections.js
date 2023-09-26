import React from 'react'
import './UrElections.css'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'

export const UrElections = () => {
  // Add and Remove Candidates
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem('candidates')
    return savedCandidates ? JSON.parse(savedCandidates) : []
  })

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [newCandidate, setNewCandidate] = useState('')
  const [walletAddresses, setWalletAddresses] = useState([])
  const [newWalletAddress, setNewWalletAddress] = useState('')
  
  const [isEditable, setIsEditable] = useState(true)



  // Save candidates to localStorage whenever the candidates state changes
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates))
  }, [candidates])

  const handleAddCandidate = () => {
    if (newCandidate.trim() !== '') {
      setCandidates([...candidates, newCandidate])
      setNewCandidate('')
    }
  }

  const handleRemoveCandidate = (index) => {
    const confirmRemove = window.confirm(
      'Are you sure you want to remove this candidate?'
    )
    if (confirmRemove) {
      const updatedCandidates = [...candidates]
      updatedCandidates.splice(index, 1)
      setCandidates(updatedCandidates)
    }
  }

  //Add wallet addresses List
  const handleAddWalletAddress = () => {
    if (newWalletAddress.trim() !== '') {
      setWalletAddresses([...walletAddresses, newWalletAddress])
      setNewWalletAddress('')
    }
  }



  return (
    <div className="UrElections">
      <section>
        <Navbar></Navbar>
      </section>
      <section>
        <div className="top_bar">
          <h1>Candidates</h1>
          <div className="cand_list">
            <div className="cand_table">
              <ul>
                {candidates.map((candidate, index) => (
                  <li className="cand_item" key={index}>
                    <button>{candidate}</button>
                    <button onClick={() => handleRemoveCandidate(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsPopupOpen(true)}>Add +</button>
              {/* Place the pop-up code here */}
              {isPopupOpen && (
                <div className="popup_cand">
                  <input
                    type="text"
                    placeholder="Enter candidate name"
                    value={newCandidate}
                    onChange={(e) => setNewCandidate(e.target.value)}
                  />
                  <button onClick={handleAddCandidate}>Add Candidate</button>
                  <button onClick={() => setIsPopupOpen(false)}>Close</button>
                </div>
              )}
              <button onClick={() => setIsEditable(!isEditable)}>
                {isEditable ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>
        </div>

        <div className="bottom_bar">
          <h1>Add Wallet Address</h1>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={newWalletAddress}
            onChange={(e) => setNewWalletAddress(e.target.value)}
            disabled={!isEditable}
          />

          <button onClick={handleAddWalletAddress} disabled={!isEditable}>
            Add Wallet Address
          </button>
          <ul>
            {walletAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>

        {/* Display Wallet Addresses */}
        <div></div>
      </section>
    </div>
  )
}
