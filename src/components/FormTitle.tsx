import { Grid, Button } from '@material-ui/core'
import React, { Component } from 'react'
import './FormTitle.css'
import * as MdIcons from 'react-icons/md'
import * as GoIcons from 'react-icons/go'

interface Props {
  sortIdFunc: () => void
  sortRarityFunc: () => void
  sortLevelFunc: () => void
  sortBoostFunc: () => void
  sortExpFunc: () => void
  sortExpNextFunc: () => void
  sortRateFunc: () => void
  sortPriceFunc: () => void
  sortIdState: number
  sortRarityState: number
  sortLevelState: number
  sortBoostState: number
  sortExpState: number
  sortExpNextState: number
  sortRateState: number
  sortPriceState: number
}
// interface State {}

const styles: { [key: string]: React.CSSProperties } = {
  buttonStyle: {
    width: '100%',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
  },
  buttonPrice: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
  },
}

class FormTitle extends Component<Props> {
  state = {}

  render() {
    return (
      <div className="title-wrapper">
        <Grid container spacing={3}>
          <Grid container item xs={2} spacing={1}>
            <div className="title-row">
              <Button
                style={styles.buttonStyle}
                onClick={() => this.props.sortIdFunc()}
              >
                ID{' '}
                {this.props.sortIdState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortIdState === -1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortIdState === 1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={3} spacing={1}>
            <div className="title-row">
              <Button
                style={styles.buttonStyle}
                onClick={() => this.props.sortRarityFunc()}
              >
                Raritiy{' '}
                {this.props.sortRarityState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortRarityState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortRarityState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={1} spacing={1}>
            <div className="title-row">
              <Button
                style={styles.buttonPrice}
                onClick={() => this.props.sortLevelFunc()}
              >
                Level{' '}
                {this.props.sortLevelState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortLevelState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortLevelState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={1} spacing={1}>
            <div className="title-row">
              {' '}
              <Button
                style={styles.buttonPrice}
                onClick={() => this.props.sortBoostFunc()}
              >
                Boost{' '}
                {this.props.sortBoostState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortBoostState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortBoostState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={1} spacing={1}>
            <div className="title-row">
              {' '}
              <Button
                style={styles.buttonStyle}
                onClick={() => this.props.sortExpFunc()}
              >
                EXP{' '}
                {this.props.sortExpState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortExpState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortExpState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={2} spacing={1}>
            <div className="title-row">
              {' '}
              <Button
                style={styles.buttonStyle}
                onClick={() => this.props.sortExpNextFunc()}
              >
                EXP Next{' '}
                {this.props.sortExpNextState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortExpNextState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortExpNextState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={1} spacing={1}>
            <div className="title-row">
              {' '}
              <Button
                style={styles.buttonPrice}
                onClick={() => this.props.sortRateFunc()}
              >
                Rate{' '}
                {this.props.sortRateState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortRateState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortRateState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
          <Grid container item xs={1} spacing={1}>
            <div className="title-row">
              {' '}
              <Button
                style={styles.buttonPrice}
                onClick={() => this.props.sortPriceFunc()}
              >
                Price{' '}
                {this.props.sortPriceState === 0 ? (
                  <GoIcons.GoDash size={20} />
                ) : null}
                {this.props.sortPriceState === 1 ? (
                  <MdIcons.MdArrowDropDown size={20} />
                ) : null}
                {this.props.sortPriceState === -1 ? (
                  <MdIcons.MdArrowDropUp size={20} />
                ) : null}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default FormTitle
