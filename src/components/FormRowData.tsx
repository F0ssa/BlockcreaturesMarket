import React, { Component } from 'react'
import './FormRowData.css'

interface Props {
  rate: number
}

const FIGHTLIMIT = [1, 2, 3]
const DAYS = [1, 7, 30, 365]

class FormRowData extends Component<Props> {
  state = {}

  getFightTwice(creepRate: number, dayMultiplier: number) {
    return creepRate * dayMultiplier
  }

  roundNumber(longNumber: number) {
    const rounded = Math.round(longNumber * 100) / 100
    return rounded.toFixed(2)
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Fights Per Day</th>
            <th>1 Day</th>
            <th>7 Days</th>
            <th>30 Days</th>
            <th>365 Days</th>
          </tr>
          {FIGHTLIMIT.map((item) => (
            <tr key={`fight-limit-${item}`}>
              <td>{item}</td>
              <td>{this.props.rate * item}</td>
              <td>
                {this.roundNumber(
                  this.getFightTwice(this.props.rate, item) * DAYS[1]
                )}
              </td>
              <td>
                {this.roundNumber(
                  this.getFightTwice(this.props.rate, item) * DAYS[2]
                )}
              </td>
              <td>
                {this.roundNumber(
                  this.getFightTwice(this.props.rate, item) * DAYS[3]
                )}
              </td>
            </tr>
          ))}
        </table>
        <p className="disclaimerText">
          Note: Calculation uses the current monsters rate. It does not take
          into account of gas fees, losing trainning or the rate value increase
          per level up.
        </p>
      </div>
    )
  }
}

export default FormRowData
