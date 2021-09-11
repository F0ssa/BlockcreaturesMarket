import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import './SkeletonLoad.css'

// interface Props {}
// interface State {}
const loopList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

class SkeletonLoad extends Component {
  state = {}

  render() {
    return (
      <div>
        <div id="overlay">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {loopList.map((item, index) => (
          <div key={`skeleton-${index}`} className="skeleton-wrapper-card">
            <Grid container spacing={3}>
              <Grid container item xs={2} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={3} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={1} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={1} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={1} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={2} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={1} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
              <Grid container item xs={1} spacing={1}>
                <div className="skeleton-row"></div>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    )
  }
}

export default SkeletonLoad
