import React from 'react'
import './UrElections.css'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  const handleStartStop = () => {
    setIsEditable(!isEditable)
    if (isEditable) {
      // Redirect to the Elections page when starting
      navigate('/elections')
    }
  }

  //Add wallet addresses List
  const handleAddWalletAddress = () => {
    if (newWalletAddress.trim() !== '') {
      setWalletAddresses([...walletAddresses, newWalletAddress])
      setNewWalletAddress('')
    }
  }

  // const handleRemoveAddress = (index) => {
  //   // Show a confirmation alert
  //   const confirmRemove = window.confirm(
  //     'Do you want to remove the wallet address?'
  //   )
  //   if (confirmRemove) {
  //     const updatedWalletAddresses = [...walletAddresses]
  //     updatedWalletAddresses.splice(index, 1)
  //     setWalletAddresses(updatedWalletAddresses)
  //   }
  // }

  // // Save wallet addresses to localStorage whenever the walletAddresses state changes
  // useEffect(() => {
  //   const savedWalletAddresses = localStorage.getItem('walletAddresses')
  //   if (savedWalletAddresses) {
  //     setWalletAddresses(JSON.parse(savedWalletAddresses))
  //   }
  // }, [])

  // // Save wallet addresses to localStorage whenever the walletAddresses state changes
  // useEffect(() => {
  //   localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses))
  // }, [walletAddresses])

  function Candidates({ candidates, onRemoveCandidate }) {
    return (
      <ul className="cand_box">
        {candidates.map((candidate, index) => (
          <li className="cand_item" key={index}>
            <span>{candidate}</span>
            <button
              className="remove_btn"
              onClick={() => onRemoveCandidate(index)}
              disabled={!isEditable}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="UrElections">
      <section>
        <Navbar />
      </section>
      <section>
        <div className="top_bar">
          <h1>Candidates</h1>
          <div className="cand_list">
            <div className="cand_table">
              <Candidates
                candidates={candidates}
                onRemoveCandidate={handleRemoveCandidate}
              />
              <div className="add_stop_btns">
                <button
                  className="add_item_btn"
                  onClick={() => setIsPopupOpen(true)}
                  disabled={!isEditable}
                >
                  Add +
                </button>
                <button className="start_btn" onClick={handleStartStop}>
                  {isEditable ? 'Start' : 'Stop'}
                </button>
              </div>
              {/* Place the pop-up code here */}
              {isPopupOpen && (
                <div className="popup_cand show">
                  <div className="pop_up_content">
                    <input
                      type="text"
                      placeholder="Enter candidate name"
                      value={newCandidate}
                      onChange={(e) => setNewCandidate(e.target.value)}
                      className="input_name"
                    />
                    <button
                      className="add_cand_btn"
                      onClick={handleAddCandidate}
                    >
                      Add Candidate
                    </button>
                    <button
                      className="add_cand_btn"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section> */}
        {/* <div className="bottom_bar">
          <h1>Add Wallet Address</h1>
          <div className="wallet_field">
            <input
              type="text"
              placeholder="Enter wallet address"
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              disabled={!isEditable}
            />
            <button
              className="wallet_btn"
              onClick={handleAddWalletAddress}
              disabled={!isEditable}
            >
              Add +
            </button>
          </div> */}

          {/* Display Wallet Addresses */}
          {/* <div className="wallet_list">
            <ul>
              {walletAddresses.map((address, index) => (
                <li key={index}>
                  {address}
                  <button
                    className="remove_btn"
                    onClick={() => handleRemoveAddress(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      {/* </section> */}
    </div>
  )
}
