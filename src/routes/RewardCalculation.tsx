// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from 'react'
import { Container } from '@material-ui/core'

const styles: { [key: string]: React.CSSProperties } = {
  continued: {
    marginTop: '30px',
    color: 'white',
    textAlign: 'center',
  },
  centerDiv: {
    margin: '0 auto',
  },
}

class RewardCalculation extends Component {
  state = {}

  render() {
    return (
      <div>
        <Container maxWidth="md">
          <div style={styles.centerDiv}>
            <h1 style={styles.continued}>
              Reward Calculation
              <br />
              Coming soon...
            </h1>
          </div>
        </Container>
      </div>
    )
  }
}

export default RewardCalculation
