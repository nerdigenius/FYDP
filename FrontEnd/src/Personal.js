import "./Personal.css";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";

export const Personal = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  // User's personal information data (initial values)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    // Add more fields as needed
  });

  // Function to handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handlePhotoUpload = () => {
    // Trigger the file input when the button is clicked
    const fileInput = document.getElementById("photo-upload");
    fileInput.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("profilePicture", file);

      reader.onload = (e) => {
        const newProfilePictureUrl = e.target.result;
        const profilePictureElement =
          document.querySelector(".profile-picture");
        const token = localStorage.getItem("token");
        console.log("token:::" + token);

        axios
          .post("http://localhost:8000/auth/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          })
          .then((response) => {
            console.log(response);
            // Handle success (e.g., show a success message)
          })
          .catch((error) => {
            console.log(error);
            // Handle error (e.g., show an error message)
          });

        // Set the selected photo as the source of the "profile-picture" element
        if (profilePictureElement) {
          profilePictureElement.style.backgroundImage = `url('${newProfilePictureUrl}')`;
        }

        // You can also update the UI state or perform other actions as needed.
        // For example, if you're using React state:
        // this.setState({ profilePictureUrl: newProfilePictureUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Fetch the profile picture URL here
    const token = localStorage.getItem("token"); // Assuming you stored the JWT token in localStorage

    if (token) {
      axios
        .get("http://localhost:8000/auth/getImage", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Update the state variable with the profile picture URL
          console.log(response.data.profilePictureUrl);
          setProfilePictureUrl(response.data.profilePictureUrl);
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
          // Handle the error, e.g., show a default profile picture
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/auth/user-info", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Handle successful response
          const { email, username } = response.data.user;
          setUserData({
            ...userData,
            email: email, // Update the email field
            name: username, // Update the username field (assuming it's present in your userData state)
          });
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // Handle unauthorized access (e.g., show a message or redirect to login)
            console.error("Unauthorized access. Please log in.");
          } else {
            // Handle other errors
            console.error("Error fetching user info:", error);
          }
        });
    }
  }, []);

  return (
    <div className="Personal">
      <section>
        <Navbar></Navbar>
        <div className="personal-info">
          <div className="left-section">
            <div
              className="profile-picture"
              style={{
                backgroundImage: `url('http://localhost:8000${profilePictureUrl}')`,
              }}
            >
              {/* Profile picture content */}
            </div>
            <button
              className="photo-upload-button button"
              type="button"
              onClick={handlePhotoUpload}
            >
              <span class="button__text">Upload Photo</span>
              <span class="button__icon">
                <svg
                  class="feather feather-upload"
                  fill="none"
                  height="24"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </span>
            </button>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />

            <button className="edit_btn" onClick={toggleEditMode}>
              <span class="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" class="icon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                </svg>
              </span>
              <p class="text">{isEditMode ? "Save" : "Edit"}</p>
            </button>
          </div>
          <div className="right-section">
            <form className="info_form">
              <label className="info_label">Name</label>
              <div className="InputContainer">
                <input
                  className="personal_input"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <label className="info_label">Email</label>
              <div className="InputContainer">
                <input
                  className="personal_input"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Personal;
