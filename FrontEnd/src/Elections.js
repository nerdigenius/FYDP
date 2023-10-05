import React from 'react'
import { useState, useEffect } from 'react'
import './Elections.css'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

export const Elections = () => {
  const navigate = useNavigate()

  // Active Elections
  const activeElections = [
    {
      id: 1,
      title: 'Election 1',
      candidates: [
        { id: 1, name: 'Candidate A', votes: 0, disabled: false },
        { id: 2, name: 'Candidate B', votes: 0, disabled: false },
      ],
    },
    {
      id: 2,
      title: 'Election 2',
      candidates: [
        { id: 1, name: 'Candidate X', votes: 0, disabled: false },
        { id: 2, name: 'Candidate Y', votes: 0, disabled: false },
        { id: 3, name: 'Candidate Z', votes: 0, disabled: false },
      ],
    },
    {
      id: 3,
      title: 'Election 3',
      candidates: [
        { id: 1, name: 'Masakali', votes: 0, disabled: false },
        // Add more candidates for Election 2 as needed
      ],
    },
    // Add more elections with varying candidates
  ]

  const [popupData, setPopupData] = useState(null)

  const openPopup = (election) => {
    setPopupData(election)
  }

  const handleCandidateClick = (electionId, candidateId) => {
    setPopupData((prevPopupData) => {
      if (prevPopupData.id === electionId) {
        const updatedCandidates = prevPopupData.candidates.map((candidate) => {
          return {
            ...candidate,
            disabled: candidate.id !== candidateId,
          }
        })

        return {
          ...prevPopupData,
          candidates: updatedCandidates,
        }
      }
      return prevPopupData
    })
  }

  const handleVoteClick = (candidateId) => {
    setPopupData((prevPopupData) => {
      const updatedCandidates = prevPopupData.candidates.map((candidate) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            votes: candidate.votes + 1,
            disabled: true,
          }
        }
        return candidate
      })

      return {
        ...prevPopupData,
        candidates: updatedCandidates,
        hasVoted: true, // Add this flag to indicate that the user has voted
      }
    })
  }

  const getTotalVotes = (election) => {
    return election.candidates.reduce(
      (total, candidate) => total + candidate.votes,
      0
    )
  }

  const closePopup = () => {
    setPopupData(null)
  }

  // Hosted Elections
  const hostedElections = [
    {
      id: 1,
      title: 'Election A',
      candidates: ['Candidate 1', 'Candidate 2'],
      votes: [0, 0],
    },
    {
      id: 2,
      title: 'Election B',
      candidates: ['Candidate X', 'Candidate Y', 'Candidate Z'],
      votes: [0, 0, 0],
    },
    // Add more hosted elections as needed, each with its own list of candidates and vote counts
  ]
  const [popupData2, setPopupData2] = useState(null)
  const [isElectionStopped, setIsElectionStopped] = useState(false)
  const [walletAddresses, setWalletAddresses] = useState([])
  const [isEditable, setIsEditable] = useState(true)
  const [newWalletAddress, setNewWalletAddress] = useState('')

  const openPopup2 = (election) => {
    setPopupData2(election)
    setIsElectionStopped(false) // Reset election status when opening the popup
  }

  const toggleElectionStatus = () => {
    // Implement logic to toggle the election status (start/stop) here
    setIsElectionStopped((prevStatus) => !prevStatus)
  }

  const closePopup2 = () => {
    setPopupData2(null)
  }

  //Add wallet addresses List
  const handleAddWalletAddress = () => {
    if (newWalletAddress.trim() !== '') {
      setWalletAddresses([...walletAddresses, newWalletAddress])
      setNewWalletAddress('')
    }
  }

  const handleRemoveAddress = (index) => {
    // Show a confirmation alert
    const confirmRemove = window.confirm(
      'Do you want to remove the wallet address?'
    )
    if (confirmRemove) {
      const updatedWalletAddresses = [...walletAddresses]
      updatedWalletAddresses.splice(index, 1)
      setWalletAddresses(updatedWalletAddresses)
    }
  }

  // Save wallet addresses to localStorage whenever the walletAddresses state changes
  useEffect(() => {
    const savedWalletAddresses = localStorage.getItem('walletAddresses')
    if (savedWalletAddresses) {
      setWalletAddresses(JSON.parse(savedWalletAddresses))
    }
  }, [])

  // Save wallet addresses to localStorage whenever the walletAddresses state changes
  useEffect(() => {
    localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses))
  }, [walletAddresses])

  return (
    <div className="Elections">
      <section>
        <Navbar />
        <div className="list_container">
          <div className="active_elec">
            <h1 className="header">Active Elections</h1>
            <ul>
              {activeElections.map((election) => (
                <li key={election.id}>
                  <button
                    className="active_btn"
                    onClick={() => openPopup(election)}
                  >
                    {election.title} - Total Votes: {getTotalVotes(election)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {popupData && (
        <div className="popup show">
          <div className="popup-content">
            <h2>{popupData.title}</h2>
            <div className="candidate_list">
              <ul>
                {popupData.candidates.map((candidate) => (
                  <li key={candidate.id}>
                    <div
                      className={`candidate ${
                        candidate.disabled ? 'disabled' : ''
                      }`}
                      onClick={() =>
                        handleCandidateClick(popupData.id, candidate.id)
                      }
                    >
                      {candidate.name}
                      <div className="vote-count">Votes: {candidate.votes}</div>
                      {!candidate.disabled && !popupData.hasVoted && (
                        <button
                          className="vote-button"
                          onClick={() =>
                            handleVoteClick(popupData.id, candidate.id)
                          }
                        >
                          Vote
                        </button>
                      )}
                      {popupData.hasVoted && (
                        <div className="already-voted">Done!</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="close_btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <section>
        <div className="hosted_elec">
          <h1 className="header">Hosted Elections</h1>
          <ul>
            {hostedElections.map((election) => (
              <li key={election.id}>
                <button
                  className="hosted_btn"
                  onClick={() => openPopup2(election)}
                >
                  {election.title} - Total Votes:{' '}
                  {election.votes.reduce((total, vote) => total + vote, 0)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {popupData2 && (
        <div className="pop_up show2">
          <div className="pop_up-content2">
            <div className="pop_up_head">
              <h2>{popupData2.title}</h2>
              <button className="close-btn2" onClick={closePopup2}>
                Close
              </button>
            </div>
            <div className="cand_list2">
              <ul className="cand_box2">
                {popupData2.candidates.map((candidate, index) => (
                  <li className="cand_item2" key={index}>
                    <span>{candidate}</span>
                    <div className="vote-count">
                      Votes: {popupData2.votes[index]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="start_stop">
              <button
                className="election-status-btn"
                onClick={toggleElectionStatus}
              >
                {isElectionStopped ? 'Start' : 'Stop'}
              </button>
            </div>
            {/* Display Wallet Addresses */}
            <div className="bottom_bar">
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
              </div>
              <div className="wallet_list">
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
            </div>
          </div>
        </div>
      )}
      <section>
        <div className="create_bar" onClick={() => navigate('/urElections')}>
          <button className="create_btn">
            <div className="create_sign">+</div>
            <div className="create_text">Create</div>
          </button>
        </div>
      </section>
    </div>
  )
}
