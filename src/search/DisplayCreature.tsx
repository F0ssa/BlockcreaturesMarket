import React, { Component } from 'react'
import './DisplayCreature.css'

interface Props {
  creepData: CreepData[]
  imageLink: string
}

type CreepData = {
  id: number
  rarity: string
  lvl: number
  boost: string
  exp: string
  exp2next: string
  rate: string
  price: string
}

class DisplayCreature extends Component<Props> {
  render() {
    return this.props.creepData.length >= 0 ? (
      <div>
        <div className="frame">
          <div className="center">
            <div className="profile">
              <div className="image">
                <img
                  src={this.props.imageLink}
                  width="200"
                  height="200"
                  alt={`token-${this.props.creepData[0].id}-type-${this.props.creepData[0].rarity}`}
                />
              </div>
            </div>

            <div className="stats">
              <div className="box">
                <span className="value">{this.props.creepData[0].id}</span>
                <span className="parameter">Token ID</span>
              </div>
              <div className="box">
                <span className="value">{this.props.creepData[0].rarity}</span>
                <span className="parameter">Rarity</span>
              </div>
              <div className="box">
                <span className="value">{this.props.creepData[0].lvl}</span>
                <span className="parameter">Level</span>
              </div>
              <div className="box">
                <span className="value">{this.props.creepData[0].boost}</span>
                <span className="parameter">Boost</span>
              </div>
              <div className="box">
                <span className="value">{this.props.creepData[0].exp}</span>
                <span className="parameter">Experience</span>
              </div>
              <div className="box">
                <span className="value">
                  {this.props.creepData[0].exp2next}
                </span>
                <span className="parameter">Experience Till Next Level</span>
              </div>
              <div className="box">
                <span className="value">{this.props.creepData[0].rate}</span>
                <span className="parameter">Moolah Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }
}

export default DisplayCreature
