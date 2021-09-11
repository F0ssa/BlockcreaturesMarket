/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from 'react'
import './FilterDropdown.css'
import * as RiIcons from 'react-icons/ri'

interface Props {
  PREFIX: string
  type: string
}

const CREEPS = [
  { type: 'all' },
  { type: 'common' },
  { type: 'uncommon' },
  { type: 'rare' },
  { type: 'epic' },
  { type: 'legendary' },
  { type: 'mythic' },
  { type: 'godlike' },
]

const styles: { [key: string]: React.CSSProperties } = {
  dropdownContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: '0 auto',
    alignItems: 'stretch',
    width: '100%',
    marginTop: '20px',
  },
  buttonSpacing: {
    marginTop: '5px',
  },
}

class FilterDropdown extends Component<Props> {
  state = {
    creepType: CREEPS,
    selectedRarity: 'all',
  }

  componentDidMount() {
    this.loadLocalStorage()
  }

  async loadLocalStorage() {
    const localValues = JSON.parse(
      localStorage.getItem(this.props.PREFIX) || '{}'
    )
    if (localValues.length > 0) {
      await this.setState({
        selectedRarity: localValues,
      })
    } else {
      this.setDefault()
    }
  }

  setDefault() {
    localStorage.setItem(this.props.PREFIX, JSON.stringify('ALL'))
    this.setState({ selectedRarity: 'all' })
  }

  async handleRarityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const raritySelection = e.target.value
    await this.setState({ selectedRarity: raritySelection })
    localStorage.setItem(this.props.PREFIX, JSON.stringify(raritySelection))
  }

  render() {
    return (
      <div style={styles.dropdownContainer}>
        <div className="selectDropdown">
          <select
            // style={styles.formSpacing}
            value={this.state.selectedRarity}
            onChange={(e) => this.handleRarityChange(e)}
          >
            {this.state.creepType.map((item, index) => (
              <option
                key={`Creep-Index-${index}`}
                value={item.type.toUpperCase()}
              >
                {item.type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.buttonSpacing}>
          <button
            type="submit"
            className="h-button centered hoverTextCenter"
            data-text={`Reset ${this.props.type}`}
            onClick={() => this.setDefault()}
          >
            <span>
              <RiIcons.RiFilterOffLine size={20} />
            </span>
          </button>
        </div>
      </div>
    )
  }
}

export default FilterDropdown
