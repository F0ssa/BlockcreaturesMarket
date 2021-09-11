import React, { Component } from 'react'
import '../components/Table.css'
import * as RiIcons from 'react-icons/ri'

interface Props {
  PREFIX: string
  type: string
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formSpacing: {
    marginTop: '20px',
  },
  numberInputLeft: {
    color: 'hsl(0, 0%, 85%)',
    width: '180px',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid hsl(0, 0%, 25%)',
    marginRight: '2px',
    marginBottom: '5px',
  },
  numberInputRight: {
    color: 'hsl(0, 0%, 85%)',
    width: '180px',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid hsl(0, 0%, 25%)',
    marginLeft: '2px',
    marginBottom: '5px',
  },
}

class FilterForm extends Component<Props> {
  state = {
    minValue: 0,
    maxValue: 0,
  }

  componentDidMount() {
    this.loadLocalStorage()
  }

  async loadLocalStorage() {
    const localValues = JSON.parse(
      localStorage.getItem(this.props.PREFIX) || '[]'
    )
    if (localValues.length > 0) {
      await this.setState({
        minValue: localValues[0],
        maxValue: localValues[1],
      })
    } else {
      this.resetFilterValues()
    }
  }

  async resetFilterValues() {
    localStorage.setItem(this.props.PREFIX, JSON.stringify([0, 1000]))
    await this.setState({
      minValue: '0',
      maxValue: '1000',
    })
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (localStorage.getItem(this.props.PREFIX) !== undefined) {
      this.resetFilterValues()
    } else {
      this.loadLocalStorage()
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault()
    await this.setState({ [e.target.name]: e.target.value })

    localStorage.setItem(
      this.props.PREFIX,
      JSON.stringify([Number(this.state.minValue), Number(this.state.maxValue)])
    )
    await this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <div style={styles.formSpacing}>
          <form
            style={styles.formContainer}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input
              style={styles.numberInputLeft}
              type="number"
              min={0}
              max={this.state.maxValue}
              value={this.state.minValue}
              onChange={(e) => this.handleChange(e)}
              name="minValue"
              placeholder="Min Value"
              step="any"
            />
            <input
              style={styles.numberInputRight}
              type="number"
              min={this.state.minValue}
              max={2000}
              value={this.state.maxValue}
              onChange={(e) => this.handleChange(e)}
              name="maxValue"
              placeholder="Max Value"
              step="any"
            />
            <button
              type="submit"
              className="h-button centered hoverTextCenter"
              data-text={`Reset ${this.props.type}`}
            >
              <span>
                <RiIcons.RiFilterOffLine size={20} />
              </span>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default FilterForm
