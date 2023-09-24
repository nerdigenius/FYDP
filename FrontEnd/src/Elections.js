import React from 'react'
import { useState } from 'react'
import './Elections.css'
import { Navbar } from './Navbar'

export const Elections = () => {
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
    { id: 1, title: 'Election A', link: '/electionA' },
    { id: 2, title: 'Election B', link: '/electionB' },
    { id: 3, title: 'Election C', link: '/electionC' },
  ]

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
                <button className="hosted_btn" href={election.link}>
                  {election.title}
                  <span> - Total Votes: </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <div className='create_bar'>
          <button className="create_btn">
            <div className="create_sign">+</div>
            <div className="create_text">Create</div>
          </button>
        </div>
      </section>
    </div>
  )
}
