import React from "react";
import { useState, useEffect } from "react";
import "./Elections.css";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "./utils/url";

export const Elections = () => {
  const navigate = useNavigate();
  const [getUserVotes, setgetUserVotes] = useState([]);

  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("walletAddress"); // Get the address from local storage

    // Check if a token and address exist
    if (token && address) {
      // Create the URL with the address as a query parameter
      const apiUrl = `${url}/contract/get-user-votes?address=${address}`;

      // Fetch data from the API endpoint using Axios with headers
      axios
        .get(apiUrl, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Assuming response.data.getUserVotes is an array of election objects
          setgetUserVotes(response.data.getUserVotes);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Handle the case where no token or address is found in local storage
      console.error("No token or address found in local storage");
    }
  }, []);

  useEffect(() => {
    console.log("Updated getUserVotes:", getUserVotes);
  }, [getUserVotes]);

  const [popupData, setPopupData] = useState(null);

  const openPopup = (election) => {
    setPopupData(election);
  };

  const handleCandidateClick = (electionId, candidateId) => {
    setPopupData((prevPopupData) => {
      if (prevPopupData.id === electionId) {
        const updatedCandidates = prevPopupData.candidates.map((candidate) => {
          return {
            ...candidate,
            disabled: candidate.id !== candidateId,
          };
        });

        return {
          ...prevPopupData,
          candidates: updatedCandidates,
        };
      }
      return prevPopupData;
    });
  };

  const handleVoteClick = (candidateId) => {
    setPopupData((prevPopupData) => {
      const updatedCandidates = prevPopupData.candidates.map((candidate) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            votes: candidate.votes + 1,
            disabled: true,
          };
        }
        return candidate;
      });

      return {
        ...prevPopupData,
        candidates: updatedCandidates,
        hasVoted: true, // Add this flag to indicate that the user has voted
      };
    });
  };

 

  const closePopup = () => {
    setPopupData(null);
  };

























  // Hosted Elections
  const [getCreatorVotes, setgetCreatorVotes] = useState([]);

  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("walletAddress"); // Get the address from local storage

    // Check if a token and address exist
    if (token && address) {
      // Create the URL with the address as a query parameter
      const apiUrl = `${url}/contract/get-creator-votes?address=${address}`;

      // Fetch data from the API endpoint using Axios with headers
      axios
        .get(apiUrl, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Assuming response.data.getUserVotes is an array of election objects
          setgetCreatorVotes(response.data.getCreatorVotes);
          console.log("creatpr votes:")
          console.log(response.data.getCreatorVotes)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Handle the case where no token or address is found in local storage
      console.error("No token or address found in local storage");
    }
  }, []);

  const [popupData2, setPopupData2] = useState(null);
  const [isElectionStopped, setIsElectionStopped] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [newWalletAddress, setNewWalletAddress] = useState("");

  const openPopup2 = (election) => {
    setPopupData2(election);
    setIsElectionStopped(false); // Reset election status when opening the popup
  };

  const toggleElectionStatus = () => {
    // Implement logic to toggle the election status (start/stop) here
    setIsElectionStopped((prevStatus) => !prevStatus);
  };

  const closePopup2 = () => {
    setPopupData2(null);
  };

  //Add wallet addresses List
  const handleAddWalletAddress = () => {
    if (newWalletAddress.trim() !== "") {
      setWalletAddresses([...walletAddresses, newWalletAddress]);
      setNewWalletAddress("");
    }
  };

  const handleRemoveAddress = (index) => {
    // Show a confirmation alert
    const confirmRemove = window.confirm(
      "Do you want to remove the wallet address?"
    );
    if (confirmRemove) {
      const updatedWalletAddresses = [...walletAddresses];
      updatedWalletAddresses.splice(index, 1);
      setWalletAddresses(updatedWalletAddresses);
    }
  };

  // Save wallet addresses to localStorage whenever the walletAddresses state changes
  useEffect(() => {
    const savedWalletAddresses = localStorage.getItem("walletAddresses");
    if (savedWalletAddresses) {
      setWalletAddresses(JSON.parse(savedWalletAddresses));
    }
  }, []);

  // Save wallet addresses to localStorage whenever the walletAddresses state changes
  useEffect(() => {
    localStorage.setItem("walletAddresses", JSON.stringify(walletAddresses));
  }, [walletAddresses]);

  return (
    <div className="Elections">
      <section>
        <Navbar />
        <div className="list_container">
          <div className="active_elec">
            <h1 className="header">Active Elections</h1>
            <ul>
              {getUserVotes.map((election, index) => (
                <li key={index}>
                  {console.log("checking election")}
                  {console.log(election)}
                  <button
                    className="active_btn"
                    onClick={() => openPopup(election)}
                  >
                    {index}. {election.title} Election
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
                        candidate.disabled ? "disabled" : ""
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
            {console.log("second time")}
            {console.log(getCreatorVotes)}
            {getCreatorVotes.length > 0 ? (
              getCreatorVotes.map((election,index) => (
                <li key={index}>
                  <button
                    className="hosted_btn"
                    onClick={() => openPopup2(election)}
                  >
                   {index}. {election.title} Election
                   
                  </button>
                </li>
              ))
            ) : (
              <li>
                <h1 style={{ color: "white" }}>No Votes Connected to this wallet</h1>
              </li>
            )}
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
                {isElectionStopped ? "Start" : "Stop"}
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
        <div className="create_bar" onClick={() => navigate("/urElections")}>
          <button className="create_btn">
            <div className="create_sign">+</div>
            <div className="create_text">Create</div>
          </button>
        </div>
      </section>
    </div>
  );
};
