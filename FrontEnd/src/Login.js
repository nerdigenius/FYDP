import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
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
        <button className='reg_btn' onClick={() => props.onFormSwitch('register')}>
          Don't have an account? Signup
        </button>
      </form>
    </div>
  )
}
