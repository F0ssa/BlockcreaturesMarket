/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from 'react'
import {
  Container,
  Grid,
  Switch,
  FormControlLabel,
  Collapse,
} from '@material-ui/core'
import FormRow from './FormRow'
import FormTitle from './FormTitle'
import SkeletonLoad from '../loader/SkeletonLoad'
import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'
import * as RiIcons from 'react-icons/ri'
import './Table.css'
import Announcement from './Announcement'
import FilterContainer from '../filter/FilterContainer'
import FilterForm from '../filter/FilterForm'
import FilterDropdown from '../filter/FilterDropdown'
import FilterMessage from '../filter/FilterMessage'

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

const styles: { [key: string]: React.CSSProperties } = {
  groupMargin: {
    marginTop: '20px',
  },
  buttonLeft: {
    display: 'flex',
    alignContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'flex-end',
  },
  buttonRight: {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pageTitle: {
    fontSize: '16px',
    color: 'hsl(0, 0%, 85%)',
    marginBottom: '5px',
  },
  buttonFilterSpacing: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  buttonFilterBorder: {
    border: '1px solid white',
  },
  filterContainer: {
    backgroundColor: '#222222',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  switchColor: {
    color: 'hsl(0, 0%, 85%)',
  },
  dataErrorContainer: {
    padding: '10px',
    margin: '0 auto',
    textAlign: 'center',
    color: 'hsl(0, 0%, 85%)',
  },
}

interface Props {
  isAlive: boolean
}
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const SORTPREFIX = 'blockcreatures-market-sort'
const SORTPREFIXDIR = 'blockcreatures-market-direction'

const FILTERPREFIX = 'blockcreatures-market-filter-'
const PRICEPREFIX = 'price'
const RATEPREFIX = 'rate'
const LEVELPREFIX = 'level'
const RARITYPREFIX = 'rarity'
const LOADFILTERPREFIX = 'load'
const COLLAPSEDFILTERPREFIX = 'collapsed'

class Table extends Component<Props> {
  private filterContainer
  constructor(props: Props) {
    super(props)
    this.filterContainer = new FilterContainer(props)
  }
  state = {
    marketData: [],
    orginalData: [],
    isMarketLoaded: false,
    isSorted: false,
    pageList: [],
    page: 1,
    lastPage: 0,
    isLastPage: false,
    sortId: 0,
    sortRarity: 0,
    sortLevel: 0,
    sortBoost: 0,
    sortExp: 0,
    sortExpNext: 0,
    sortRate: 0,
    sortPrice: 0,
    selectedSort: 'none', // none || feildName
    selectedDirection: 0, // -1, 0, 1
    priceFilters: [],
    rateFilters: [],
    levelFilters: [],
    rarityFilters: '',
    filteredArray: [],
    isAppliedFilters: false,
    isCollapsedFilter: false,
  }

  componentDidMount() {
    // let users decided for recent or markeplace on load?? === LocalStorage
    // this.getRecentMarket()
    this.loadUserFilterSettings()
    if (this.props.isAlive) {
      this.getMarketPage(0)
      // this.getRecentMarket()
      this.getLastPage()
    }
  }

  async loadUserFilterSettings() {
    const prefixLoad = FILTERPREFIX + LOADFILTERPREFIX
    const prefixCollapsed = FILTERPREFIX + COLLAPSEDFILTERPREFIX
    const localLoadFilterStatus = JSON.parse(
      localStorage.getItem(prefixLoad) || 'false'
    )

    const localFilterCollapedStatus = JSON.parse(
      localStorage.getItem(prefixCollapsed) || 'false'
    )

    localStorage.setItem(prefixLoad, JSON.stringify(localLoadFilterStatus))
    localStorage.setItem(
      prefixCollapsed,
      JSON.stringify(localFilterCollapedStatus)
    )
    await this.setState({
      isAppliedFilters: Boolean(localLoadFilterStatus),
      isCollapsedFilter: Boolean(localFilterCollapedStatus),
    })
  }

  async handleFilterOnLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const prefix = FILTERPREFIX + LOADFILTERPREFIX
    localStorage.setItem(prefix, JSON.stringify(e.target.checked))
    this.setState({ isAppliedFilters: e.target.checked })
    if (e.target.checked) {
      this.filterTrigger()
    } else {
      await this.setState({ marketData: this.state.orginalData })
    }
  }

  async handleFilterCollapsed(e: React.ChangeEvent<HTMLInputElement>) {
    const prefix = FILTERPREFIX + COLLAPSEDFILTERPREFIX
    localStorage.setItem(prefix, JSON.stringify(e.target.checked))
    this.setState({ isCollapsedFilter: e.target.checked })
  }

  async filterTrigger() {
    await this.setState({ isMarketLoaded: false })
    await this.filterAllFields()
    await this.setState({ isMarketLoaded: true })
  }

  async filterAllFields() {
    let rarityList: string | undefined = ''
    let priceList: number[] | undefined = []
    let rateList: number[] | undefined = []
    let levelList: number[] | undefined = []
    let localData: CreepData[] = []
    let new_arr: CreepData[] = []

    rarityList = await this.filterContainer.getRarityFilter()
    priceList = await this.filterContainer.getPriceFilter()
    rateList = await this.filterContainer.getRateFilter()
    levelList = await this.filterContainer.getLevelFilter()
    localData = this.state.orginalData

    await this.setState({
      rarityFilters: rarityList,
      priceFilters: priceList,
      rateFilters: rateList,
      levelFilters: levelList,
    })

    if (rarityList !== 'ALL') {
      new_arr = localData.filter(
        (item) =>
          Number(item.price) >= this.state.priceFilters[0] &&
          Number(item.price) <= this.state.priceFilters[1] &&
          Number(item.rate) >= this.state.rateFilters[0] &&
          Number(item.rate) <= this.state.rateFilters[1] &&
          Number(item.lvl) >= this.state.levelFilters[0] &&
          Number(item.lvl) <= this.state.levelFilters[1] &&
          item.rarity === this.state.rarityFilters
      )
    } else {
      new_arr = localData.filter(
        (item) =>
          Number(item.price) >= this.state.priceFilters[0] &&
          Number(item.price) <= this.state.priceFilters[1] &&
          Number(item.rate) >= this.state.rateFilters[0] &&
          Number(item.rate) <= this.state.rateFilters[1] &&
          Number(item.lvl) >= this.state.levelFilters[0] &&
          Number(item.lvl) <= this.state.levelFilters[1]
      )
    }
    await this.setState({ marketData: new_arr })
  }

  async getLastPage() {
    this.setState({ isLastPage: false })
    // const url ='https://blockcreatures-marketplace.herokuapp.com/blockcreatures/lastpage'
    const url = 'http://127.0.0.1:5000/blockcreatures/lastpage'
    let localLastPage = 0
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (localLastPage = data))

    this.setState({ lastPage: localLastPage, isLastPage: true })
    this.createPageOptions(localLastPage)
  }

  // create an array list of pages for dropdown select
  async createPageOptions(lastPage: number) {
    const options = []
    for (let i = 0; i < lastPage; i++) {
      options.push(i + 1)
    }
    await delay(100)
    this.setState({ pageList: options })
  }

  async handlePageSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const localPageNumber = Number(e.target.value)
    await delay(100)
    this.setState({ page: localPageNumber })
    await this.getMarketPage(0)
  }

  async getRecentMarket() {
    this.resetSortValues()
    this.setState({ isMarketLoaded: false })
    // const url ='https://blockcreatures-marketplace.herokuapp.com/blockcreatures/recent'
    const url = 'http://127.0.0.1:5000/blockcreatures/recent'
    let localArray: CreepData[] = []
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (localArray = data))

    // await delay(2000)
    this.setState({
      marketData: localArray,
      orginalData: localArray,
      isMarketLoaded: true,
      page: localArray[0].currentPage,
    })
    this.getSortPatternStorage()
    this.createPageOptions(localArray[0].currentPage)
  }

  async getMarketPage(pageInstance: number) {
    this.resetSortValues()
    let localPage = this.state.page
    if (pageInstance === 1) {
      localPage++
    } else if (pageInstance === -1) {
      localPage--
    } else {
      localPage = this.state.page
    }
    this.setState({ isMarketLoaded: false })
    // const url ='https://blockcreatures-marketplace.herokuapp.com/blockcreatures/marketplace'
    const url = 'http://127.0.0.1:5000/blockcreatures/marketplace'
    let localArray: CreepData[] = []
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: localPage,
      }),
    })
      .then((response) => response.json())
      .then((data) => (localArray = data))

    this.setState({
      marketData: localArray,
      orginalData: localArray,
      isMarketLoaded: true,
      page: localArray[0].currentPage,
    })
    this.getSortPatternStorage()
  }

  setSortPatternStorage(type: string, direction: number) {
    localStorage.setItem(SORTPREFIX, JSON.stringify(type))
    localStorage.setItem(SORTPREFIXDIR, JSON.stringify(direction))
  }

  getSortPatternStorage() {
    let tempLocalStorageType = ''
    if (localStorage.getItem(SORTPREFIX) == undefined) {
      console.log('No local storage data...')
      tempLocalStorageType = 'skip'
    } else {
      tempLocalStorageType = JSON.parse(
        localStorage.getItem(SORTPREFIX) || '{}'
      )
    }
    this.findSortType(tempLocalStorageType)
  }

  getSortPatternDirectionStorage() {
    let tempLocalStorageDir = 0
    if (localStorage.getItem(SORTPREFIXDIR) == undefined) {
      tempLocalStorageDir = 0
    } else {
      tempLocalStorageDir = JSON.parse(
        localStorage.getItem(SORTPREFIXDIR) || '{}'
      )
    }
    return tempLocalStorageDir
  }

  findSortType(type: string) {
    const direction = this.getSortPatternDirectionStorage()
    switch (type) {
      case 'Id':
        this.setState({
          isMarketLoaded: false,
          sortId: direction,
          isSorted: false,
        })
        this.sortId()
        break
      case 'Rarity':
        this.setState({
          isMarketLoaded: false,
          sortRarity: direction,
          isSorted: false,
        })
        this.sortRarity()
        break
      case 'Level':
        this.setState({
          isMarketLoaded: false,
          sortLevel: direction,
          isSorted: false,
        })
        this.sortLevel()
        break
      case 'Boost':
        this.setState({
          isMarketLoaded: false,
          sortBoost: direction,
          isSorted: false,
        })
        this.sortBoost()
        break
      case 'Exp':
        this.setState({
          isMarketLoaded: false,
          sortExp: direction,
          isSorted: false,
        })
        this.sortExp
        break
      case 'ExpNext':
        this.setState({
          isMarketLoaded: false,
          sortExpNext: direction,
          isSorted: false,
        })
        this.sortExpNext()
        break
      case 'Rate':
        this.setState({
          isMarketLoaded: false,
          sortRate: direction,
          isSorted: false,
        })
        this.sortRate()
      case 'Price':
        this.setState({
          isMarketLoaded: false,
          sortPrice: direction,
          isSorted: false,
        })
        this.sortPrice()
        break
      case 'skip':
        this.setState({
          isMarketLoaded: true,
          isSorted: true,
        })
    }
    if (this.state.isAppliedFilters) {
      // after sorting => get the filters
      this.filterAllFields()
    }
  }

  // only update state values
  resetSortValues() {
    this.setState({
      sortId: 0,
      sortRarity: 0,
      sortLevel: 0,
      sortBoost: 0,
      sortExp: 0,
      sortExpNext: 0,
      sortRate: 0,
      sortPrice: 0,
    })
  }

  // on click reset localstorage
  resetSortingStorage() {
    this.resetSortValues()
    localStorage.removeItem(SORTPREFIX)
    localStorage.removeItem(SORTPREFIXDIR)
  }

  async sortId() {
    if (this.state.sortId === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortId: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Id', this.state.sortId * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortId: this.state.sortId * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Id', this.state.sortId * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortId === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.id - a.id
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.id - b.id
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortRarity() {
    if (this.state.sortRarity === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortRarity: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Rarity', this.state.sortRarity * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortRarity: this.state.sortRarity * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Rarity', this.state.sortRarity * -1)
        }
      )
    }

    const localArray = this.state.marketData

    if (this.state.sortRarity === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        if (b.rarity < a.rarity) {
          return -1
        }
        if (a.rarity < b.rarity) {
          return 1
        }
        return 0
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        if (a.rarity < b.rarity) {
          return -1
        }
        if (b.rarity < a.rarity) {
          return 1
        }
        return 0
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortLevel() {
    if (this.state.sortLevel === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortLevel: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Level', this.state.sortLevel * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortLevel: this.state.sortLevel * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Level', this.state.sortLevel * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortLevel === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.lvl - a.lvl
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.lvl - b.lvl
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortBoost() {
    if (this.state.sortBoost === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortBoost: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Boost', this.state.sortBoost * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortBoost: this.state.sortBoost * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Boost', this.state.sortBoost * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortBoost === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.boost - a.boost
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.boost - b.boost
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortExp() {
    if (this.state.sortExp === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortExp: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Exp', this.state.sortExp * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortExp: this.state.sortExp * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Exp', this.state.sortExp * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortExp === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.exp - a.exp
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.exp - b.exp
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortExpNext() {
    if (this.state.sortExpNext === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortExpNext: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('ExpNext', this.state.sortExpNext * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortExpNext: this.state.sortExpNext * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('ExpNext', this.state.sortExpNext * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortExpNext === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.exp2next - a.exp2next
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.exp2next - b.exp2next
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortRate() {
    if (this.state.sortRate === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortRate: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Rate', this.state.sortRate * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortRate: this.state.sortRate * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Rate', this.state.sortRate * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortRate === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.rate - a.rate
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.rate - b.rate
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  async sortPrice() {
    if (this.state.sortPrice === 0) {
      this.resetSortValues()
      await this.setState(
        { isMarketLoaded: false, sortPrice: 1, isSorted: false },
        () => {
          this.setSortPatternStorage('Price', this.state.sortPrice * -1)
        }
      )
    } else {
      await this.setState(
        {
          isMarketLoaded: false,
          sortPrice: this.state.sortPrice * -1,
          isSorted: false,
        },
        () => {
          this.setSortPatternStorage('Price', this.state.sortPrice * -1)
        }
      )
    }
    const localArray = this.state.marketData

    if (this.state.sortPrice === 1) {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return b.price - a.price
      })
    } else {
      localArray.sort(function (a: CreepData, b: CreepData) {
        return a.price - b.price
      })
    }
    await this.setState({
      marketData: localArray,
      isMarketLoaded: true,
      isSorted: true,
    })
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Announcement />
          <div>
            <div style={styles.groupMargin}>
              <Grid container spacing={3}>
                <Grid
                  style={styles.buttonLeft}
                  container
                  item
                  xs={4}
                  spacing={1}
                >
                  <button
                    aria-label="Back"
                    className="h-button centered hoverTextCenter"
                    data-text="Back"
                    onClick={() => this.getMarketPage(-1)}
                  >
                    <span>
                      <MdIcons.MdKeyboardArrowLeft size={30} />
                    </span>
                  </button>
                </Grid>
                <Grid
                  style={styles.buttonCenter}
                  container
                  item
                  xs={4}
                  spacing={1}
                >
                  <button
                    aria-label="Recent"
                    className="h-button centered hoverTextCenter"
                    data-text="Recent Listings"
                    onClick={() => this.getRecentMarket()}
                  >
                    <span>
                      <GiIcons.GiRun size={30} />
                    </span>
                  </button>
                </Grid>
                <Grid
                  style={styles.buttonRight}
                  container
                  item
                  xs={4}
                  spacing={1}
                >
                  <button
                    aria-label="Next"
                    className="h-button centered hoverTextCenter"
                    data-text="Next"
                    onClick={() => this.getMarketPage(1)}
                  >
                    <span>
                      <MdIcons.MdKeyboardArrowRight size={30} />
                    </span>
                  </button>
                </Grid>
              </Grid>
            </div>
            <div style={styles.groupMargin}>
              {this.state.isMarketLoaded && this.state.isSorted ? (
                <div>
                  <Collapse in={this.state.isCollapsedFilter}>
                    <div style={styles.filterContainer}>
                      <div>
                        <FilterMessage />
                        <Grid container spacing={3}>
                          <Grid container item xs={12} spacing={1}>
                            <FilterDropdown
                              PREFIX={FILTERPREFIX + RARITYPREFIX}
                              type="Rarity"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid container item xs={4} spacing={1}>
                            <FilterForm
                              PREFIX={FILTERPREFIX + LEVELPREFIX}
                              type="Level"
                            />
                          </Grid>
                          <Grid container item xs={4} spacing={1}>
                            <FilterForm
                              PREFIX={FILTERPREFIX + RATEPREFIX}
                              type="Rate"
                            />
                          </Grid>
                          <Grid container item xs={4} spacing={1}>
                            <FilterForm
                              PREFIX={FILTERPREFIX + PRICEPREFIX}
                              type="Price"
                            />
                          </Grid>
                        </Grid>
                        <div style={styles.buttonFilterSpacing}>
                          <button
                            aria-label="Filter"
                            className="h-button centered hoverTextCenter"
                            style={styles.buttonFilterBorder}
                            data-text="Filter Data"
                            onClick={() => this.filterTrigger()}
                          >
                            <span>
                              <RiIcons.RiFilterLine size={30} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                  <Grid container spacing={3}>
                    {/* filter selection will go here */}
                    <Grid container item xs={4} spacing={1}>
                      <div style={styles.switchColor}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.isAppliedFilters}
                              onChange={(e) => this.handleFilterOnLoad(e)}
                              name="isAppliedFilters"
                              color="primary"
                            />
                          }
                          labelPlacement="start"
                          label={
                            this.state.isAppliedFilters
                              ? 'Filter OnLoad: True'
                              : 'Filter OnLoad: False'
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.isCollapsedFilter}
                              onChange={(e) => this.handleFilterCollapsed(e)}
                              name="isCollapsedFilter"
                              color="primary"
                            />
                          }
                          labelPlacement="start"
                          label={
                            this.state.isCollapsedFilter
                              ? 'Show Filters: Open'
                              : 'Show Filters: Closed'
                          }
                        />
                      </div>
                    </Grid>
                    <Grid
                      style={styles.buttonCenter}
                      container
                      item
                      xs={4}
                      spacing={1}
                    >
                      <h1 style={styles.pageTitle}>Page </h1>
                      <div className="select">
                        <select
                          style={styles.pageSelect}
                          value={this.state.page}
                          onChange={(e) => this.handlePageSelection(e)}
                        >
                          {this.state.pageList.map((item, index) => (
                            <option key={`page-number-${index}`} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Grid>
                    <Grid
                      style={styles.buttonRight}
                      container
                      item
                      xs={4}
                      spacing={1}
                    >
                      <button
                        aria-label="Clear Sort"
                        className="h-button centered hoverTextCenter"
                        data-text="Clear Sort"
                        onClick={() => this.resetSortingStorage()}
                      >
                        <span>
                          <GiIcons.GiVacuumCleaner size={30} />
                        </span>
                      </button>
                    </Grid>
                  </Grid>
                </div>
              ) : null}
            </div>
          </div>
          {this.state.isMarketLoaded && this.state.isSorted ? (
            <FormTitle
              sortIdFunc={() => this.sortId()}
              sortRarityFunc={() => this.sortRarity()}
              sortLevelFunc={() => this.sortLevel()}
              sortBoostFunc={() => this.sortBoost()}
              sortExpFunc={() => this.sortExp()}
              sortExpNextFunc={() => this.sortExpNext()}
              sortRateFunc={() => this.sortRate()}
              sortPriceFunc={() => this.sortPrice()}
              sortIdState={this.state.sortId}
              sortRarityState={this.state.sortRarity}
              sortLevelState={this.state.sortLevel}
              sortBoostState={this.state.sortBoost}
              sortExpState={this.state.sortExp}
              sortExpNextState={this.state.sortExpNext}
              sortRateState={this.state.sortRate}
              sortPriceState={this.state.sortPrice}
            />
          ) : null}
          {this.state.isMarketLoaded && this.state.isSorted ? (
            this.state.marketData.length > 0 ? (
              this.state.marketData.map((item, index) => (
                <div key={`creep-list-${index}`}>
                  <FormRow creep={this.state.marketData[index]} />
                </div>
              ))
            ) : (
              <div style={styles.dataErrorContainer}>
                <h1>No matching data. Please check your filter!</h1>
              </div>
            )
          ) : (
            <SkeletonLoad />
          )}
        </Container>
      </div>
    )
  }
}

export default Table
