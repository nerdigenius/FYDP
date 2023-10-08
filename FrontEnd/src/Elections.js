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

  const handleVoteClick = (popupData, index) => {
    console.log(popupData);
    const address = localStorage.getItem("walletAddress");
    const voteIndex = popupData.voteIndex;
    const data = {
      address: address,
      candidateIndex: index,
      voteIndex: voteIndex,
    };

    const token = localStorage.getItem("token");

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(url + "/contract/vote", data, axiosConfig)
      .then((response) => {
        // Handle the successful response here
        console.log("POST request successful:", response.data.message);
        window.alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // If the error response contains an 'error' field, show it in an alert
          const errorMessage = error.response.data.error;
          window.alert(errorMessage);
        } else {
          // If no specific error message is found, show a generic error message
          window.alert("An error occurred. Please try again later.");
        }
        console.error("Error sending POST request:", error);
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
          console.log("creatpr votes:");
          console.log(response.data.getCreatorVotes);
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
    setIsElectionStopped(!election.voteStatus); // Reset election status when opening the popup
  };

  const toggleElectionStatus = (voteIndex) => {
    const address = localStorage.getItem("walletAddress");
    // Prepare the request body
    const requestBody = {
      address: address,
      voteIndex: voteIndex,
    };

    // Prepare the request headers
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };

    // Send the API request
    axios
      .post(url + "/contract/stop-vote", requestBody, {
        headers: headers,
      })
      .then((response) => {
        // Handle the response here
        console.log("API Response:", response.data);
        // Implement logic to toggle the election status (start/stop) here

        setIsElectionStopped((prevStatus) => !prevStatus);
      })
      .catch((error) => {
        // Handle errors here
        console.error("API Error:", error);
      });
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

  const handleWalletAddressConfirm = (voteIndex) => {
    console.log(walletAddresses);
    const address = localStorage.getItem("walletAddress");
    const data = {
      address: address,
      newEligibleVoters: walletAddresses,
      voteIndex: voteIndex,
    };

    const token = localStorage.getItem("token");

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    if (walletAddresses.length > 0) {
      axios
        .post(url + "/contract/add-eligible-voters", data, axiosConfig)
        .then((response) => {
          // Handle the successful response here
          console.log("POST request successful:", response.data.message);
          window.alert(response.data.message);
          window.location.href = "/";
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error sending POST request:", error);
        });

      window.location.reload();
    } else {
      window.alert("No Wallet Addresses added");
    }
  };

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
            <h1 className="header">Voter in Elections</h1>
            <ul>
              {getUserVotes.length > 0 ? (
                getUserVotes.map((election, index) => (
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
                ))
              ) : (
                <li>
                  <h1 style={{ color: "white" }}>No votes connected to this address</h1>
                </li>
              )}
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
                {popupData.candidates.map((candidate, index) => (
                  <li>
                    <div
                      className={`candidate ${
                        candidate.disabled ? "disabled" : ""
                      }`}
                    >
                      {candidate.name}

                      {!candidate.disabled && !popupData.hasVoted && (
                        <button
                          className="vote-button"
                          onClick={() => handleVoteClick(popupData, index)}
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
              getCreatorVotes.map((election, index) => (
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
                <h1 style={{ color: "white" }}>
                  No Votes Connected to this wallet
                </h1>
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
              {console.log("pop up 2 data")}
              {console.log(popupData2)}

              <button className="close-btn2" onClick={closePopup2}>
                Close
              </button>
            </div>
            <div className="cand_list2">
              <ul className="cand_box2">
                {popupData2.candidates.map((candidate, index) => (
                  <li className="cand_item2" key={index}>
                    <span>{candidate.name}</span>
                    <div className="vote-count">
                      Votes: {candidate.voteCount}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="start_stop">
              <button
                className="election-status-btn"
                onClick={() => toggleElectionStatus(popupData2.voteIndex)}
                disabled={isElectionStopped}
              >
                {isElectionStopped ? "Election Over" : "Stop"}
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
                <div className="wallet_field">
                  <button
                    className="wallet_btn"
                    onClick={() =>
                      handleWalletAddressConfirm(popupData2.voteIndex)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="eligibleVotersView">
            <h1>Eligible Voters</h1>
            <ul>
              {popupData2.eligibleVoters.map((voters, index) => (
                <li style={{ fontSize: "15px" }}>
                  {index}. {voters}
                </li>
              ))}
            </ul>
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
