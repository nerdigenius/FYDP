import { useState } from 'react'
import './Register.css'

export const Register = (props) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
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
          onClick={() => props.onFormSwitch('login')}
        >
          Already have an account? Login
        </button>
      </form>
      <br />
    </div>
  )
}
