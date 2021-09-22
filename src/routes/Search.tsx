import React, { Component } from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import DisplayCreature from '../search/DisplayCreature'
import '../search/Search.css'

// const styles: { [key: string]: React.CSSProperties } = {
//   searchTitle: {
//     marginTop: '30px',
//     color: 'white',
//     textAlign: 'center',
//   },
// }

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

const RARITYTYPE = [
  'COMMON',
  'UNCOMMON',
  'RARE',
  'EPIC',
  'LEGENDARY',
  'MYTHIC',
  'GODLIKE',
  'COMMON-POWERUP',
  'UNCOMMON-POWERUP',
  'RARE-POWERUP',
  'EPIC-POWERUP',
  'LEGENDARY-POWERUP',
  'MYTHIC-POWERUP',
  'GODLIKE-POWERUP',
]

const RARITYLINK = [
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Common_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Uncommon_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Rare_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Epic_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Legendary_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Mythic_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Godlike_01.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Common_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Uncommon_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Rare_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Epic_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Legendary_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Mythic_02.gif',
  'https://raw.githubusercontent.com/wizard-deVv/CryptoMonsters/main/Godlike_02.gif',
]

class Search extends Component {
  state = {
    tokenId: 1,
    isSearchLoaded: false,
    isRealCreature: true,
    creep: [],
    imageLink: '',
    loaderPlaceholder: false,
  }

  async postSearchCreature() {
    await this.setState({
      isSearchLoaded: false,
      isRealCreature: true,
      loaderPlaceholder: true,
    })
    const url =
      'https://blockcreatures-marketplace.herokuapp.com/blockcreatures/search'
    // const url = 'http://127.0.0.1:5000/blockcreatures/search'
    let localArray: CreepData[] = []
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenId: this.state.tokenId,
      }),
    })
      .then((response) => response.json())
      .then((data) => (localArray = data))

    await this.setState({ creep: localArray })
    if (localArray.length !== 0) {
      this.getGifType(localArray[0].rarity)
      await this.setState({ isSearchLoaded: true, isRealCreature: true })
    } else {
      await this.setState({ isRealCreature: false, isSearchLoaded: false })
    }
    await this.setState({ loaderPlaceholder: false })
  }

  async getGifType(rarityType: string) {
    let linkIndex = 0
    switch (rarityType) {
      case RARITYTYPE[0]:
        linkIndex = 0
        break
      case RARITYTYPE[1]:
        linkIndex = 1
        break
      case RARITYTYPE[2]:
        linkIndex = 2
        break
      case RARITYTYPE[3]:
        linkIndex = 3
        break
      case RARITYTYPE[4]:
        linkIndex = 4
        break
      case RARITYTYPE[5]:
        linkIndex = 5
        break
      case RARITYTYPE[6]:
        linkIndex = 6
        break
      case RARITYTYPE[7]:
        linkIndex = 7
        break
      case RARITYTYPE[8]:
        linkIndex = 8
        break
      case RARITYTYPE[9]:
        linkIndex = 9
        break
      case RARITYTYPE[10]:
        linkIndex = 10
        break
      case RARITYTYPE[11]:
        linkIndex = 11
        break
      case RARITYTYPE[12]:
        linkIndex = 12
        break
      case RARITYTYPE[13]:
        linkIndex = 13
        break
      default:
        break
    }
    await this.setState({ imageLink: RARITYLINK[linkIndex] })
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await this.postSearchCreature()
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    const re = /^[0-9\b]+$/
    // check input is not null, test regex against input
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ tokenId: Number(e.target.value) })
    }
  }

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input
              type="search"
              name="searchId"
              value={this.state.tokenId}
              onChange={(e) => this.handleChange(e)}
            />
            <button className="buttonScale buttonStyle" type="submit">
              Search
            </button>
          </form>
          <div>
            {this.state.isSearchLoaded && this.state.isRealCreature ? (
              <DisplayCreature
                creepData={this.state.creep}
                imageLink={this.state.imageLink}
              />
            ) : null}
          </div>
          <div className="centerUserFeedback">
            {this.state.isRealCreature ? null : (
              <h4 className="errorMessage">Creature does not exist!</h4>
            )}
            {this.state.loaderPlaceholder ? <CircularProgress /> : null}
          </div>
        </Container>
      </div>
    )
  }
}

export default Search
