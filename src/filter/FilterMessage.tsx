import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert'
import { Collapse, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const styles: { [key: string]: React.CSSProperties } = {
  alertClose: {
    marginTop: '10px',
    marginBottom: '30px',
  },
  alertColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'hsl(0, 0%, 85%)',
    letterSpacing: '2px',
  },
}

class FilterMessage extends Component {
  state = {
    open: true,
  }

  render() {
    return (
      <div>
        <Collapse in={this.state.open}>
          <div style={styles.alertClose}>
            <Alert
              severity="info"
              style={styles.alertColor}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({ open: false })
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <p>
                Note: After changing any filters, you will need to re-apply the
                filters. <b>Click &quot;Filter Data&quot;</b>. You can also just
                toggle on and off the filter switch.
                <br />
                <br />
                <b>All inputs must have a value, or results will be null!</b>
              </p>
              <br />
              <p>
                <b>Default Values</b>
              </p>
              <p>
                <b>Rarity:</b> All
              </p>
              <p>
                <b>Price:</b> Minimum: 0, Maximum: 1000
              </p>
              <p>
                <b>Rate:</b> Minimum: 0, Maximum: 1000
              </p>
              <p>
                <b>Level:</b> Minimum: 0, Maximum: 1000
              </p>
            </Alert>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default FilterMessage
