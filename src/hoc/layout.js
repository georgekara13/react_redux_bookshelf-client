import React from 'react'
import Header from '../components/header/header'

const Layout = (props) => (
  <Header>
    <div>
      {props.children}
    </div>
  </Header>
)

export default Layout
