// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'
import * as HiIcons from 'react-icons/hi'
import './ScrollTop.css'

class ScrollTop extends Component {
  state = {
    is_visible: false,
  }

  componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const scrollComponent = this
    document.addEventListener('scroll', function () {
      scrollComponent.toggleVisibility()
    })
  }

  toggleVisibility() {
    if (window.pageYOffset > 150) {
      this.setState({
        is_visible: true,
      })
    } else {
      this.setState({
        is_visible: false,
      })
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    return (
      <div>
        <div id="fixedbutton">
          {this.state.is_visible && (
            <div onClick={() => this.scrollToTop()}>
              <HiIcons.HiArrowCircleUp
                size={50}
                style={{ marginLeft: '10px', color: '#DEF2F1' }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ScrollTop
