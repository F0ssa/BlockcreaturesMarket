import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import './FormRow.css'
import FormRowData from './FormRowData'

type CreepData = {
  id: number
  rarity: string
  lvl: number
  boost: number
  exp: number
  exp2next: number
  rate: number
  price: number
  currentPage: number
  nextPage: number
}

interface Props {
  creep: CreepData
}
// interface State {}

class FormRow extends Component<Props> {
  state = {}

  render() {
    return (
      <div>
        <div
          className={`form-wrapper border-${this.props.creep.rarity.toLowerCase()}`}
        >
          <Grid container spacing={3}>
            <Grid container item xs={2} spacing={1}>
              <div className="form-row">{this.props.creep.id}</div>
            </Grid>
            <Grid container item xs={3} spacing={1}>
              <div className="form-row">{this.props.creep.rarity}</div>
            </Grid>
            <Grid container item xs={1} spacing={1}>
              <div className="form-row">{this.props.creep.lvl}</div>
            </Grid>
            <Grid container item xs={1} spacing={1}>
              <div className="form-row">{this.props.creep.boost}</div>
            </Grid>
            <Grid container item xs={1} spacing={1}>
              <div className="form-row">{this.props.creep.exp}</div>
            </Grid>
            <Grid container item xs={2} spacing={1}>
              <div className="form-row">{this.props.creep.exp2next}</div>
            </Grid>
            <Grid container item xs={1} spacing={1}>
              <div className="form-row">{this.props.creep.rate}</div>
            </Grid>
            <Grid container item xs={1} spacing={1}>
              <div className="form-row">{this.props.creep.price}</div>
            </Grid>
          </Grid>
          <div className={`more-content`}>
            <FormRowData rate={this.props.creep.rate} />
          </div>
        </div>
      </div>
    )
  }
}

export default FormRow
