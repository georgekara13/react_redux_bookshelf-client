import React, { Component } from 'react'
import {connect} from 'react-redux'
import { auth } from '../actions'

/*
Used as a component wrapper for restricting routes or passing user data if required
check the order of functions-lifecycles:
1 - render loading component
2 - didmount lifecycle to dispatch an auth() action
3 - once new props(auth) arrive from dispatched action, decide which component to put in view
4 - we have 3 outcomes:
    - 4.1: user is not logged in & tries to access restricted route - redirect to /login
    - 4.2: user is logged in & tries to access login route - redirect to /user
    - 4.3: we dont care whether user is logged in or not, just pass the component with some user props if the user is logged in
*/
//TODO refactor logic not to use the extra reload arg. It's weird
export default function(ComposedClass, reload){
  class AuthenticationCheck extends Component {

    state = {
      loading: true
    }

    //2
    componentDidMount(){
      this.props.dispatch(auth())
    }

    //3
    //after dispatch, this lifecycle will trigger
    componentWillReceiveProps(nextProps){
      const { user } = nextProps

      //after receiving auth response from dispatched action - stop loading
      this.setState({
        loading: false
      })

      if (!user.login.isAuth){
        if (reload){
          //4.1
          this.props.history.push('/login')
        }
      }
      else{
        if (reload === false){
          //4.2
          this.props.history.push('/user')
        }
      }
    }

    render(){
      //1
      if (this.state.loading){
        return <div className="loader">Loading...</div>
      }

      return(
        //4.3
        <ComposedClass {...this.props} user={this.props.user}/>
      )
    }
  }

  function mapStateToProps(state){
    return{
      user: state.user
    }
  }

  return connect(mapStateToProps)(AuthenticationCheck)
}
