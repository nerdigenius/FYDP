import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const sendPostRequest = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/auth/login', data);
      await localStorage.setItem('token', response.data.token);
      window.location.href='/personal'
      
    } catch (error) {
      console.log(error)
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message
    const data = {
      email: email,
      password: password,
    };
    sendPostRequest(data);
  };

  return (
    <div className="Login">
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
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            placeholder="******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            required
          />
          <br />
          <br />
          {error && <p className="error-message">{error}</p>}
          <button className="login_btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <br />
          <br />
          <button className="reg_btn" onClick={() => navigate('/signup')}>
            Don't have an account? Signup
          </button>
        </form>
      </div>
    </div>
  )
};
