import React from 'react'

const styles: { [key: string]: React.CSSProperties } = {
  footerContainer: {
    margin: '50px',
    textAlign: 'center',
    letterSpacing: '1.5px',
  },
  discalimer: {
    margin: '5px',
    color: '#886b4d',
  },
  content: {
    margin: '5px',
    color: 'hsl(0, 0%, 85%)',
  },
  iconSize: {
    marginLeft: '5px',
    marginRight: '5px',
    width: '25px',
    height: '25px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
}

export const Footer = () => {
  return (
    <div>
      <footer style={styles.footerContainer}>
        <p style={styles.discalimer}>
          BlockCreatures Market is not associated with BlockCreatures.co
        </p>
        <p style={styles.content}>
          Made by{' '}
          <a
            style={styles.link}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/F0ssa"
          >
            F0ssa (Fossa)
          </a>
        </p>
        <p style={styles.content}>
          Donation Address:{' '}
          <span style={styles.link}>
            0xEc3218026e9da00E1673BC53961B9dc07877c3f3
          </span>
        </p>
        <img
          style={styles.iconSize}
          src="https://img.icons8.com/ios-glyphs/30/ffffff/react.png"
          alt="react-icon "
        />
        <img
          style={styles.iconSize}
          src="https://img.icons8.com/material-rounded/24/ffffff/typescript.png"
          alt="typescript-icon"
        />
        <img
          style={styles.iconSize}
          src="https://img.icons8.com/color/48/ffffff/material-ui.png"
          alt="material-ui-icon"
        />
      </footer>
    </div>
  )
}
