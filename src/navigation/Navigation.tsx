import React from 'react'
import * as GiIcons from 'react-icons/gi'
import './navigation.css'

export const Navigation = () => {
  return (
    <div id="navbar">
      <nav className="navbar-container container">
        <a href="/" className="home-link">
          <div>
            <GiIcons.GiStoneBlock className="navbar-logo" />
          </div>
          BlockCreatures Market
        </a>
        <div className="navbar-menu">
          <ul className="navbar-links">
            {/* <li className="navbar-item"></li> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}
