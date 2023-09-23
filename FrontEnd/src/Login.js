import './Login.css'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const navigate = useNavigate ();
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  function sendPostRequest(data) {
    axios.post('http://localhost:8000/auth/login', data)
      .then((response) => {
        // Handle the successful response here
        console.log('POST request successful:', response.data.token);
        localStorage.setItem('token', response.data.token);
        window.alert(response.data.token)
        navigate("/personal")
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error sending POST request:', error.message);
        window.alert(error.message)
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
    let data={"email":email,
    "password":password
  }
  sendPostRequest(data)
  }

  return (
    <div className="form_page">
      <form className="login_form" action="" onSubmit={handleSubmit}>
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
        <button className="login_btn" type="submit">
          Login
        </button>
        <br />
        <br />
        <button
          className="reg_btn"
          onClick={() =>navigate('/signup')}
        >
          Don't have an account? Signup
        </button>
      </form>
    </div>
  )
}
