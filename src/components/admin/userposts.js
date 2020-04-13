import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserPosts } from '../../actions'
import moment from 'moment-js'
import { Link } from 'react-router-dom'

class UserPosts extends Component {

  componentDidMount(){
    this.props.dispatch(getUserPosts(this.props.user.login.id))
  }

  showUserPosts = (user) => (
    user.userposts ? user.userposts.map(item => (
                      <tr key={item._id}>
                        <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                        <td>{item.author}</td>
                        <td>{moment(item.createdAt).format("YYYY/MM/DD")}</td>
                      </tr>
                    ))
                   : null
  )

  // TODO integrate datatables.js
  // https://medium.com/@zbzzn/integrating-react-and-datatables-not-as-hard-as-advertised-f3364f395dfa
  render() {
    let user = this.props.user
    return (
      <div className="user_posts">
        <h4>Your reviews:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.showUserPosts(user)}
          </tbody>
        </table>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserPosts)
