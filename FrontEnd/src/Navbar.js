import React from 'react'
import './Navbar.css'

export const Navbar = () => {
  return (
    <section>
      <div className="container">
        <div className="menubar">
          <a href="#" className="logo">
            DeVote
          </a>
          <ul>
            <li>
              <a href="#">Personal Info</a>
            </li>
            <li>
              <a href="#">Elections</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <button className="vote_btn">Vote</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
