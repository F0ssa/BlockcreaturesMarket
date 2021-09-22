import React from 'react'
import * as GiIcons from 'react-icons/gi'
import './navigation.css'
import { Link } from 'react-router-dom'

const styles: { [key: string]: React.CSSProperties } = {
  navItemOverride: {
    color: 'hsl(0, 0%, 85%)',
    fontSize: '18px',
    textDecoration: 'none',
    margin: '0.4em',
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'auto',
  },
}

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
            <li className="navbar-item">
              <Link style={styles.navItemOverride} to="/">
                Market
              </Link>
            </li>
            <li className="navbar-item">
              <Link style={styles.navItemOverride} to="/reward">
                Reward Calculation
              </Link>
            </li>
            <li className="navbar-item">
              <Link style={styles.navItemOverride} to="/search">
                Search
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
