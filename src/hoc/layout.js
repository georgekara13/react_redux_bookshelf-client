import React from 'react'
import Header from '../components/header/header'

const Layout = (props) => (
  <div>
    <Header />
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout
