import React from 'react'
import './UrElections.css'
import { useState } from 'react'
import { Navbar } from './Navbar'

export const UrElections = () => {
  return (
    <div className="UrElections">
      <Navbar />
      <section>
        <div className='cand_list'>
          <h1 className='cand_title'>Candidates</h1>
          <div className="cand_table">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
