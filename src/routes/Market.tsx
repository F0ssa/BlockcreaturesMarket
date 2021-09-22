import React, { Component } from 'react'
import TableContainer from '../components/TableContainer'
import FilterContainer from '../filter/FilterContainer'

class Market extends Component {
  state = {}

  render() {
    return (
      <div>
        <div>
          <FilterContainer />
        </div>
        <div>
          <TableContainer />
        </div>
      </div>
    )
  }
}

export default Market
