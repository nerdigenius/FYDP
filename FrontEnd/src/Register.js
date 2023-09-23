import { useState } from 'react'
import './Register.css'
import axios from 'axios';


export const Register = (props) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let data={"email":email,
    "password":password,
    "username":name
  }
  sendPostRequest(data)
    console.log(email)
  }

  function sendPostRequest(data) {
    axios.post('http://localhost:8000/auth/signup', data)
      .then((response) => {
        // Handle the successful response here
        console.log('POST request successful:', response.data.message);
        window.alert(response.data.message)
        window.location.href="/"
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error sending POST request:', error);
      });
  }

  return (
    <div className="reg_page">
      <form className="reg_form" action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Username"
        />
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="youremail@email.com"
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          placeholder="******"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          name="password"
          id="password"
        />
        <br />
        <br />
        <button className="signup_btn" type="submit">
          Signup
        </button>
        <br />
        <br />
        <button
          className="login_btn"
          onClick={() => window.location.href = '/'}
        >
          Already have an account? Login
        </button>
      </form>
      <br />
    </div>
  )
}
