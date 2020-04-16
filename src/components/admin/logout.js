import React from 'react'
import axios from 'axios'

/*no need to use redux for a simple stateless component
remember - avoid using class based components whenever possible to keep things simple
performance difference? Nop. Functional components are classes internally.
In terms of performance, pureComponents are the fastest ones*/
const Logout = (props) => {

  let request = axios.get('/api/logout')
                     .then(request => {
                       setTimeout(() => {
                         props.history.push('/')
                       }, 2000)
                     })
  return (
    <div className="logout_container">
      <h1>Logging out...</h1>
    </div>
  )
}

export default Logout
