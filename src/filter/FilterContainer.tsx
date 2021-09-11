import React, { Component } from 'react'

type CreepData = {
  id: string
  rarity: string
  lvl: string
  boost: string
  exp: string
  exp2next: string
  rate: string
  price: string
  currentPage: number
  nextPage: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  priceFilters: number[]
  rateFilters: number[]
  levelFilters: number[]
  rarityFilters: string
  originalData: CreepData[]
  filteredArray: CreepData[]
}

const FILTERPREFIX = 'blockcreatures-market-filter-'
const PRICEPREFIX = 'price'
const RATEPREFIX = 'rate'
const LEVELPREFIX = 'level'
const RARITYPREFIX = 'rarity'

class FilterContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  async getPriceFilter() {
    const prefixPrice = FILTERPREFIX + PRICEPREFIX
    let localPriceFilter: number[] = []
    if (localStorage.getItem(prefixPrice) === undefined) {
      console.log('No local storage data...')
    } else {
      localPriceFilter = JSON.parse(localStorage.getItem(prefixPrice) || '[]')
      return localPriceFilter
    }
  }

  async getRateFilter() {
    const prefix = FILTERPREFIX + RATEPREFIX
    let localRateFilter: number[] = []
    if (localStorage.getItem(prefix) === undefined) {
      console.log('No local storage data...')
    } else {
      localRateFilter = JSON.parse(localStorage.getItem(prefix) || '[]')
      return localRateFilter
    }
  }

  async getLevelFilter() {
    const prefix = FILTERPREFIX + LEVELPREFIX
    let localLevelFilter: number[] = []
    if (localStorage.getItem(prefix) === undefined) {
      console.log('No local storage data...')
    } else {
      localLevelFilter = JSON.parse(localStorage.getItem(prefix) || '[]')
      return localLevelFilter
    }
  }

  async getRarityFilter() {
    const prefix = FILTERPREFIX + RARITYPREFIX
    let localRarityFilter: string
    if (localStorage.getItem(prefix) === undefined) {
      console.log('No local storage data...')
    } else {
      localRarityFilter = JSON.parse(localStorage.getItem(prefix) || '[]')
      // this.setState({ rarityFilters: localRarityFilter })
      return localRarityFilter
    }
  }

  render() {
    return <div></div>
  }
}

export default FilterContainer
