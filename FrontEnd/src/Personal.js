import './Personal.css'
import { useState } from 'react'
import { Navbar } from './Navbar'
import axios from 'axios'

export const Personal = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  // User's personal information data (initial values)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Add more fields as needed
  })

  // Function to handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const handlePhotoUpload = () => {
    // Trigger the file input when the button is clicked
    const fileInput = document.getElementById('photo-upload')
    fileInput.click()
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      const formData = new FormData();
      formData.append('profilePicture', file);

      reader.onload = (e) => {
        const newProfilePictureUrl = e.target.result
        const profilePictureElement = document.querySelector('.profile-picture')

        axios.post('http://localhost:8000/uploads/upload-profile-picture', formData)
      .then((response) => {
        console.log(response)
        // Handle success (e.g., show a success message)
      })
      .catch((error) => {
        console.log(error)
        // Handle error (e.g., show an error message)
      });

        // Set the selected photo as the source of the "profile-picture" element
        if (profilePictureElement) {
          profilePictureElement.style.backgroundImage = `url('${newProfilePictureUrl}')`
        }

        // You can also update the UI state or perform other actions as needed.
        // For example, if you're using React state:
        // this.setState({ profilePictureUrl: newProfilePictureUrl });
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="Personal">
      <section>
        <Navbar></Navbar>
        <div className="personal-info">
          <div className="left-section">
            <div className="profile-picture">
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
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />

            <button className="edit_btn" onClick={toggleEditMode}>
              <span class="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" class="icon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                </svg>
              </span>
              <p class="text">{isEditMode ? 'Save' : 'Edit'}</p>
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
  )
}
export default Personal
