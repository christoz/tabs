import React, {Component} from 'react'
import { render } from 'react-dom'
import Classnames from 'classnames'

class Tabs extends Component {

  constructor (props) {
    super(props)
    // initialize Tabs state, we store robots into component's state, in order to use and manage as we will see next
    this.state = {
      robots: props.labels,
      selectedTab: props.selected,
      isMobile: false
    }

    this._selectTab = this._selectTab.bind(this)
    this._renderTabsPanes = this._renderTabsPanes.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  // before any render occur, measure clients viewport dimensions
  componentWillMount () {
    this._updateDimensions()
  }

  // add resize event listener when component is mount
  componentDidMount () {
    this._updateDimensions()
    window.addEventListener('resize', this._updateDimensions.bind(this))
  }

  // remove resize event listener when component will unmount
  componentWillUnmount () {
    window.removeEventListener('resize', this._updateDimensions.bind(this))
  }

  // updates state with viewPort dimensions
  _updateDimensions () {
    this.setState({
      clientWidth: window.innerWidth,
      clientHeight: window.innerHeight,
      isMobile: window.innerWidth < 480
    })
  }

  // update state with the selected tab index
  _selectTab (index, e) {
    this.setState({selectedTab: index})
  }

  // reads robots.json and populates the tab buttons programmaticaly
  _renderTabsButtons () {
    const { robots } = this.state

    return robots.map((item, index) => {
      // use of classnames library to handle multiple classes
      const classes = Classnames({
        'tabs__label': true,
        'active': this.state.selectedTab === index
      })
      return (
        <li key={index} className={classes} onClick={() => this._selectTab(index)}>{item.name}</li>
      )
    })
  }

  // updating robot record of robots state on the fly when user types something into the field
  _handleChange(index, e) {
    // we search for the current record we want to manage
    const robot = this.state.robots.find((item, idx) => index === idx)
    // we update the value
    robot.name = e.target.value
    // we update the state
    this.setState({
      robots: [
        ...this.state.robots.slice(0, index),
        robot,
        ...this.state.robots.slice(index + 1)
      ]
    })
  }
  // as with tab buttons here we populate tab panes
  _renderTabsPanes () {
    const { robots, selectedTab, isMobile } = this.state
    return robots.map((item, index) => {
      // if current item index is not the same with the one we selected do not show it
      // if screen is small we want to list everythin since it's a design requirement.
      if (index !== selectedTab && !isMobile) return
      return (
        <div key={index} className="tabs__pane">
          <img src={require(`../images/${item.icon}`)} />
          <div className="tabs__pane__details">
            <input
              type="text"
              value={item.name}
              className="tabs__pane__details__label"
              onChange={(e) => this._handleChange(index, e)}
            />
            <span className="tabs__pane__details__value">{item.points} points</span>
          </div>
        </div>
      )
    })
  }

  render () {
    const { labels } = this.props
    const { isMobile } = this.state

    if (!labels) return <div>Loading ...</div>

    return (
      <div className="tabs">
        <ul className="list list--inline">
          {!isMobile && this._renderTabsButtons()}
        </ul>
        {this._renderTabsPanes()}
      </div>
    )
  }
}

export default Tabs

