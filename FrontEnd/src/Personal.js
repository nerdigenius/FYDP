import './Personal.css'
import { useState } from 'react'
import { Navbar } from './Navbar'

export const Personal = () => {
  // return (
  //   <div className="Personal">
  //     <section>
  //       <Navbar />
  //     </section>
  //     <section>
  //       <div className="container">
  //         <div className="photo">
  //           <button>change picture</button>
  //           <button>edit profile</button>
  //         </div>
  //         <div className="info">

  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // )

  const [isEditMode, setIsEditMode] = useState(false)

  // User's personal information data (initial values)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
    address: '123 Main St',
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

  return (
    <div className="Personal">
      <section>
        <Navbar></Navbar>.
        <div className="personal-info-page">
          <div className="left-column">
            
            <div className="profile-picture">
            
            </div>
            <button>Change Profile Picture</button>
            <button onClick={toggleEditMode}>
              {isEditMode ? 'Save' : 'Edit Profile'}
            </button>
          </div>
          <div className="right-column">
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
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
