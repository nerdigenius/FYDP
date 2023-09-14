import './Navbar.css'

export const Navbar = () => {
  return (
    <section>
      <div className="navbar_comp">
        <nav className="navbar">
          <a href="#" className="logo">
            #DeVote
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
              <a href="#">Vote</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
