import React from 'react'
import './Elections.css'
import { Navbar } from './Navbar'

export const Elections = () => {
  const activeElections = [
    { id: 1, title: 'Election 1' },
    { id: 2, title: 'Election 2' },
    { id: 3, title: 'Election 3' },
  ]

  const hostedElections = [
    { id: 1, title: 'Election A', link: '/electionA' },
    { id: 2, title: 'Election B', link: '/electionB' },
    { id: 3, title: 'Election C', link: '/electionC' },
  ]

  return (
    <div className="Elections">
      <section>
        <Navbar />
        <div className="list_container">
          <div className="active_elec">
            <h1>Active Elections</h1>
            <ul>
              {activeElections.map((election) => (
                <li>
                  <h3 key={election.id}>{election.title}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="hosted_elec">
            <h1>Hosted Elections</h1>
            <ul>
              {hostedElections.map((election) => (
                <li key={election.id}>
                  <a href={election.link}>{election.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
