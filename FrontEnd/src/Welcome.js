import React from 'react'
import './Welcome.css'
import diamond from './images/,.png'
import antidesign from './images/ant-design_login-outlined.png'
import deliv from './images/Approved Delivery.png'
import screenopt from './images/dashicons_screenoptions.png'
import yea from './images/fa-solid_vote-yea.png'
import cursor from './images/Hand Cursor.png'
import key from './images/Key.png'
import lock from './images/Lock.png'
import lp from './images/Low Price.png'
import reg from './images/registration 1.png'
import tspan from './images/Time Span.png'
import scrnopt from './images/dashicons_screenoptions.png'
import { useNavigate } from 'react-router-dom'

export const Welcome = () => {
  const navigate = useNavigate()
  
  
  return (
    <div className="Welcome">
      <section>
        <div className="top">
          <div className="column poster"></div>
          <div className="column info">
            <h2>DeVote</h2>
            <br />
            <h1>Vote Today</h1>
            <br />
            <br />
            <div className="buttons">
              <a className="register_button" href="/signup">
                Register
              </a>
              <a href="/login" className="login_button">
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="features">
          <div className="title">
            <h1>Features</h1>
          </div>
          <div className="properties">
            <div className="icons">
              <ul>
                <li>
                  <img src={lock} alt="lock" />
                </li>
                <li>
                  <img src={diamond} alt="diamond" />
                </li>
                <li>
                  <img src={yea} alt="yea" />
                </li>
                <li>
                  <img src={cursor} alt="cursor" />
                </li>
                <li>
                  <img src={lp} alt="lp" />
                </li>
                <li>
                  <img src={tspan} alt="tspan" />
                </li>
              </ul>
            </div>
            <div className="list">
              <ul>
                <li>Secured by 256 bit encryption</li>
                <li>Backed by ethereum based technology</li>
                <li>Verifiable transactions</li>
                <li>Easy to use</li>
                <li>Cheaper than ballot voting system</li>
                <li>Faster voting process</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="about">
          <div className="title">
            <h1>About</h1>
          </div>
          <div className="descrip">
            <p>
              An online voting system that will replace the old ballot sytem or
              paper system. Over the time, we have utilized the required
              technology in every sector to improve efficiency and save the
              extra resources. But the voting system is still very expensive and
              requires a bigger workforce. The system is slower and still not
              completely tamper proof. We bring the system that is safe,
              reliable and solve the modern issues like higher reachability of
              the booth, crowd free voting, inexpensive, faster results and
              others.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="how_to">
          <h1 className="title2">Follow these steps</h1>
          <div className="properties">
            <div className="icons">
              <ul>
                <li>
                  <img src={reg} alt="reg" />
                </li>
                <li>
                  <img src={antidesign} alt="yea" />
                </li>
                <li>
                  <img src={screenopt} alt="screenopt" />
                </li>
                <li>
                  <img src={key} alt="key" />
                </li>
                <li>
                  <img src={yea} alt="tspan" />
                </li>
              </ul>
            </div>
            <div className="list">
              <ul>
                <li>Register yourself by filling the required informations</li>
                <li>Signin as user</li>
                <li>Go to vote option on dashboard</li>
                <li>Give security key</li>
                <li>Vote your candidate and submit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
