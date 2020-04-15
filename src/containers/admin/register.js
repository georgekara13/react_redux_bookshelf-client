import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers, registerUser } from '../../actions'

class Register extends Component {

  state = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    error: ''
  }

  componentDidMount(){
    this.props.dispatch(getUsers())
  }

  renderUserList = (userlist) => {
    return userlist ? userlist.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    ))
                    : null
  }

  handleInputEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleInputPassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleInputName = (event) => {
    this.setState({name: event.target.value})
  }

  handleInputLastName = (event) => {
    this.setState({lastName: event.target.value})
  }

  //TODO form validation
  submitForm = (event) => {
    event.preventDefault()
    this.setState({error:''})

    this.props.dispatch(registerUser({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastName: this.state.lastName
    }, this.props.user.userlist))
  }

  render() {
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Add user</h2>
          <div className="form_element">
            <input type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleInputName} />
            <input type="text" placeholder="Enter last name" value={this.state.lastName} onChange={this.handleInputLastName} />
            <input type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputEmail} />
            <input type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputPassword} />
          </div>

          <button type="submit">Add user</button>
          <div className="error">{this.state.error}</div>
        </form>
        <div className="current_users">
          <h4>Current users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUserList(this.props.user.userlist)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register)
