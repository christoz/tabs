import React, {Component} from 'react'
import { render } from 'react-dom'
import Classnames from 'classnames'

import './stylesheets/styles.less'

// Data that will be supplied inti the Tabs compoent
import Data from './_data/robots.json'

import Tabs from './components/Tabs'

window.__robots = document.getElementById('root')

// Pass props to Tabs component and render into the DOM.
render(
  <Tabs labels={Data.robots} selected={0} />,
  window.__robots
)
