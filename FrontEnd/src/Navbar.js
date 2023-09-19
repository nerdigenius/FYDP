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
              <a href="#">Your Elections</a>
            </li>
            <li>
              <button class="vote_btn ui-btn" id='vote_btn'>
                <span>Vote</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
