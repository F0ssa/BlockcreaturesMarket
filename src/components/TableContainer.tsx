import React, { Component } from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Table from './Table'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const styles: { [key: string]: React.CSSProperties } = {
  waitingContainer: {
    marginTop: '50px',
    marginBottom: '30px',
  },
  alertColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'hsl(0, 0%, 85%)',
    border: '2px solid hsl(0, 0%, 25%)',
    padding: '15px',
    letterSpacing: '2px',
  },
}

class TableContainer extends Component {
  state = {
    isAlive: false,
  }

  // while isAlive is false, loop through and call server /status
  // if statement, 10 second delay to provide server uptime response
  // and reduce server bandwith and network conjestion
  async componentDidMount() {
    while (!this.state.isAlive) {
      this.triggerKeepAlive()
      if (!this.state.isAlive) {
        await delay(10000)
      }
    }
  }

  // Trigger server to start
  // Heroku sleeps after 1 hour idle time
  async triggerKeepAlive() {
    this.setState({ isAlive: false })
    const url =
      'https://blockcreatures-marketplace.herokuapp.com/blockcreatures/server_status'
    // const url = 'http://127.0.0.1:5000/blockcreatures/server_status'
    let localIsAlive = false
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (localIsAlive = data.status))

    await delay(5000)
    this.setState({ isAlive: localIsAlive })
  }

  render() {
    return (
      <div>
        <Container maxWidth="xl">
          {!this.state.isAlive ? (
            <Container style={styles.waitingContainer} maxWidth="md">
              <Alert
                style={styles.alertColor}
                icon={<CircularProgress size={20} />}
                severity="success"
              >
                Waiting for server to start. — Should only take a few seconds!
              </Alert>
            </Container>
          ) : (
            <Table isAlive={this.state.isAlive} />
          )}
        </Container>
      </div>
    )
  }
}

export default TableContainer
