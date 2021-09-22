import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert'
import { Collapse, Container, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'
import * as FaIcons from 'react-icons/fa'

const styles: { [key: string]: React.CSSProperties } = {
  anonContainer: {
    marginTop: '25px',
    marginBottom: '30px',
  },
  alertClose: {
    marginTop: '10px',
    marginBottom: '30px',
  },
  alertColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'hsl(0, 0%, 85%)',
    letterSpacing: '2px',
  },
  disclaimer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'hsl(0, 0%, 85%)',
    letterSpacing: '2px',
    padding: '20px',
    lineHeight: '25px',
  },
  copyIcon: {
    cursor: 'pointer',
    paddingTop: '5px',
    color: 'white',
  },
  donoText: {
    color: 'white',
    fontWeight: 'bold',
  },
}

class Announcement extends Component {
  state = {
    open: true,
    donoAddress: '0xEc3218026e9da00E1673BC53961B9dc07877c3f3',
    isCopied: false,
  }

  copyAddress() {
    navigator.clipboard.writeText(this.state.donoAddress)
    this.setState({ isCopied: true })
  }

  handleCloseSnack() {
    this.setState({ isCopied: false })
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div style={styles.anonContainer}>
          <div>
            <Alert
              style={styles.disclaimer}
              icon={<HiIcons.HiLightBulb />}
              severity="success"
            >
              BlockCreatures Market is not associated with BlockCreatures.co.
              BlockCreatures Market{' '}
              <b>will never ask for your seed phrase or private key!</b>{' '}
              BlockCreatures Market is a simplified marketplace with sorting,
              filters, moolah reward calculations and searching.
              <br />
              Enjoy and keep safe!
            </Alert>
          </div>
          <div style={styles.alertClose}>
            <Collapse in={this.state.open}>
              <Alert
                icon={<FaIcons.FaDonate />}
                severity="warning"
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
                If you find this market useful, I accept donations thru this
                address:{' '}
                <span style={styles.donoText}>
                  0xEc3218026e9da00E1673BC53961B9dc07877c3f3
                </span>
                <MdIcons.MdContentCopy
                  onClick={() => {
                    this.copyAddress()
                  }}
                  style={styles.copyIcon}
                  size={20}
                />
              </Alert>
            </Collapse>
          </div>
          <div>
            <Snackbar
              open={this.state.isCopied}
              autoHideDuration={6000}
              onClose={() => this.handleCloseSnack()}
            >
              <Alert onClose={() => this.handleCloseSnack()} severity="success">
                Address copied to clipboard!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </Container>
    )
  }
}

export default Announcement
